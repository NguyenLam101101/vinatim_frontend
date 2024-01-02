"use client"

import React, { useEffect, useState, useImperativeHandle, useRef } from "react";

export default function MultiObjectsInput({ label, objects, require, onChangeHandle }) {
    const [selectedObjects, setSelectObjects] = useState([]);
    const currentScope = useRef();
    const [isShowDropDown, setIsShowDropDown] = useState(false);
    const inputRefs = useRef([]);

    const addItem = (event) => {
        let newItems;
        if (event.target.checked) {
            console.log(objects);
            console.log(event.target.value);
            let selectedObject = objects.find(object => object.key === event.target.value);
            if (selectedObject)
                newItems = [...selectedObjects, selectedObject];
            setSelectObjects(newItems);
            if (onChangeHandle) {
                onChangeHandle(newItems.map(item => item.key));
            }
        }
        else {
            // setSelectObjects(selectedObjects.filter(object => object.key !== event.target.value));
            deleteItem(event.target.value);
        }
    }

    const deleteItem = (key) => {
        let newItems = selectedObjects?.filter(object => object.key !== key);
        setSelectObjects(newItems);
        if (onChangeHandle) {
            onChangeHandle(newItems.map(item => item.key));
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
            <label className={"mb-1" + (require ? " require" : "")}>{label || ""}</label>
            <div className="fs-13" ref={currentScope}>
                <div className="d-flex flex-wrap px-2 py-1 bg-white col-12 rounded-2 position-relative border-lightgray" style={{ minHeight: "35px", gap: "5px" }}>
                    {
                        selectedObjects?.map(
                            object =>
                                <div key={object.key} className="d-flex align-items-center bg-light-gray px-2 py-1 rounded-5">
                                    {object.name}
                                    <span className="ms-2 bg-gray text-center pointer"
                                        style={{ display: "inline-block", height: "16px", width: "16px", lineHeight: "16px", borderRadius: "50%" }}
                                        onClick={() => deleteItem(object.key)}>
                                        <i className="bi bi-x fs-15"></i>
                                    </span>
                                </div>
                        )
                    }
                    <span className="position-absolute pointer"
                        style={{ right: "10px" }}
                        onClick={() => setIsShowDropDown(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 13 5" fill="none">
                            <path d="M6.5 7C6.56231 7 6.61743 6.99076 6.66536 6.97229C6.7085 6.94919 6.74924 6.91686 6.78758 6.87529L11.8922 1.62356C11.9641 1.55427 12 1.46882 12 1.36721C12 1.29792 11.9832 1.23557 11.9497 1.18014C11.9209 1.12471 11.8778 1.08083 11.8203 1.0485C11.7627 1.01617 11.698 1 11.6261 1C11.5255 1 11.4392 1.03464 11.3673 1.10393L6.5 6.11316L1.63987 1.10393C1.56797 1.03464 1.4817 1 1.38105 1C1.30436 1 1.23965 1.01617 1.18693 1.0485C1.12941 1.08083 1.08388 1.12471 1.05033 1.18014C1.01678 1.23557 1 1.29792 1 1.36721C1 1.46882 1.03834 1.55427 1.11503 1.62356L6.21961 6.87529C6.25795 6.91686 6.30109 6.94919 6.34902 6.97229C6.39216 6.99076 6.44248 7 6.5 7Z" fill="#86868B" stroke="#86868B" strokeWidth="0.6" />
                        </svg>
                    </span>
                </div>
                <div className={"box border-lightgray mt-2 flex-column overflow-auto" + (isShowDropDown ? " d-flex" : " d-none")}
                    style={{ maxHeight: "200px" }}>
                    <div className="">
                        {
                            objects?.map((object, index) =>
                                <div className="p-2 col-12 align-middle" style={{ borderBottom: "1px solid lightgray" }} key={object.key}>
                                    <label className="d-flex w-100 pointer">
                                        <input
                                            className="me-3"
                                            type="checkbox"
                                            checked={selectedObjects?.filter(item => item.key === object.key).length > 0}
                                            value={object.key}
                                            onChange={(e) => addItem(e)}
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