import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import LoggedInContext from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";

export default function Register(props) {

    const username = useRef();
    const password = useRef();

    const setLoggedIn = useContext(LoggedInContext)[1];

    const registerSubmit = () => {
        // API register request
        console.log("Register Request");

        // Set session storage to logged in and username
        sessionStorage.setItem('username', username.current.value);
        setLoggedIn(true);
        useNavigate("Tasks");
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