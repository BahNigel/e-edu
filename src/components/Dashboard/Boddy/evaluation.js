/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CourseEvaluations from "../BoddyView/evaluation";

function CourseEvaluationsPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CourseEvaluations/>
      <DasboardFooter/>
    </>
  );
}

export default CourseEvaluationsPage;
