import { useState } from "react"
import { Button } from "react-bootstrap";


export default function Task(props) {

    let [task, setTask] = useState(props.task);

    return <div>
        <input value={task} onChange={(e) => setTask(e.target.value)}></input>
        <Button onClick={() => props.delete(props.id)}>X</Button>
    </div>
}