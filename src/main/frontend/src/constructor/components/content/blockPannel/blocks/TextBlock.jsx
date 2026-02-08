import "../../constructorContent.css";

export default function TextBlock({ block, onChange }) {
    const value = block.content ?? "";

    return (
        <div className="block block-text">
            <textarea
                placeholder="Введите текст"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}