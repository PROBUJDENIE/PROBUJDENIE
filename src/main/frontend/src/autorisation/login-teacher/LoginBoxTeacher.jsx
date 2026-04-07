import "./loginBoxTeacher.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import teacher from "../resourses/teacher.svg"

import {useLoginTeacher} from "@/hooks/useLoginTeacher.jsx";
export default function LoginBoxTeacher({ modalState, changeModalState}) {
    const { values, setField, submit, loading, error } = useLoginTeacher();

    if (modalState !== 6) return null;

    const onSubmit = async (e) => {
        e.preventDefault();
        await submit();
    };
    return (
        <>
            <div className="login-box-overlay" onClick={() => changeModalState(0)}>
                <div className="login-box-teacher" onClick={e => e.stopPropagation()}>
                    <div className="login-box-header-teacher">
                        <Logo></Logo>
                        <h2>Вход в аккаунт преподавателя</h2>
                        <h3>Войдите, чтобы начать создавать курсы</h3>
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
                        <CommonBtn leftIcon={<img src={teacher} height={30} width={30}/>} width={335} height={43} fontColor={"#8A6CFF"} borderColor={"#8A6CFF"} size={18} type="submit">{loading ? "Входим..." : "Войти как преподаватель"}</CommonBtn>
                    </form>
                </div>
            </div>
        </>
    )
}