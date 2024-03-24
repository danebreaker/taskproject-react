import { Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import Task from "./Task";
import LoggedInContext from "../contexts/LoggedInContext";

export default function Tasks(props) {

    let [tasks, setTasks] = useState([]);
    let [task, setTask] = useState("");
    let loggedIn = useContext(LoggedInContext)[0];
    let username = useContext(LoggedInContext)[2]

    const refreshTasks = () => {
        fetch("http://localhost:53715/api/tasks")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                
            })
    }

    useEffect(refreshTasks, [])

    const addTask = (e) => {
        fetch("http://localhost:53715/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task,
                username: username
            })
        })
            .then(res => {
                if (!res.ok) {
                    alert("Something went wrong!");
                } else {
                    refreshTasks();
                }
            })
    }

    const deleteTask = (taskId) => {
        let temp = tasks;
        temp = temp.splice(taskId-1, 1);
        setTasks(temp);

        fetch(`http://localhost:53715/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    alert("Something went wrong");
                } else {
                    refreshTasks();
                }
            })

    }

    const saveTasks = () => {
        tasks.map(task => {
            fetch(`http://localhost:53715/api/tasks/${task.id}/${task.task}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (!res.ok) {
                        alert("Something went wrong");
                    } else {
                        refreshTasks();
                    }
                })
        })
    }

    const updateTask = (taskId, task) => {
        let temp = tasks;
        temp.filter(ctask => ctask.id === taskId)[0].task = task;
        setTasks(temp);
    }

    return <>
        <h1>Tasks</h1>
        {
            loggedIn ?
            <>
                <Form onSubmit={addTask}>
                    <Form.Label htmlFor='task'>Task: </Form.Label>
                    <Form.Control id='task' onChange={(e) => setTask(e.target.value)}></Form.Control>
                    <Button onClick={addTask}>Add Task</Button>
                </Form>
            
                {
                    tasks.map(task => {
                        if (task.user === username) {
                            return <Task task={task.task} id={task.id} key={task.id} delete={deleteTask} update={updateTask}/>
                        }
                    })
                }
                <Button onClick={saveTasks}>Save</Button>
            </>
            :
            <p>You must be logged in to create tasks</p>
        }
        
    </>
}