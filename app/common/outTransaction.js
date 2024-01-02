"use client"

import { useEffect, useState } from "react";
import { callGetAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";

export default function OutTransactions({ eventId }) {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(0);
    const SIZE = 15;

    useEffect(() => {
        const params = new URLSearchParams();
        params.set('eventId', eventId);
        params.set('page', page);
        params.set('size', SIZE);
        callGetAPI(ENDPOINT.getOutTransactions + params.toString())
            .then(body => {
                console.log(body);
                if (body?.code === 0) {
                    setTransactions(body?.data.data);
                }
            })
    }, [eventId])

    return (
        <div>
            <div className="d-flex align-items-center mb-3 w-100" style={{ overflowX: 'auto' }}>
                <div className="fw-semibold" style={{ width: "250px" }}>
                    Người tạo
                </div>
                <div className="fw-semibold" style={{ width: "200px" }}>
                    Thời gian
                </div>
                <div className="fw-semibold" style={{ width: "300px" }}>
                    Số tiền/Vật phẩm
                </div>
                <div className="fw-semibold" style={{ width: '400px' }}>
                    Chi tiết
                </div>
            </div>
            {
                transactions?.map(transaction => (
                    <div className="d-flex align-items-center mb-3 w-100" style={{ overflowX: 'auto' }}>
                        <div className="d-flex align-items-center" style={{ width: "250px" }}>
                            <div className="avatar me-2">
                                <img src={transaction.implementedBy?.avatar}></img>
                            </div>
                            <div>{transaction.implementedBy?.name}</div>
                        </div>
                        <div style={{ width: "200px" }}>
                            {transaction.time && new Date(transaction.time).toLocaleString()}
                        </div>
                        <div style={{ width: "300px", color: "#FF9100" }}>
                            <span>{transaction.amount + " " + transaction.unit.toLowerCase() + " "}</span>
                            <span>{transaction.describe}</span>
                        </div>
                        <div style={{ color: "#FF9100", width: '400px' }}>
                            {transaction.detail}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}