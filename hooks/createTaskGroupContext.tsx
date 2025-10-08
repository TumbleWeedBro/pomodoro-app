import React from "react";
import { CreateTaskContext } from "@/context/createTaskGroupContext";

export const CreateTaskState = () => {
    const taskState = React.useContext(CreateTaskContext);
    if(!taskState) throw new Error("Task state doesnt exist");
    const [createTaskGroup, setCreateTaskGroup] = taskState;
    return{
        taskState,
        setTaskGroupTrue: () => setCreateTaskGroup(true),
        setTaskGroupFalse: () => setCreateTaskGroup(false)
    }
    
}