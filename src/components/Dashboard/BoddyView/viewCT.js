import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const CourseTimetableView = () => {
  const { courseId } = useParams();
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://localhost:8000/api/courses/timetables/?course=${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const timetables = response.data;
        console.log("Timetables fetched:", timetables);

        const formattedTimetables = timetables.map(timetable => {
          const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
          const eventsForWeek = daysOfWeek.map(day => {
            const startTime = timetable[day]?.start;
            const endTime = timetable[day]?.end;

            return {
              day,
              startTime,
              endTime,
              weekNumber: timetable.week_number,
            };
          });
          return {
            weekNumber: timetable.week_number,
            events: eventsForWeek
          };
        });

        console.log("Formatted timetables:", formattedTimetables);
        setTimetables(formattedTimetables);
      } catch (error) {
        console.error("There was an error fetching the timetable!", error);
      }
    };

    fetchTimetable();
  }, [courseId]);

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
      <div style={{ margin: 30 }}>
        <h1>Course Timetable</h1>
        {timetables.map(timetable => (
          <div key={timetable.weekNumber}>
            <h2>Week {timetable.weekNumber}</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {timetable.events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.day.charAt(0).toUpperCase() + event.day.slice(1)}</td>
                    <td>{event.startTime}</td>
                    <td>{event.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseTimetableView;
