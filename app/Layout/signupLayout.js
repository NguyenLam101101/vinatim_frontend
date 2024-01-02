import Link from "next/link";

export default function SignupLayout({children}) {
    return (
        <div className="row px-3 py-4 vw-100" style={{minHeight: "100vh", backgroundColor: "#C8E9EA"}}>
            <div className="col-7">
                {/* <div className="d-flex bg-dark-green align-items-center py-2 px-4 rounded-5" style={{width: "fit-content"}}>
                    <img src="http://localhost:3000/vinatim.png" height="50px"></img>
                    <div className="text-white fs-25 fw-bold ms-5" style={{fontFamily: "Montserrat"}}>LAN TỎA YÊU THƯƠNG</div>
                </div> */}
                <div className="color-dark-green mb-5">
                    <div className="fs-25 fw-bold ms-5" style={{fontFamily: "cursive"}}>VINATIM - LAN TỎA YÊU THƯƠNG</div>
                </div>
                <div className="text-center">
                    <img src="https://storage.googleapis.com/vinatim_bucket/banner/vinatim_banner.png" height="400px"></img>
                </div>
            </div>
            <div className="col-5">
                {children}
            </div>
        </div>
    )
}