from rich import print as rprint
from dotenv import load_dotenv
load_dotenv()
from langchain_groq import ChatGroq
from langgraph.constants import END
from langgraph.graph import StateGraph
from langchain.agents import create_agent   # new version to create_react_agent

from agent.states import *
from agent.prompts import *
from agent.tools import *

# from states import *
# from prompts import *
# from tools import *

llm = ChatGroq(model="openai/gpt-oss-120b")


# input to planner agent - state (a dict) which will have our user prompt
# output from planner agent - state (a dict) which will have our user prompt + plan made by planner agent
# input -> state = { user_prompt: "create a simple calculator web application" }
def planner_agent(state: dict) -> dict:
    user_prompt = state["user_prompt"]
    response = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt)) # the return type is 'Plan'
    
    if response is None:
        raise ValueError("Planner did not return a valid response")
    
    return {"plan": response}


# input to architect agent - state (a dict) which will have plan made by planner agent
# output from architect agent - state (a dict) which will have plan + task plan made by architect agent
# input -> state = { plan: Plan(...) }
def architect_agent(state: dict) -> dict:
    plan: Plan = state["plan"]
    response = llm.with_structured_output(TaskPlan).invoke(architecture_prompt(plan)) # the return type is 'TaskPlan' 
    
    if response is None:
        raise ValueError("Architect did not return a valid response")
    
    response.plan = plan    # we are able to add the plan to respone coz TaskPlan model allows extra fields
    
    return { "task_plan": response }    # the response has task_plan + plan


# input to coder agent - state (a dict) which will have task plan made by architect agent
# output from coder agent - state (a dict) which will have task plan + code made by coder agent
# input -> state = { task_plan: TaskPlan(...) }
def coder_agent(state: dict) -> dict:
    coder_state = state.get("coder_state")
    if coder_state is None: # initially, coder_state will be None coz nothing is passed from previous agent
        coder_state = CoderState(task_plan=state['task_plan'], current_step_idx=0)

    steps = coder_state.task_plan.implementation_steps
    # break condition for recursion
    if coder_state.current_step_idx >= len(steps):
        return { "coder_state": coder_state, "status": "DONE" }   # all steps are done
    
    current_task = steps[coder_state.current_step_idx]
    # read the existing content of the file - when running stepwise, the model may make changes to the same file multiple times - so it needs to read the existing content first
    existing_content = read_file.run(current_task.filepath) 
    user_prompt = (
        f"Task: {current_task.task_description}\n"
        f"File: {current_task.filepath}\n"
        f"Existing Content: \n{existing_content}\n"
        "Use write_file(path, content) to save your cahnges."
    )
    system_prompt = coder_system_prompt()
    # response = llm.invoke(system_prompt + user_prompt)

    coder_tools = [write_file, read_file, list_files, get_current_directory]   # all the functions inside tools.py

    react_agent = create_agent(llm, coder_tools)
    react_agent.invoke({"messages": [{"role": "system", "content": system_prompt}, 
                                     {"role": "user", "content": user_prompt}]})
    
    coder_state.current_step_idx += 1   # move to next step

    return { "coder_state": coder_state }   # return the updated coder_state



# create a langraph state graph
graph = StateGraph(dict)

graph.add_node("planner", planner_agent)    # planner agent node will take user prompt and return plan
graph.add_node("architect", architect_agent)
graph.add_node("coder", coder_agent)

graph.add_edge("planner", "architect")
graph.add_edge("architect", "coder")
graph.add_conditional_edges(
    "coder",
    lambda s: "END" if s.get("status") == "DONE" else "coder",
    {"END": END, "coder": "coder"}  # based on condition, it will either go to END or loop back to coder agent
)

graph.set_entry_point("planner")

agent = graph.compile()

# if __name__ == "__main__":
#     user_prompt = "create a simple tic-tac-toe game"
#     result = agent.invoke({"user_prompt": user_prompt},
#                           {"recursion_limit": 100})
#     rprint(result)