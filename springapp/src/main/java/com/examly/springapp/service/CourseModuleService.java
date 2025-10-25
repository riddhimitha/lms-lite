package com.examly.springapp.service;

import com.examly.springapp.model.CourseModule;
import com.examly.springapp.repository.CourseModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseModuleService {
    
    @Autowired
    private CourseModuleRepository repository;
    
    public List<CourseModule> getAllCourses() {
        return repository.findAll();
    }
    
    public CourseModule addCourse(CourseModule course) {
        return repository.save(course);
    }
    
    public CourseModule enrollStudent(Long id, String student) {
        CourseModule course = repository.findById(id).orElse(null);
        if (course != null && !course.getEnrolledStudents().contains(student)) {
            course.getEnrolledStudents().add(student);
            return repository.save(course);
        }
        return course;
    }
    
    public CourseModule updateProgress(Long id, String student, Integer progress) {
        CourseModule course = repository.findById(id).orElse(null);
        if (course != null) {
            course.getProgress().put(student, progress);
            return repository.save(course);
        }
        return course;
    }
    
    public List<String> getQuiz(Long id) {
        CourseModule course = repository.findById(id).orElse(null);
        return course != null ? course.getQuizQuestions() : null;
    }
    
    public CourseModule submitQuiz(Long id, String student, Integer score) {
        CourseModule course = repository.findById(id).orElse(null);
        if (course != null) {
            course.getScores().put(student, score);
            return repository.save(course);
        }
        return course;
    }
}