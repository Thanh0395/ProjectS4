import React from "react";
import { Outlet } from "react-router-dom";
import BreadcrumbEx from "../components/breadcrumb/BreadcrumbEx";
function AdminPage() {
  return (
    <>
      <BreadcrumbEx></BreadcrumbEx>
      <Outlet />
    </>
  );
}

export default AdminPage;
