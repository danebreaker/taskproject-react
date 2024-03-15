import { Button } from "react-bootstrap";
import { useState } from "react";

import Task from "./Task";

export default function Tasks(props) {

    let [tasks, setTasks] = useState([{name: "monk", id: 1}]);

    const addTask = () => {
        let newTask = {name: "", id: tasks.length}
        setTasks([...tasks, newTask])
    }

    return <>
        <p>Tasks</p>
        <Button onClick={addTask}>Add Task</Button>
        {
            tasks.map(task => <Task name={task.name} id={task.id} />)
        }
    </>
}