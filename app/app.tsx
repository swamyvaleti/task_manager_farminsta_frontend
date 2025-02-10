"use client";

import { useState, useEffect } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { AuthForm } from "./components/auth/AuthForm";
import { Task } from "./types";
import { Button } from "@/components/ui/button";
import { useToast } from "./context/use-toast";
import { LogOut } from "lucide-react";
import { ToastProvider } from "@/components/ui/toast";


export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<{ token: string; name: string } | null>(
    null
  );
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUser({ token, name: userName });
      fetchTasks(token);
    }
  }, []);

  const fetchTasks = async (token: string) => {
    try {
      const response = await fetch(
        "https://task-manager-farminsta-backend.onrender.com/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch(
        "https://task-manager-farminsta-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        setUser({ token: data.token, name: data.name });
        fetchTasks(data.token);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        return;
      } else {
        console.log("came error part<--");
        toast({
          title: "Error",
          description: "Invalid credentials",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const response = await fetch(
        "https://task-manager-farminsta-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      if (response.ok) {
        console.log("came here2<-");

        toast({
          title: "Success",
          description: "Registration successful. Please login.",
        });
      } else {
        toast({
          title: "Error",
          description: "Registration failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    setTasks([]);
    console.log("came here3<-");

    toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  const addTask = async (title: string, description: string) => {
    if (!user?.token) return;

    try {
      const response = await fetch(
        "https://task-manager-farminsta-backend.onrender.com/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (response.ok) {
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
        console.log("came here4<-");

        toast({
          title: "Success",
          description: "Task added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (id: string, title: string, description: string) => {
    if (!user?.token) return;

    try {
      const response = await fetch(
        `https://task-manager-farminsta-backend.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, ...updatedTask } : task
          )
        );
        toast({
          title: "Success",
          description: "Task updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const toggleComplete = async (id: string, checked: boolean) => {
    if (!user?.token) return;

    try {
      const response = await fetch(
        `https://task-manager-farminsta-backend.onrender.com/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ completed: checked }),
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, completed: checked } : task
          )
        );
      }
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    console.log(id, "id<--");
    if (!user?.token) return;

    try {
      const response = await fetch(
        `https://task-manager-farminsta-backend.onrender.com/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <ToastProvider />
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Task Manager</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm onSubmit={addTask} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No tasks yet. Add one above to get started!
              </p>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                onUpdate={updateTask}
                setTasks={setTasks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
