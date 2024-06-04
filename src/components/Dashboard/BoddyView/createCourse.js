import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function CreateCourse() {
  const [formData, setFormData] = useState({ title: "", description: "", durationMonths: "", courseImage: null });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const formDataWithImage = new FormData();
      formDataWithImage.append('title', formData.title);
      formDataWithImage.append('description', formData.description);
      formDataWithImage.append('duration', formData.durationMonths);
      formDataWithImage.append('course_image', formData.courseImage);
      await axios.post("http://localhost:8000/api/courses/", formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Course created successfully!");
      navigate("/courses"); // Redirect to the /courses page
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'courseImage') {
      setFormData({ ...formData, courseImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Create Course</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Create Course</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" id="description" name="description" rows="3" placeholder="Enter description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="durationMonths">Duration (Months)</label>
                  <input type="number" className="form-control" id="durationMonths" name="durationMonths" placeholder="Enter duration in months" value={formData.durationMonths} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="courseImage">Course Image</label>
                  <input type="file" className="form-control-file" id="courseImage" name="courseImage" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
