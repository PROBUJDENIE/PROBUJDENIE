import "./myProfile.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonLink from "@/main-page/compoents/prototype/link/CommonLink.jsx";
import courses from "./resourses/courses.svg"
import analysis from "./resourses/analysis.svg"
import settings from "./resourses/settings.svg"
import logout from "./resourses/logout.svg"
import avatar from "./resourses/avatar.png"
import {ADMIN_PROFILE_ROUTE, USER_PROFILE_ROUTE} from "@/utils/constants.jsx";
import {useNavigate} from "react-router-dom";


export function MyProfileAdmin({ modalState, changeModalState}) {
    const navigate = useNavigate();
    if (modalState !== 32) return null;
    const handleCancel = () => changeModalState(0);

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-block-profile" onClick={e => e.stopPropagation()}>
                <Logo />

                <div className="profile-avatar">
                    <img src={avatar} alt="avatar" className="profile-avatar__img" />
                </div>

                <p className="profile-name">Владимир</p>
                <hr className="profile-divider" />
                <p className="profile-email">belokov_v2@mail.ru</p>

                <ul className="profile-nav">
                    <li className="nav-item-profile" onClick={() => navigate(ADMIN_PROFILE_ROUTE)}>
                        <CommonLink size={16} weight={800}>
                            <span className="nav-content-profile">
                                <img src={courses} alt="Мои курсы" className="nav-icon-profile-b" />
                                <p>Все курсы</p>
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item-profile">
                        <CommonLink size={16} weight={800}>
                            <span className="nav-content-profile">
                                <img src={analysis} alt="Аналитика" className="nav-icon-profile-s" />
                                <p>Аналитика</p>
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item-profile">
                        <CommonLink size={16} weight={800}>
                            <span className="nav-content-profile">
                                <img src={settings} alt="Настройки" className="nav-icon-profile-b" />
                                <p>Настройки</p>
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item-profile nav-item--logout" onClick={() => changeModalState(30)}>
                        <CommonLink size={16} weight={800} >
                            <span className="nav-content-profile">
                                <img src={logout} alt="Выйти" className="nav-icon-profile-s" />
                                <p>Выйти</p>
                            </span>
                        </CommonLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}