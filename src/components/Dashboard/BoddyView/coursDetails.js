import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data);
        checkEnrollment();
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/enrollments/check/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsEnrolled(response.data.is_enrolled);
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        "http://localhost:8000/api/courses/enrollments/",
        { course_id: courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">{course.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <img style={{ height: 250, width: 200 }} src={course.course_image} alt={course.title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <h2>Description</h2>
                  <p>{course.description}</p>
                  <h2>Duration</h2>
                  <p>{course.duration}</p>
                  {isEnrolled ? (
                    <>
                    <button className="btn btn-success">Take Course</button>
                    <button className="btn btn-primary"><a href="#" style={{color:'white'}}>View Timetable</a> </button>
                    </>
                    
                  ) : (
                    <button className="btn btn-primary" onClick={handleEnroll}>Enroll Now</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
