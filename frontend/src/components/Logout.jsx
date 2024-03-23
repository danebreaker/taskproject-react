import { useContext, useEffect } from "react"
import LoggedInContext from "../contexts/LoggedInContext"

export default function Logout(props) {

    const setLoggedIn = useContext(LoggedInContext)[1];

    useEffect(() => {
        logout
    }, [])

    const logout = () => {
        // API logout request
        console.log("Logout Request")

        // Set session storage to logged out and username empty
        sessionStorage.setItem('username', undefined);
        setLoggedIn(false);
    }

    return <>
        <h1>Logout</h1>
        <p>You have been logged out</p>
    </>
}