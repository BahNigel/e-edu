/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CourseMaterialForm from "../BoddyView/createCourseM";

function CreateCourseMatiria() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CourseMaterialForm/>
      <DasboardFooter/>
    </>
  );
}

export default CreateCourseMatiria;
