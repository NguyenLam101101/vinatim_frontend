"use client"

import Link from "next/link"
import { BellIcon, BookmarkIcon, InterestingIcon } from "./icon"
import { EventStatus } from "./enum"

export default function EventCard({ event, isHorizontal }) {
    return (
        isHorizontal ?
            <div className="box d-flex fs-16 w-100">
                <div style={{ height: "85px", width: 80 / 9 * 21 + "px" }}>
                    <img src={event?.banner} className="w-100 h-100 rounded-3"></img>
                </div>
                <div className="ms-3 flex-grow-1 d-flex flex-column justify-content-between">
                    <div style={{
                        color: event?.status === EventStatus().ACCEPTED ? "#06B541" : (event?.status === EventStatus().ACTIVE ? "#F2902F" : "#EE0D0D")
                    }}>
                        {
                            event?.status === "ACCEPTED" &&
                            <span>Sẽ diễn ra vào ngày </span>
                        }
                        <span>{event?.startDate && new Date(event?.startDate).toLocaleDateString()}</span>
                        {
                            event?.status !== EventStatus().ACCEPTED &&
                            <span> - {event?.endDate && new Date(event?.endDate).toLocaleDateString()}</span>
                        }
                    </div>
                    <div className="d-flex mb-1 align-items-center">
                        <Link href={"/project/" + event?.id} className="normal-link">
                            <div className="hover-underline" style={{ overflow: "hidden", textOverflow: 'ellipsis' }}>
                                {event?.name || "Từ thiện trẻ em nghèo"}
                            </div>
                        </Link>
                    </div>
                    {
                        event?.status === EventStatus().ACCEPTED &&
                        <div style={{ color: "#F2902F" }}>
                            <BellIcon fs="16px" />
                            <span className="ms-2">Nhắc tôi</span>
                        </div>
                    }
                    {
                        event?.status === EventStatus().ACTIVE &&
                        <div className="d-flex fs-13">
                            <Link href={"/donate/" + event?.id}>
                                <button style={{ padding: "2px 10px" }} className="me-2 button-green bg-dark-green">Quyên góp</button>
                            </Link>
                            <button style={{ padding: "2px 10px" }} className="button-white">Chia sẻ</button>
                        </div>
                    }
                </div>
                <div className="text-end">
                    <BookmarkIcon fs="20px" />
                </div>
            </div>
            :

            <div className="card bg-white" style={{ maxWidth: "250px" }}>
                <img src={event?.banner} className="card-img-top w-100"></img>
                <div className="card-body p-3">
                    <div className="d-flex mb-1 align-items-center" style={{ height: '50px' }}>
                        <Link href="http://localhost:3000/event/detail" className="normal-link">
                            <h5 className="card-title fs-18 d-flex align-items-center hover-underline" style={{ height: '100%', overflow: "hidden", textOverflow: 'ellipsis' }}>
                                {event?.name || "Từ thiện trẻ em nghèo"}
                            </h5>
                        </Link>
                        <div className="flex-grow-1 text-end">
                            <BookmarkIcon fs="20px" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between fs-13 fs-md-12 fs-lg-13">
                        <button className="flex-grow-1 me-1 button-green bg-dark-green">Quyên góp</button>
                        <button className="flex-grow-1 button-white">Chia sẻ</button>
                    </div>
                    <div>
                        <div className="mt-2">
                            <span style={{ display: "inline-block", width: "5px", marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                                    <path d="M6 5.7C5.43168 5.7 4.88663 5.54197 4.48477 5.26066C4.08291 4.97936 3.85714 4.59783 3.85714 4.2C3.85714 3.80218 4.08291 3.42064 4.48477 3.13934C4.88663 2.85804 5.43168 2.7 6 2.7C6.56832 2.7 7.11337 2.85804 7.51523 3.13934C7.91709 3.42064 8.14286 3.80218 8.14286 4.2C8.14286 4.39698 8.08743 4.59204 7.97974 4.77403C7.87205 4.95601 7.71421 5.12137 7.51523 5.26066C7.31625 5.39995 7.08002 5.51044 6.82004 5.58582C6.56005 5.6612 6.2814 5.7 6 5.7ZM6 0C4.4087 0 2.88258 0.442499 1.75736 1.23015C0.632141 2.0178 0 3.08609 0 4.2C0 7.35 6 12 6 12C6 12 12 7.35 12 4.2C12 3.08609 11.3679 2.0178 10.2426 1.23015C9.11742 0.442499 7.5913 0 6 0Z" fill="#058789" />
                                </svg>
                            </span>
                            <span className="fs-13 color-gray">
                                {event?.area?.province || "Nghệ An"}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span style={{ display: "inline-block", width: "5px", marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 12 12" fill="none">
                                    <g clip-path="url(#clip0_79_2405)">
                                        <path d="M5 1.5H2C1.86739 1.5 1.74021 1.55268 1.64645 1.64645C1.55268 1.74021 1.5 1.86739 1.5 2V5C1.5 5.13261 1.55268 5.25979 1.64645 5.35355C1.74021 5.44732 1.86739 5.5 2 5.5H5C5.13261 5.5 5.25979 5.44732 5.35355 5.35355C5.44732 5.25979 5.5 5.13261 5.5 5V2C5.5 1.86739 5.44732 1.74021 5.35355 1.64645C5.25979 1.55268 5.13261 1.5 5 1.5ZM10 1.5H7C6.86739 1.5 6.74021 1.55268 6.64645 1.64645C6.55268 1.74021 6.5 1.86739 6.5 2V5C6.5 5.13261 6.55268 5.25979 6.64645 5.35355C6.74021 5.44732 6.86739 5.5 7 5.5H10C10.1326 5.5 10.2598 5.44732 10.3536 5.35355C10.4473 5.25979 10.5 5.13261 10.5 5V2C10.5 1.86739 10.4473 1.74021 10.3536 1.64645C10.2598 1.55268 10.1326 1.5 10 1.5ZM5 6.5H2C1.86739 6.5 1.74021 6.55268 1.64645 6.64645C1.55268 6.74021 1.5 6.86739 1.5 7V10C1.5 10.1326 1.55268 10.2598 1.64645 10.3536C1.74021 10.4473 1.86739 10.5 2 10.5H5C5.13261 10.5 5.25979 10.4473 5.35355 10.3536C5.44732 10.2598 5.5 10.1326 5.5 10V7C5.5 6.86739 5.44732 6.74021 5.35355 6.64645C5.25979 6.55268 5.13261 6.5 5 6.5ZM8.5 6.5C8.8913 6.5 9.27401 6.61479 9.60072 6.83015C9.92743 7.04551 10.1838 7.35197 10.338 7.71159C10.4923 8.0712 10.5377 8.46817 10.4685 8.85332C10.3994 9.23847 10.2188 9.59488 9.94914 9.87841C9.67945 10.1619 9.33251 10.3601 8.9513 10.4484C8.57009 10.5367 8.17135 10.5112 7.80447 10.3752C7.43759 10.2391 7.11869 9.99837 6.88727 9.68284C6.65585 9.3673 6.52207 8.99081 6.5025 8.6L6.5 8.5L6.5025 8.4C6.52816 7.88752 6.7498 7.40451 7.12159 7.05086C7.49339 6.69722 7.98688 6.5 8.5 6.5Z" fill="#058789" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_79_2405">
                                            <rect width="12" height="12" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span className="fs-13 color-gray">
                                {event?.categories?.toString() || "Trẻ em, Giáo dục"}
                            </span>
                        </div>
                        <div className="mt-2">
                            <span style={{ display: "inline-block", width: "5px", marginRight: "15px" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14" fill="none">
                                    <path d="M9.4001 2.71148C9.40003 3.1627 9.25726 3.5956 9.0029 3.91581C8.4173 4.6537 7.8491 5.42309 7.2413 6.13399C7.17344 6.21125 7.08444 6.25301 6.99266 6.25063C6.90088 6.24826 6.81334 6.20194 6.7481 6.12124L4.9973 3.91656C4.7428 3.59614 4.59998 3.16297 4.59998 2.71148C4.59998 2.26 4.7428 1.82682 4.9973 1.50641C5.12429 1.34652 5.27534 1.21962 5.44175 1.13302C5.60816 1.04642 5.78664 1.00184 5.9669 1.00184C6.14715 1.00184 6.32563 1.04642 6.49204 1.13302C6.65845 1.21962 6.8095 1.34652 6.9365 1.50641L7.0001 1.58665L7.0637 1.50641C7.25431 1.26559 7.49796 1.10111 7.76361 1.03392C8.02926 0.966721 8.30491 0.999844 8.55545 1.12907C8.80599 1.25829 9.0201 1.47778 9.17051 1.75957C9.32093 2.04137 9.40085 2.37274 9.4001 2.71148Z" stroke="#058789" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M10.6001 13L12.8945 10.1324C12.962 10.0481 13 9.93378 13.0001 9.81449V5.87606C13.0001 5.57773 12.9053 5.29163 12.7365 5.08068C12.5677 4.86973 12.3388 4.75122 12.1001 4.75122C11.8614 4.75122 11.6325 4.86973 11.4637 5.08068C11.2949 5.29163 11.2001 5.57773 11.2001 5.87606V9.25057" stroke="#058789" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.6 10.0005L11.1148 9.35706C11.1418 9.3233 11.1633 9.2832 11.1779 9.23907C11.1925 9.19493 11.2 9.14761 11.2 9.09984C11.1999 9.03241 11.1848 8.96633 11.1564 8.90899C11.128 8.85166 11.0875 8.80531 11.0392 8.77514L10.7734 8.60941C10.5482 8.46869 10.2933 8.42006 10.0448 8.47039C9.79627 8.52072 9.56671 8.66748 9.3886 8.88987L8.8516 9.56103C8.62654 9.84223 8.50007 10.2236 8.5 10.6214V13M3.4 13L1.1056 10.1324C1.03807 10.0481 1.00008 9.93378 1 9.81449V5.87606C1 5.57773 1.09482 5.29163 1.2636 5.08068C1.43239 4.86973 1.66131 4.75122 1.9 4.75122C2.13869 4.75122 2.36761 4.86973 2.5364 5.08068C2.70518 5.29163 2.8 5.57773 2.8 5.87606V9.25057" stroke="#058789" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.40005 10.0006L2.88525 9.35715C2.85823 9.32337 2.8368 9.28327 2.82218 9.23914C2.80756 9.195 2.80004 9.1477 2.80005 9.09994C2.80005 8.96271 2.86245 8.83748 2.96085 8.77524L3.22665 8.60951C3.45184 8.46879 3.70673 8.42015 3.95526 8.47048C4.20378 8.52082 4.43334 8.66757 4.61145 8.88997L5.14845 9.56112C5.37351 9.84232 5.49998 10.2237 5.50005 10.6215V13.0001" stroke="#058789" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <span className="fs-13 color-gray">
                                {event?.donateTypes?.toString() || "Tiền, Thực phẩm"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    )
}