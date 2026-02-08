export default function TaskBlock({ block, onChange }) {
    const content = block.content || {};
    const title = content.title ?? "";
    const description = content.description ?? "";
    const initialCode = content.initialCode ?? "";

    const handleChange = (field, newValue) => {
        onChange({
            ...content,
            [field]: newValue,
        });
    };

    return (
        <div className="block block-task">
            <input
                type="text"
                placeholder="Введите название задания"
                value={title}
                onChange={(e) => handleChange("title", e.target.value)}
            />

            <textarea
                placeholder="Введите описание задачи"
                value={description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
            />

            <textarea
                placeholder="Введите начальный код"
                value={initialCode}
                onChange={(e) => handleChange("initialCode", e.target.value)}
                rows={6}
                style={{ fontFamily: "monospace" }}
            />
        </div>
    );
}
