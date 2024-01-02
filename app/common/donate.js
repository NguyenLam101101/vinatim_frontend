"use client"

import { useContext, useEffect, useState } from "react"
import { DonateTypes, Units } from "./enum"
import PopUp from "./popUp";
import { callGetAPI, callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import Banner from "./banner";
import { CONTEXT } from "../layout";
import { NotificationManager } from "react-notifications";
import ImageInput from "./imageInput";
import { v4 } from "uuid";

const initForm = {
    eventId: "",
    donateType: "MONEY",
    amount: "",
    unit: Units()[0].key,
    describe: "",
    message: "",
    time: "",
    isAnonymous: false,
    status: "PENDING",
    proof: "",
    proofFile: null
}

export default function Donate({ eventId }) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [form, setForm] = useState(initForm);
    const [event, setEvent] = useState();
    const [organization, setOrganization] = useState();
    const [isShowTransferPopup, setIsShowTransferPopup] = useState(false);

    useEffect(() => {
        if (eventId) {
            setForm({ ...form, eventId: eventId });
            callGetAPI(ENDPOINT.getEvent + eventId)
                .then(body => {
                    if (body?.code === 0) {
                        setEvent(body.data);
                    }
                })
        }
    }, [eventId])

    const goToTransfer = () => {
        setIsShowTransferPopup(true);
    }

    const donate = () => {
        setGlobalState({...globalState, isLoading: true});
        console.log(form);
        callPostAPI(ENDPOINT.createInTransaction, form)
            .then(body => {
                if (body?.code === 0) {
                    if(form.donateType === "MONEY"){
                        NotificationManager.info('Xin chân thành cảm ơn bạn', "Quyên góp thành công", 3000);
                    }
                    else{
                        NotificationManager.info('Tạo yêu cầu quyên góp thành công. Bạn sẽ nhận được thông báo khi yêu cầu được xác nhận', "", 3000);
                    }
                }
            })
            .finally(() => {
                setGlobalState({...globalState, isLoading: false});
            })
    }

    const donateOnClick = () => {
        if(form.donateType === "MONEY"){
            const uuid = v4();
            setForm({...form, transactionId: uuid});
            goToTransfer();
            setTimeout(donate, 8000);
        }
        else{
            donate();
        }
    }

    return (
        <div>
            <div className="box p-4">
                <div className="text-center color-gray fs-14 py-1 border-bottom-darkgray">
                    Tất cả số tiền và vật phẩm mà bạn quyên góp sẽ được chúng
                    tôi dành 100% cho việc giúp đỡ các đối tượng cần hỗ trợ.
                </div>
                <div className="text-center fw-semibold my-3 fs-2">
                    {event?.name}
                </div>
                <Banner src={event?.banner} rate={21 / 9} />
                <div className="mt-2 text-center color-black fw-semibold" style={{ fontStyle: "italic" }}>
                    "{event?.slogan}"
                </div>
                <div>
                    <div className="mt-4 box box-shadow">
                        <div>
                            <div className="fw-bold fs-16">1. Thông tin người quyên góp:</div>
                            {
                                form?.isAnonymous === false &&
                                <div className="d-flex align-items-center mt-3">
                                    <label className="me-3">Người quyên góp:</label>
                                    <div class="d-flex align-items-center">
                                        <div className="me-2 avatar">
                                            <img src={globalState?.myInfo?.avatar}></img>
                                        </div>
                                        <span>{globalState?.myInfo?.name}</span>
                                    </div>
                                </div>
                            }
                            <div class="form-group mt-3">
                                <input
                                    className="me-2"
                                    type="checkbox"
                                    checked={form.isAnonymous}
                                    onChange={e => setForm({ ...form, isAnonymous: e.target.checked })}
                                />
                                <span>Quyên góp ẩn danh</span>
                            </div>
                        </div>
                        <div>
                            <div className="fw-bold fs-16 mt-3">2. Thông tin quyên góp</div>
                            <div className="text-center mt-3">Chọn một hình thức bạn muốn quyên góp</div>
                            <div className="d-flex justify-content-center mt-3" style={{ gap: "15px", flexWrap: "wrap" }}>
                                {
                                    event?.donateTypes?.map(donateType =>
                                        <button className={"" + (form?.donateType === donateType ? "button-green" : "button-white")}
                                            onClick={() => setForm({ ...form, donateType: donateType, unit: (donateType === "MONEY" ? "VND" : Units()[0].key) })}>
                                            {DonateTypes().find(type => type.key === donateType).name}
                                        </button>
                                    )
                                }
                            </div>
                            {
                                form?.donateType === "MONEY" ?
                                    <div class="form-group mt-3">
                                        <label className="require">Số tiền bạn muốn quyên góp</label>
                                        <div className="d-flex align-items-center">
                                            <input type="text"
                                                class="form-control me-2"
                                                placeholder="Nhập số tiền"
                                                value={form.amount}
                                                onChange={e => setForm({ ...form, amount: e.target.value })}
                                            />
                                            <span className="fw-semibold">VND</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="mt-3">
                                        <label className="require">Số vật phẩm bạn muốn quyên góp</label>
                                        <div className="d-flex">
                                            <div className="col-4 pe-2">
                                                <input type="text"
                                                    class="form-control"
                                                    placeholder="Nhập số lượng"
                                                    value={form.amount}
                                                    onChange={e => setForm({ ...form, amount: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-2 pe-2">
                                                <select
                                                    class="form-control"
                                                    value={form.unit}
                                                    onChange={e => setForm({ ...form, unit: e.target.value })}
                                                >
                                                    {
                                                        Units().map(unit =>
                                                            <option value={unit.key}>{unit.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <input type="text"
                                                    class="form-control"
                                                    placeholder="gạo, mỳ tôm, sách vở,..."
                                                    value={form.describe}
                                                    onChange={e => setForm({ ...form, describe: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                            }

                            <div class="form-group mt-3">
                                <label>Lời nhắn</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Nhập lời nhắn"
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                            </div>
                            {
                                form.donateType !== "MONEY" &&
                                <div class="form-group mt-3">
                                    <label>Minh chứng</label>
                                    <ImageInput 
                                        value={form?.proof}
                                        onChangeHandle={(url, file) =>{
                                            setForm({...form, proof: url, proofFile: file});
                                        }}
                                        onDeleteHandle={() => {
                                            setForm({...form, proof: "", proofFile: null});
                                            setProof(undefined);
                                        }}
                                    />
                                </div>
                            }
                        </div>

                        <div className="mt-3 text-center">
                            <button className="button-green" onClick={donateOnClick}>Quyên góp</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                isShowTransferPopup &&
                <PopUp
                    title="Thông tin chuyển khoản"
                    closeHandle={() => setIsShowTransferPopup(false)}
                    content={
                        <div className="d-flex mt-3">
                            <div className="d-flex flex-column me-2" style={{ flex: 3 }}>
                                <div>
                                    <div className="mb-3">
                                        <span className="color-gray me-2">Ngân hàng thụ hưởng:</span>
                                        <span className="fw-semibold color-black">{event?.bankName}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="color-gray me-2">Số tài khoản:</span>
                                        <span className="fw-semibold color-black">{event?.bankAccount}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="color-gray me-2">Chủ tài khoản:</span>
                                        <span className="fw-semibold color-black">{event?.hostName}</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="color-gray me-2">Số tiền:</span>
                                        <span className="fw-semibold color-black">{form?.amount} VNĐ</span>
                                    </div>
                                    <div className="mb-3">
                                        <span className="color-gray me-2">Nội dung chuyển khoản:</span>
                                        <span className="fw-semibold color-black">{form?.transactionId || "EVENT1032483294"}</span>
                                    </div>
                                </div>
                                <div className="flex-grow-1 mb-2 d-flex align-items-end">
                                    <small className="color-dark-gray">
                                        Lưu ý: Quý khách vui lòng chuyển khoản đúng vào số tài khoản và nội dung chuyển khoản như trên.
                                    </small>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center px-2 pb-2" style={{ flex: 2 }}>
                                <div className="d-flex flex-column align-items-center p-2" style={{ borderRadius: "10px", boxShadow: "0 0 2px 2px lightgray" }}>
                                    <div className="text-center fw-semibold">Quét mã bên dưới để chuyển khoản</div>
                                    <div style={{ padding: "15px 10%" }}>
                                        <img
                                            width="100%"
                                            height="100%"
                                            src="https://storage.googleapis.com/vinatim_bucket/banner/qr.png"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />
            }
        </div>
    )
}
