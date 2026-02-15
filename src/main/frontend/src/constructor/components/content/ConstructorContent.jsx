import "./constructorContent.css"
import {useState} from "react";
import ConstructorBlocksPanel from "./blockPannel/ConstructorBlocksPanel.jsx";
import ConstructorWorkArea from "./workArea/ConstructorWorkArea.jsx";
import ConstructorNavigation from "./navigation/ConstructorNavigation.jsx";
import {useConstructorCourse} from "../hooks/useConstructorCourse.js";
import editImage from "../../resources/images/edit.png";
import CommonBtn from "../../../main-page/compoents/prototype/btn/CommonBtn.jsx";
import leftIcon from "../../resources/images/save.svg";
import {moveDelete, moveDown, moveUp} from "../hooks/blockOperations.js";
import Image from "../../resources/images/lPanel.svg"
export default function ConstructorContent({course, setCourse, saveCourse}) {

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
        updateBlock,
        activeLecture
    } = useConstructorCourse(course, setCourse, "content");
    const handleMoveUp = (blockId) => {
        const updatedCourse = moveUp(course, activeSectionId, activeLectureId, blockId);
        setCourse(updatedCourse);
    };

    const handleMoveDown = (blockId) => {
        const updatedCourse = moveDown(course, activeSectionId, activeLectureId, blockId);
        setCourse(updatedCourse);
    };

    const handleDelete = (blockId) => {
        const updatedCourse = moveDelete(course, activeSectionId, activeLectureId, blockId);
        setCourse(updatedCourse);
    };

    return (
        <>
            <div className="constructor-content">
                <div className="constructor-content_lPanel">
                    <div className="constructor-content_lPanel-menu">
                        <button  className={"btnr"} onClick={() => setOpen(true)}>
                            <img alt={"меню"} src={Image} />
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
                    ></ConstructorNavigation>
                </div>
                <div className="constructor-content_workArea">
                    {blocks.length ? (
                        <ConstructorWorkArea
                            blocks={blocks}
                            updateBlock={updateBlock}
                            activeLecture={activeLecture}
                            mode="content"
                            hoveredBlockId={hoveredBlockId}
                            setHoveredBlockId={setHoveredBlockId}
                            onMoveUp={handleMoveUp}
                            onMoveDown={handleMoveDown}
                            onDelete={handleDelete}
                        />
                    ) : (
                        <div className="constructor-content_workArea_empty">
                            <div className="empty-state">
                                <h2 className="empty-state_title">Редактирование лекции</h2>
                                <p className="empty-state_text">
                                    Выберите главу из списка слева, затем лекцию, чтобы начать редактирование, а затем добавьте необходимые блоки.
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
                    <ConstructorBlocksPanel onAdd={addBlock}></ConstructorBlocksPanel>
                    <div className="constructor-content_tools_btn">
                        <CommonBtn
                            width={235}
                            height={50}
                            bgColor="#D9FF6A"
                            borderColor="#8A6CFF"
                            onClick={saveCourse}
                            size={20}
                            leftIcon={<img src={leftIcon} alt="книга" width={25} height={25} />}
                        >
                            Сохранить курс
                        </CommonBtn>
                    </div>
                </div>
            </div>

        </>
    )
}
