"use client"

import { useContext, useEffect, useState } from "react"
import { CheckIcon } from "./icon";
import { CONTEXT } from "../layout";

export default function FollowOrganizationButton({ organizationId }) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [isFollower, setIsFollower] = useState(false);

    useEffect(() => {
        if(globalState.myInfo?.followerOf){
            setIsFollower(globalState.myInfo?.followerOf.includes(organizationId));
        }
    }, [globalState.myInfo])

    return (

        isFollower ?
            <button className="button-white">
                <span className="me-2">
                    <CheckIcon fs="20px" />
                </span>
                <span>Đang theo dõi</span>
            </button>
        :
        
            <button className="button-green">
                <span className="me-2">
                    {/* <CheckIcon fs="20px" /> */}
                    +
                </span>
                <span>Theo dõi</span>
            </button>
    )
}