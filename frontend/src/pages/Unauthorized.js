import React from 'react';
import img from '../Unauthorized.jpg';
import { Link } from 'react-router-dom';

function Unauthorized(props) {
    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '100vh', // Adjust the height as needed
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                padding: '6px',
                borderRadius: '8px',
                position: 'relative',
                top: '-100px',
            }}>
                <h1>Unauthorized Access</h1>
                <p>Please <Link to="/login">login</Link> to access this page or go back to the <Link to="/">home page</Link>.</p>
                <p>Or if your are a teacher <Link to="/admin/lessons">Dashboard lesson</Link>.</p>
            </div>
        </div>
    );
}

export default Unauthorized;