import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './breadcrumEx.css'

function BreadcrumbEx(props) {
    const location = useLocation();
    let currentLink = "";
    const crumbs = location.pathname.split("/")
        .filter(crumb => crumb !== "")
        .map(crumb => {
            currentLink += `/${crumb}`;
            const upperCase = crumb.charAt(0).toUpperCase() + crumb.slice(1);
            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{upperCase}</Link>
                </div>
            )
        })

    return (
        // <div className="breadcrumbs"><Link className="crumb" to="/">Home</Link>{crumbs}</div>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="medium" />}
                aria-label="breadcrumb"
            >
                {crumbs}
            </Breadcrumbs>
        
    );
}

export default BreadcrumbEx;