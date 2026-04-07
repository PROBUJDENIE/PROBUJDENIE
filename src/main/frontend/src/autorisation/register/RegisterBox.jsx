import "./registerBox.css"
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import CommonBtn from "@/main-page/compoents/prototype/btn/CommonBtn.jsx";
import register from "@/autorisation/resourses/register.svg";
import { useState } from "react";
import {useRegister} from "@/hooks/useRegister.jsx";

export default function RegisterBox({ modalState, changeModalState}) {
    const { values, setField, submit, loading, error } = useRegister();
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);

    if (modalState !== 3) return null;

    const validateEmail = (email) => {
        const errors = [];
        if (!email.trim()) {
            errors.push("• email обязателен");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("• введите корректный email (example@mail.ru)");
        }
        return errors;
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push("• длина не менее 8 символов");
        if (!/[A-Z]/.test(password)) errors.push("• наличие заглавных букв");
        if (!/[0-9]/.test(password)) errors.push("• наличие цифр");
        if (!/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(password)) {errors.push("• буквы только латинского алфавита");}
        return errors;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setField("password")(e);
        const errors = validatePassword(newPassword);
        setPasswordErrors(errors);
    };
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setField("email")(e);
        const errors = validateEmail(newEmail);
        setEmailErrors(errors);
    };

    const handlePasswordConfirmChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const eErrors = validateEmail(values.email);
        const pErrors = validatePassword(values.password);
        if (eErrors.length > 0) { setEmailErrors(eErrors); return; }
        if (pErrors.length > 0) { setPasswordErrors(pErrors); return; }

        if (values.password !== passwordConfirm) {
            setPasswordErrors(["• пароли не совпадают"]);
            return;
        }
        const ok = await submit();
        if (ok) changeModalState(2);
    };

    return (
        <>
            <div className="register-box-overlay" onClick={() => changeModalState(0)}>
                <div className="register-box" onClick={e => e.stopPropagation()}>
                    <div className="register-box-header">
                        <Logo></Logo>
                        <h2>Регистрация</h2>
                        <h3>Создайте аккаунт, чтобы начать обучение</h3>
                    </div>

                    <form className="register-box-content" onSubmit={onSubmit}>
                        <div className="login-box-content_field">
                            <label>Имя*</label>
                            <input
                                type="text"
                                placeholder="Иван"
                                value={values.name}
                                onChange={setField("firstName")}
                                required
                            />
                        </div>
                        <div className="login-box-content_field">
                            <label>Фамилия*</label>
                            <input
                                type="text"
                                placeholder="Иванов"
                                value={values.lastName}
                                onChange={setField("lastName")}
                                required
                            />
                        </div>
                        <div className="login-box-content_field">
                            <label>Почта*</label>
                            <input
                                type="email"
                                placeholder="example@mail.ru"
                                value={values.email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        {emailErrors.length > 0 && (
                            <div className="password-error-container">
                                {emailErrors.map((error, index) => (
                                    <div key={index} className="password-error-item">{error}</div>
                                ))}
                            </div>
                        )}
                        <div className="login-box-content_field">
                            <label>Пароль*</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={values.password}
                                onChange={handlePasswordChange}
                                required
                                className={values.password !== passwordConfirm && passwordConfirm ? "password-input-error" : ""}
                            />
                        </div>

                        {passwordErrors.length > 0 && (
                            <div className="password-error-container">
                                <label>Минимальные требования к паролю:</label>
                                {passwordErrors.map((error, index) => (
                                    <div key={index} className="password-error-item">{error}</div>
                                ))}
                            </div>
                        )}

                        <div className="login-box-content_field">
                            <label>Подтверждение пароля*</label>
                            <input
                                type="password"
                                placeholder="********"
                                value={passwordConfirm}
                                onChange={handlePasswordConfirmChange}
                                required
                                className={values.password !== passwordConfirm && passwordConfirm ? "password-input-error" : ""}
                            />
                            {values.password !== passwordConfirm && passwordConfirm && (
                                <div className="password-confirm-error">Пароли не совпадают</div>
                            )}
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <CommonBtn leftIcon={<img src={register} height={30} width={30}/>} width={335} height={43} bgColor={"#D2FE66"} size={18} type="submit">{loading ? "Входим..." : "Зарегистрироваться"}</CommonBtn>

                        <h3>Уже есть аккаунт?</h3>
                        <CommonBtn size={18} fontColor={"#8A6CFF"} onClick={() => changeModalState(2)}>Войти
                        </CommonBtn>
                    </form>
                </div>
            </div>
        </>
    )
}