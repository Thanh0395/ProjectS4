import React from 'react';
import Bundles from './Bundles';
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
            <Bundles onClose = {onClose} />
        </div>
    );
}

export default GemPopup;