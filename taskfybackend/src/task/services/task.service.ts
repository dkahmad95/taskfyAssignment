import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TaskEntity } from 'src/entities/taskEntity';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

const tasksFilePath = path.join(process.cwd(), 'src', 'data', 'tasks.json');

@Injectable()
export class TaskService {
  private readTasks(): TaskEntity[] {
    const fileContent = fs.readFileSync(tasksFilePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  private writeTasks(tasks: TaskEntity[]): void {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  }

  // GET ALL TASKS
  async findAll(): Promise<TaskEntity[]> {
    try {
      return this.readTasks();
    } catch (error) {
      throw new Error('Failed to fetch tasks');
    }
  }

  // GET ONE TASK BY ID
  async findOne(taskId: number): Promise<TaskEntity> {
    try {
      const tasks = this.readTasks();
      const task = tasks.find((task) => task.id === taskId);
      if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
      }
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // CREATE TASK
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const tasks = this.readTasks();
      const newTask = { id: tasks.length + 1, ...createTaskDto };
      tasks.push(newTask);
      this.writeTasks(tasks);
      return newTask;
    } catch (error) {
      throw new Error('Error creating task');
    }
  }

  // UPDATE TASK
  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    try {
      const tasks = this.readTasks();
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      tasks[taskIndex] = { ...tasks[taskIndex], ...updateTaskDto };
      this.writeTasks(tasks);
      return tasks[taskIndex];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // DELETE TASK
  async deleteTask(taskId: number): Promise<string> {
    try {
      const tasks = this.readTasks();
      const taskIndex = tasks.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) {
        throw new Error(`Task with ID ${taskId} not found`);
      }

      tasks.splice(taskIndex, 1);
      this.writeTasks(tasks);
      return `Task with ID ${taskId} has been deleted`;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
