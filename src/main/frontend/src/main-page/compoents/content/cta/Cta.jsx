import "./cta.css"
import CommonBtn from "../../prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../resources/images/book.svg";


export default function Cta() {
    return (
        <>
            <div className="cta">
                <div className="cta-title">
                    Ждешь идеального момента?
                </div>
                <div className="cta-desc">
                    Пока ты размышляешь, другие уже получают результат. Хватит откладывать — стартуй!
                </div>
                <CommonBtn width={330} height={56} bgColor={"#D2FE66"} borderColor={"#8A6CFF"} size={20}
                    onClick={() => {
                        document.getElementById("course-list")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    leftIcon={<img src={leftIcon} alt="книга" />}
                >Начать обучение</CommonBtn>
            </div>

        </>
    )
}
