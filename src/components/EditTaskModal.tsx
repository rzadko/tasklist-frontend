import { useEffect, useState } from "react";
import { Status, Task } from "../types";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { Select } from "./Select";
import { Textarea } from "./Textarea";

interface EditTaskModalProps {
    title: string;
    handleEditSubmit: (event: React.FormEvent) => void;
    toggleModal: () => void;
    handleDelete: (id: string) => void;
    submitText: string;
    updatedTask: Task;
    setUpdatedTask: (task: Task) => void;
}

export const EditTaskModal = ({
    title,
    handleEditSubmit,
    toggleModal,
    handleDelete,
    submitText,
    updatedTask,
    setUpdatedTask,
}: EditTaskModalProps) => {
    const [toDelete, setToDelete] = useState(false);

    useEffect(() => {
        if (toDelete) {
            handleDelete(updatedTask._id);
            toggleModal();
        }
    }, [toDelete]);

    return (
        <Modal
            title={title}
            handleSubmit={handleEditSubmit}
            toggleModal={toggleModal}
            submitText={submitText}
            isDeletable={true}
            handleDelete={() => setToDelete(!toDelete)}
        >
            <Input
                title="Title"
                id="task-title"
                value={updatedTask.title}
                onChange={(e) =>
                    setUpdatedTask({
                        ...updatedTask,
                        title: e.target.value,
                    })
                }
                required={true}
            />
            <div className="dropdown-group">
                <Select
                    title={"Status"}
                    id={"task-status"}
                    value={updatedTask.status}
                    values={[Status.TODO, Status.INPROGRESS, Status.DONE]}
                    onChange={(e) =>
                        setUpdatedTask({
                            ...updatedTask,
                            status: e.target.value as Status,
                        })
                    }
                    required={true}
                ></Select>
                <Input
                    title={"Assignee"}
                    id={"task-assignee"}
                    value={updatedTask.assignee}
                    onChange={(e) =>
                        setUpdatedTask({
                            ...updatedTask,
                            assignee: e.target.value,
                        })
                    }
                    required={true}
                ></Input>
            </div>
            <Textarea
                title={"Description"}
                id="task-description"
                value={updatedTask.description}
                onChange={(e) =>
                    setUpdatedTask({
                        ...updatedTask,
                        description: e.target.value,
                    })
                }
                required={true}
            />
        </Modal>
    );
};
