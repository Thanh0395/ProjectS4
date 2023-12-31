import "./App.css";
import env from "./environment.json";
import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/client/ClientLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import { UserProvider } from './components/context/UserContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  Login, Register, NotFound, Unauthorized,
  Dashboard, LessonAdmin, ExamAdmin, UserAdmin, CategoryAdmin, TagAdmin, RewardAdmin, AchievementAdmin, CategoryAdminCreate, CategoryAdminUpdate,
  LessonAdminCreate, LessonAdminDetail, LessonAdminUpdate, CommentAdmin,
  ClientContact, ClientProducts, ClientDetailProduct, Home, Planning, ClientCourse, ClientCourseDetail
} from "./pages"
import { useEffect, useState } from "react";
import { FaAngleUp } from 'react-icons/fa6';
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ClientProfile from "./pages/user_hung/ClientProfile";
import UserAdminDetail from "./pages/admin/UserAdmin/UserAdminDetail";
import UserAdminCreate from "./pages/admin/UserAdmin/UserAdminCreate";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./services/authority/ProtectedRoute";

function App() {
  //Fix loi resize khi co form
  // useEffect(() => {
  //   window.addEventListener('error', e => {
  //     if (e.message === 'ResizeObserver loop limit exceeded') {
  //       const resizeObserverErrDiv = document.getElementById(
  //         'webpack-dev-server-client-overlay-div'
  //       );
  //       const resizeObserverErr = document.getElementById(
  //         'webpack-dev-server-client-overlay'
  //       );
  //       if (resizeObserverErr) {
  //         resizeObserverErr.setAttribute('style', 'display: none');
  //       }
  //       if (resizeObserverErrDiv) {
  //         resizeObserverErrDiv.setAttribute('style', 'display: none');
  //       }
  //     }
  //   });
  // }, []);
  // Scroll TOP button, The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  // This function will scroll the window to the top 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };
  // End Scroll TOP button
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": env.REACT_APP_PAYPAL_CLIENT_ID }}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<ClientLayout>   <HomePage />  </ClientLayout>}>
              <Route exact path="" element={<Home />} />
              <Route path="contact" element={<ClientContact />} />
              <Route path="planning" element={<Planning />} />
              <Route path="products/" >
                <Route exact path="" >
                  <Route path="" element={<ClientCourse />}></Route>
                  <Route path="category/:category" element={<ClientProducts />}></Route>
                </Route>
                <Route path="detail/:id" element={<ClientCourseDetail />} />
              </Route>
              <Route path="/profile" element={<ClientProfile />} />
            </Route>

            <Route path="/admin/" element={<AdminLayout>  <AdminPage />  </AdminLayout>}>
              <Route exact path="" element={<Dashboard />} />
              <Route path="lessons/" >
                <Route path="" element={<LessonAdmin />} />
                <Route path="detail/:id" element={<LessonAdminDetail />} />
                <Route path="create" element={<LessonAdminCreate />} />
                <Route path="update/:id" element={<LessonAdminUpdate />} />
              </Route>

              <Route path="exams" element={<ExamAdmin />} />
              <Route path="categories/">
                <Route path="" element={<CategoryAdmin />} />
                <Route path="create" element={<CategoryAdminCreate />} />
                <Route path="update/:id" element={<CategoryAdminUpdate />} />
              </Route>

              <Route path="users/">
                <Route index element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UserAdmin />
                  </ProtectedRoute>
                } />
                <Route path="detail/:userId" element={<UserAdminDetail />} />
                <Route path="create" element={<UserAdminCreate />} />
                <Route path="update/:id" element={<LessonAdminUpdate />} />
              </Route>

              <Route path="comments" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CommentAdmin />
                </ProtectedRoute>
              } />
              <Route path="tags" element={<TagAdmin />} />
              <Route path="rewards" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <RewardAdmin />
                </ProtectedRoute>
              } />
              <Route path="achievements" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AchievementAdmin />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Hung add route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Scroll TOP button */}
          {showButton && (
            <button style={{ paddingLeft: '14px' }} onClick={scrollToTop} className="back-to-top">
              <FaAngleUp></FaAngleUp>
            </button>
          )}
        </UserProvider>
      </PayPalScriptProvider>
    </>
  );
}

export default App;
