import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CourseMaterialForm() {
  const { courseId } = useParams();
  const { materialsId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState({
    title: "",
    description: "",
    file: null,
    type: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/materials/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('materia', materialsId)
        setMaterials(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching materials");
        setLoading(false);
      }
      if(materialsId){
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(`http://localhost:8000/api/courses/materials/${materialsId}/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log('materia', materialsId)
            console.log('materia', response.data)
            setMaterial(response.data);
            setLoading(false);
          } catch (error) {
            setError("Error fetching materials");
            setLoading(false);
          }
      }
    };

    fetchMaterials();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setMaterial({
      ...material,
      [name]: files ? files[0] : value,
    });
  };

  const Delete = async (e) => {
    e.preventDefault();
    try {

      const token = localStorage.getItem("access_token");
      const value  = e.target.id

        await axios.delete(`http://localhost:8000/api/courses/materials/${value}/`, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        });
      



      // Fetch materials again after adding a new one
      const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/materials/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaterials(response.data);
      setMaterial({ title: "", description: "", file: null, type: "" });
    } catch (error) {
      setError("Error occurred while creating material");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", material.title);
      formData.append("description", material.description);
      formData.append("file", material.file);
      formData.append("type", material.type);
      formData.append("course_id", courseId);

      const token = localStorage.getItem("access_token");

      if(!materialsId){
            await axios.post(`http://localhost:8000/api/courses/${courseId}/materials/`, formData, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                },
            });
        }else{

            await axios.put(`http://localhost:8000/api/courses/materials/${materialsId}/`, formData, {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
                },
            });

        }
      



      // Fetch materials again after adding a new one
      const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/materials/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMaterials(response.data);
      setMaterial({ title: "", description: "", file: null, type: "" });
    } catch (error) {
      setError("Error occurred while creating material");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Create Course Material</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={material.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="description" rows="3" value={material.description} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">File</label>
              <input type="file" className="form-control" id="file" name="file" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select className="form-select" id="type" name="type" value={material.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="video">Video</option>
                <option value="file">File</option>
                <option value="audio">Audio</option>
                <option value="image">Image</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
          <h2 className="mt-4">Course Materials</h2>
          {materials.length === 0 ? (
            <p>No materials available.</p>
          ) : (
            <ul className="list-group">
              {materials.map((mat) => (
                <li key={mat.id} className="list-group-item">
                  <h5>{mat.title}</h5>
                  <p>{mat.description}</p>
                  <p>Type: {mat.type}</p>
                  {/* Add more details as needed */}
                  <a href={`/course-materia/${courseId}/update/${mat.id}`} className="btn btn-primary">Edit</a>
                  <a onClick={Delete} id={mat.id} className="btn btn-danger">delete</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseMaterialForm;
