/*eslint-disable*/
import React from "react";
import IndexHeader from "../Headers/IndexHeader";
import LandingPage from "../boddyView/landing";
import DefaultFooter from "../Footers/Footer";
import AboutView from "../boddyView/about_view";
import ContactView from "../boddyView/conatact_view";

function ContactPage() {
  return (
    <>
      <IndexHeader />
      <ContactView />
      <DefaultFooter/>
    </>
  );
}

export default ContactPage;
