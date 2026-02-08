import "./btn.css"

export default function CircleImgBtn({ size, src, alt, onClick }) {

    return (
        <>
            <div
                className="btn circleImgBtn"
                aria-label={alt}
                onClick={onClick}
                style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundImage: src ? `url(${src})` : "none",
                        overflow: "hidden",
                        borderRadius: `50%`,
                        backgroundSize: "cover",
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
