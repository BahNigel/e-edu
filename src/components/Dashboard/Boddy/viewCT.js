/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CourseTimetableView from "../BoddyView/viewCT";

function CoursesTimtableViewPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CourseTimetableView/>
      <DasboardFooter/>
    </>
  );
}

export default CoursesTimtableViewPage;
