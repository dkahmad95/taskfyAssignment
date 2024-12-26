import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // GET ALL TASKS
  @Get()
  async getAllTasks() {
    try {
      return await this.taskService.findAll();
    } catch (error) {
      throw new HttpException(
        `Failed to fetch tasks: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // GET TASK BY ID
  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.taskService.findOne(id);
    } catch (error) {
      throw new HttpException(
        `Task with ID ${id} not found: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // CREATE TASK
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.createTask(createTaskDto);
    } catch (error) {
      throw new HttpException(
        `Error creating task: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // UPDATE TASK
  @Put(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return await this.taskService.updateTask(id, updateTaskDto);
    } catch (error) {
      throw new HttpException(
        `Error updating task with ID ${id}: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // DELETE TASK
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.taskService.deleteTask(id);
    } catch (error) {
      throw new HttpException(
        `Error deleting task with ID ${id}: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
