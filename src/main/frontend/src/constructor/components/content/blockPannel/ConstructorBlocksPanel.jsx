import "./blockPannel.css"
import title from "../../../resources/images/title.svg"
import text from "../../../resources/images/text.svg"
import image from "../../../resources/images/image.svg"
import task from "../../../resources/images/task.svg"
export default function ConstructorBlocksPanel({ onAdd }) {

    return (
        <>
            <aside className="blocks-panel">
                <h3>Блоки</h3>
                <button className={"btn_add"} onClick={() => onAdd("title")}>
                    <img src={title}/>
                    Заголовок</button>
                <button className={"btn_add"} onClick={() => onAdd("text")}>
                    <img src={text}/>
                    Абзац</button>
                <button className={"btn_add"} onClick={() => onAdd("image")}>
                    <img src={image}/>
                    Изображение</button>
                <button className={"btn_add"} onClick={() => onAdd("exercise")}>
                    <img src={task}/>
                    Задания лекции
                </button>
            </aside>

        </>
    )
}
