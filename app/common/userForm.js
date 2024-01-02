"use client";

import { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../layout";
import AreaInput from "./areaInput";
import { callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import { NotificationManager } from "react-notifications";

const initForm = {
    id: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    VNeId: "",
    avatar: "",
    avatarFile: null,
    status: "",
    gender: "",
    DOB: "",
    createdAt: "",
    areaId: ""
}

export default function UserForm({ userId }) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        console.log(globalState.myInfo)
        if (globalState.myInfo) {
            setForm({...globalState.myInfo, areaId: globalState.myInfo.area?.id});
        }
    }, [globalState.myInfo])

    const saveOnclick = () => {
        callPostAPI(ENDPOINT.updateUser, form)
        .then(body => {
            if(body?.code === 0){
                NotificationManager.info("Cập nhật thông tin thành công", "", 3000);
            }
            else{
                NotificationManager.error("Email hoặc số điện thoại đã tồn tại", "", 3000);
            }
        })
    }

    return (
        <div className="d-flex">
            <div className="me-5">
                <div class="mb-3 form-group d-flex flex-column align-items-center">
                    <label className="position-relative">
                        <input type="file"
                            onChange={e => {
                                if (e.target.files.length > 0) {
                                    const url = URL.createObjectURL(e.target.files[0]);
                                    setForm({ ...form, avatar: url, avatarFile: e.target.files[0] });
                                }
                            }}
                            style={{ background: "none", opacity: "0", position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}
                        />
                        <div className="avatar" style={{ width: "150px", height: "150px", lineHeight: "150px" }}>
                            {form?.avatar ?
                                <img src={form?.avatar}></img>
                                :
                                <img src="https://storage.googleapis.com/vinatim_bucket/common/camera.png" style={{ width: "120px", height: "120px" }}></img>
                            }
                        </div>
                    </label>
                    <label class="form-label mt-3 text-center">Ảnh đại diện</label>
                </div>
            </div>
            <div className="flex-grow-1">
                <div class="mb-3 form-group">
                    <label class="form-label require">Họ và tên</label>
                    <input type="text" class="form-control"
                        value={form?.name}
                        disabled
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Nhập họ và tên"
                    />
                </div>
                <div className="d-flex">
                    <div class="mb-3 flex-grow-1 me-3">
                        <label class="form-label require">Giới tính</label>
                        <input type="text" class="form-control"
                            disabled
                            value={form?.gender === "MALE" ? "Nam" : "Nữ"}
                        />
                    </div>
                    <div class="mb-3 flex-grow-1">
                        <label class="form-label require">Ngày sinh</label>
                        <input type="text" class="form-control"
                            disabled
                            value={form?.DOB && new Date(form?.DOB).toLocaleDateString()}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <AreaInput value={form?.areaId}
                        onChangeHandle={value => setForm({ ...form, areaId: value })}
                        require={true} />
                </div>
                <div className="d-flex">
                    <div class="mb-3 flex-grow-1 me-3">
                        <label class="form-label require">Số CCCD</label>
                        <input type="text" class="form-control"
                            value={form?.VNeId}
                            disabled
                            onChange={e => setForm({ ...form, VNeId: e.target.value })}
                            placeholder="Nhập số CCCD"
                        />
                    </div>
                    <div class="mb-3 flex-grow-1">
                        <label class="form-label require">Số điện thoại</label>
                        <input type="text" class="form-control"
                            value={form?.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>
                <div class="mb-3 form-group">
                    <label class="form-label require">Email</label>
                    <input type="email" class="form-control"
                        value={form?.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="Nhập địa chỉ email"
                    />
                </div>
                <div class="mb-3 form-group">
                    <label class="form-label require">Mật khẩu</label>
                    <input type="password" class="form-control"
                        value={form?.password}
                        disabled
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        placeholder="********"
                    />
                </div>
                <div className="mt-5 text-center">
                    <button className="button-blue" onClick={saveOnclick}>Lưu thông tin</button>
                </div>
            </div>
        </div>
    )
}