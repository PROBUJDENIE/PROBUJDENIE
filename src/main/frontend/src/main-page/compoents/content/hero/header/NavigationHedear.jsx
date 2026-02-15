import CommonLink from "../../../prototype/link/CommonLink.jsx";
import allImage from "../../../../resources/images/allNew.png";
import resImage from "../../../../resources/images/aboutNew.png";
import starImage from "../../../../resources/images/revNew.png";
import giftImage from "../../../../resources/images/giftNew.png";
import questImage from "../../../../resources/images/queNew.png";

export default function NavigationHedear() {
    return (
        <>
            <nav className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#course-list"}  >
                            <span className="nav-content">
                                <img src={allImage} alt="Курсы" className="nav-icon" />
                                <p> Все курсы </p>
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#aboutUs"}>
                           <span className="nav-content">
                               <img src={resImage} alt="О нас" className="nav-icon" />
                               <p> О нас </p>
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} >
                           <span className="nav-content">
                               <img src={starImage} alt="Отзывы" className="nav-icon" />
                               <p> Отзывы </p>
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} >
                           <span className="nav-content">
                               <img src={giftImage} alt="Подарок за друга" className="nav-icon" />
                               <p> Подарок за друга </p>
                           </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item">
                        <CommonLink size={16} weight={800} href={"#question"} >
                           <span className="nav-content">
                               <img src={questImage} alt="Подарок за друга" className="nav-icon" />
                               <p> Вопросы </p>
                           </span>
                        </CommonLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}