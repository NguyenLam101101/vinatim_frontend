"use client"

import { CloseIcon } from "../common/icon";

export default function Statement({ transactions }) {
    return (
        <div className="box">
            {
                transactions?.map(transaction =>
                    <div className="d-flex align-items-center mb-3">
                        <div className="d-flex align-items-center col-4">
                            <div className="avatar me-2">
                                <img src={transaction.donatedBy.avatar}></img>
                            </div>
                            <div>{transaction.donatedBy.name}</div>
                        </div>
                        <div className="col-3">
                            {new Date(transaction.time).toLocaleString()}
                        </div>
                        <div className="col-3" style={{color: "#FF9100"}}>
                            {transaction.detail}
                        </div>
                        <div className="d-flex align-items-center">
                            <CloseIcon color="red col-2" />
                            <span className="ms-2">Chờ xác thực</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}