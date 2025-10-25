import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses, enrollInCourse } from '../api';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId, 'john_doe');
      alert('Enrolled successfully!');
      loadCourses();
    } catch (error) {
      alert('Error enrolling in course');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Courses</h2>
      {courses.map(course => (
        <div key={course.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <div>
            <button 
              onClick={() => handleEnroll(course.id)}
              style={{ marginRight: '0.5rem', padding: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}
            >
              Enroll
            </button>
            <button 
              onClick={() => navigate(`/progress/${course.id}`)}
              style={{ marginRight: '0.5rem', padding: '0.5rem', backgroundColor: '#17a2b8', color: 'white', border: 'none' }}
            >
              Progress
            </button>
            <button 
              onClick={() => navigate(`/quiz/${course.id}`)}
              style={{ padding: '0.5rem', backgroundColor: '#ffc107', color: 'black', border: 'none' }}
            >
              Take Quiz
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;