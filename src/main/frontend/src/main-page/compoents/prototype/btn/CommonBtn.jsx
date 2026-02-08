import "./btn.css"

export default function CommonBtn({
                                      width,
                                      height,
                                      bgColor,
                                      borderColor,
                                      fontColor,
                                      size,
                                      onClick,
                                      leftIcon,
                                      children
                                  }) {

    return (
        <>
            <button
                className={"btn"}
                onClick={onClick}
                style={{
                    backgroundColor: bgColor,
                    color: fontColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '16px',
                    width: `${width}px`,
                    height: `${height}px`,
                    fontSize: `${size}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}
            >
                {leftIcon && <span className="btn-icon">{leftIcon}</span>}
                {children}
            </button>
        </>
    )
}