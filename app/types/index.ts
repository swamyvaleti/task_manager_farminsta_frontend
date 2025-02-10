export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
