import "./constructorContent.css"
import {useState} from "react";
import ConstructorBlocksPanel from "./blockPannel/ConstructorBlocksPanel.jsx";
import ConstructorWorkArea from "./workArea/ConstructorWorkArea.jsx";
import ConstructorNavigation from "./navigation/ConstructorNavigation.jsx";
import {useConstructorCourse} from "../hooks/useConstructorCourse.js";
import editImage from "../../resources/images/edit.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../resources/images/save.svg";
import { moveDown, moveUp} from "../hooks/blockOperations.js";
import Image from "../../resources/images/lPanel.svg"
import {useAdminCourseContent} from "@/api/hooks/useAdminCourseContent.js";
import {useAdminExercises} from "@/api/hooks/useAdminExercises.js";
import {adminApi} from "@/api/admin.api.js";
import {ConfirmModalDelLecture} from "@/modal-confirm/lecture/ConfirmModalDelLecture.jsx";
import {ConfirmModalDelSection} from "@/modal-confirm/section/ConfirmModalDelSection.jsx";
export default function ConstructorContent({course, setCourse}) {

    const [open, setOpen] = useState(false);
    const [hoveredBlockId, setHoveredBlockId] = useState(null);
    const [modalState, setModalState] = useState(0);
    const [activeSectionIdForDelete, setActiveSectionIdForDelete] = useState(null);
    const [activeLectureIdForDelete, setActiveLectureIdForDelete] = useState(null);
    const {activeSectionId, setActiveSectionId, activeLectureId, setActiveLectureId, blocks, addBlock, addSection, addLecture, updateBlock, activeLecture, setLocalBlocks, deleteBlock} = useConstructorCourse(course, setCourse, "content");
    const {exercises} = useAdminExercises(course?.id);
    useAdminCourseContent(course.id, activeSectionId, setActiveSectionId, setCourse);

    return (
        <>
            <div className="constructor-content">
                <div className="constructor-content_lPanel">
                    <div className="constructor-content_lPanel-menu">
                        <button  className={"btnr"} onClick={() => setOpen(true)}>
                            <img alt={"меню"} src={Image} />
                        </button>
                    </div>
                    <ConstructorNavigation course={course} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} activeLectureId={activeLectureId} setActiveLectureId={setActiveLectureId}
                        open={open} onClose={() => setOpen(false)} saveSection={addSection} saveLecture={addLecture} setCourse={setCourse}
                        openDeleteSection={(id) => {setActiveSectionIdForDelete(id);setModalState(27);}}
                        openDeleteLecture={(id) => {setActiveLectureIdForDelete(id);setModalState(26);}}
                    ></ConstructorNavigation>
                </div>
                <div className="constructor-content_workArea">
                    {blocks.length ? (
                        <ConstructorWorkArea blocks={blocks} updateBlock={updateBlock} activeLecture={activeLecture} mode="content" hoveredBlockId={hoveredBlockId}
                            setHoveredBlockId={setHoveredBlockId} onDelete={deleteBlock} onMoveUp={blockId => setLocalBlocks(prev => moveUp(prev, blockId))}
                            onMoveDown={blockId => setLocalBlocks(prev => moveDown(prev, blockId))} allExercises={exercises}
                        />
                    ) : (
                        <div className="constructor-content_workArea_empty">
                            <div className="empty-state">
                                <h2 className="empty-state_title">Редактирование лекции</h2>
                                <p className="empty-state_text"> Выберите главу из списка слева, затем лекцию, чтобы начать редактирование, а затем добавьте необходимые блоки.</p>
                                <div className="empty-state_image">
                                    <img src={editImage} alt="" className="empty-state_img"/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="constructor-content_tools">
                    <ConstructorBlocksPanel onAdd={addBlock}></ConstructorBlocksPanel>
                    <div className="constructor-content_tools_btn">
                        <CommonBtn width={235} height={50} bgColor="#D9FF6A" borderColor="#8A6CFF"  size={20} leftIcon={<img src={leftIcon} alt="книга" width={25} height={25} />}>Сохранить курс</CommonBtn>
                    </div>
                </div>
            </div>
            <ConfirmModalDelSection modalState={modalState} changeModalState={setModalState} courseId={activeSectionIdForDelete}
                onConfirm={async (id) => {await adminApi.deleteSection(id);
                    setCourse(prev => ({...prev, sections: prev.sections.filter(s => s.id !== id)}));}}
            />

            <ConfirmModalDelLecture modalState={modalState} changeModalState={setModalState} courseId={activeLectureIdForDelete}
                onConfirm={async (id) => {await adminApi.deleteLecture(id);
                    setCourse(prev => ({...prev, sections: prev.sections.map(section => ({...section, lectures: section.lectures.filter(l => l.id !== id)}))}));}}
            />

        </>
    )
}
