import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BreadcrumbEx(props) {
    const location = useLocation();
    let currentLink = "";
    const crumbs = location.pathname.split("/")
        .filter(crumb => crumb !== "")
        .map(crumb => {
            currentLink += `/${crumb}`;
            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{crumb}</Link>
                </div>
            )
        })

    return (
        <div className="breadcrumbs"><Link className="crumb" to="/">Home</Link>{crumbs}</div>
      );
}

export default BreadcrumbEx;