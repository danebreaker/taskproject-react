import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import LoggedInContext from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";

export default function Register(props) {

    const username = useRef();
    const password = useRef();

    const setLoggedIn = useContext(LoggedInContext)[1];
    const setUsername = useContext(LoggedInContext)[3];

    const navigate = useNavigate();

    const registerSubmit = () => {
        // API register request
        fetch("http://localhost:53715/api/register", {
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
                } else if (res.status === 409) {
                    alert("Username already exists");
                } else {
                    // Set session storage to logged in and username
                    sessionStorage.setItem('username', username.current.value);
                    setLoggedIn(true);
                    setUsername(username.current.value);

                    alert("Succesfully registered and logged in as " + username.current.value);
                    navigate("/Tasks");
                }
            })
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