export interface Task {
  id: number;
  taskName: string;
  assignee: string;
  dueDate: string;
  issueDate: string;
  hoursSpent: number;
  project: string;
  difficulty: string;
}
export interface CreateTask {
  taskName: string;
  assignee: string;
  dueDate: string;
  issueDate: string;
  hoursSpent: number;
  project: string;
  difficulty: string;
}

export interface UpdateTask {
  id?: number;
  taskName?: string;
  assignee?: string;
  dueDate?: string;
  issueDate?: string;
  hoursSpent?: number;
  project?: string;
  difficulty?: string;
}
