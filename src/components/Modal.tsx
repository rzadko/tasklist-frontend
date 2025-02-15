import "./Modal.css";

interface ModalProps {
    title: string;
    handleSubmit: (event: React.FormEvent) => void;
    toggleModal: () => void;
    isDeletable: boolean;
    handleDelete?: () => void;
    submitText: string;
    children: React.ReactNode;
}

export const Modal = ({
    title,
    handleSubmit,
    toggleModal,
    isDeletable,
    handleDelete,
    submitText,
    children,
}: ModalProps) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <span
                        className="material-symbols-outlined close-modal"
                        onClick={toggleModal}
                    >
                        close
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    {children}
                    <div className="modal-actions">
                        {" "}
                        {isDeletable && handleDelete && (
                            <button
                                type="button"
                                className="button delete-button"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        )}
                        <button className="button submit-button" type="submit">
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
