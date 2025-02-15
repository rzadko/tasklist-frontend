import { Status } from "../types";
import "./Select.css";

export interface SelectProps {
    title: string;
    id: string;
    values: Status[];
    value?: string | Status;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required: boolean;
    defaultValue?: string | Status;
}

export const Select = ({
    title,
    id,
    values,
    onChange,
    required,
    defaultValue,
}: SelectProps) => {
    return (
        <div className="select-container">
            <label className="select-label" htmlFor={id}>
                {title}
            </label>
            <select
                className="dropdown"
                id={id}
                defaultValue={defaultValue}
                key={id}
                onChange={onChange}
                required={required}
            >
                {values.map((val) => (
                    <option>{val}</option>
                ))}
            </select>
        </div>
    );
};
