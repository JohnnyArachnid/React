import React, {useState} from "react";

function ToDoApp(){

    const [tasks, setTasks] = useState(["Eat Breakfast", "Walk a dog", "Take a shower"]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if (newTask.trim() !== "") {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index){
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }       
    }

    function moveTaskDown(index){
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }     
    }

    return(
        <div className="toDoListConstainer">
            <h1>To Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task:"
                    value={newTask}
                    onChange={handleInputChange}
                    />
                <button
                    className="addButton"
                    onClick={addTask}>
                    Add Task
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => <li key={index}>
                    <span className="text">{task}</span>
                    <button className="deleteButton" onClick={() => deleteTask(index)}>Delete</button>
                    <button className="moveButton" onClick={() => moveTaskUp(index)}>Up</button>
                    <button className="moveButton" onClick={() => moveTaskDown(index)}>Down</button>
                </li>)}
            </ol>

        </div>
    );

}

export default ToDoApp