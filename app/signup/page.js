"use client"

import Link from "next/link";
import SignupLayout from "../Layout/signupLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import { NotificationManager } from "react-notifications";
import PopUp from "../common/popUp";

export default function (props) {
    const router = useRouter();
    const [form, setForm] = useState({});
    const [confirmPassword, setConfirmPassword] = useState();
    const [isShowQRPopup, setIsShowQRPopup] = useState(false);

    const validateForm = () => {
        let result = true;
        return result
    }

    const signup = () => {
        callPostAPI(ENDPOINT.signup, form)
                .then(data => {
                    console.log(data);
                    if (data?.code === 0) {
                        NotificationManager.info("Đăng ký thành công!", "", 3000);
                        router.push("/login");
                    }
                    else (
                        NotificationManager.error("Thông tin không hợp lệ hoặc đã tồn tại", "", 3000)
                    )
                })
    }

    const signupOnclick = () => {
        if (validateForm()) {
            setIsShowQRPopup(true);
            setTimeout(signup, 8000);
        }
    }

    return (
        <SignupLayout>
            <div className="box" style={{ width: "400px" }}>
                <div className="color-dark-green fs-25 fw-bold mb-3 text-center">Đăng ký ngay</div>
                <form>
                    <div class="mb-3">
                        <label class="form-label require">Họ và tên</label>
                        <input type="text" class="form-control"
                            value={form?.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Nhập họ và tên"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label require">Số CCCD</label>
                        <input type="text" class="form-control"
                            value={form?.VNeId}
                            onChange={e => setForm({ ...form, VNeId: e.target.value })}
                            placeholder="Nhập số CCCD"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label require">Số điện thoại</label>
                        <input type="text" class="form-control"
                            value={form?.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label require">Email</label>
                        <input type="email" class="form-control"
                            value={form?.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="Nhập địa chỉ email"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label require">Mật khẩu</label>
                        <input type="password" class="form-control"
                            value={form?.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            placeholder="********"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label require">Nhập lại mật khẩu</label>
                        <input type="password" class="form-control"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="button-green col-12 mb-2 mt-1"
                            onClick={signupOnclick}
                        >Đăng ký</button>
                        <div className="text-center">
                            <span>Bạn đã có tài khoản? </span>
                            <Link href="/login">Đăng nhập ngay!</Link>
                        </div>
                    </div>
                </form>
            </div>
            {
                isShowQRPopup &&
                <PopUp
                    title="Xác thực danh tính"
                    width="400px"
                    content={
                        <div>
                            <div style={{padding: "25px 50px"}}>
                                <img width="100%" src="https://storage.googleapis.com/vinatim_bucket/common/qrcode_88133670_580f3163cdc799aed9ce6f1add722f6d.png"></img>
                            </div>
                            <div className="text-center fs-16">Mở ứng dụng VNeID và quét mã QR để xác thực danh tính</div>
                        </div>
                    }
                    closeHandle={() => setIsShowQRPopup(false)}
                />
            }
        </SignupLayout>
    )
}