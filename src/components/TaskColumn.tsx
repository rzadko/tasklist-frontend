import "./TaskColumn.css";

interface TaskColumnProps {
    title: string;
}

export const TaskColumn = ({ title }: TaskColumnProps) => {
    return (
        <div>
            <label className="label">{title}</label>
            <div className="column"></div>
        </div>
    );
};
