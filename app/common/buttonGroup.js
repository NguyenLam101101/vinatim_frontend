"use client"

import { useEffect, useState } from "react"

export function ButtonGroup({options, onClickEvent, selectedIndex, buttonHeight}) {
    const [selectedTab, setSelectedTab] = useState(0);

    const clickButton = (index)=>{
        setSelectedTab(index);
        if(onClickEvent){
            onClickEvent(index);
        }
    }

    useEffect(() => {
        if(selectedIndex){
            setSelectedTab(selectedIndex);
        }
    }, [selectedIndex])

    return (
        <div className="fs-15">
            {
                options.map((option, index) =>
                    <button
                        className={"me-2" + (selectedTab === index ? " button-gray" : " button-none")}
                        onClick={() => {clickButton(index)}}
                        style={{height: buttonHeight || ""}}
                        >
                        {option}
                    </button>
                )
            }
        </div>
    )
}

export function ButtonGroupVertical({options, onClickEvent, selectedIndex, buttonHeight}) {
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        if(selectedIndex){
            setSelectedTab(selectedIndex);
        }
    }, [selectedIndex])

    const clickButton = (index)=>{
        setSelectedTab(index);
        if(onClickEvent){
            onClickEvent(index);
        }
    }

    return (
        <div className="d-flex flex-column">
            {
                options.map((option, index) =>
                    <button
                        className={"w-100 " + (selectedTab === index ? " button-gray fw-semibold" : " button-none")}
                        onClick={() => {clickButton(index)}}
                        style={{height: buttonHeight || ""}}
                        >
                        {option}
                    </button>
                )
            }
        </div>
    )
}