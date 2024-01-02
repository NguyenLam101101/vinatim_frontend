"use client";

import { useEffect, useState } from "react";
import { ButtonGroup, ButtonGroupVertical } from "../common/buttonGroup";
import Navbar from "../common/navbar";
import Link from "next/link";

export default function SearchLayout({ children, selectedTab, searchText }) {
    const [tab, setTab] = useState(0);

    useEffect(() => {
        setTab(selectedTab || tab);
    }, [selectedTab])

    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className="d-flex mt-3">
                <div className="col-3 px-5">
                    <ButtonGroupVertical
                        selectedIndex={tab}
                        options={[
                            <div className="text-start fs-18">
                                <i className="bi bi-people-fill me-2"></i>
                                Người dùng
                            </div>,
                            <Link href={"/search/organization?q=" + searchText}>
                                <div className="text-start fs-18">
                                    <i className="bi bi-bag-dash-fill me-2"></i>
                                    Tổ chức
                                </div>
                            </Link>
                            ,
                            <Link href={"/search/event?q=" + searchText}>
                                <div className="text-start fs-18">
                                    <i className="bi bi-calendar-event-fill me-2"></i>
                                    Sự kiện
                                </div>
                            </Link>
                        ]}
                        buttonHeight="50px"
                    />
                </div>
                <div className="col-9 px-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

