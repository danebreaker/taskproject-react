import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Layout(props) {
    return <>
        <Navbar>
            <Nav>
                <Nav.Link as={Link} to="/">Tasks</Nav.Link>
                <Nav.Link as={Link} to="login">Login</Nav.Link>
            </Nav>
        </Navbar>
        <div>
            <Outlet />
        </div>
    </>
}