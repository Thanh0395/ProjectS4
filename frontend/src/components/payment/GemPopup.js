import React from 'react';
import Checkout from './Checkout';
import './gempopup.css';

function GemPopup({ onClose }) {
    return (
        <div className="gem-popup">
            <p>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <br></br>
            </p>
            <Checkout />
        </div>
    );
}

export default GemPopup;