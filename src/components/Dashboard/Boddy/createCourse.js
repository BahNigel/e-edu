/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import CreateCourse from "../BoddyView/createCourse";

function CreatecoursePage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <CreateCourse/>
      <DasboardFooter/>
    </>
  );
}

export default CreatecoursePage;
