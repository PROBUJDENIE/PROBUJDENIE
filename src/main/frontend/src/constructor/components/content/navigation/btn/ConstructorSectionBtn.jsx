import { useState } from "react";

export default function ConstructorSectionBtn({ title, isActive, onSelect, onRename}) {

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
            className={`constructor-section-btn btn ${isActive ? "constructor-section-btn-active" : ""}`}
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
