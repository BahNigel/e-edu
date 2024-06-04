/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import DashboardNaveBarIndex from "../../Navbars";
import TimetableForm from "../BoddyView/courseTimetable";

function TimetableFormPage() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <TimetableForm/>
      <DasboardFooter/>
    </>
  );
}

export default TimetableFormPage;
