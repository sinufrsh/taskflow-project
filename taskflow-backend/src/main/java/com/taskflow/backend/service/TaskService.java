package com.taskflow.backend.service;

import com.taskflow.backend.entity.Task;
import com.taskflow.backend.entity.User;
import com.taskflow.backend.repository.TaskRepository;
import com.taskflow.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // CREATE TASK
    public Task createTask(Task task, String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        task.setUser(user);

        return taskRepository.save(task);
    }

    // GET ALL TASKS OF USER
    public List<Task> getTasks(String email) {

        User user = userRepository.findByEmail(email).orElseThrow();

        return taskRepository.findByUserId(user.getId());
    }

    // DELETE TASK
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    
 // GET TASK BY ID
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // UPDATE TASK
    public Task updateTask(Long id, Task updatedTask) {

        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setDueDate(updatedTask.getDueDate());
        existingTask.setStatus(updatedTask.getStatus());

        return taskRepository.save(existingTask);
    }
}