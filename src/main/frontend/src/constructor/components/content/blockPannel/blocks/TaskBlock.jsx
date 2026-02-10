export default function TaskBlock({ block, onChange }) {
    const content = block.content?.content ?? {};
    const title = content.title ?? "";
    const description = content.description ?? "";
    const initialCode = content.initialCode ?? "";
    const inputCode = content.inputCode ?? "";
    const outputCode = content.outputCode ?? "";

    const handleChange = (field, newValue) => {
        onChange({
            ...content,
            [field]: newValue,
        });
    };

    return (
        <div className="block block-task">
            <h1 style={{  fontSize: "18px", fontWeight: "700"}}>Название </h1>
            <input
                type="text"
                placeholder="Введите название задания"
                value={title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
            <h1 style={{  fontSize: "18px", fontWeight: "700"}}>Описание </h1>
            <textarea
                placeholder="Введите описание задачи"
                value={description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
            />
            <h1 style={{ fontFamily: "monospace", fontSize: "15px"}}>initial code</h1>
            <textarea
                placeholder="Введите начальный код"
                value={initialCode}
                onChange={(e) => handleChange("initialCode", e.target.value)}
                rows={6}
                style={{ fontFamily: "monospace" }}
            />
            <h1 style={{ fontFamily: "monospace", fontSize: "15px"}}>input data</h1>
            <textarea
                placeholder="Введите входные данные"
                value={inputCode}
                onChange={(e) => handleChange("inputCode", e.target.value)}
                rows={3}
                style={{ fontFamily: "monospace" }}
            />
            <h1 style={{ fontFamily: "monospace", fontSize: "15px"}}>output data</h1>
            <textarea
                placeholder="Введите выходные данные"
                value={outputCode}
                onChange={(e) => handleChange("outputCode", e.target.value)}
                rows={3}
                style={{ fontFamily: "monospace" }}
            />
        </div>
    );
}
