import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TimetableForm() {
  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  const [formData, setFormData] = useState({
    weekNumber: "",
    course: "",
    monday: { start: "", end: "" },
    tuesday: { start: "", end: "" },
    wednesday: { start: "", end: "" },
    thursday: { start: "", end: "" },
    friday: { start: "", end: "" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" }
  });

  useEffect(() => {
    // Fetch course details based on courseId from URL
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data);
        console.log("course duration", response.data.duration);
        setFormData({ ...formData, course: response.data.id });
        setWeekOptions(response.data.duration);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    // Fetch timetable data based on selected course and week number
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/courses/timetables/?course=${courseId}&week_number=${formData.weekNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the form data with timetable data if it exists
        if (response.data.length > 0) {
          const timetableData = response.data[0]; // Assuming only one timetable entry per week for a course
          setFormData({
            ...formData,
            monday: timetableData.monday,
            tuesday: timetableData.tuesday,
            wednesday: timetableData.wednesday,
            thursday: timetableData.thursday,
            friday: timetableData.friday,
            saturday: timetableData.saturday,
            sunday: timetableData.sunday,
          });
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, [formData.weekNumber]); // Trigger fetchTimetable whenever weekNumber changes

  const setWeekOptions = (duration) => {
    if (!duration) {
      return;
    }
    const options = [];
    const weeks = duration * 4; // Assuming each month has 4 weeks
    for (let i = 1; i <= weeks; i++) {
      options.push(i);
    }
    setFormData({ ...formData, weekNumber: options[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      formData.course = course.id;
      await axios.post("http://localhost:8000/api/courses/timetables/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      alert("Timetable created successfully!");
    } catch (error) {
      console.error("Error creating timetable:", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
    }));
    
    if (name === "weekNumber") {
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(`http://localhost:8000/api/courses/courses/timetables/?course=${courseId}&week_number=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Update the form data with timetable data if it exists
            
            if (response.data.length > 0) {
                const timetableData = response.data[0]; // Assuming only one timetable entry per week for a course
                setFormData(prevFormData => ({
                    ...prevFormData,
                    monday: timetableData.monday,
                    tuesday: timetableData.tuesday,
                    wednesday: timetableData.wednesday,
                    thursday: timetableData.thursday,
                    friday: timetableData.friday,
                    saturday: timetableData.saturday,
                    sunday: timetableData.sunday,
                }));
            } else {
                console.log("Nigel");
                // If no timetable data is found, reset the day data to null
                setFormData(prevFormData => ({
                    ...prevFormData,
                    monday:  {start: '', end: ''},
                    tuesday:  {start: '', end: ''},
                    wednesday:  {start: '', end: ''},
                    thursday:  {start: '', end: ''},
                    friday:  {start: '', end: ''},
                    saturday:  {start: '', end: ''},
                    sunday:  {start: '', end: ''},
                }));
            }
            console.log("Nigel", formData);
        } catch (error) {
            console.error("Error fetching timetable:", error);
        }
    }
};

useEffect(() => {
    console.log("Bah",formData);
}, [formData]);


  const handleDayChange = (day, timeType, value) => {
    setFormData({
      ...formData,
      [day]: {
        ...formData[day],
        [timeType]: value
      }
    });
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Create Course Timetable</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="course">Course</label>
                      <input type="text" className="form-control" id="course" name="course" value={course.id} readOnly />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weekNumber">Week Number</label>
                      <select className="form-control" id="weekNumber" name="weekNumber" value={formData.weekNumber} onChange={handleChange} required>
                      {course.duration && [...Array(course.duration * 4).keys()].map((week) => (
                        <option key={week + 1} value={week + 1}>{week + 1}</option>
                      ))}
                      </select>
                    </div>
                    <div className="row">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day, index) => (
                        <div className="col-md-6" key={index}>
                          <h4>{day.charAt(0).toUpperCase() + day.slice(1)}</h4>
                          <div className="form-group">
                            <label htmlFor={`${day}-start`}>Start Time</label>
                            <input type="time" className="form-control" id={`${day}-start`} value={formData[day].start} onChange={(e) => handleDayChange(day, 'start', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label htmlFor={`${day}-end`}>End Time</label>
                            <input type="time" className="form-control" id={`${day}-end`} value={formData[day].end} onChange={(e) => handleDayChange(day, 'end', e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimetableForm;
