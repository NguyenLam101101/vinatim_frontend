"use client";

import { useState } from "react";
import { CloseIcon, ImageIcon, LocationIcon } from "./icon";
import PopUp from "./popUp";

export default function PostPopup({ closeHandle }) {
    const [images, setImages] = useState([]);

    return (
        <PopUp
            width="500px"
            title="Đăng bài"
            content={
                <div>
                    <div className="py-3" style={{borderBottom: "1px solid lightgray"}}>
                        <textarea placeholder="Bạn đang nghĩ gì vậy?" 
                            className="w-100 border-none outline-none" 
                            style={{ resize: "none" }}
                            rows={7}
                            >   
                            </textarea>
                        <div>
                            {
                                images.map((image, index) =>
                                    <div className="mt-2 position-relative p-1 border-darkgray rounded-2 text-center">
                                        <img style={{ maxWidth: "100%" }} src={image.url}></img>
                                        <div className="position-absolute bg-white text-center align-middle border-darkgray pointer"
                                            style={{ borderRadius: "50%", width: "27px", height: "27px", top: "10px", right: "10px", lineHeight: "27px" }}
                                            onClick={() => {
                                                let newImages = [...images];
                                                newImages.splice(index, 1);
                                                setImages(newImages);
                                            }}>
                                            <CloseIcon />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
                        <div className="position-relative pointer" style={{ width: "fit-content" }}>
                            <ImageIcon />
                            <input className="position-absolute top-0 bottom-0 start-0 end-0 opacity-0"
                                type="file"
                                onChange={e => {
                                    if (e.target.files.length > 0) {
                                        let url = URL.createObjectURL(e.target.files[0]);
                                        console.log(images);
                                        setImages([...images, { file: e.target.files[0], url: url }]);
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <LocationIcon />
                        </div>
                    </div>
                </div>
            }
            footer={
                <button className="button-blue w-100 mt-2">Đăng</button>
            }
            closeHandle={closeHandle}
        />
    )
}