import "./myProfile.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonLink from "@/main-page/compoents/prototype/link/CommonLink.jsx";
import courses from "./resourses/courses.svg"
import notifications from "./resourses/notifications.svg"
import settings from "./resourses/settings.svg"
import logout from "./resourses/logout.svg"
import avatar from "./resourses/avatar.png"
import {USER_PROFILE_ROUTE} from "@/utils/constants.jsx";
import {useNavigate} from "react-router-dom";
import {useUserData} from "@/api/hooks/useUserData.js";
import {useAuth} from "@/autorisation/AuthContext.jsx";


export function MyProfile({ modalState, changeModalState}) {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { userData, loading } = useUserData(token);
    if (modalState !== 31) return null;
    const handleCancel = () => changeModalState(0);
    const fullName = `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim();

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal-block-profile" onClick={e => e.stopPropagation()}>
                <Logo />

                <div className="profile-avatar">
                    <img src={avatar} alt="avatar" className="profile-avatar__img" />
                </div>

                {loading ? (
                    <p className="profile-name">Загрузка...</p>
                ) : (
                    <>
                        <p className="profile-name">{fullName || "Пользователь"}</p>
                        <hr className="profile-divider" />
                        <p className="profile-email">{userData?.email || "email@example.com"}</p>
                    </>
                )}

                <ul className="profile-nav">
                    <li className="nav-item-profile" onClick={() => navigate(USER_PROFILE_ROUTE)}>
                        <CommonLink size={16} weight={800}>
                            <span className="nav-content-profile">
                                <img src={courses} alt="Мои курсы" className="nav-icon-profile-b" />
                                <p>Мои курсы</p>
                            </span>
                        </CommonLink>
                    </li>
                    <li className="nav-item-profile">
                        <CommonLink size={16} weight={800}>
                            <span className="nav-content-profile">
                                <img src={notifications} alt="Уведомления" className="nav-icon-profile-s" />
                                <p>Уведомления</p>
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