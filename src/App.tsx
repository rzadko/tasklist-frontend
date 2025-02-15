import { useEffect, useState } from "react";
import "./App.css";
import { Slider } from "./components/Slider";
import { TaskManager } from "./TaskManager";
import { useTaskManager } from "./hooks/useTaskManager";

function App() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const {
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
    } = useTaskManager();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [isDarkMode]);

    return (
        <>
            <header className="header">
                <h1 className="header-title">Task list</h1>
                <Slider
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                ></Slider>
            </header>
            <body>
                <TaskManager
                    tasks={tasks}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    currentStatus={currentStatus}
                    setCurrentStatus={setCurrentStatus}
                    isNewTaskModalOpen={isNewTaskModalOpen}
                    toggleNewTaskModal={toggleNewTaskModal}
                    handleNewSubmit={handleNewSubmit}
                    handleDelete={handleDelete}
                    onDragStart={onDragStart}
                    onDrop={onDrop}
                    updatedTask={updatedTask}
                    setUpdatedTask={setUpdatedTask}
                    isEditTaskModalOpen={isEditTaskModalOpen}
                    handleEditSubmit={handleEditSubmit}
                    toggleEditTaskModal={toggleEditTaskModal}
                />
            </body>
        </>
    );
}

export default App;
