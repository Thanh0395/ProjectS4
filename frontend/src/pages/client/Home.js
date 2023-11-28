import React from "react";
import Banner from "./components/homepage/banner";
import "../../constants/importedCss";
import About from "./components/homepage/about";
import Brands from "./components/homepage/brands";
import Feature from "./components/homepage/feature";
import CourseSection from "./components/homepage/course";

function Home(props) {
  return (
    <>
      <Banner />
      <About />
      <Brands section_padding_bottom={"section-padding-bottom"} />
      <Feature/>
      <CourseSection/>
    </>
  );
}

export default Home;
