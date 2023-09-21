import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../logo.svg';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Navbar, NavDropdown, Form, Button, Nav, Container } from 'react-bootstrap'
import './navbarHome.css';

function NavbarHome(props) {
    return (
        <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary sticky-top p-0">
            <Container fluid>
                {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
                <Link to="" >
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <Nav.Link as={Link} to={"login"}>Login</Nav.Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className='border'/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="justify-content-center flex-grow-1 pe-3"
                    >
                        <Nav.Link as={NavLink} to={"/"} >Home</Nav.Link>
                        <Nav.Link as={NavLink} to={"contact"}>Contact</Nav.Link>
                        <Nav.Link as={NavLink} to={"products"}>Product</Nav.Link>
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
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline"><FaMagnifyingGlass /></Button>
                    </Form>
                    <div>&nbsp;</div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarHome;