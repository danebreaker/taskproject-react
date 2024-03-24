import { useContext, useEffect } from "react"
import LoggedInContext from "../contexts/LoggedInContext"
import { useNavigate } from "react-router-dom";

export default function Logout(props) {

    const setLoggedIn = useContext(LoggedInContext)[1];
    const setUsername = useContext(LoggedInContext)[3];

    const navigate = useNavigate();

    useEffect(() => {
        // API logout request
        console.log("Logout Request")

        // Set session storage to logged out and username empty
        sessionStorage.setItem('username', "");
        setLoggedIn(false);
    }, [])

    return <>
        <h1>Logout</h1>
        <p>You have been logged out</p>
    </>
}