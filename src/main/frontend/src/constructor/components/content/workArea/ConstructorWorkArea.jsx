import TitleBlock from "../blockPannel/blocks/TitleBlock.jsx";
import TextBlock from "../blockPannel/blocks/TextBlock.jsx";
import ImageBlock from "../blockPannel/blocks/ImageBlock.jsx";
import TaskBlock from "../blockPannel/blocks/TaskBlock.jsx";
import {useCallback} from "react";
import LectureTasksPreviewBlock from "../../tasks/LectureTasksPreviewBlock.jsx";
import "./сonstructorWorkArea.css"

const BlockRenderer = function BlockRenderer({block, onChange, activeLecture, mode}) {
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
            return <TaskBlock block={block} onChange={onChange}/>;
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
                                                onDelete
                                            }) {

    const handleChange = useCallback(
        (blockId, content) => {
            updateBlock(blockId, {content});
        },
        [updateBlock]
    );
    const getOnChange = useCallback(
        (blockId) => (content) => handleChange(blockId, content),
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
                        <div className="block-controls" >
                            <button
                                className="btn-move-up"
                                onClick={() => onMoveUp(block.id)}
                            >
                                <img alt="вверх" src="src/constructor/resources/images/move-up.svg"/>
                            </button>
                            <button
                                className="btn-move-down"
                                onClick={() => onMoveDown(block.id)}
                            >
                                <img alt="вниз" src="src/constructor/resources/images/move-down.svg"/>
                            </button>
                            <button
                                className="btn-move-delete"
                                onClick={() => onDelete(block.id)}
                            >
                                <img alt="удалить" src="src/constructor/resources/images/move-delete.svg"/>
                            </button>
                        </div>
                    )}

                    <div className="block-wrapper">
                        <BlockRenderer
                            block={block}
                            onChange={getOnChange(block.id)}
                            activeLecture={activeLecture}
                            mode={mode}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}