/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CoursView from "../BoddyView/courses";

function CoursesPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CoursView/>
      <DasboardFooter/>
    </>
  );
}

export default CoursesPage;
