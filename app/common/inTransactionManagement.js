"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "./icon";
import { callGetAPI, callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import ManagementLayout from "../Layout/managementLayout";
import { NotificationManager } from "react-notifications";

export default function InTransactionManagement({ organization }) {
    const [transactions, setTransactions] = useState([]);
    const [eventId, setEventId] = useState();
    const [page, setPage] = useState(0);
    const SIZE = 20;

    useEffect(() => {
        if (eventId) {
            const params = new URLSearchParams();
            params.set('eventId', eventId);
            params.set('page', page);
            params.set('size', SIZE);
            callGetAPI(ENDPOINT.getInTransactions + params.toString())
                .then(body => {
                    if (body?.code === 0) {
                        setTransactions(body.data.data);
                    }
                })
        }
    }, [eventId])

    const confirmApprove = (transactionId, status) => {
        if(status === "ACCEPTED"){
            if(confirm("Bạn muốn xác nhận quyên góp này?")){
                approve(transactionId, status);
            }
        }
        else if(status === "REJECTED"){
            if(confirm("Bạn muốn từ chối quyên góp này?")){
                approve(transactionId, status);
            }
        }
    }

    const approve = (transactionId, status) => {
        const params = new URLSearchParams();
        params.set("transactionId", transactionId);
        params.set("status", status);
        callPostAPI(ENDPOINT.approveInTransaction + params.toString(), {})
        .then(body => {
            console.log(body);
            if(body?.code === 0){
                NotificationManager.info("Thay đổi trạng thái thành công", "", 3000);
            }
        })
    }

    return (
        <div>
            <ManagementLayout
                title="Quản lý quyên góp"
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
                            </div>
                        </div>
                        <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
                            <div className="fw-semibold d-flex align-items-center mb-3" style={{ width: "max-content" }}>
                                <div className="" style={{ width: "250px" }}>
                                    Người quyên góp
                                </div>
                                <div style={{ width: "200px" }}>
                                    Thời gian
                                </div>
                                <div style={{ width: "200px"}}>
                                    Số tiền/Vật phẩm
                                </div>
                                <div style={{ width: "150px" }}>
                                    Minh chứng
                                </div>
                                <div style={{ width: '300px' }}>
                                    Lời nhắn
                                </div>
                                <div style={{ width: "200px" }}>
                                    Trạng thái
                                </div>
                                <div style={{ width: "100px" }}>
                                    Phê duyệt
                                </div>
                            </div>
                            {

                                transactions?.map(transaction => (
                                    <div className="d-flex align-items-center mb-3" style={{ width: "max-content" }}>
                                        <div className="d-flex align-items-center" style={{ width: "250px" }}>
                                            <div className="avatar me-2">
                                                <img src={transaction.donatedBy.avatar}></img>
                                            </div>
                                            <div>{transaction.donatedBy.name}</div>
                                        </div>
                                        <div style={{ width: "200px" }}>
                                            {transaction.time && new Date(transaction.time).toLocaleString()}
                                        </div>
                                        <div style={{ width: "200px"}}>
                                            <span>{transaction.amount + " " + transaction.unit.toLowerCase() + " "}</span>
                                            <span>{transaction.describe}</span>
                                        </div>
                                        <div style={{ width: "150px" }}>
                                            {
                                                transaction.proof &&
                                                <a href={transaction.proof} target="_target">Minh chứng</a>
                                            }
                                        </div>
                                        <div style={{ width: '300px' }}>
                                            {transaction.message}
                                        </div>
                                        <div style={{ width: "200px" }}>
                                            {transaction.status}
                                        </div>
                                        <div style={{ width: "100px" }}>
                                            {
                                                transaction.status === "PENDING" &&
                                                (
                                                    <div>
                                                        <span className="me-2 pointer" onClick={() => confirmApprove(transaction.id, "REJECTED")}>
                                                            <CloseIcon fs="20px" />
                                                        </span>
                                                        <span className="pointer" onClick={() => confirmApprove(transaction.id, "ACCEPTED")}>
                                                            <CheckIcon fs="20px" />
                                                        </span>
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            />
        </div>
    )
}