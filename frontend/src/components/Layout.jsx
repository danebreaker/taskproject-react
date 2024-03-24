import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import LoggedInContext from "../contexts/LoggedInContext"

export default function Layout(props) {

    let [loggedIn, setLoggedIn] = useState(false);
    let [username, setUsername] = useState(undefined);

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        if (username !== "undefined") {
            console.log("one"); 
            setUsername(username); 
            setLoggedIn(true);
        } else {
            console.log("two"); 
            sessionStorage.setItem("username", undefined);
        }
        //username != undefined ? () => { console.log("one"); setUsername(JSON.parse(username)); setLoggedIn(true); } : () => {console.log("two"); sessionStorage.setItem("username", undefined);};
    }, [])

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
        <LoggedInContext.Provider value={[loggedIn, setLoggedIn, username, setUsername]}>
            <Outlet />
        </LoggedInContext.Provider>
    </>
}