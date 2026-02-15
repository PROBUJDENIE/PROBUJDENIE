import "./header.css"
import Logo from "../../../prototype/logo/Logo.jsx";
import profileImg from "@/main-page/resources/images/profileNew.png";
import Container from "../../Container.jsx";
import CircleImgBtn from "../../../prototype/btn/CircleImgBtn.jsx";
import NavigationHedear from "./NavigationHedear.jsx";
import { useNavigate } from "react-router-dom";
import {MAIN_ROUTE} from "@/utils/constants.jsx";
import {useState, useEffect, useRef, useCallback} from "react";
import LoginOrRegister from "../../../../../autorisation/login-or-register/LoginOrRegister.jsx";

export default function Header() {
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const ticking = useRef(false);
    const isAuthenticated = false;

    const SCROLL_THRESHOLD = 100;

    const handleProfileClick = () => {
        if (!isAuthenticated) {
            setIsAuthModalOpen(true);
        } else {
            navigate("/user-profile");
        }
    };

    const controlHeader = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
            setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY < SCROLL_THRESHOLD) {
            setIsHeaderVisible(true);
        }

        setLastScrollY(currentScrollY);
        ticking.current = false;
    }, [lastScrollY, SCROLL_THRESHOLD]);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    controlHeader();
                });
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controlHeader]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (e.clientY < 100 && !isHeaderVisible) {
                setIsHeaderVisible(true);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHeaderVisible]);

    return (
        <>
            <header className={`header ${!isHeaderVisible ? 'header-hidden' : ''}`}>
                <Container>
                    <div className="header_content" id={"header"}>
                        <Logo onClick={() => navigate(MAIN_ROUTE)}></Logo>
                        <NavigationHedear></NavigationHedear>
                        <CircleImgBtn
                            size={45}
                            alt={"Личный кабинет"}
                            src={profileImg}
                            onClick={handleProfileClick}
                            backGround={115}
                        ></CircleImgBtn>
                    </div>
                </Container>
            </header>

            <LoginOrRegister
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    )
}