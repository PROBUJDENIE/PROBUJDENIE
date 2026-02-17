import { useState, useEffect, useRef, useCallback } from 'react';

export function useHeaderVisibility() {
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const ticking = useRef(false);

    const SCROLL_THRESHOLD = 100;

    const controlHeader = useCallback(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
            setIsHeaderVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY < SCROLL_THRESHOLD) {
            setIsHeaderVisible(true);
        }

        setLastScrollY(currentScrollY);
        ticking.current = false;
    }, [lastScrollY]);

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

    return { isHeaderVisible };
}