import "./AddButton.css";

interface AddButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
    return (
        <button className="add-button" onClick={onClick}>
            + Add Task
        </button>
    );
};
