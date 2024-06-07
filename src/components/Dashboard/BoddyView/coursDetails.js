import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");
  const [fileType, setfileType] =  useState([]);


  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/materials/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setfileType(['video','file','audio','image'])
        setMaterials(response.data);
      } catch (error) {
        setError("Error fetching materials");
      }
     
    };

    fetchMaterials();
  }, [courseId]);


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.creator)
        setIsCreator(response.data.creator)
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
                    <button className="btn btn-success" style={{marginLeft:10}}>Take Course</button>
                    <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/course/${courseId}/timetable`} style={{color:'white'}}>View Timetable</a> </button>
                    <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/courses/${courseId}/evaluation-classes`} style={{color:'white'}}>View Evaluation</a> </button>
                    <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/courses/${courseId}/virtual-classes`} style={{color:'white'}}>View Virtual Class</a> </button>
                    </>
                    
                  ) : (
                    <button className="btn btn-primary" onClick={handleEnroll} style={{marginLeft:10}}>Enroll Now</button>
                  )}

                  {isCreator ? 
                  (<>
                  <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/create-timetable/${courseId}`} style={{color:'white'}}>Add Course Timetable</a> </button>
                  <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/course-materia/create/${courseId}`} style={{color:'white'}}>Add Course Materials</a> </button>
                  <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/courses/${courseId}/evaluation-classes`} style={{color:'white'}}>View Evaluation</a> </button>
                  <button className="btn btn-primary" style={{marginLeft:10}}><a href={`/courses/${courseId}/virtual-classes`} style={{color:'white'}}>View Virtual Class</a> </button>
                  </>): null}
                </div>
              </div>
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
                  <h1>Course materials</h1>
                {materials.length === 0 ? (
                    <p>No materials available.</p>
                  ) : (
                    <ul className="list-group">
                      {materials.map((mat) => (
                        <li key={mat.id} className="list-group-item">
                          <h5>{mat.title}</h5>
                          <p>{mat.description}</p>
                          <p>Type: {mat.type}</p>
                          <p>{fileType.includes(mat.type) ? (
                            <>
                              <a href={`${mat.file}`} className="btn btn-primary">Click to view</a>
                            </>
                          ) : null}</p>
                          {/* Add more details as needed */}
                          
                          <a href={`/course-materia/${courseId}/update/${mat.id}`} className="btn btn-primary">Edit</a>
                         
                        </li>
                      ))}
                    </ul>
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
