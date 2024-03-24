import { Button, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

import Task from "./Task";
import LoggedInContext from "../contexts/LoggedInContext";

export default function Tasks(props) {

    let [tasks, setTasks] = useState([]);
    let [task, setTask] = useState("");
    let [loggedIn, setLoggedIn] = useState(useContext(LoggedInContext)[0]);
    let [username, setUsername] = useState(useContext(LoggedInContext)[2]);

    const refreshTasks = () => {
        fetch("http://localhost:53715/api/tasks")
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                console.log(loggedIn);
                console.log(username);
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
                    setTask("");
                }
            })
    }

    const deleteTask = (taskId) => {
        let temp = tasks;
        temp = temp.splice(taskId-1, 1);
        setTasks(temp);

        fetch("http://localhost:53715/api/tasks", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                taskId: taskId
            })
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
            fetch("http://localhost:53715/api/tasks/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    task: task.task,
                    taskId: task.id
                })
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