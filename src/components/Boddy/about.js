/*eslint-disable*/
import React from "react";
import IndexHeader from "../Headers/IndexHeader";
import LandingPage from "../boddyView/landing";
import DefaultFooter from "../Footers/Footer";
import AboutView from "../boddyView/about_view";

function AboutPage() {
  return (
    <>
      <IndexHeader />
      <AboutView />
      <DefaultFooter/>
    </>
  );
}

export default AboutPage;
