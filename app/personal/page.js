"use client";

import { useEffect, useState } from "react";
import TwoColLayout from "../Layout/twoColLayout";
import PopUp from "../common/popUp";
import PostPopup from "../common/postPopup";
import CreateOrganisationPopup from "../common/createOrganizationForm";
import { ButtonGroup } from "../common/buttonGroup";
import Post from "../common/post";



export default function Personal() {
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState();
    const [isShowPersonalInfoTab, setIsShowPersonalInfoTab] = useState(false);
    const [isShowNewPostPopUp, setIsShowNewPostPopup] = useState(false);
    const [isShowCreateOrganisationPopup, setIsShowCreateOrganisationPopup] = useState(false);

    useEffect(() => {
        setUser({
            memberOf: [{ id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" }]
            ,
            followerOf: [{ id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" },
            { id: "1", avatar: "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg", name: "Tổ chức gây quỹ vì cộng đồng" }]
            ,
            interestedIn: [{ name: "Sự kiện áo ấm cho em" }, { name: "Sự kiện áo ấm cho em" }, { name: "Sự kiện áo ấm cho em" }, { name: "Sự kiện áo ấm cho em" }]
        })
    }, [])

    return (
        <TwoColLayout
            left={
                <div>
                    <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                            <img src={user?.avatar || "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"}></img>
                        </div>
                        <div>
                            <div className="fs-18 fw-semibold pointer"
                                onClick={() => setIsShowPersonalInfoTab(true)}>
                                {user?.name || "Nguyễn Văn Lâm"}
                            </div>
                            {
                                user?.status === "ACTIVE" || true &&
                                <div>
                                    <i className="bi bi-check-circle-fill color-green me-2"></i>
                                    <span>Tài khoản đã xác thực</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="mt-3 text-center">
                            <button className="button-green w-100" onClick={() => setIsShowNewPostPopup(true)}>Thêm bài đăng</button>
                        </div>
                        <div className="mt-3 text-center">
                            <button className="button-white w-100" onClick={() => setIsShowCreateOrganisationPopup(true)}>Tạo tổ chức</button>
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-top-darkgray">
                        <div className="color-gray fw-semibold mb-3">Tổ chức của bạn</div>
                        {
                            user?.memberOf?.map(organization =>
                                <div className="d-flex mt-2">
                                    <div className="me-2">
                                        <div className="avatar" style={{ width: "35px", height: "35px" }}>
                                            <img src={organization.avatar}></img>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden fs-14 fw-semibold"
                                        title={organization.name}
                                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                                        {organization.name}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="mt-3 pt-3 border-top-darkgray">
                        <div className="color-gray fw-semibold mb-3">Tổ chức đang theo dõi</div>
                        {
                            user?.followerOf?.map(organization =>
                                <div className="d-flex mt-2">
                                    <div className="me-2">
                                        <div className="avatar" style={{ width: "35px", height: "35px" }}>
                                            <img src={organization.avatar}></img>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden fs-14 fw-semibold"
                                        title={organization.name}
                                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                                        {organization.name}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="mt-3 pt-3 border-top-darkgray">
                        <div className="color-gray fw-semibold mb-3">Sự kiện đã quan tâm</div>
                        {
                            user?.interestedIn?.map(event =>
                                <div className="d-flex mt-2">
                                    <div className="overflow-hidden fw-semibold"
                                        title={event.name}
                                        style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                                        {event.name}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {
                        isShowPersonalInfoTab &&
                        <PopUp title="Thông tin cá nhân"
                            content={
                                <div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Họ và tên</div>
                                        <div className="text-end flex-grow-1">{user?.name || "Nguyễn Văn Lâm"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Số điện thoại</div>
                                        <div className="text-end flex-grow-1">{user?.phone || "0123456789"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Email</div>
                                        <div className="text-end flex-grow-1">{user?.email || "nguyenlam10112001@gmail.com"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Họ và tên</div>
                                        <div className="text-end flex-grow-1">{user?.name || "Nguyễn Văn Lâm"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Ngày sinh</div>
                                        <div className="text-end flex-grow-1">{user ? new Date(user.DOB)?.toDateString() : "10/11/2001"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Căn cước công dân</div>
                                        <div className="text-end flex-grow-1">{user?.VNeId || "0123456789"}</div>
                                    </div>
                                    <div className="d-flex mt-3">
                                        <div className="fw-semibold">Địa chỉ</div>
                                        <div className="text-end flex-grow-1">{user?.address || "Kim Chung, Hoài Đức, Hà Nội"}</div>
                                    </div>
                                </div>
                            }
                            closeHandle={() => setIsShowPersonalInfoTab(false)} />
                    }
                    {
                        isShowNewPostPopUp &&
                        <PostPopup closeHandle={() => setIsShowNewPostPopup(false)} />
                    }
                    {
                        isShowCreateOrganisationPopup &&
                        <CreateOrganisationPopup closeHandle={() => setIsShowCreateOrganisationPopup(false)} />
                    }
                </div>
            }
            right={
                <>
                    <div className="px-5 mx-2">
                        <div className="box py-1 text-center mb-3">
                            <ButtonGroup options={["📰 Bài đăng", "📋 Hoạt động"]} onClickEvent={index => setTab(index)} />
                        </div>
                        {
                            tab === 0 &&
                            <div>
                                <div className="mb-3">
                                    <Post />
                                </div>
                                <div className="mb-3">
                                    <Post />
                                </div>
                                <div className="mb-3">
                                    <Post />
                                </div>
                                <div className="mb-3">
                                    <Post />
                                </div>
                                <div className="mb-3">
                                    <Post />
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        />
    )
}