import "./lectureTasksPreviewBlock.css"
export default function LectureTasksPreviewBlock({ lecture, block, onChange }) {
    if (!lecture) return <div className="block block-task">Выберите лекцию</div>;

    const tasks = lecture.taskBlocks || [];
    const selectedTaskId = block.content?.taskId || "";

    const handleSelect = (e) => {
        const id = e.target.value;
        onChange({
            ...block.content,
            taskId: id
        });
    };

    return (
        <div className="block block-task">
            <select value={selectedTaskId} onChange={handleSelect}>
                <option value="">Выберите задание</option>
                {tasks.map(task => (
                    <option key={task.id} value={task.id}>
                        {task.content?.content?.title || "Без названия"}
                    </option>
                ))}
            </select>
        </div>
    );
}
