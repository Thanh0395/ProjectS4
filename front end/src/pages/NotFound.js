import React from 'react';
import img from '../Not_found.jpg';

function NotFound(props) {
    return (
        <>
            <img alt="not-found" src= {img} style={{ width: '100%', height: 'auto' }}></img>
        </>
    );
}

export default NotFound;