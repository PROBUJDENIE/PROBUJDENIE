import "./loginBox.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import {useLogin} from "@/hooks/useLogin.jsx";
import login from "@/autorisation/resourses/login.svg";
export default function LoginBox({ modalState, changeModalState}) {

    const { values, setField, submit, loading, error } = useLogin();
    if (modalState !== 2) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        await submit();
    };
    return (
        <>
            <div className="login-box-overlay" onClick={() => changeModalState(0)}>
                <div className="login-box" onClick={e => e.stopPropagation()}>
                    <div className="login-box-header">
                        <Logo></Logo>
                        <h2>Вход в аккаунт</h2>
                        <h3>Войдите, чтобы продолжить обучение</h3>
                    </div>

                    <form className="login-box-content" onSubmit={onSubmit}>
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
                        <CommonBtn leftIcon={<img src={login} height={30} width={30}/>} width={335} height={43} bgColor={"#8A6CFF"} fontColor={"#fff"} size={18} type="submit">{loading ? "Входим..." : "Войти"}</CommonBtn>

                        <h3>Нет аккаунта?</h3>
                        <CommonBtn size={18} fontColor={"#8A6CFF"} onClick={() => {changeModalState(3);}}>Зарегестрироваться</CommonBtn>

                    </form>
                </div>
            </div>
        </>
    )
}