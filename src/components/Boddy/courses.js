/*eslint-disable*/
import React from "react";
import IndexHeader from "../Headers/IndexHeader";
import DefaultFooter from "../Footers/Footer";
import CourseView from "../boddyView/courses_view";

function CoursePage() {
  return (
    <>
      <IndexHeader />
      <CourseView />
      <DefaultFooter/>
    </>
  );
}

export default CoursePage;
