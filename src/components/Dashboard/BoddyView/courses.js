import React, { useState, useEffect } from "react";
import axios from "axios";

function CourseView() {
  const [courses, setCourses] = useState([]);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("Access token not found");
          return;
        }

        // Include the token in the request headers
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        console.log(courses)

        // Fetch user data using the token
        const response = await axios.get("http://localhost:8000/api/user/", config);
        setUserData(response.data.profile.user_type);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/api/courses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("test",response.data)
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/courses/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course.id !== id));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">All courses</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">courses</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            {userData != "teacher"?(<>
            
            </>):(<>
              <button className="btn btn-primary">
              <a style={{color:'white'}} href="/create-course">Create course</a>
            </button>
            </>)}
            
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td><img src={course.course_image} style={{height: 60, width:60}}/></td>
                    <td>{course.description}</td>
                    <td>{course.duration}</td>
                    <td>
                    {userData != "teacher"?(<></>):(<>
                    <button className="btn btn-danger mr-2" onClick={() => handleDelete(course.id)}>
                        Delete
                      </button>
                    </>)}
                      
                      <a href={`/course/${course.id}`} className="btn btn-primary">
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
