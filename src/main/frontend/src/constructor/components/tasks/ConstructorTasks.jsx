import "./components/constructorTasks.css"
import {useState} from "react";
import editImage from "./resourses/hero-task.png";
import ConstructorWorkArea from "../content/workArea/ConstructorWorkArea.jsx";
import ConstructorBlocksPanelTasks from "./components/ConstructorBlocksPanelTasks.jsx";
import Image from "../../resources/images/add_task.svg"
import {useAdminExercises} from "@/api/hooks/useAdminExercises.js";

export default function ConstructorTasks({course}) {
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const {
        exercises,
        loading,
        error,
        createExercise,
        updateExercise, deleteExercise, updateExerciseLocal
    } = useAdminExercises(course?.id);
    const [draftExercise, setDraftExercise] = useState(null);

    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const handleCreate = () => {
        if (draftExercise) return;
        setSelectedExerciseId(null);
        setDraftExercise({id: null, title: "", description: "", programmingLanguage: "JAVA", inputData: "", outputData: "", defaultCode: ""});};

    const exerciseBlocks = [
        ...(draftExercise ? [{id: "draft", type: "task", exercise: draftExercise}] : []),
        ...(exercises || [])
            .filter(ex => ex.id === selectedExerciseId)
            .map(ex => ({id: ex.id, type: "task", exercise: ex}))];
    if (loading) return <div>Загрузка заданий...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <>
            <div className="constructor-content">
                <div className="constructor-content_lPanel">
                    <div className="constructor-content_lPanel-menu">
                        <button className={"btnr"} onClick={handleCreate}>
                            <img alt={""} src={Image} height={73} width={73}/>
                        </button>
                    </div>
                </div>
                <div className="constructor-content_workArea">
                    {exerciseBlocks.length ? (
                        <ConstructorWorkArea
                            blocks={exerciseBlocks}
                            mode="tasks"
                            hoveredBlockId={hoveredBlockId}
                            setHoveredBlockId={setHoveredBlockId}
                            updateBlock={(exercise) => {
                                if (!exercise.id) {
                                    setDraftExercise(exercise);
                                } else {
                                    updateExerciseLocal(exercise);
                                }
                            }}
                            createExercise={createExercise}
                            updateExercise={updateExercise}
                            deleteExercise={deleteExercise}
                            setDraftExercise={setDraftExercise}

                        />
                    ) : (
                        <div className="constructor-content_workArea_empty">
                            <div className="empty-state">
                                <h2 className="empty-state_title">Создание задания</h2>
                                <p className="empty-state_text">Нажми на плюсик слева и создай задание, редактируй и сохраняй! Выбирай уже созданные справа</p>
                                <div className="empty-state_image">
                                    <img src={editImage} alt="" className="empty-state_img"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="constructor-content_tools">
                    <ConstructorBlocksPanelTasks exercises={exercises}
                                                 selectedExerciseId={selectedExerciseId}
                                                 onSelect={setSelectedExerciseId}></ConstructorBlocksPanelTasks>
                </div>
            </div>
        </>
    )
}
