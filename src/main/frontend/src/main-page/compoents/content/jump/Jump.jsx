import "./jump.css"
import CircleImgBtn from "../../prototype/btn/CircleImgBtn.jsx";
import { useState, useEffect } from "react";
import jumpImage from "../../../resources/images/jump.png"
export default function Jump() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible && (
                <div className="jump">
                    <CircleImgBtn
                        size={60}
                        src={jumpImage}
                        onClick={scrollToTop}
                        alt="Наверх"
                    />
                </div>
            )}
        </>
    )
}