import Navbar from "../common/navbar";

export default function OneColLayout({children}){
    return(
        <div>
            <Navbar />
            <div>
                {children}
            </div>
        </div>
    )
}