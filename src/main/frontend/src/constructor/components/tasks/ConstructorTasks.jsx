import "./components/constructorTasks.css"
import {useState} from "react";
import {useConstructorCourse} from "../hooks/useConstructorCourse.js";
import editImage from "./resourses/hero-task.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../resources/images/save.svg";
import ConstructorNavigation from "../content/navigation/ConstructorNavigation.jsx";
import ConstructorWorkArea from "../content/workArea/ConstructorWorkArea.jsx";
import ConstructorBlocksPanelTasks from "./components/ConstructorBlocksPanelTasks.jsx";
import {moveDelete} from "@/constructor/components/hooks/blockOperations.js";
import Image from "../../resources/images/lPanel.svg"

export default function ConstructorTasks({course, setCourse, saveCourse}) {

    const [open, setOpen] = useState(false);
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const {
        activeSectionId,
        setActiveSectionId,
        activeLectureId,
        setActiveLectureId,
        blocks,
        addBlock,
        addSection,
        addLecture,
        updateBlock
    } = useConstructorCourse(course, setCourse, "tasks");
    const handleDelete = (blockId) => {
        const updatedCourse = moveDelete(course, activeSectionId, activeLectureId, blockId, "tasks");
        setCourse(updatedCourse);
    };
    return (
        <>
            <div className="constructor-content">
                <div className="constructor-content_lPanel">
                    <div className="constructor-content_lPanel-menu">
                        <button className={"btnr"} onClick={() => setOpen(true)}>
                            <img alt={""} src={Image}/>
                        </button>
                    </div>
                    <ConstructorNavigation
                        course={course}
                        activeSectionId={activeSectionId}
                        setActiveSectionId={setActiveSectionId}
                        activeLectureId={activeLectureId}
                        setActiveLectureId={setActiveLectureId}
                        open={open}
                        onClose={() => setOpen(false)}
                        saveSection={addSection}
                        saveLecture={addLecture}
                        setCourse={setCourse}
                        allowCreate={false}
                        allowRename={false}
                    ></ConstructorNavigation>
                </div>
                <div className="constructor-content_workArea">
                    {blocks.length ? (
                        <ConstructorWorkArea blocks={blocks} updateBlock={updateBlock} mode="tasks"
                                             onDelete={handleDelete}
                                             hoveredBlockId={hoveredBlockId}
                                             setHoveredBlockId={setHoveredBlockId}/>
                    ) : (
                        <div className="constructor-content_workArea_empty">
                            <div className="empty-state">
                                <h2 className="empty-state_title">Создание задания</h2>
                                <p className="empty-state_text">
                                    Выберите главу из списка слева, затем лекцию, чтобы начать создавать задания, а
                                    затем слева выберите блок задание.
                                </p>
                                <div className="empty-state_image">
                                    <img
                                        src={editImage}
                                        alt="Выберите лекцию"
                                        className="empty-state_img"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="constructor-content_tools">
                    <ConstructorBlocksPanelTasks onAdd={addBlock}></ConstructorBlocksPanelTasks>
                    <div className="constructor-content_tools_btn">
                        <CommonBtn
                            width={235}
                            height={50}
                            bgColor="#D9FF6A"
                            borderColor="#8A6CFF"
                            onClick={saveCourse}
                            size={20}
                            leftIcon={<img src={leftIcon} alt="книга" width={25} height={25}/>}
                        >
                            Сохранить курс
                        </CommonBtn>
                    </div>
                </div>
            </div>

        </>
    )
}
