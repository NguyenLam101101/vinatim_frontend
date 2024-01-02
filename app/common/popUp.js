export default function PopUp({ title, content, footer, closeHandle, width }) {
    return (
        <div className="d-flex position-fixed top-0 bottom-0 start-0 end-0" style={{ backgroundColor: "rgba(37, 37, 37, 0.5)"}}>
            <div className="mh-75 bg-white rounded-3 m-auto p-3" style={{ width: width || "50%" }}>
                <div className="text-center align-middle position-relative pb-2" style={{ borderBottom: "1px solid darkgray" }}>
                    <span className="fw-semibold fs-20">{title || "Title"}</span>
                    <i className="bi bi-x-circle position-absolute end-0 pointer" style={{ top: "-3px", fontSize: "24px" }} onClick={closeHandle}></i>
                </div>
                <div className="d-flex flex-column" style={{ maxHeight: "80vh" }}>
                    <div className="flex-grow-1 overflow-auto">
                        {content}
                    </div>
                    <div className="text-center w-100">
                        {footer}
                    </div>
                </div>
            </div>
        </div>
    )

}