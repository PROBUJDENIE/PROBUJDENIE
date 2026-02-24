import "./loginBoxAdmin.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";;
import admin from "@/autorisation/resourses/admin.svg";
import {useLogin} from "@/hooks/useLogin.jsx";
import {USER_PROFILE_ROUTE} from "@/utils/constants.jsx";
import {useNavigate} from "react-router-dom";
export default function LoginBoxAdmin({ modalState, changeModalState}) {

    const { values, setField, submit, loading, error } = useLogin();
    const navigate = useNavigate();
    if (modalState !== 7) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        navigate(USER_PROFILE_ROUTE)
      //  await submit();
    };
    return (
        <>
            <div className="login-box-overlay" onClick={() => changeModalState(0)}>
                <div className="login-box-admin" onClick={e => e.stopPropagation()}>
                    <div className="login-box-header-admin">
                        <Logo></Logo>
                        <h2>Вход в аккаунт администратора</h2>
                        <h3>Добро пожаловать, мои создатели!</h3>
                    </div>

                    <form className="login-box-content-teacher" onSubmit={onSubmit}>
                        <div className="login-box-content_field">
                            <label>Почта*</label>
                            <input
                                type="email"
                                placeholder="example@mail.ru"
                                value={values.email}
                                onChange={setField("email")}
                                required
                            />
                        </div>
                        <div className="login-box-content_field">
                            <label>Пароль*</label>
                            <input
                                type="password"
                                placeholder="password"
                                value={values.password}
                                onChange={setField("password")}
                                required
                            />
                        </div>
                        {error && <div style={{fontSize : "18px", color: "#EB4760"}}>{error}</div>}
                        <CommonBtn leftIcon={<img src={admin} height={30} width={30}/>} width={335} height={43} fontColor={"#EB4760"} borderColor={"#EB4760"} size={18} type="submit">{loading ? "Входим..." : "Войти как преподаватель"}</CommonBtn>
                    </form>
                </div>
            </div>
        </>
    )
}