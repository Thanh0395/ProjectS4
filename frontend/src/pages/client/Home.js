import React from 'react';
import Banner from './components/homepage/banner';
import Brands from './components/homepage/brands';
import Feature from './components/homepage/feature';
import CourseSection from './components/homepage/course';

function Home(props) {
    return (
        <div>
            <Banner/>
            <Brands/>
            <Feature/>
            <CourseSection/>

            
        </div>
    );
}

export default Home;