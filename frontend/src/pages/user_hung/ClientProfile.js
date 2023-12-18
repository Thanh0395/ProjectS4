import React from "react";
import { useLocation } from "react-router-dom";
import CourseBannerSessionProfile from "./banner-session/CourseBannerSessionProfile";
import CourseSessionProfile from "./course-session/CourseProfile";
import { useEffect, useState } from "react";
import { ProfileDataByUserId } from "../../services/api/AuthApi";
import { Row } from "reactstrap";
import { Colxx } from "./Custom/CustomBoostrap";
import UserProfile from "./Component/UserProfile";
import BlogAchievementProfile from "./Component/BlogAchievementProfile";
import CourseHeader from "./course-session/CourseHeaderProfile";
import ComplexButton from "./Component/ComplexButton";
import MovingButton from "./Component/MovingButton";

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
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
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
          <ComplexButton />
          <Row>
            <UserProfile user={user} gem={gem} userLevel={userLevel}
              setReRender={setReRender}
              recentTop5Posts={recentTop5Posts}
              top5PostsByFeedbackCount={top5PostsByFeedbackCount}
              top5PostsByPrize={top5PostsByPrize}
            />
          </Row>
          {achievements.length !== 0 ? (
            <Row>
              <Colxx xxs="12">
                <CourseHeader header={"Your Achievements"} />
                <BlogAchievementProfile achievements={achievements} />
              </Colxx>
            </Row>
          ) : (
            <>
              <br />
            </>

          )}
          {posts.length !== 0 ? (
            <Row>
              <CourseSessionProfile posts={posts} />
            </Row>
          ) : <MovingButton />}
        </>
      )}
    </>
  );

}

export default ClientProfile;
