import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import BlackJackLoginContext from "../context/BlackJackLoginContext";

import logo from '../../assets/blackJackLogo.png'

function Layout(props) {
    const [loggedIn, setLoggedIn] = useContext(BlackJackLoginContext);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="Miller BlackJack Logo"
                            src={logo}
                            width="45"
                            height="52"
                            className="d-inline-block align-top"
                        />{' '}
                        Miller BlackJack
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            loggedIn ?
                                <>
                                    <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                                </>
                                :
                                <>
                                    <Nav.Link as={Link} to="login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="register">Register</Nav.Link>
                                </>
                        }
                        <NavDropdown title="Tables">
                                <NavDropdown.Item as={Link} to="tables/1">Table 1</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="tables/2">Table 2</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="tables/3">Table 3</NavDropdown.Item>
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;