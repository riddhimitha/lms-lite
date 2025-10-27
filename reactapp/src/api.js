const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/courses';

export const fetchCourses = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addCourse = async (course) => {
  try {
    console.log('Sending course data:', course);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Course added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

export const enrollInCourse = async (courseId, student) => {
  const response = await fetch(`${BASE_URL}/${courseId}/enroll?student=${student}`, {
    method: 'PUT'
  });
  return response.text();
};

export const updateProgress = async (courseId, student, progress) => {
  return "Progress updated";
};

export const getQuiz = async (courseId) => {
  const response = await fetch(`${BASE_URL}/${courseId}/quiz`);
  return response.text();
};

export const submitQuiz = async (courseId, answers) => {
  const response = await fetch(`${BASE_URL}/${courseId}/quiz?answers=${encodeURIComponent(answers)}`, {
    method: 'POST'
  });
  return response.text();
};