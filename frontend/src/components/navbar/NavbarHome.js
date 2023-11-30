import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Navbar, NavDropdown, Form, Button, Nav, Container } from 'react-bootstrap'
import './navbarHome.css';
import { logoutUser } from '../../services/api/userAPI';
import UserProfileDropdown from '../UserProfileDropdown';
import GemPopup from '../payment/GemPopup';

function NavbarHome(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const isLoggedIn = !!currentUser;
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser();
            setCurrentUser(null);
            navigate('/');
        } catch (error) {
            navigate('login');
        }
    };
    // Gem Popup
    const [showGemPopup, setShowGemPopup] = useState(false);
    const handleGemClick = () => {
        setShowGemPopup(true);
    };
    const handleCloseGemPopup = () => {
        setShowGemPopup(false);
    };
    //End Gem Popup 
    return (
        <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary sticky-top p-0">
            <Container fluid>
                {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
                <Link to="" >
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                {isLoggedIn ? (
                    <UserProfileDropdown currentUser={currentUser} onLogout={handleLogout} className="mr-30" />
                ) : (
                    <Nav.Link as={Link} to={'login'}>
                        Login
                    </Nav.Link>
                )}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border' />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-center flex-grow-1"
                    >
                        <Nav.Link as={NavLink} to={"/"} >Home</Nav.Link>
                        <Nav.Link as={NavLink} to={"contact"}>Contact</Nav.Link>
                        {/* <Nav.Link as={NavLink} to={"planning"}>AI-Chat</Nav.Link> */}
                        <Nav.Link as={NavLink} to={"products"}>Course</Nav.Link>

                        <NavDropdown title="Dropdown" className="mb-3">
                            <NavDropdown.Item href="action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                            <Form.Control
                                name="search"
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline" type="submit">
                                <FaMagnifyingGlass />
                            </Button>
                        </Form>
                    </Nav>
                    <div>&nbsp;</div>
                </Navbar.Collapse>
                <Nav.Link onClick={handleGemClick}>
                    <i className="bi bi-gem px-2 text-primary"></i>GEM
                </Nav.Link>
                <div>&nbsp;</div>
                {showGemPopup && <GemPopup onClose={handleCloseGemPopup} />}
            </Container>
        </Navbar>
    );
}

export default NavbarHome;