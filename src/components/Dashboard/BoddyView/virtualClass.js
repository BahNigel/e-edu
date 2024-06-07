import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseVirtualClass = () => {
  const { courseId, virtualClassId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [course1, setCourse1] = useState(null);
  const [course2, setCourse2] = useState(null);
  const [course3, setCourse3] = useState(null);
  const [virtualClasses, setVirtualClasses] = useState([]);
  const [formData, setFormData] = useState({
    link: '',
    m_link: '',
  });
  const [selectedClassId, setSelectedClassId] = useState(null);


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


        // Fetch user data using the token
        const response = await axios.get("http://localhost:8000/api/user/", config);
        setUserData(response.data.profile.user_type);
        setCourse1(response.data.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchVirtualClasses();

    if (virtualClassId) {
      fetchVirtualClass(virtualClassId);
    }

    fetchCourse()
  }, [courseId, virtualClassId]);

  const fetchVirtualClasses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://localhost:8000/api/courses/virtual-class/?course=${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVirtualClasses(response.data);
    } catch (error) {
      console.error('Error fetching virtual classes:', error);
    }
  };

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Nigel Bah", response.data)
      setCourse(response.data);
      
      setCourse2(response.data.user.type);
      setCourse3(response.data.creator);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
    }
  };

  const fetchVirtualClass = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(`http://localhost:8000/api/courses/virtual-class/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const virtualClass = response.data;
      console.log("Nigel", virtualClass)
      setFormData({
        link: virtualClass.link,
        m_link: virtualClass.m_link,
      });
      setSelectedClassId(virtualClass.id);
    } catch (error) {
      console.error('Error fetching virtual class:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      if (selectedClassId) {
        await axios.patch(`http://localhost:8000/api/courses/virtual-class/${selectedClassId}/`, { ...formData, course_id: courseId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/courses/virtual-class/', { ...formData, course_id: courseId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setFormData({ link: '', m_link: '' });
      setSelectedClassId(null);
      navigate(`/courses/${courseId}/virtual-classes`);
      fetchVirtualClasses();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (virtualClass) => {
    navigate(`/courses/${courseId}/virtual-classes/${virtualClass.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:8000/api/courses/virtual-class/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVirtualClasses();
    } catch (error) {
      console.error('Error deleting virtual class:', error);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Courses</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 30 }} className="container">
        <h1>Course Virtual Classes</h1>
        {!course3? (<></>):(<>
            <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="link">Google Meet Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="m_link">WhatsApp Group Link</label>
            <input
              type="text"
              className="form-control"
              id="m_link"
              name="m_link"
              value={formData.m_link}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {selectedClassId ? 'Update Virtual Class' : 'Create Virtual Class'}
          </button>
          {selectedClassId && (
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setFormData({ link: '', m_link: '' });
                setSelectedClassId(null);
                navigate(`/courses/${courseId}/virtual-classes`);
              }}
            >
              Cancel
            </button>
          )}
        </form>
        
        </>)}
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Google Meet Link</th>
              <th>WhatsApp Group Link</th>
              {!course3? (<></>):(<>
              <th>Actions</th>
              </>)}
            </tr>
          </thead>
          {console.log('the test place',userData)}
          {userData == "student"? (<>
          
            <tbody>
            {virtualClasses.map((virtualClass) => (
              <tr key={virtualClass.id}>
                <td>{virtualClass.id}</td>
                <td><a href={virtualClass.link} className='btn btn-primary'>Jion Online Class</a></td>
                <td><a href={virtualClass.m_link} className='btn btn-primary'>Jion Class Group</a></td>
              </tr>
            ))}
          </tbody>
          </>):(<>
            <tbody>
            {virtualClasses.map((virtualClass) => (
              <tr key={virtualClass.id}>
                <td>{virtualClass.id}</td>
                <td>{virtualClass.link}</td>
                <td>{virtualClass.m_link}</td>
                <td>
                  <button className="btn btn-info mr-2" onClick={() => handleEdit(virtualClass)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(virtualClass.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </>)}
          
        </table>
      </div>
    </div>
  );
};

export default CourseVirtualClass;
