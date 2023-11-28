
import CourseBannerSession from "./banner-session/banner";
import CourseSession from "./course-session/course";

function ClientCourse(props) {
    return (
      <div>
           <CourseBannerSession/>
           <CourseSession/>
      </div>
    );
  }
  export default ClientCourse;