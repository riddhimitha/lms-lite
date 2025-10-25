import React, { useState } from 'react';
import { addCourse } from '../api';

function CourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quizInput, setQuizInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizQuestions = quizInput.split('\n').filter(q => q.includes('*'));
    const course = { title, description, quizQuestions };
    
    try {
      await addCourse(course);
      setTitle('');
      setDescription('');
      setQuizInput('');
      alert('Course added successfully!');
    } catch (error) {
      alert('Error adding course');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Course Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', height: '100px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Quiz Questions (format: question*answer, one per line):</label>
          <textarea
            value={quizInput}
            onChange={(e) => setQuizInput(e.target.value)}
            placeholder="What is Java?*Programming Language"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', height: '100px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Add Course
        </button>
      </form>
    </div>
  );
}

export default CourseForm;