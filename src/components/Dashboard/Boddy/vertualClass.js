/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CourseVirtualClass from "../BoddyView/virtualClass";

function CoursesVirtualClassPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CourseVirtualClass/>
      <DasboardFooter/>
    </>
  );
}

export default CoursesVirtualClassPage;
