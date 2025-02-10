"use client";

import {  useState } from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit2, X, Check } from "lucide-react";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, description: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onUpdate,
  setTasks,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const startEditing = (task: Task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdate = (id: string) => {
    if (!editTitle.trim()) return;
    onUpdate(id, editTitle, editDescription);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id
          ? { ...task, title: editTitle, description: editDescription }
          : task
      )
    );
    cancelEditing();
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task?._id}
          className={`p-4 ${task.completed ? "bg-muted" : ""}`}
        >
          {editingId === task._id ? (
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Task description"
              />
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={() => handleUpdate(task._id)}>
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={(checked) =>
                    onToggleComplete(task._id, checked === true)
                  }
                  className="mt-1"
                />
                <div>
                  <h3
                    className={`font-medium ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      task.completed
                        ? "text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created {format(new Date(task.createdAt), "PPp")}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => startEditing(task)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task._id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
