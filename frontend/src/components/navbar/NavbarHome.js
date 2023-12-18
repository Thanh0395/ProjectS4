import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';
// import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import './navbarHome.css';
import { logoutUser } from '../../services/api/userAPI';
import UserProfileDropdown from '../UserProfileDropdown';
import GemPopup from '../payment/GemPopup';
import Modal from 'react-bootstrap/Modal';

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
        setShowGemPopup(!showGemPopup);
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
                    <Nav.Link as={Link} to={'login'} className='navbar-login-button'>
                        Login
                    </Nav.Link>
                )}
                <Nav.Link onClick={handleGemClick} className='gem-buy-bundle-button'>
                    <i className="bi bi-gem px-2 text-primary"></i>GEM
                </Nav.Link>
                {/* gem Popup */}
                <Modal size='lg' centered show={showGemPopup} onHide={handleCloseGemPopup}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Choose wisely!!
                        </Modal.Title>
                    </Modal.Header>
                    <GemPopup onClose={handleCloseGemPopup} />
                </Modal>
                {/* end gem popup */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border' />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-center flex-grow-1"
                    >
                        <Nav.Link as={NavLink} to={"/"} >Home</Nav.Link>
                        <Nav.Link as={NavLink} to={"contact"}>Contact</Nav.Link>
                        <Nav.Link as={NavLink} to={"planning"}>AI-Chat</Nav.Link>
                        <Nav.Link as={NavLink} to={"products"}>Course</Nav.Link>

                        <NavDropdown title="Dropdown" className="mb-3">
                            <NavDropdown.Item href="action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/change-password">
                                Changge Password
                            </NavDropdown.Item>
                            {isLoggedIn && currentUser.roles.some(role => role.name === 'TEACHER' || role.name === 'ADMIN') && (
                                <NavDropdown.Item href="/admin/lessons">
                                    Lesson Dashboard
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                        {/* <Form className="d-flex">
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
                        </Form> */}
                    </Nav>
                    <div>&nbsp;</div>
                </Navbar.Collapse>
                <div>&nbsp;</div>

            </Container>
        </Navbar>
    );
}

export default NavbarHome;