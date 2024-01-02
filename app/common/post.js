export default function Post(props) {
    return (
        <div className="post box" style={{boxShadow: "1px 1px 1px 0px lightgray" }}>
            <div className="d-flex">
                <div className="avatar me-2">
                    <img src={(props.post && props.poster.avatar) ? props.poster.avatar : "/logo_bk.png"}></img>
                </div>
                <div>
                    <div className="fs-16">
                        {(props.post && props.poster.name ? props.poster.name : "Nguyễn Văn A")}
                    </div>
                    <div className="fs-11 color-gray">
                        {(props.post && props.poster.time ? new Date(props.poster.time).toLocaleTimeString : "07:34:23 11/04/2023")}
                    </div>
                </div>
            </div>
            <div className="my-3">
                <div className="mb-3 fs-15">
                    {(props.post && props.post.content) ? props.post.content : "Ngày 15-10, Hội Doanh nhân trẻ TP Cần Thơ, Hội Chữ thập đỏ TP Cần Thơ và Tập đoàn TTC đã phối hợp tổ chức chương trình hiến máu tình nguyện với thông điệp “Niềm vui từ lòng nhân ái”."}
                </div>
                <div>
                    <img src="/banner.png" className="w-100"></img>
                </div>
            </div>
            <div className="d-flex pt-2 justify-content-between justify-content-md-end" style={{ borderTop: "1px solid darkgray" }}>
                <div className="hover-bg-gray py-1 px-4 rounded-3 pointer color-blue">
                    <span className="me-2 fs-20">
                        <i className="bi bi-hand-thumbs-up-fill"></i>
                    </span>
                    <span>Thích</span>
                </div>
                <div className="hover-bg-gray py-1 px-4 rounded-3 pointer">
                    <span className="me-2 fs-20">
                    <i className="bi bi-chat-dots"></i>
                    </span>
                    <span>Bình luận</span>
                </div>
                <div className="hover-bg-gray py-1 px-4 rounded-3 pointer">
                    <span className="me-2 fs-20">
                    <i className="bi bi-share"></i>
                    </span>
                    <span>Chia sẻ</span>
                </div>
            </div>
        </div>
    )
}