import CommonLink from "../../../prototype/link/CommonLink.jsx";
import allImage from "../../../../resources/images/all.svg";
import resImage from "../../../../resources/images/res.svg";
import starImage from "../../../../resources/images/star1.svg";
import giftImage from "../../../../resources/images/gift.svg";
import questImage from "../../../../resources/images/que.svg";

export default function NavigationHedear() {
    return (
        <>
            <nav className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#course-list"} >
                            <span className="nav-content">
                                <img src={allImage} alt="Курсы" className="nav-icon" />
                                Все курсы
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#aboutUs"}>
                           <span className="nav-content">
                               <img src={resImage} alt="О нас" className="nav-icon" />
                               О нас
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} >
                           <span className="nav-content">
                               <img src={starImage} alt="Отзывы" className="nav-icon" />
                               Отзывы
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} >
                           <span className="nav-content">
                               <img src={giftImage} alt="Подарок за друга" className="nav-icon" />
                               Подарок за друга
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#question"} >
                           <span className="nav-content">
                               <img src={questImage} alt="Подарок за друга" className="nav-icon" />
                               Вопросы
                           </span>
                        </CommonLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}