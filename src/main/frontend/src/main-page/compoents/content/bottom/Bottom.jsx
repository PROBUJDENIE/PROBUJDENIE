import "./bottom.css"
import CommonBtn from "../../prototype/btn/CommonBtn.jsx";
export default function Bottom() {

    return (
        <>
            <div className="bottom">
                <div className="bottom-title">PROBUJDENIE</div>
                <div className="bottom-desc">Образовательная платформа с игровым подходом к обучению</div>
                <div className="bottom-btns">
                    <CommonBtn width={370} height={40} size={22} borderColor={"#8A6CFF"} onClick={() => window.open("https://web.telegram.org/a/#1133165164", "_blank") }>@V_BELIKOV_V</CommonBtn>
                    <CommonBtn width={370} height={40} size={22} borderColor={"#8A6CFF"}  onClick={() => window.open("https://web.telegram.org/a/#1133165164", "_blank") }>probujdenie@mail.ru</CommonBtn>
                </div>
                <div className="bottom-rules">
                    <img className="bottom-rules_img" src={"src/main-page/resources/images/bottom.png"} alt={""}></img>
                    <div className="bottom-rules_text">2026 PROBUJDENIE. Все права защищены.</div>
                </div>
            </div>
        </>
    )
}