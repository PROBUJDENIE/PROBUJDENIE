import delTask from "../../../../resources/images/del_task.svg"
import confirmTask from "../../../../resources/images/confirm_task.svg"
export default function TaskBlock({block, onChange, updateExercise, createExercise, setDraftExercise, deleteExercise}) {
    const exercise = block.exercise;
    if (!exercise) return null;

    const handleChange = (field, value) => {
        onChange({ [field]: value });
    };
    const handleSave = async () => {
        try {
            if (exercise.id) {
                await updateExercise(exercise);
            } else {
                await createExercise(exercise);
                setDraftExercise(null);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDel = async () => {
        if (!exercise.id) {
            setDraftExercise(null);
        } else {
            await deleteExercise(exercise.id);
        }
    };
    return (
        <div className="block block-task">
            <h1 style={{fontSize: "18px", fontWeight: "700"}}>Название</h1>
            <input type="text" placeholder="Введите название задания" value={exercise.title ?? ""}
                onChange={(e) => handleChange("title", e.target.value)}/>

            <h1 style={{fontSize: "18px", fontWeight: "700"}}>Описание</h1>
            <textarea placeholder="Введите описание задачи" value={exercise.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}/>

            <h1 style={{fontFamily: "monospace", fontSize: "15px"}}>initial code</h1>
            <textarea placeholder="Введите начальный код" value={exercise.defaultCode ?? ""}
                onChange={(e) => handleChange("defaultCode", e.target.value)}
                rows={6} style={{fontFamily: "monospace"}}/>

            <h1 style={{fontFamily: "monospace", fontSize: "15px"}}>input data</h1>
            <textarea placeholder="Введите входные данные" value={exercise.inputData ?? ""}
                onChange={(e) => handleChange("inputData", e.target.value)}
                rows={3} style={{fontFamily: "monospace"}}/>

            <h1 style={{fontFamily: "monospace", fontSize: "15px"}}>output data</h1>
            <textarea placeholder="Введите выходные данные" value={exercise.outputData ?? ""}
                onChange={(e) => handleChange("outputData", e.target.value)}
                rows={3} style={{fontFamily: "monospace"}}/>
            <div className="task-buttons">
                <button className={"btnr"} onClick={handleDel}> <img src={delTask}/></button>
                <button className={"btnr"} onClick={handleSave}> <img src={confirmTask}/></button>
            </div>
        </div>
    );
}