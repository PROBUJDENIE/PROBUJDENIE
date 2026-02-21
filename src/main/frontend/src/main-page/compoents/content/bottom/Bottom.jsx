import "./bottom.css"
import CommonBtn from "../../prototype/btn/CommonBtn.jsx";
import btImage from "../../../resources/images/bottom.png"
import teleg from "../../../resources/images/teleg.svg"
import mail from "../../../resources/images/mail.svg"
export default function Bottom() {
    return (
        <>
            <div className="bottom">
                <div className="bottom-title">PROBUJDENIE</div>
                <div className="bottom-desc">Образовательная платформа с игровым подходом к обучению</div>
                <div className="bottom-btns">
                    <CommonBtn leftIcon={<img src={teleg} width={30} height={30}/>} width={370} height={40} size={22} borderColor={"#8A6CFF"} fontColor={333333} onClick={() => window.open("https://web.telegram.org/a/#1133165164", "_blank") }>@V_BELIKOV_V</CommonBtn>
                    <CommonBtn leftIcon={<img src={mail} width={30} height={30}/>} width={370} height={40} size={22} borderColor={"#8A6CFF"} fontColor={333333} onClick={() => window.open("https://web.telegram.org/a/#1133165164", "_blank") }>probujdenie@mail.ru</CommonBtn>
                </div>
                <div className="bottom-rules">
                    <img className="bottom-rules_img" src={btImage} alt={""}></img>
                    <div className="bottom-rules_text">2026 PROBUJDENIE. Все права защищены.</div>
                </div>
            </div>
        </>
    )
}