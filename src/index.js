import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IndexPage from './components/Boddy/Index';
import AboutPage from './components/Boddy/about';
import CoursePage from './components/Boddy/courses';
import ContactPage from './components/Boddy/contact';
import DashboardIndex from './components/Dashboard/Boddy/Index';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Logout from './components/Auth/logout';
import CoursesPage from './components/Dashboard/Boddy/courses';
import CreatecoursePage from './components/Dashboard/Boddy/createCourse';
import CoursesDetailsPage from './components/Dashboard/Boddy/courseDetails';
import TimetableFormPage from './components/Dashboard/Boddy/courseTimtable';
import CreateCourseMatiria from './components/Dashboard/Boddy/createCourseM';
import CoursesTimtableViewPage from './components/Dashboard/Boddy/viewCT';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<IndexPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/course" element={<CoursePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/dashboard" element={<DashboardIndex />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/create-course" element={<CreatecoursePage />} />
      <Route path="/course/:courseId" element={<CoursesDetailsPage />} />
      <Route path="/create-timetable/:courseId" element={<TimetableFormPage />} />
      <Route path="/course-materia/create/:courseId" element={<CreateCourseMatiria/>} />
      <Route path="/course/:courseId/timetable" element={<CoursesTimtableViewPage/>} />
      <Route path="/course-materia/:courseId/update/:materialsId" element={<CreateCourseMatiria />} />
      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
