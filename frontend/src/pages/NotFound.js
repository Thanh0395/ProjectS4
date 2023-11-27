import React from 'react';
import img from '../Not_found.jpg';
import { Link } from 'react-router-dom';

function NotFound(props) {
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
                top: '-180px', 
                left: '250px', 
            }}>
                <h1>Unknown Page</h1>
                <p>Return <Link to="/">home page</Link>.</p>
            </div>
        </div>
    );
}

export default NotFound;