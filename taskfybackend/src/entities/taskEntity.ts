import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskName: string;

  @Column()
  assignee: string;

  @Column()
  dueDate: string;

  @Column()
  issueDate: string;

  @Column()
  hoursSpent: number;

  @Column()
  project: string;

  @Column()
  difficulty: string;
}
