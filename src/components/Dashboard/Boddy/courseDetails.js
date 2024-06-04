/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CoursView from "../BoddyView/courses";
import CourseDetails from "../BoddyView/coursDetails";

function CoursesDetailsPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CourseDetails/>
      <DasboardFooter/>
    </>
  );
}

export default CoursesDetailsPage;
