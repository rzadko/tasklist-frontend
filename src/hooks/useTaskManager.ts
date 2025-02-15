import { useEffect, useState } from "react";
import { Status, Task } from "../types";

export const useTaskManager = () => {
    const [currentStatus, setCurrentStatus] = useState<Status>(Status.TODO);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        _id: "",
        title: "",
        status: currentStatus,
        assignee: "",
        description: "",
    });
    const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

    const [isNewTaskModalOpen, setIsNewTaskModalOpen] =
        useState<boolean>(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] =
        useState<boolean>(false);

    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

    const toggleNewTaskModal = () => {
        setIsNewTaskModalOpen(!isNewTaskModalOpen);
    };

    const toggleEditTaskModal = (task?: Task) => {
        if (task) {
            setUpdatedTask(task);
        }
        setIsEditTaskModalOpen(!isEditTaskModalOpen);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/tasks");

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data: Task[] = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const handleNewSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newTask.title,
                    status: newTask.status,
                    assignee: newTask.assignee,
                    description: newTask.description,
                }),
            });
            if (response.ok) {
                console.log("Task created successfully");
                setTasks([...tasks, newTask]);
                toggleNewTaskModal();
            } else {
                console.error("Failed to create task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5001/api/tasks/${updatedTask?._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedTask),
                }
            );
            if (response.ok) {
                console.log("Task created successfully");
                const updatedTask = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === updatedTask._id ? updatedTask : task
                    )
                );
                setUpdatedTask(null);
                toggleEditTaskModal();
            } else {
                console.error("Failed to create task");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(
                `http://localhost:5001/api/tasks/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) throw new Error("Failed to delete task");

            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const onDragStart = (id: string) => {
        setDraggedTaskId(id);
    };

    const onDrop = (status: Status) => {
        tasks.map((task) =>
            task._id === draggedTaskId ? { ...task, status: status } : task
        );

        handleOnDragEnd(status);
    };

    const handleOnDragEnd = async (newStatus: Status) => {
        try {
            const response = await fetch(
                `http://localhost:5001/api/tasks/${draggedTaskId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task status");
            }

            const updatedTask: Task = await response.json();
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === updatedTask._id
                        ? { ...task, status: updatedTask.status }
                        : task
                )
            );
            setDraggedTaskId(null);
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return {
        tasks,
        onDragStart,
        onDrop,
        newTask,
        setNewTask,
        isNewTaskModalOpen,
        currentStatus,
        setCurrentStatus,
        handleNewSubmit,
        handleDelete,
        toggleNewTaskModal,
        updatedTask,
        setUpdatedTask,
        isEditTaskModalOpen,
        handleEditSubmit,
        toggleEditTaskModal,
    };
};
