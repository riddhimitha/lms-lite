const BASE_URL = 'http://localhost:8080/api/courses';

export const fetchCourses = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const addCourse = async (course) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });
  return response.json();
};

export const enrollInCourse = async (courseId, student) => {
  const response = await fetch(`${BASE_URL}/${courseId}/enroll?student=${student}`, {
    method: 'PUT'
  });
  return response.json();
};

export const updateProgress = async (courseId, student, progress) => {
  const response = await fetch(`${BASE_URL}/${courseId}/progress?student=${student}&progress=${progress}`, {
    method: 'PUT'
  });
  return response.json();
};

export const getQuiz = async (courseId) => {
  const response = await fetch(`${BASE_URL}/${courseId}/quiz`);
  return response.json();
};

export const submitQuiz = async (courseId, student, score) => {
  const response = await fetch(`${BASE_URL}/${courseId}/quiz?student=${student}&score=${score}`, {
    method: 'POST'
  });
  return response.json();
};