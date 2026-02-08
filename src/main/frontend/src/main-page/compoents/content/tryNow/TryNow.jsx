import "./tryNow.css"
import CommonBtn from "../../prototype/btn/CommonBtn.jsx";
import leftIcon from "../../../resources/images/book_white.svg";
import try_now from "@/main-page/resources/images/tryNow_header_img.png";

export default function TryNow() {
    return (
        <>
            <div className="try-now">
                <div className="try-now_header">
                    <div className="try-now_header-img">
                        <img src={try_now} alt={"df"}/>
                    </div>
                    <div className="try-now_header-title">Бесплатный урок</div>
                </div>
                <div className="try-now_text">
                    <div className="try-now_text-title">
                        Попробуй Git прямо сейчас
                    </div>
                    <div className="try-now_text-desc">
                        Боб советует начать с ремонта старого сервера с дедовской мастерской, <br/> это даст возможность хранить твои наработки
                    </div>
                </div>
                <div className="try-now_btns">
                    <CommonBtn className="try-now_btn-1" width={400} height={68} fontColor={"white"} size={20} bgColor={"#8A6CFF"} leftIcon={<img src={leftIcon} alt="книга" />}>Начать первый урок</CommonBtn>
                    <CommonBtn className="try-now_btn-2" width={400} height={68} size={20} borderColor={"#000000"}>Записаться на полный курс</CommonBtn>
                </div>
            </div>

        </>
    )
}
