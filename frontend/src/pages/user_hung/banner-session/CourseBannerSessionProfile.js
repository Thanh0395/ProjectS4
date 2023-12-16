import React from 'react';
import './BannerProfile.css'
import banner from '../../../assets/course-banner.jpg'
const CourseBannerSessionProfile = () => {
  return (
    <div className="course-banner">
      <img className='course-banner_img' src={banner} alt='banner' />
    </div>
  );
}

export default CourseBannerSessionProfile;
