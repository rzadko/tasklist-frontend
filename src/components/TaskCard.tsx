import "./TaskCard.css";
import { Status, Task } from "../types";

interface TaskCardProps {
    onDragStart: (id: string) => void;
    onDrop: (status: Status) => void;
    toggleEditTaskModal: (task?: Task) => void;
    task: Task;
}

export const TaskCard = ({
    task,
    onDragStart,
    onDrop,
    toggleEditTaskModal,
}: TaskCardProps) => {
    return (
        <div className="task-container">
            <div
                className="task-card"
                key={task._id}
                draggable
                onDragStart={() => onDragStart(task._id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(Status.TODO)}
                onClick={() => toggleEditTaskModal(task)}
            >
                {task.title}
            </div>
        </div>
    );
};
