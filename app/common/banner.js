"use client"

import { useEffect, useRef } from "react";

export default function Banner({ rate, src }) {
    const imgRef = useRef();

    useEffect(() => {
        if (rate) {
            const width = imgRef.current.offsetWidth;
            const height = width / rate;
            imgRef.current.style.height = height + "px";
        }
    }, [rate]);

    return (
        <div className="w-100" ref={imgRef}>
            <img src={src} width="100%" height="100%"></img>
        </div>
    )
}