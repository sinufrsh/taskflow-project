import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private baseUrl = 'http://localhost:8080/api/tasks';

    constructor(private http: HttpClient) { }

    // GET ALL TASKS
    getTasks(email: string) {
        return this.http.get(`${this.baseUrl}/user/${email}`);
    }

    // CREATE TASK
    createTask(task: any, email: string) {
        return this.http.post(`${this.baseUrl}/create/${email}`, task);
    }

    // DELETE TASK
    deleteTask(id: number) {
        return this.http.delete(`${this.baseUrl}/delete/${id}`, {
            responseType: 'text'
        });
    }

    // UPDATE TASK
    updateTask(id: number, task: any) {
        return this.http.put(`${this.baseUrl}/update/${id}`, task);
    }
}