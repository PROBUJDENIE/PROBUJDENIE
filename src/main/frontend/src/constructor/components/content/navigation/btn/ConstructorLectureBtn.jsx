import CommonBtn from "../../../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import "../../constructorContent.css"
import "../navigation.css"
import {useState} from "react";
export default function ConstructorLectureBtn({ title, isActive, onSelect, onRename}) {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(title);

    function save() {
        if (value.trim() && value !== title) {
            onRename(value.trim());
        }
        setIsEditing(false);
    }

    function cancel() {
        setValue(title);
        setIsEditing(false);
    }

    return (
        <div
            className={`constructor-lecture-btn btn ${isActive ? "constructor-lecture-btn-active" : ""}`}
            onClick={onSelect}
            onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
            }}
        >
            {isEditing ? (
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={save}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") save();
                        if (e.key === "Escape") cancel();
                    }}
                />
            ) : (
                <span>{title}</span>
            )}
        </div>
    );
}
