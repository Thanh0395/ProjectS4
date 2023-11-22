import React from 'react';
import './banner.css'
import banner from '../../../../../assets/course-banner.png'
const CourseBannerSession = () => {
    return (
        <div className="course-banner">
          <img className='course-banner_img' src={banner} alt='banner'/>
      </div>
    );
}

export default CourseBannerSession;
