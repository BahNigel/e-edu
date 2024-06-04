/*eslint-disable*/
import React from "react";
import DashboardHeader from "../../Headers/DasbardHeader";
import DasboardFooter from "../../Footers/DashboardFooter";
import AboutView from "../../boddyView/about_view";
import DashboardNaveBarIndex from "../../Navbars";
import DashboardView from "../BoddyView/Index";

function DashboardIndex() {
  return (
    <>
      <DashboardHeader />
      <DashboardNaveBarIndex/>
      <DashboardView/>
      <DasboardFooter/>
    </>
  );
}

export default DashboardIndex;
