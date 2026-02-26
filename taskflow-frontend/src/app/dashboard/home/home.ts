import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { TaskService } from '../task';
import { SessionService } from '../../shared/session';
import { StatusFilterPipe } from '../status-filter.pipe';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf, StatusFilterPipe, SearchPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  tasks: any[] = [];
  email = '';

  // FILTER + SEARCH
  filterStatus = 'ALL';
  searchText = '';

  // MODAL CONTROL
  showModal = false;

  // NEW TASK MODEL
  newTask = {
    title: '',
    description: '',
    dueDate: '',
    status: 'TODO'
  };

  isEditMode = false;
  editTaskId: number | null = null;

  constructor(
    private taskService: TaskService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.email = this.session.getEmail();

    if (!this.email) {
      alert("Session expired. Please login again.");
      return;
    }

    this.loadTasks();
  }

  // LOAD TASKS
  loadTasks() {
    this.taskService.getTasks(this.email)
      .subscribe((data: any) => {
        this.tasks = data;
      });
  }

  // OPEN MODAL
  openModal() {
    this.showModal = true;
  }

  // CLOSE MODAL
  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  // SAVE TASK (MODAL)
  saveTask() {

    if (this.isEditMode) {
      this.updateTask();
      return;
    }

    this.taskService.createTask(this.newTask, this.email)
      .subscribe(() => {
        this.closeModal();
        this.loadTasks();
      });
  }

  // OPEN EDIT MODAL
  editTask(task: any) {
    this.isEditMode = true;
    this.editTaskId = task.id;
    this.showModal = true;

    this.newTask = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    };
  }

  // UPDATE TASK
  updateTask() {
    if (this.editTaskId == null) return;

    this.taskService.updateTask(this.editTaskId, this.newTask)
      .subscribe(() => {
        this.closeModal();
        this.loadTasks();
        this.resetForm();
      });
  }

  // RESET FORM
  resetForm() {
    this.isEditMode = false;
    this.editTaskId = null;

    this.newTask = {
      title: '',
      description: '',
      dueDate: '',
      status: 'TODO'
    };
  }

  // DELETE TASK
  deleteTask(id: number) {
    this.taskService.deleteTask(id)
      .subscribe(() => this.loadTasks());
  }

  // UPDATE STATUS
  updateStatus(task: any) {
    this.taskService.updateTask(task.id, task)
      .subscribe(() => this.loadTasks());
  }

  // STATS COUNT
  getCount(status: string) {
    return this.tasks.filter(t => t.status === status).length;
  }
}