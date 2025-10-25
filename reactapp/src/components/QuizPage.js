import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz, submitQuiz } from '../api';

function QuizPage() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      const quizData = await getQuiz(id);
      setQuestions(quizData || []);
    } catch (error) {
      console.error('Error loading quiz:', error);
    }
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q, index) => {
      const [question, correctAnswer] = q.split('*');
      if (answers[index] && answers[index].toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
      }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    
    try {
      await submitQuiz(id, 'john_doe', percentage);
      alert(`Quiz submitted! Score: ${score}/${questions.length} (${percentage}%)`);
    } catch (error) {
      alert('Error submitting quiz');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Quiz</h2>
      {questions.map((q, index) => {
        const [question] = q.split('*');
        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <p><strong>Q{index + 1}: {question}</strong></p>
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) => setAnswers({...answers, [index]: e.target.value})}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
        );
      })}
      {questions.length > 0 && (
        <button 
          onClick={handleSubmit}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

export default QuizPage;