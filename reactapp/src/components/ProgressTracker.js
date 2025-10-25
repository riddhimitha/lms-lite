import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourses, updateProgress } from '../api';

function ProgressTracker() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const courses = await fetchCourses();
      const foundCourse = courses.find(c => c.id === parseInt(id));
      setCourse(foundCourse);
      if (foundCourse && foundCourse.progress['john_doe']) {
        setProgress(foundCourse.progress['john_doe']);
      }
    } catch (error) {
      console.error('Error loading course:', error);
    }
  };

  const handleUpdateProgress = async () => {
    try {
      await updateProgress(id, 'john_doe', progress);
      alert('Progress updated successfully!');
    } catch (error) {
      alert('Error updating progress');
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Progress Tracker</h2>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div style={{ marginBottom: '1rem' }}>
        <label>Current Progress (0-100):</label>
        <input
          type="number"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(parseInt(e.target.value))}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </div>
      <button 
        onClick={handleUpdateProgress}
        style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}
      >
        Update Progress
      </button>
    </div>
  );
}

export default ProgressTracker;