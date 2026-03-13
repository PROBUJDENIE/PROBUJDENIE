import "./blockPannelTasks.css"

export default function ConstructorBlocksPanelTasks({
                                                        exercises = [],
                                                        selectedExerciseId,
                                                        onSelect
                                                    }) {
    return (
        <aside className="blocks-panel">
            <div className="blocks-panel-tasks">
                <h3>Задания</h3>

                <ul className="tasks-list">
                    {exercises.map(ex => (
                        <li key={ex.id} className={ex.id === selectedExerciseId ? "task-item active" : "task-item"} onClick={() => onSelect(ex.id)}>
                            {ex.title || "Без названия"}
                        </li>
                    ))}
                </ul>

            </div>
        </aside>
    );
}