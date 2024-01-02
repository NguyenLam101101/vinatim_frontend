"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "./icon";
import { callGetAPI, callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import ManagementLayout from "../Layout/managementLayout";
import { NotificationManager } from "react-notifications";
import OutTransactions from "./outTransaction";
import PopUp from "./popUp";
import CreateOutTransactionForm from "./createOutTransactionForm";

export default function OutTransactionManagement({ organization }) {
    const [eventId, setEventId] = useState();
    const [isShowCreateOutTransaction, setIsShowCreateOutTransaction] = useState(false);

    return (
        <div>
            <ManagementLayout
                title="Quản lý chi"
                children={
                    <div>
                        <div className="p-3 mb-3" style={{ backgroundColor: "#EFEFEF" }}>
                            <div className="row">
                                <div className="form-group col-12 col-md-4 mb-3">
                                    <label>Chọn dự án</label>
                                    <select
                                        className="form-control"
                                        value={eventId}
                                        onChange={e => setEventId(e.target.value)}
                                    >
                                        <option className="color-gray" style={{ fontStyle: 'italic' }} value="">
                                            <span>Chọn 1 sự kiện</span>
                                        </option>
                                        {
                                            organization?.events?.map(event =>
                                                <option value={event.id}>{event.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                {
                                    eventId &&
                                    <div>
                                        <button className="button-green"
                                            onClick={() => setIsShowCreateOutTransaction(true)}
                                        >+ Thêm phiếu chi</button>
                                    </div>
                                }

                            </div>
                        </div>
                        <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
                            <OutTransactions eventId={eventId} />
                        </div>
                    </div>
                }
            />
            {
                isShowCreateOutTransaction &&
                <PopUp
                    title="Tạo phiếu chi"
                    content={
                        <div className="mt-3">
                            <CreateOutTransactionForm eventId={eventId} />

                        </div>
                    }
                    closeHandle={() => setIsShowCreateOutTransaction(false)}
                />
            }
        </div>
    )
}