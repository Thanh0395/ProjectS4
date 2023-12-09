import React, { useState } from 'react';
import './header.css';
import UserProfileDropdown from '../../components/UserProfileDropdown';
import { logoutUser } from '../../services/api/userAPI';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg';

function Header(props) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')));
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/');
            setCurrentUser(null);
        } catch (error) {
            navigate('/');
        }
    };
    return (
        <div className="navbar">

            <div className="logo">
                <Link to="" >
                    <img style={{borderRadius:'50%', width:'60px'}} src={logo} className="App-logo" alt="logo" />
                </Link>
            </div>
            <div className="icons">
                <div className="user">
                    <UserProfileDropdown currentUser={currentUser} onLogout={handleLogout} className="mr-30" />
                </div>
                <span>{currentUser.name}</span>
                {/* <div className="notification">
                    <img src="/notifications.svg" alt="" />
                    <span>1</span>
                </div> */}
            </div>
        </div>
    );
}

export default Header;