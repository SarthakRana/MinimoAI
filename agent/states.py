from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class File(BaseModel):
    path: str = Field(description="The file path where the file is located.")
    purpose: str = Field(description="The purpose of the file in the project.")

class Plan(BaseModel):
    name: str = Field(description="The name of the app to be built.")
    description: str = Field(description="A brief description of the app.")
    techstack: str = Field(description="The technology stack to be used for the app.")
    features: list[str] = Field(description="A list of features to be included in the app.")
    files: list[File] = Field(description="A list of files to be created for the app.")


class ImplementationTask(BaseModel):    # this is like a single row of task plan
    filepath: str = Field(description="The file path where the implementation task will be applied.")
    task_description: str = Field(description="A detailed description of the implementation task.")


class TaskPlan(BaseModel):
    implementation_steps: list[ImplementationTask] = Field(description="A list of steps to be taken to implement the task.")
    model_config = ConfigDict(extra="allow")
    # This model can have extra fields beyond those explicitly defined.
    # this setting allows you to pass additional data during initialization without it being discarded.


class CoderState(BaseModel):
    task_plan: TaskPlan = Field(description="The task plan containing implementation steps.")
    current_step_idx: int = Field(0, description="The index of the current implementation step being processed.")
    current_file_content: Optional[str] = Field("", description="The existing content of the current file being worked on.")