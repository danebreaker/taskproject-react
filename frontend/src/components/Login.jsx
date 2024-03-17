import { useRef } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login(props) {

    const username = useRef();
    const password = useRef();

    const loginSubmit = () => {
        // API login request
        console.log("Login Request");

        // Set session storage to logged in and username
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={loginSubmit}>
            Username: <Form.Control ref={username}></Form.Control><br />
            Password: <Form.Control type="password" ref={password}></Form.Control><br />
            <Button onClick={loginSubmit}>Login</Button>
        </Form>
        <p>Dont have an account? <Nav.Link as={Link} to="../register">Create one here</Nav.Link></p>
    </>
}