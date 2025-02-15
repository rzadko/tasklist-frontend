import "./Slider.css";

interface SliderProps {
    isDarkMode: boolean;
    setIsDarkMode: (state: boolean) => void;
}

export const Slider = ({ isDarkMode, setIsDarkMode }: SliderProps) => {
    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    onChange={toggleMode}
                    checked={isDarkMode}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
};
