import "./blockPannelTasks.css"
import task from "../../../resources/images/task.svg"
export default function ConstructorBlocksPanelTasks({ onAdd }) {

    return (
        <>
            <aside className="blocks-panel">
                <h3>Блоки</h3>
                <button className={"btn_add"} onClick={() => onAdd("task")}>
                    <img src={task}/>
                    Задание</button>
            </aside>
        </>
    )
}
