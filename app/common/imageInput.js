"use client"

import { useRef } from "react";
import { TrashIcon } from "./icon";

export default function ImageInput({ onChangeHandle, value, onDeleteHandle, width, height }) {
    const inputRef = useRef();

    return (
        <div className="w-100 border-lightgray rounded-2 p-2">
            <input
                className="w-100 border-none"
                type="file"
                onChange={e => {
                    if (e.target.files?.length > 0) {
                        let url = URL.createObjectURL(e.target.files[0]);
                        onChangeHandle(url, e.target.files[0]);
                    }
                }}
                accept="image/*"
                ref={inputRef}
            />
            {
                value &&
                <div className="mt-2">
                    <img src={value} style={{ width: width || "300px", height: height || "auto" }}></img>
                </div>
            }
            {
                onDeleteHandle && value &&
                <div className="text-end mt-1 pointer" 
                    onClick={() => {
                        inputRef.current.value = "";
                        onChangeHandle();
                    }}
                >
                    <i>
                        <TrashIcon fs="13px" />
                        <span className="ms-2 fs-13">Xóa ảnh</span>
                    </i>
                </div>
            }
        </div>
    )
}