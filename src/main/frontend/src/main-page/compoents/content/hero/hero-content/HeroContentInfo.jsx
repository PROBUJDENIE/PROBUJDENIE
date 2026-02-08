import "./hero-content.css"
import CommonBtn from "../../../prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../../resources/images/book.svg";

export default function HeroContentInfo() {
    return (
        <>
            <div className="hero-content_info">
                <h1 className={"hero-content_info_title"}>Стань Веб-разработчиком
                    и выйди на фриланс с 0
                    до первых клиентов</h1>
                <p className={"hero-content_info_desc"}>Освоишь одну из самых актуальных профессий и начнешь зарабатывать до 150 000 руб</p>
                <CommonBtn
                    width={482}
                    height={69}
                    bgColor={"#D2FE66"}
                    borderColor={"#8A6CFF"}
                    size={20}
                    onClick={() => {
                        document.getElementById("course-list")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    leftIcon={<img src={leftIcon} alt="книга" />}
                >Начать обучение</CommonBtn>
            </div>
        </>
    )
}
