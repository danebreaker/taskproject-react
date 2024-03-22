export default function Logout(props) {

    useEffect(() => {
        logout
    }, [])

    const logout = () => {
        // API logout request
        console.log("Logout Request")

        // Set session storage to logged out and username empty
        sessionStorage.setItem('username', undefined);
        props.loggedIn[1](false);
        //console.log(props.loggedIn[1]);
    }

    return <>
        <h1>Logout</h1>
        <p>You have been logged out</p>
    </>
}