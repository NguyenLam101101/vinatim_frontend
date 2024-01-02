"use client";

import Link from "next/link";
import SignupLayout from "../Layout/signupLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import { NotificationManager } from "react-notifications";

export default function LoginPage(props) {
    const router = useRouter();
    const [form, setForm] = useState({});


    const login = () => {
        callPostAPI(ENDPOINT.login, form)
        .then(data => {
            if(data.code === 0){
                localStorage.setItem("Authorization", data.data);
                router.push("/");
            }
            else{
                NotificationManager.error('Thông tin đăng nhập không chính xác', "", 3000);
            }
        }).catch(e => {
            NotificationManager.error('Có lỗi xảy ra', "", 3000);
        })
    }

    return (
        <SignupLayout>
            <div className="box" style={{ width: "400px", marginTop: "50%", translate: "0 -50%" }}>
                <div className="color-dark-green fs-25 fw-bold mb-4 text-center">Đăng nhập</div>
                <div>
                    <div class="mb-3">
                        <label class="form-label">Tên đăng nhập</label>
                        <input type="text"
                            value={form?.username}
                            onChange={e => setForm({ ...form, username: e.target.value })}
                            class="form-control"
                            placeholder="Nhập số CCCD, điện thoại hoặc email" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Mật khẩu</label>
                        <input type="password"
                            value={form?.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            class="form-control"
                            placeholder="********" />
                    </div>
                    <div className="mb-3">
                        <button className="button-green col-12 mb-3 mt-1"
                            type="button"
                            onClick={login}
                        >Đăng nhập</button>
                        <div className="text-center">
                            <span>Bạn chưa có tài khoản? </span>
                            <Link href="/signup">Đăng ký ngay!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </SignupLayout>
    )
}