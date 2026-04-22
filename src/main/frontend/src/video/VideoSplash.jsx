import { useState, useRef, useEffect } from 'react';
import Logo from "@/main-page/compoents/prototype/logo/Logo.jsx";
import './VideoSplash.css';

export default function VideoSplash({ children, videoSrc, duration = 18000 }) {
    const [showSplash, setShowSplash] = useState(() => {
        const hasSeen = sessionStorage.getItem('splashSeen');
        return !hasSeen;
    });

    const videoRef = useRef(null);

    useEffect(() => {
        if (!showSplash) return;

        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [showSplash, duration]);

    const handleClose = () => {
        setShowSplash(false);
        sessionStorage.setItem('splashSeen', 'true');
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleVideoEnd = () => {
        handleClose();
    };

    if (!showSplash) {
        return <>{children}</>;
    }

    return (
        <div className="video-splash">
            <video ref={videoRef} className="video-splash__video" autoPlay muted playsInline onEnded={handleVideoEnd}>
                <source src={videoSrc} type="video/mp4" />
            </video>

            <div className="video-splash__logo">
                PROBUJDENIE
            </div>
        </div>
    );
}