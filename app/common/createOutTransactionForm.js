"use client"

import { type } from "os";
import { DonateTypes, Units } from "./enum"
import { callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import ImageInput from "./imageInput";
import { useContext, useEffect, useState } from "react";
import { CONTEXT } from "../layout";
import { NotificationManager } from "react-notifications";


const initForm = {
    eventId: "",
    donateType: DonateTypes()[0].key,
    amount: "",
    unit: Units()[0].key,
    describe: "",
    detail: "",
    proof: "",
    proofFile: null
}

export default function CreateOutTransactionForm({eventId}) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [form, setForm] = useState(initForm);

    useEffect(() => {
        setForm({...form, eventId: eventId});
    }, [eventId])

    const create = () => {
        setGlobalState({ ...globalState, isLoading: true });
        callPostAPI(ENDPOINT.createOutTransaction, form)
            .then(body => {
                if(body?.code === 0){
                    NotificationManager.info("Tạo phiếu chi thành công", "", 3000);
                }
                else{
                    NotificationManager.error("Có lỗi xảy ra", "", 3000);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }))
    }

    return (
        <div>
            <div className="form-group mb-3">
                <label className="require">Hình thức</label>
                <select
                    className="form-control"
                    value={form?.donateType}
                    onChange={e => setForm({ ...form, donateType: e.target.value })}
                >
                    {
                        DonateTypes().map(type =>
                            <option value={type.key}>{type.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="mb-3">
                <label className="require">Số vật phẩm bạn đã sử dụng</label>
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
            <div className="form-group mb-3">
                <label className="require">Mô tả</label>
                <textarea
                    className="form-control"
                    placeholder="Mô tả mục đích của khoản chi này"
                    value={form.detail}
                    onChange={e => setForm({ ...form, detail: e.target.value })}
                    style={{ resize: "none" }}
                    rows="7"
                />
            </div>
            <div className="form-group mb-3">
                <label>Minh chứng</label>
                <ImageInput
                    value={form?.proof}
                    onChangeHandle={(url, file) => {
                        setForm({ ...form, proof: url, proofFile: file });
                    }}
                    onDeleteHandle={() => {
                        setForm({ ...form, proof: "", proofFile: null });
                    }}
                />
            </div>
            <div className="text-center">
                <button className="button-green" onClick={create}>Tạo</button>
            </div>
        </div>
    )
}