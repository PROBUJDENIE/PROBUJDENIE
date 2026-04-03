import "./lectureTasksPreviewBlock.css"
export default function LectureTasksPreviewBlock({ lecture, block, onChange, allExercises = [] }) {
    if (!lecture) return <div className="block block-task">Выберите лекцию</div>;

    const selectedTaskId = block.exerciseId || "";

    const handleSelect = (e) => {
        onChange({ exerciseId: e.target.value });
    };

    return (
        <div className="block block-task">
            <select value={selectedTaskId} onChange={handleSelect}>
                <option value="">Выберите задание</option>
                {allExercises.map(task => (
                    <option key={task.id} value={task.id}>
                        {task.title || "Без названия"}
                    </option>
                ))}
            </select>
        </div>
    );
}