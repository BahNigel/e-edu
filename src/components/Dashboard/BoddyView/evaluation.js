import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CourseEvaluations = () => {
  const { courseId, evaluationId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [course1, setCourse1] = useState(null);
  const [course2, setCourse2] = useState(null);
  const [course3, setCourse3] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    student: '',
    marks: '',
    feedback: '',
  });
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
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
    fetchEvaluations();

    if (evaluationId) {
      fetchEvaluation(evaluationId);
    }

    fetchCourse()

    fetchEnrolledStudents();
  }, [courseId, evaluationId]);

  const fetchEvaluations = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:8000/api/courses/evaluations/?course=${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
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

  const fetchEvaluation = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:8000/api/courses/evaluations/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const evaluation = response.data;
      setFormData({
        type: evaluation.type,
        student: evaluation.student,
        marks: evaluation.marks,
        feedback: evaluation.feedback,
      });
      setSelectedEvaluationId(evaluation.id);
    } catch (error) {
      console.error('Error fetching evaluation:', error);
    }
  };

  const fetchEnrolledStudents = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:8000/api/courses/enrollments/my-courses/?course=${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEnrolledStudents(response.data);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (selectedEvaluationId) {
        await axios.patch(`http://localhost:8000/api/courses/evaluations/${selectedEvaluationId}/`, { ...formData, course_id: courseId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/courses/evaluations/', { ...formData, course_id: courseId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setFormData({ type: '', student: '', marks: '', feedback: '' });
      setSelectedEvaluationId(null);
      navigate(`/courses/${courseId}/evaluation-classes`);
      fetchEvaluations();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (evaluation) => {
    navigate(`/courses/${courseId}/evaluation-classes/${evaluation.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/api/courses/evaluations/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEvaluations();
    } catch (error) {
      console.error('Error deleting evaluation:', error);
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
                <li className="breadcrumb-item active">Evaluations</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: 30 }} className="container">
        <h1>Course Evaluations</h1>
        {console.log("the land", course3)}
        {!course3? (<></>):(<>

            <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              className="form-control"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="CC">CC</option>
              <option value="TPE">TPE</option>
              <option value="TP">TP</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="student">Student</label>
            <select
              className="form-control"
              id="student"
              name="student"
              value={formData.student}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Student</option>
              {enrolledStudents.map((student) => (
                <option key={student.id} value={student.id}>{student.username}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="marks">Marks</label>
            <input
              type="text"
              className="form-control"
              id="marks"
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              className="form-control"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {selectedEvaluationId ? 'Update Evaluation' : 'Create Evaluation'}
          </button>
          {selectedEvaluationId && (
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={() => {
                setFormData({ type: '', student: '', marks: '', feedback: '' });
                setSelectedEvaluationId(null);
                navigate(`/courses/${courseId}/evaluation-classes`);
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
              <th>Type</th>
              <th>Student</th>
              <th>Marks</th>
              <th>Feedback</th>
              {!course3? (<></>):(<>
              <th>Actions</th>
              </>)}
              
            </tr>
          </thead>
          {console.log("in thie land", userData)}
          {userData == "student"? (<>
          
          <tbody>
              
              {evaluations.map((evaluation) => (
                  
                  course1 === evaluation.student ? (
                  <tr key={evaluation.id}>
                      <td>{evaluation.id}</td>
                      <td>{evaluation.type}</td>
                      <td>{evaluation.student}</td>
                      <td>{evaluation.marks}</td>
                      <td>{evaluation.feedback}</td>
                  </tr>
                  ) : null
              ))}
              </tbody>

        
        </>): (<>
        
          <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation.id}>
              <td>{evaluation.id}</td>
              <td>{evaluation.type}</td>
              <td>{evaluation.student}</td>
              <td>{evaluation.marks}</td>
              <td>{evaluation.feedback}</td>
              <td>
                  
                <button className="btn btn-info mr-2" onClick={() => handleEdit(evaluation)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(evaluation.id)}>
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

export default CourseEvaluations;
