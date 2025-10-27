import React, { useState } from 'react';
import { addCourse } from '../api';

function CourseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quizInput, setQuizInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = { 
      name: title, 
      description,
      quizQuestions: quizInput
    };
    
    try {
      await addCourse(course);
      setTitle('');
      setDescription('');
      setQuizInput('');
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error details:', error);
      alert('Error adding course: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">➕ Add New Course</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>🎯 Course Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-control"
              placeholder="Enter course title..."
            />
          </div>
          <div className="form-group">
            <label>📝 Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-control"
              style={{ height: '100px' }}
              placeholder="Describe your course..."
            />
          </div>
          <div className="form-group">
            <label>🧠 Quiz Questions (format: question*answer, one per line):</label>
            <textarea
              value={quizInput}
              onChange={(e) => setQuizInput(e.target.value)}
              placeholder="What is Java?*Programming Language\nWhat is React?*JavaScript Library"
              className="form-control"
              style={{ height: '120px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ✨ Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;