"use client"

import { usePathname } from "next/navigation";
import OneColLayout from "../../Layout/oneColLayout"
import Donate from "../../common/donate"
import { useEffect } from "react";

export default function DonatePage() {
    const pathname = usePathname();
    const id = pathname.split("/")[2];

    return (
        <OneColLayout
            children={
                <div style={{ margin: "15px 20%" }}>
                    <Donate eventId={id} />
                </div>
            }
        />
    )
}