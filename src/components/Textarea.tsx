import "./Textarea.css";

export interface TextareaProps {
    title: string;
    id: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required: boolean;
}

export const Textarea = ({
    title,
    id,
    value,
    onChange,
    required,
}: TextareaProps) => {
    return (
        <div className="textarea-container">
            <label className="textarea-label" htmlFor={id}>
                {title}
            </label>
            <textarea
                className="textarea"
                id={id}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};
