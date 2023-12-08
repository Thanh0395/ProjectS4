import React from 'react';
import Bundles from './Bundles';
import './gempopup.css';

function GemPopup({ onClose }) {
    return (
        <div className="gem-popup">
            {/* <p>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
            </p> */}
            <Bundles className='gem-container' onClose = {onClose} />
        </div>
    );
}

export default GemPopup;