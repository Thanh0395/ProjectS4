
import { useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import CourseBannerSessionProfile from "./banner-session/banner";
import CourseBannerSession from "./banner-session/banner";
import CourseSessionProfile from "./course-session/course";
import CourseSession from "./course-session/course";


function ClientProfile(props) {
    const location = useLocation();
    const userId = location.state && location.state.userId;
    console.log("USerIDDDD :", userId);
    return (
      <div> 
           <CourseBannerSessionProfile/>
           <ProfileCard userId={userId}/>
           <CourseSessionProfile/>
      </div>
    );
  }
  export default ClientProfile;