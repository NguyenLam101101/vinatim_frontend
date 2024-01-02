"use client"

import React, { useEffect, useState, useImperativeHandle, useRef } from "react";

export default function SearchAndSelect({ label, objects }) {
    const [selectedObjects, setSelectObjects] = useState([]);
    const currentScope = useRef();
    const [isShowDropDown, setIsShowDropDown] = useState(false);
    const inputRefs = useRef([]);

    const addItem = (event) => {
        console.log(event.target.value);
        if (event.target.checked) {
            let selectedObject = objects.find(object => object.key === event.target.value);
            if (selectedObject)
                setSelectObjects([...selectedObjects, selectedObject]);
        }
        else {
            setSelectObjects(selectedObjects.filter(object => object.key !== event.target.value));
        }
    }

    const deleteItem = (key) => {
        setSelectObjects(selectedObjects.filter(object => object.key !== key));
        for (var element of inputRefs.current) {
            if (element.value.key === key) {
                element.checked = false;
                break;
            }
        }
    }

    // useImperativeHandle(ref, () => ({ getValue: () => selectedObjects, clear: () => setSelectObjects([]) }), [selectedObjects]);


    useEffect(() => {
        document.addEventListener("click", (event) => {
            if (currentScope.current && !currentScope.current.contains(event.target)) {
                setIsShowDropDown(false);
            }
        });
    }, []);

    return (
        <div className="col-12">
            <label className="mb-1">{label || ""}</label>
            <div className="fs-13" ref={currentScope}>
                <div className="d-flex flex-wrap px-2 py-1 bg-white col-12 rounded-2 position-relative border-lightgray" style={{ minHeight: "35px", gap: "5px" }}>
                    {
                        selectedObjects.map(
                            object => 
                            <div key={object.key} className="d-flex align-items-center bg-light-gray px-2 py-1 rounded-5">
                                {object.name}
                                <span className="ms-2 bg-gray text-center pointer"
                                    style={{ display: "inline-block", height: "16px", width: "16px", lineHeight: "16px", borderRadius: "50%"}}
                                    onClick={() => deleteItem(object.key)}>
                                    <i className="bi bi-x fs-15"></i>
                                </span>
                            </div>
                        )
                    }
                    <input type="text" className="border-none outline-none"/>
                </div>
                <div className={"box border-lightgray mt-2 flex-column overflow-auto" + (isShowDropDown ? " d-flex" : " d-none")}
                    style={{ maxHeight: "200px" }}>
                    <div className="">
                        {
                            objects.map((object, index) =>
                                <div className="p-2 col-12 align-middle" style={{ borderBottom: "1px solid lightgray" }}>
                                    <label className="w-100 pointer" key={object.key}>
                                        <input
                                            className="me-2"
                                            type="checkbox"
                                            value={object.key}
                                            onChange={(event) => addItem(event)}
                                            ref={element => inputRefs.current[index] = element}
                                        />
                                        {object.name}
                                    </label>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}