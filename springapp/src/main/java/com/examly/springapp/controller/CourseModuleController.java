package com.examly.springapp.controller;

import com.examly.springapp.model.CourseModule;
import com.examly.springapp.service.CourseModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = {"http://localhost:8081", "${cors.allowed-origins:*}"})
public class CourseModuleController {

    @Autowired
    private CourseModuleService service;

    @GetMapping
    public List<CourseModule> getAllCourses() {
        return service.getAllCourses();
    }

    @PostMapping
    public CourseModule addCourse(@RequestBody CourseModule course) {
        return service.addCourse(course);
    }

    @PutMapping("/{id}/enroll")
    public CourseModule enrollStudent(@PathVariable Long id, @RequestParam String student) {
        return service.enrollStudent(id, student);
    }

    @PutMapping("/{id}/progress")
    public CourseModule updateProgress(@PathVariable Long id, @RequestParam String student,
            @RequestParam Integer progress) {
        return service.updateProgress(id, student, progress);
    }

    @GetMapping("/{id}/quiz")
    public List<String> getQuiz(@PathVariable Long id) {
        return service.getQuiz(id);
    }

    @PostMapping("/{id}/quiz")
    public Map<String, String> submitQuiz(@PathVariable Long id, @RequestParam String student,
            @RequestParam Integer score) {
        service.submitQuiz(id, student, score);
        return Map.of("message", "Score submitted!");
    }
}