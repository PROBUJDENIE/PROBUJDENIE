import "./btn.css"

export default function CircleImgBtn({ size, src, alt, onClick, backGround, className }) {

    return (
        <>
            <div
                className={`btn circleImgBtn ${className}`.trim()}
                aria-label={alt}
                onClick={onClick}
                style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundImage: src ? `url(${src})` : "none",
                        overflow: "hidden",
                        borderRadius: `50%`,
                        backgroundSize: `${backGround}%`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"}}

            >
                <button
                    className="btn"
                    type="button"

                    style={{
                        width : '100%',
                        height: '100%'}}></button>
            </div>

        </>
    )
}
