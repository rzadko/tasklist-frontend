import "./Input.css";

export interface InputProps {
    title: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
}

export const Input = ({ title, id, value, onChange, required }: InputProps) => {
    return (
        <div className="input-container">
            <label className="input-label" htmlFor={id}>
                {title}
            </label>
            <input
                type="text"
                className="input"
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};
