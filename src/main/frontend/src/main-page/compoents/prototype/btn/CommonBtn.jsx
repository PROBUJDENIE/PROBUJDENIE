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
                                      rightIcon,
                                      type,
                                      borderRadius = 16,
                                      children
                                  }) {

    return (
        <>
            <button
                className={"btn"}
                onClick={onClick}
                type={type}
                style={{
                    backgroundColor: bgColor,
                    color: fontColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: `${borderRadius}px`,
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
                {rightIcon && <span className="btn-icon">{rightIcon}</span>}
            </button>
        </>
    )
}