import "./NewTaskModal.css";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Input } from "./Input";
import { Status, Task } from "../types";
import { useEffect } from "react";
import { Modal } from "./Modal";

interface NewTaskProps {
    handleSubmit: (event: React.FormEvent) => void;
    toggleModal: () => void;
    newTask: Task;
    setNewTask: (task: Task | ((prevTask: Task) => Task)) => void;
    currentStatus: Status;
}

export const NewTaskModal = ({
    handleSubmit,
    toggleModal,
    newTask,
    setNewTask,
    currentStatus,
}: NewTaskProps) => {
    useEffect(() => {
        setNewTask({ ...newTask, status: currentStatus });
    }, []);

    return (
        <Modal
            title={"Create a new task"}
            handleSubmit={handleSubmit}
            toggleModal={toggleModal}
            submitText={"Create task"}
            isDeletable={false}
        >
            <Input
                title="Title"
                id="task-title"
                value={newTask.title}
                onChange={(e) =>
                    setNewTask((task) => ({
                        ...task,
                        title: e.target.value,
                    }))
                }
                required={true}
            />
            <div className="dropdown-group">
                <Select
                    title={"Status"}
                    id={"task-status"}
                    defaultValue={currentStatus}
                    values={[Status.TODO, Status.INPROGRESS, Status.DONE]}
                    onChange={(e) =>
                        setNewTask((task) => ({
                            ...task,
                            status: e.target.value as Status,
                        }))
                    }
                    required={true}
                ></Select>
                <Input
                    title={"Assignee"}
                    id={"task-assignee"}
                    value={newTask.assignee}
                    onChange={(e) =>
                        setNewTask((task) => ({
                            ...task,
                            assignee: e.target.value,
                        }))
                    }
                    required={true}
                ></Input>
            </div>
            <Textarea
                title={"Description"}
                id="task-description"
                value={newTask.description}
                onChange={(e) =>
                    setNewTask(
                        (task: Task): Task => ({
                            ...task,
                            description: e.target.value,
                        })
                    )
                }
                required={true}
            />
        </Modal>
    );
};
