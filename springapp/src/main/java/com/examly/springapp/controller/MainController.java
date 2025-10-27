package com.examly.springapp.controller;

import com.examly.springapp.model.Course;
import com.examly.springapp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MainController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/api/courses")
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping("/api/courses")
    public Course addCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @GetMapping("/api/test")
    public String test() {
        return "API working!";
    }

    @PutMapping("/api/courses/{id}/enroll")
    public String enrollStudent(@PathVariable Long id, @RequestParam String student) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) {
            return "Enrolled " + student + " in " + course.getName();
        }
        return "Course not found";
    }

    @GetMapping("/api/courses/{id}/quiz")
    public String getQuiz(@PathVariable Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        return course != null ? course.getQuizQuestions() : "";
    }

    @PostMapping("/api/courses/{id}/quiz")
    public String submitQuiz(@PathVariable Long id, @RequestParam String answers) {
        try {
            Course course = courseRepository.findById(id).orElse(null);
            if (course == null) return "Course not found";
            
            if (course.getQuizQuestions() == null || course.getQuizQuestions().isEmpty()) {
                return "No quiz available";
            }
            
            String[] questions = course.getQuizQuestions().split("\n");
            String[] userAnswers = answers.split(",");
            int score = 0;
            
            for (int i = 0; i < Math.min(questions.length, userAnswers.length); i++) {
                String[] qaPair = questions[i].split("\*");
                if (qaPair.length == 2 && qaPair[1].trim().equalsIgnoreCase(userAnswers[i].trim())) {
                    score++;
                }
            }
            
            return "Score: " + score + "/" + questions.length;
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}