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
        updateExercise
    } = useAdminExercises(course?.id);

    const handleCreate = async () => {
        try {
            await createExercise({
                title: `Задание ${exercises.length + 1}`,
                description: "Описание задания",
                programmingLanguage: "JAVA",
                inputData: "123",
                outputData: "123",
                defaultCode: "public class Main { public static void main(String[] args) {} }",
                timeLimit: 1,
                memoryLimit: 64
            });
        } catch (err) {
            console.error(err);
            alert("Не удалось создать задание");
        }
    };
    const exerciseBlocks = (exercises || [])
        .filter(Boolean)
        .map(ex => ({
            id: ex.id,
            type: "task",
            content: ex.title,
            exercise: ex
        }));
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
                    {exercises.length ? (
                        <ConstructorWorkArea
                            blocks={exerciseBlocks}
                            mode="tasks"
                            hoveredBlockId={hoveredBlockId}
                            setHoveredBlockId={setHoveredBlockId}
                            updateBlock={(updatedExercise) => updateExercise(updatedExercise)}
                        />
                    ) : (
                        <div className="constructor-content_workArea_empty">
                            <div className="empty-state">
                                <h2 className="empty-state_title">Создание задания</h2>
                                <p className="empty-state_text">Нажми на плюсик слева и создай задание, редактируй и прикрепляй к лекции!</p>
                                <div className="empty-state_image">
                                    <img src={editImage} alt="" className="empty-state_img"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="constructor-content_tools">
                    <ConstructorBlocksPanelTasks></ConstructorBlocksPanelTasks>
                </div>
            </div>
        </>
    )
}
