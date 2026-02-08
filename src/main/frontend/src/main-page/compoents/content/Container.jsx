
export default function Container({children}) {


    return (
        <>
            <div className="container" style={{
                maxWidth: "1280px",
                height: "100%",
                margin: "0 auto",
                padding: "0 15px"
            }}>
                {children}
            </div>
        </>
    )
}