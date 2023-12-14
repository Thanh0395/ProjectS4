import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown, Image } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import env from '../environment.json'
import { Col, Row } from 'reactstrap';
import { useEffect } from 'react';
import { fetchGameData } from '../services/api/userAPI';

const UserProfileDropdown = ({ currentUser, onLogout }) => {
  // const gameData = JSON.parse(localStorage.getItem('userGameData'));
  const [gameData, setGameData] = useState();
  const urlMedia = env.urls.media;
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    navigate('/profile', {
      state: { userId: currentUser.userId } // Pass the state object here
    });
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const fetchData = async () => {
      try {
        const response = await fetchGameData(userData.userId);
        setGameData(response);
      } catch (error) {
        console.error('Error fetching game data:', error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <NavDropdown className='user-nav-dropdown-container'
      title={<span>
        Hi, {currentUser.name}
        <Row>
          <Col>
            <Image src={urlMedia + currentUser.avatar}
              roundedCircle width="30" height="30" />
          </Col>
          <Col>
            <FaAngleDown className="dropdown-icon" />
          </Col>
        </Row>
      </span>
      }
      id="basic-nav-dropdown"
    >
      <NavDropdown.Item>
        Hi, {currentUser.name}
      </NavDropdown.Item>
      <NavDropdown.Item>
        Lv: {gameData ? gameData.level : 0} <i className="bi bi-gem px-2 text-primary"></i> {gameData ? gameData.gem : 0}
      </NavDropdown.Item>
      <NavDropdown.Item onClick={handleNavigateToProfile} >
        <FaUser />  Profile
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={onLogout}>
        <FaSignOutAlt color='#DB4437' className="me-2" />
        Logout
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserProfileDropdown;
