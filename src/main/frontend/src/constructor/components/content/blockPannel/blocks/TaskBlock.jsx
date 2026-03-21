import delTask from "../../../../resources/images/del_task.svg"
import confirmTask from "../../../../resources/images/confirm_task.svg"
import "./taskBlock.css"
export default function TaskBlock({block, onChange, openDeleteModal, openSaveModal, openErrorModal}) {
    const exercise = block.exercise;
    if (!exercise) return null;

    const handleChange = (field, value) => {
        onChange({ [field]: value });
    };

    const programmingLanguages = [
        { value: "java", label: "Java" },
        { value: "python", label: "Python" },
        { value: "javascript", label: "JavaScript" },
        { value: "cpp", label: "C++" },
        { value: "csharp", label: "C#" },
    ];
    return (
        <div className="block block-task">
            <h1 style={{fontSize: "18px", fontWeight: "700"}}>Название *</h1>
            <input type="text" placeholder="Введите название задания" value={exercise.title ?? ""}
                onChange={(e) => handleChange("title", e.target.value)}/>

            <h1 style={{fontSize: "18px", fontWeight: "700"}}>Описание *</h1>
            <textarea placeholder="Введите описание задачи" value={exercise.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}/>


            <h1 style={{fontSize: "18px", fontWeight: "700", margin: "10px"}}>Язык программирования *</h1>
            <select
                value={exercise.programmingLanguage ?? "java"}
                onChange={(e) => handleChange("programmingLanguage", e.target.value)}
                style={{ padding: "8px", marginBottom: "15px", width: "95%"}}>
                {programmingLanguages.map(lang => (<option key={lang.value} value={lang.value}>{lang.label}</option>))}
            </select>

            <h1 style={{fontSize: "18px", fontWeight: "700"}}>Начальный код</h1>
            <textarea placeholder="Введите начальный код" value={exercise.defaultCode ?? ""}
                onChange={(e) => handleChange("defaultCode", e.target.value)}
                rows={6} style={{fontFamily: "monospace"}}/>

            <div className={"block-rules"}>
                <h1 style={{fontSize: "18px", fontWeight: "700"}}>Условия проверки</h1>
                <div className={"block-rules-input"}>
                    <h1 style={{ fontSize: "18px"}}>Входные данные * </h1>
                    <input placeholder="Введите входные данные" value={exercise.inputData ?? ""}
                           onChange={(e) => handleChange("inputData", e.target.value)} style={{fontFamily: "monospace"}}/>
                </div>
                <div className={"block-rules-input"}>
                    <h1 style={{fontSize: "18px"}}>Выходные данные * </h1>
                    <input placeholder="Введите выходные данные" value={exercise.outputData ?? ""}
                           onChange={(e) => handleChange("outputData", e.target.value)} style={{fontFamily: "monospace"}}/>
                </div>
                <div className={"block-rules-input"}>
                    <h1 style={{fontSize: "18px"}}>Ограничение по времени</h1>
                    <input placeholder="Введите ограничение по времени" value={exercise.timeLimit ?? ""}
                           onChange={(e) => handleChange("timeLimit", e.target.value)} style={{fontFamily: "monospace"}}/>
                </div>
                <div className={"block-rules-input"}>
                    <h1 style={{fontSize: "18px"}}>Ограничение по памяти</h1>
                    <input placeholder="Введите ограничение по памяти" value={exercise.memoryLimit ?? ""}
                           onChange={(e) => handleChange("memoryLimit", e.target.value)} style={{fontFamily: "monospace"}}/>
                </div>
            </div>

            <div className="task-buttons">
                <button className={"btnr"} onClick={() => openDeleteModal(exercise.id)}> <img src={delTask}/></button>
                <button className={"btnr"} onClick={() => {
                    if (!exercise.title || !exercise.description || !exercise.inputData || !exercise.outputData
                    ) {openErrorModal();return;}
                    openSaveModal(exercise.id);
                }}> <img src={confirmTask}/></button>
            </div>
        </div>
    );
}