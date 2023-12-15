import React from "react";
import { useLocation } from "react-router-dom";
import CourseBannerSessionProfile from "./banner-session/banner";
import CourseSessionProfile from "./course-session/course";
import { useEffect, useState } from "react";
import { ProfileDataByUserId } from "../../services/api/AuthApi";
import { Row } from "reactstrap";
import { Colxx } from "./Custom/CustomBoostrap";
import UserProfile from "./Component/UserProfile";
import BlogAchievementProfile from "./Component/BlogAchievementProfile";

function ClientProfile(props) {

  const location = useLocation();
  const userId = location.state && location.state.userId;
  const [user, setUser] = useState({});
  const [gem, setGem] = useState({});
  const [userLevel, setUserLevel] = useState({});
  const [posts, setPosts] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [recentTop5Posts, setRecentTop5Posts] = useState([]);
  const [top5PostsByFeedbackCount, setTop5PostsByFeedbackCount] = useState([]);
  const [top5PostsByPrize, setTop5PostsByPrize] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    ProfileDataByUserId(userId)
      .then(rs => {
        setUser(rs.user);
        setGem(rs.gem);
        setUserLevel(rs.userLevel);
        setPosts(rs.posts);
        setAchievements(rs.achievements);
        setRecentTop5Posts(rs.recentTop5Posts);
        setTop5PostsByFeedbackCount(rs.top5PostsByFeedbackCount);
        setTop5PostsByPrize(rs.top5PostsByPrize);
        setReRender(false);
        console.log("response data profile :", rs);
      })
      .catch(err => console.log("Err fetch api profile data:", err));
  }, [userId, reRender]);

  return (
    <>
      {user && (
        <>
          <Row>
            <Colxx xs="12">
              <CourseBannerSessionProfile />
            </Colxx>
          </Row>
          <Row>
            <UserProfile user={user} gem={gem} userLevel={userLevel} 
              setReRender={setReRender} 
              recentTop5Posts={recentTop5Posts}
              top5PostsByFeedbackCount={top5PostsByFeedbackCount} 
              top5PostsByPrize={top5PostsByPrize}
            />
          </Row>
          <Row>
            <Colxx xxs="12">
              <h5 className="mb-4">Your Achievements</h5>
              <BlogAchievementProfile achievements={achievements} />
            </Colxx>
            {/* <AchievementProfile achievements={achievements} /> */}
          </Row>
          <Row>
            <CourseSessionProfile posts={posts} />
          </Row>
        </>
      )}
    </>
  );

}

export default ClientProfile;
