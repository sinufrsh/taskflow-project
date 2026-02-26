package com.taskflow.backend.controller;

import com.taskflow.backend.entity.Task;
import com.taskflow.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // CREATE TASK
    @PostMapping("/create/{email}")
    public Task createTask(@RequestBody Task task, @PathVariable String email) {
        return taskService.createTask(task, email);
    }

    // GET ALL TASKS OF USER
    @GetMapping("/user/{email}")
    public List<Task> getTasks(@PathVariable String email) {
        return taskService.getTasks(email);
    }

    // DELETE TASK
    @DeleteMapping("/delete/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }

    // GET TASK BY ID
    @GetMapping("/task/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // UPDATE TASK
    @PutMapping("/update/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }
}