import "./link.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function CommonLink({size, weight, href, children, isRouterLink = false}) {
    const navigate = useNavigate();
    const location = useLocation();
    const isAnchor = href && href.startsWith('#');
    const hasScrolled = useRef(false);

    const scrollToElement = (hash) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            return true;
        }
        return false;
    };

    const handleAnchorClick = (e, hash) => {
        e.preventDefault();

        if (location.pathname === '/' || location.pathname === '') {
            scrollToElement(hash);
        } else {
            sessionStorage.setItem('scrollToHash', hash);
            navigate('/');
            hasScrolled.current = false;
        }
    };

    useEffect(() => {
        if (location.pathname === '/' && !hasScrolled.current) {
            const hashToScroll = sessionStorage.getItem('scrollToHash');

            if (hashToScroll) {
                if (scrollToElement(hashToScroll)) {
                    sessionStorage.removeItem('scrollToHash');
                    hasScrolled.current = true;
                } else {
                    sessionStorage.removeItem('scrollToHash');
                    hasScrolled.current = true;
                }
            }
        }
        if (location.pathname !== '/') {
            hasScrolled.current = false;
        }
    }, [location.pathname]);

    if (isRouterLink && !isAnchor) {
        return (
            <Link
                className={"common-link"}
                to={href}
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: `${size}px`,
                    fontWeight: weight,
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                {children}
            </Link>
        );
    } else if (isAnchor) {
        return (
            <a
                className={"common-link"}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: `${size}px`,
                    fontWeight: weight,
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer'
                }}>
                {children}
            </a>
        );
    } else {
        return (
            <a
                className={"common-link"}
                href={href}
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: `${size}px`,
                    fontWeight: weight,
                    textDecoration: 'none',
                    color: 'inherit'
                }}>
                {children}
            </a>
        );
    }
}