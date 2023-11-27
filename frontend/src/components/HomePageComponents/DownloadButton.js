import React from 'react';

const DownloadButton = ({ groupType, buttonType }) => {
    return (
        <div className={`download-button-group ${groupType}`}>
            <a href="#!" className={`download-button download-button-google ${buttonType}`}>
                <div className="download-button-inner">
                    <div className="download-button-icon c-purple">
                        <i className="fab fa-google-play"></i>
                    </div>
                    <div className="download-button-content">
                        <h5 className="c-grey upper ls-1">get it on</h5>
                        <h3 className="c-dark ls-2">Google Play</h3>
                    </div>
                </div>
            </a>
            <a href="#!" className={`download-button download-button-apple ${buttonType}`}>
                <div className="download-button-inner">
                    <div className="download-button-icon c-pink">
                        <i className="fab fa-apple"></i>
                    </div>
                    <div className="download-button-content">
                        <h5 className="c-grey upper ls-1">get it on</h5>
                        <h3 className="c-dark ls-2">Apple Store</h3>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default DownloadButton;
