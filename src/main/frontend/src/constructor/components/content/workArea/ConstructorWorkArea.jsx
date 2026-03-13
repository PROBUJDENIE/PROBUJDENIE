import TitleBlock from "../blockPannel/blocks/TitleBlock.jsx";
import TextBlock from "../blockPannel/blocks/TextBlock.jsx";
import ImageBlock from "../blockPannel/blocks/ImageBlock.jsx";
import TaskBlock from "../blockPannel/blocks/TaskBlock.jsx";
import {useCallback} from "react";
import LectureTasksPreviewBlock from "../../tasks/LectureTasksPreviewBlock.jsx";
import "./сonstructorWorkArea.css"
import moveUpImg from "../../..//resources/images/move-up.svg"
import moveDownImg from "../../..//resources/images/move-down.svg"
import moveDeleteImg from "../../..//resources/images/move-delete.svg"

const BlockRenderer = function BlockRenderer({block, onChange, activeLecture, mode, createExercise, updateExercise,deleteExercise, setDraftExercise }) {
    if (mode === "tasks" && block.type === "lectureTasksPreview") {
        return null;
    }
    switch (block.type) {
        case "title":
            return <TitleBlock block={block} onChange={onChange}/>;
        case "text":
            return <TextBlock block={block} onChange={onChange}/>;
        case "image":
            return <ImageBlock block={block} onChange={onChange}/>;
        case "task":
            return <TaskBlock block={block} onChange={onChange} createExercise={createExercise} updateExercise={updateExercise} deleteExercise={deleteExercise} setDraftExercise={setDraftExercise}/>;
        case "lectureTasksPreview":
            return (
                <LectureTasksPreviewBlock
                    lecture={activeLecture}
                    block={block}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
};


export default function ConstructorWorkArea({
                                                blocks,
                                                updateBlock,
                                                mode,
                                                activeLecture,
                                                hoveredBlockId,
                                                setHoveredBlockId,
                                                onMoveUp,
                                                onMoveDown,
                                                onDelete, updateExercise, createExercise, deleteExercise, setDraftExercise
                                            }) {

    const handleChange = useCallback(
        (block) => {
            if (block.type === "task") {
                updateBlock(block.exercise);
            } else {
                updateBlock(block.id, { content: block.content });
            }
        },
        [updateBlock]
    );
    const getOnChange = useCallback(
        (block) => (updatedContent) => {
            if (block.type === "task") {
                const updatedExercise = { ...block.exercise, ...updatedContent };
                handleChange({ ...block, exercise: updatedExercise });
            } else {
                handleChange({ ...block, content: updatedContent });
            }
        },
        [handleChange]
    );

    return (
        <div className="work-area">
            {blocks.map((block) => (
                <div
                    key={block.id}
                    className="block-row"
                    onMouseEnter={() => setHoveredBlockId(block.id)}
                    onMouseLeave={() => setHoveredBlockId(null)}>

                    {hoveredBlockId === block.id && (
                        <div className="block-controls" > {onMoveUp &&
                            <button
                                className="btn-move-up"
                                onClick={() => onMoveUp(block.id)}
                            >
                                <img alt="вверх" src={moveUpImg} />
                            </button>}
                            {onMoveDown && <button
                                className="btn-move-down"
                                onClick={() => onMoveDown(block.id)}
                            >
                                <img alt="вниз" src={moveDownImg} />
                            </button>}
                            {onDelete && <button
                                className="btn-move-delete"
                                onClick={() => onDelete(block.id)
                            }
                            >
                                <img alt="удалить" src={moveDeleteImg} />
                            </button>}
                        </div>
                    )}

                    <div className="block-wrapper">
                        <BlockRenderer
                            block={block}
                            onChange={getOnChange(block)}
                            activeLecture={activeLecture}
                            mode={mode}
                            updateExercise={updateExercise}
                            createExercise={createExercise}
                            deleteExercise={deleteExercise}
                            setDraftExercise={setDraftExercise}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}