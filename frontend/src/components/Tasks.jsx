import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import Task from "./Task";

export default function Tasks(props) {

    let [tasks, setTasks] = useState([]);
    let [task, setTask] = useState("");

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
                task: task
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("task added")
                    refreshTasks
                } else {
                    alert("Something went wrong!")
                }
            })
        refreshTasks()
    }

    return <>
        <p>Tasks</p>
        <Form>
            <Form.Label htmlFor='task'>Task</Form.Label>
            <Form.Control id='task' onChange={(e) => setTask(e.target.value)}></Form.Control>
            <Button onClick={addTask}>Add Task</Button>
        </Form>
        {
            tasks.map(task => <Task name={task.task} id={task.id} key={task.id} />)
        }
    </>
}