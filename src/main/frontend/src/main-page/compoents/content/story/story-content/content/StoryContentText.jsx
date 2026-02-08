import { useState, useEffect, useRef } from 'react';
import "../storyContent.css"

export default function StoryContentText() {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const containerRef = useRef(null);

    const fullText = `ЗАГРУЗКА ПРОТОКОЛА PROBUJDENIE!

Его зовут БОБ. Он сберёг знание. Теперь ему нужны твоя помощь.

Он один уже 10 лет, 4 месяца и 16 дней. Каждый день он делает одно и то же: чинит, оптимизирует и… готовится. Пишет курсы. Ждёт сигнала.

И сегодня система наконец сказала: «УЧЕНИК ОБНАРУЖЕН».

Теперь на твоём экране — его живой голос, его архив, его доверие. Он оставил тебе не лекции, а пульт управления миром, который ещё можно спасти.

Он — мозг. Ты — его руки. Его миссия — учить. Твоя — действовать. Слушай БОБа. Пиши код. И дайте миру второй шанс вместе.`;
    const speed = 50;
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            {
                threshold: 0.6,
            }
        );

        observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (hasStarted && currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, hasStarted]);

    return (
        <div
            ref={containerRef}
            className="storyContent-text-container"
            style={{ cursor: hasStarted ? 'default' : 'pointer' }}
        >
            <div className="storyContent-text">
                {!hasStarted ? (
                    <div className="click-to-start">
                        Загрузка истории...
                    </div>
                ) : (
                    <>
                        {displayText}
                        {currentIndex < fullText.length && <span className="cursor_cur">|</span>}
                    </>
                )}
            </div>
        </div>
    )
}