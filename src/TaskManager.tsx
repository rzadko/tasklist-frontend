import "./TaskManager.css";
import { NewTaskModal } from "./components/NewTaskModal";
import { Status, Task } from "./types";
import { AddButton } from "./components/AddButton";
import { EditTaskModal } from "./components/EditTaskModal";
import { TaskCard } from "./components/TaskCard";

interface TaskManagerProps {
    tasks: Task[];
    newTask: Task;
    setNewTask: (task: Task | ((prevTask: Task) => Task)) => void;
    currentStatus: Status;
    setCurrentStatus: (status: Status) => void;
    handleNewSubmit: (event: React.FormEvent) => void;
    isNewTaskModalOpen: boolean;
    toggleNewTaskModal: () => void;
    onDragStart: (id: string) => void;
    onDrop: (status: Status) => void;
    updatedTask: Task | null;
    setUpdatedTask: (task: Task) => void;
    isEditTaskModalOpen: boolean;
    toggleEditTaskModal: (task?: Task) => void;
    handleEditSubmit: (event: React.FormEvent) => void;
    handleDelete: (id: string) => void;
}
export const TaskManager = ({
    tasks,
    newTask,
    setNewTask,
    currentStatus,
    setCurrentStatus,
    handleNewSubmit,
    toggleNewTaskModal,
    isNewTaskModalOpen,
    onDragStart,
    onDrop,
    updatedTask,
    setUpdatedTask,
    isEditTaskModalOpen,
    toggleEditTaskModal,
    handleEditSubmit,
    handleDelete,
}: TaskManagerProps) => {
    const tasksByStatus = (status: string) =>
        tasks.filter((task) => task.status === status);

    const handleAddButton = (status: Status) => {
        setCurrentStatus(status);
        toggleNewTaskModal();
    };

    return (
        <div>
            {isNewTaskModalOpen && (
                <NewTaskModal
                    handleSubmit={handleNewSubmit}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    toggleModal={toggleNewTaskModal}
                    currentStatus={currentStatus}
                />
            )}
            {isEditTaskModalOpen && (
                <EditTaskModal
                    title={"Edit task"}
                    handleEditSubmit={handleEditSubmit}
                    toggleModal={toggleEditTaskModal}
                    submitText={"Update task"}
                    handleDelete={handleDelete}
                    updatedTask={updatedTask as Task}
                    setUpdatedTask={setUpdatedTask}
                ></EditTaskModal>
            )}
            <div className="column-container">
                <div className="column">
                    <h3>{Status.TODO}</h3>
                    {tasksByStatus(Status.TODO).map((task) => (
                        <TaskCard
                            task={task}
                            onDragStart={() => onDragStart(task._id)}
                            onDrop={() => onDrop(Status.TODO)}
                            toggleEditTaskModal={() =>
                                toggleEditTaskModal(task)
                            }
                        ></TaskCard>
                    ))}
                    <AddButton
                        onClick={() => handleAddButton(Status.TODO)}
                    ></AddButton>
                </div>
                <div className="column">
                    <h3>{Status.INPROGRESS}</h3>
                    {tasksByStatus(Status.INPROGRESS).map((task) => (
                        <div
                            key={task._id}
                            draggable
                            onDragStart={() => onDragStart(task._id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => onDrop(Status.INPROGRESS)}
                            onClick={() => toggleEditTaskModal(task)}
                            className="task-card"
                        >
                            {task.title}
                        </div>
                    ))}
                    <AddButton
                        onClick={() => handleAddButton(Status.INPROGRESS)}
                    ></AddButton>
                </div>
                <div className="column">
                    <h3>{Status.DONE}</h3>
                    {tasksByStatus(Status.DONE).map((task) => (
                        <div
                            key={task._id}
                            draggable
                            onDragStart={() => onDragStart(task._id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => onDrop(Status.DONE)}
                            onClick={() => toggleEditTaskModal(task)}
                            className="task-card"
                        >
                            {task.title}
                        </div>
                    ))}
                    <AddButton
                        onClick={() => handleAddButton(Status.DONE)}
                    ></AddButton>
                </div>
            </div>
        </div>
    );
};

/*
<DragDropContext onDragEnd={handleDragEnd}>
                <div className="column-container">
                    <Droppable droppableId={Status.TODO}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="column"
                            >
                                <h3>{Status.TODO}</h3>
                                {tasksByStatus(Status.TODO).map(
                                    (task, index) => (
                                        <Draggable
                                            key={task._id}
                                            draggableId={task._id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card"
                                                    style={{
                                                        ...provided
                                                            .draggableProps
                                                            .style,
                                                    }}
                                                >
                                                    <h4>{task.title}</h4>
                                                    <p>{task.assignee}</p>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                <AddButton
                                    onClick={() => handleAddButton(Status.TODO)}
                                ></AddButton>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId={Status.INPROGRESS}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="column"
                            >
                                <h3>{Status.INPROGRESS}</h3>
                                {tasksByStatus(Status.INPROGRESS).map(
                                    (task, index) => (
                                        <Draggable
                                            key={task._id}
                                            draggableId={task._id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="task-card"
                                                    style={{
                                                        ...provided
                                                            .draggableProps
                                                            .style,
                                                    }}
                                                >
                                                    <h4>{task.title}</h4>
                                                    <p>{task.assignee}</p>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                <AddButton
                                    onClick={() =>
                                        handleAddButton(Status.INPROGRESS)
                                    }
                                ></AddButton>
                            </div>
                        )}
                    </Droppable>
                    <>
                        <Droppable droppableId={Status.DONE}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="column"
                                >
                                    <h3>{Status.DONE}</h3>
                                    {tasksByStatus(Status.DONE).map(
                                        (task, index) => (
                                            <Draggable
                                                key={task._id}
                                                draggableId={task._id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="task-card"
                                                        style={{
                                                            ...provided
                                                                .draggableProps
                                                                .style,
                                                        }}
                                                    >
                                                        <h4>{task.title}</h4>
                                                        <p>{task.assignee}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    )}
                                    <AddButton
                                        onClick={() =>
                                            handleAddButton(Status.DONE)
                                        }
                                    ></AddButton>
                                </div>
                            )}
                        </Droppable>
                    </>
                </div>
            </DragDropContext>
        </div>
*/
