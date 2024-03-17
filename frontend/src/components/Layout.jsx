import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Layout(props) {

    let [loggedIn, setLoggedIn] = useState(false);
    let [username, setUsername] = useState("");

    return <>
        <Navbar>
            <Nav>
                <Nav.Link as={Link} to="/">Tasks</Nav.Link>
                {
                    !loggedIn ? 
                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                    :
                    <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                }
            </Nav>
        </Navbar>
        <div>
            <Outlet />
        </div>
    </>
}