import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

export default function Register(props) {

    const username = useRef();
    const password = useRef();

    const registerSubmit = () => {
        // API register request
        console.log("Register Request");

        // Set session storage to logged in and username
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={registerSubmit}>
            Username: <Form.Control ref={username}></Form.Control><br />
            Password: <Form.Control type="password" ref={password}></Form.Control><br />
            <Button onClick={registerSubmit}>Register</Button>
        </Form>
    </>
}