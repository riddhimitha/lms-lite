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
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const result = await enrollInCourse(courseId, 'john_doe');
      alert(result);
      loadCourses();
    } catch (error) {
      alert('Error enrolling in course');
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">📚 Available Courses</h2>
      <div className="course-grid">
        {Array.isArray(courses) && courses.map(course => (
          <div key={course.id} className="course-card">
            <h3>🎯 {course.name}</h3>
            <p>{course.description}</p>
            <div className="button-group">
              <button 
                onClick={() => handleEnroll(course.id)}
                className="btn btn-success"
              >
                🚀 Enroll
              </button>
              <button 
                onClick={() => navigate(`/progress/${course.id}`)}
                className="btn btn-info"
              >
                📈 Progress
              </button>
              <button 
                onClick={() => navigate(`/quiz/${course.id}`)}
                className="btn btn-warning"
              >
                🧠 Take Quiz
              </button>
            </div>
          </div>
        ))}
        {!Array.isArray(courses) || courses.length === 0 && (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default CourseList;