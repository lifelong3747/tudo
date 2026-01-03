// server/storage.ts
// DB-FREE storage (in-memory, no database)

import type { Task, InsertTask } from "@shared/schema";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<void>;
  clearTasks(): Promise<void>;
}

// simple in-memory store
let tasks: Task[] = [];
let idCounter = 1;

export class MemoryStorage implements IStorage {
  async getTasks(): Promise<Task[]> {
    return tasks;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const newTask: Task = {
      id: idCounter++,
      ...task,
    };
    tasks.push(newTask);
    return newTask;
  }

  async updateTask(
    id: number,
    updateData: Partial<InsertTask>
  ): Promise<Task | undefined> {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    tasks[index] = { ...tasks[index], ...updateData };
    return tasks[index];
  }

  async deleteTask(id: number): Promise<void> {
    tasks = tasks.filter(t => t.id !== id);
  }

  async clearTasks(): Promise<void> {
    tasks = [];
  }
}

// export memory storage instead of DB
export const storage = new MemoryStorage();
