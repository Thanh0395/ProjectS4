import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Image } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserProfileDropdown = ({ currentUser, onLogout }) => {
  return (
    <NavDropdown title={<Image src={currentUser.avatar} roundedCircle width="30" height="30" />} id="basic-nav-dropdown">
      <NavDropdown.Item>
        Hi, {currentUser.name}
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={onLogout}>
        <FaSignOutAlt className="me-2" />
        Logout
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserProfileDropdown;
