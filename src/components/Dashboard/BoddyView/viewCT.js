import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CourseTimetableView = () => {
  const { courseId } = useParams();
  const [events, setEvents] = useState([]);

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

        const eventList = timetables.flatMap((timetable) => {
          const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
          const eventsForWeek = daysOfWeek.flatMap((day, index) => {
            const startTime = timetable[day].start;
            const endTime = timetable[day].end;

            if (startTime && endTime) {
              const startDate = moment().week(timetable.week_number).day(index + 1).hour(startTime.split(':')[0]).minute(startTime.split(':')[1]);
              const endDate = moment().week(timetable.week_number).day(index + 1).hour(endTime.split(':')[0]).minute(endTime.split(':')[1]);

              return [{
                title: `Week ${timetable.week_number}`,
                start: startDate.toDate(),
                end: endDate.toDate(),
              }];
            }
            return [];
          });
          return eventsForWeek;
        });

        setEvents(eventList);
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
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
    </div>
  );
};

export default CourseTimetableView;
