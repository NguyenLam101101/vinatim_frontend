"use client";

export default function ManagementLayout({title, children}) {
    return (
        <div className="box w-100">
            <div className="pb-2 fw-semibold fs-20" style={{borderBottom: "1px solid darkgray"}}>
                {title}
            </div>
            <div className="pt-3">
                {children}
            </div>
        </div>
    )
}