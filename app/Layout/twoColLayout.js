
import Navbar from "../common/navbar";

export default function TwoColLayout(props) {
    return (
        <main>
            <Navbar />
            <div className="d-flex p-3" style={{ justifyContent: "stretch" }}>
                <div className="col-3 pe-3">
                    <div className="vh-100 position-sticky top-0" 
                        onMouseMove={e => e.currentTarget.style.overflow = "auto"}
                        onMouseLeave={e => e.currentTarget.style.overflow = "hidden"}
                        >
                        {props.left}
                    </div>
                </div>
                <div className="col-9">
                    {props.right}
                </div>
            </div>
        </main>
    )
}