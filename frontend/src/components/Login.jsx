import { useContext, useRef } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoggedInContext from "../contexts/LoggedInContext";

export default function Login(props) {

    const username = useRef();
    const password = useRef();

    const setLoggedIn = useContext(LoggedInContext)[1];
    const setUsername = useContext(LoggedInContext)[3];

    const navigate = useNavigate();

    const loginSubmit = () => {
        // API login request
        fetch("http://localhost:53715/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => {
                if (!res.ok) {
                    alert("Something went wrong");
                } else if (res.status === 401) {
                    alert("Incorrect username or password")
                } else {
                    // Set session storage to logged in and username
                    sessionStorage.setItem('username', username.current.value);
                    setLoggedIn(true);
                    setUsername(username.current.value);

                    alert("Succesfully Logged In as " + username.current.value);
                    navigate('/Tasks');
                }
            })
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