"use client";

import { useState } from "react";
import "./css/navbar.css";
import { SearchIcon } from "./icon";
import Link from "next/link";

export default function Navbar(props) {
    const [searchText, setSeachText] = useState("");

    return (
        <nav className="navbar navbar-expand-lg bg-dark-green col-12 fs-18 text-white">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand me-4" href="/">
                        <img src="https://storage.googleapis.com/vinatim_bucket/common/vinatim.png" style={{ height: "45px" }}></img>
                    </a>
                </div>
                <form className="d-flex align-items-center text-end" style={{ width: "35%" }}>
                    <input className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchText}
                        onChange={e => setSeachText(e.target.value)}
                    />
                    <Link href={"/search/organization?q=" + searchText}>
                        <SearchIcon fs="20px" />
                    </Link>
                </form>
                <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-3 ms-3">
                            <a className="nav-link text-white" href="#">Tổ chức</a>
                        </li>
                        <li className="nav-item px-3">
                            <a className="nav-link text-white" href="/project">Sự kiện</a>
                        </li>
                    </ul>

                </div>
                <div className="navbar-notification">
                    <i class="bi bi-bell fs-20"></i>
                </div>
                <div className="navbar-account">
                </div>
            </div>
        </nav>
    )
}