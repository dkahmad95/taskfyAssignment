import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';

export type Difficulty = 'easy' | 'medium' | 'hard';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  assignee: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsNotEmpty()
  @IsDateString()
  issueDate: string;

  @IsNotEmpty()
  @IsNumber()
  hoursSpent: number;

  @IsNotEmpty()
  @IsString()
  project: string;

  @IsNotEmpty()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: Difficulty;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  taskName?: string;

  @IsOptional()
  @IsString()
  assignee?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsNumber()
  hoursSpent?: number;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty?: Difficulty;
}
