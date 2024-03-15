import { useState } from "react"


export default function Task(props) {

    let [name, setName] = useState(props.name);

    return <div>
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
    </div>
}