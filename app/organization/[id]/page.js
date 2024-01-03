"use client";

import { useEffect, useRef, useState } from "react"
import OneColLayout from "../../Layout/oneColLayout";
import { Rating } from "@mui/material";
import { EventStatus } from "../../common/enum";
import EventCard from "../../common/projectCard";
import { usePathname } from "next/navigation";
import CreateEventForm from "../../common/createEventForm";
import { callGetAPI } from "../../util/callAPI";
import { ENDPOINT } from "../../util/constant";
import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "../../common/icon";
import { ButtonGroup } from "../../common/buttonGroup";
import Banner from "../../common/banner";
import Post from "../../common/post";
import Link from "next/link";
import PopUp from "../../common/popUp";

export default function OrganizationPage({ }) {
    const pathname = usePathname();
    const id = pathname.split("/")[2];
    const [tab, setTab] = useState(0);
    const [myRate, setMyRate] = useState(0);
    const [isShowCreateEventPopup, setIsShowCreateEventPopup] = useState(false);
    const [organization, setOrganization] = useState();

    const selectTab = (index) => {
        setTab(index);
    }

    useEffect(() => {
        if (id) {
            callGetAPI(ENDPOINT.getOrganization + id)
                .then(reponse => {
                    if (reponse?.code === 0) {
                        setOrganization(reponse.data);
                        console.log(reponse.data);
                    }
                })
        }
    }, [])

    return (
        <OneColLayout
            children={
                <>
                    <div className="bg-white">
                        <div className="col-md-10 m-auto">
                            <Banner src={organization?.banner} rate={21 / 9} />
                            <div className="py-2 d-flex justify-content-between align-items-center position-relative">
                                <div className="avatar position-absolute ms-4" style={{ width: "150px", height: "150px", top: "-75px" }}>
                                    <img src={organization?.avatar}></img>
                                </div>
                                <div style={{ paddingLeft: "200px" }}>
                                    <div className="fw-bold fs-25">
                                        {organization?.name}
                                    </div>
                                    <div className="me-4 color-gray">12K người theo dõi</div>
                                    <div className="d-flex align-items-end mt-3">
                                        <Rating
                                            name="simple-controlled"
                                            value={myRate}
                                            onChange={(event, newValue) => {
                                                setMyRate(newValue);
                                            }}
                                        />
                                        <span className="ms-2 me-3">{organization?.averageRate || 4.8}</span>
                                        <span className="color-gray fs-13">11K người đánh giá</span>
                                    </div>
                                </div>
                                <div>
                                    <button className="button-white me-2">+ Theo dõi</button>
                                    <button className="button-green me-2" onClick={() => setIsShowCreateEventPopup(true)}>Tạo sự kiện</button>
                                    <Link href={"/organization/management/" + organization?.id}>
                                        <button className="button-green">Quản trị tổ chức</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="px-3 py-2 fs-13" style={{ borderTop: "1px solid darkgray" }}>
                                <ButtonGroup options={["Bài đăng", "Dự án"]} onClickEvent={selectTab} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex col-md-10 m-auto mt-3" style={{ justifyContent: "stretch" }}>
                        <div className="col-md-4 pe-3">
                            <div className="box position-sticky top-0">
                                <div className="fw-semibold fs-18 mb-1">Giới thiệu</div>
                                <div style={{ textAlign: "justify" }}>
                                    {
                                        organization?.description ||
                                        "Như một cộng đồng đoàn kết, chúng ta đang đối diện với một thảm họa kinh hoàng - vụ cháy chung cư mini đã gây ra nhiều thiệt hại đối với hàng trăm gia đình vô cùng đau buồn và mất mát. Trong thời khắc khó khăn này, chúng ta cần đứng lại bên nhau và hỗ trợ những nạn nhân của sự kiện này. Chúng tôi xin kêu gọi mọi người tham gia vào chiến dịch quyên góp để giúp đỡ những người bị ảnh hưởng nghiêm trọng bởi vụ cháy. Mọi khoản đóng góp, dù lớn hay nhỏ, đều có ý nghĩa. Tiền quyên góp sẽ được sử dụng để hỗ trợ cho việc tái thiết nhà cửa, mua đồ cần thiết và giúp đỡ tinh thần cho các gia đình bị ảnh hưởng."
                                    }
                                </div>
                                <div className="pt-2 mt-2" style={{ borderTop: "1px solid darkgray" }}>
                                    <div className="mt-1">
                                        <div>
                                            <span className="me-2">
                                                <PhoneIcon fs="16px" />
                                            </span>
                                            <span>{organization?.phone}</span>
                                        </div>
                                        <div className="mt-1">
                                            <div>
                                                <span className="me-2">
                                                    <MailIcon fs="16px" />
                                                </span>
                                                <span>{organization?.email}</span>
                                            </div>
                                            <div className="mt-1">
                                                <span className="me-2">
                                                    <LocationIcon fs="16px" />
                                                </span>
                                                <span>{organization?.address?.province}</span>
                                                <span> - </span>
                                                <span>{organization?.address?.district}</span>
                                                <span>, </span>
                                                <span>{organization?.address?.detail}</span>
                                            </div>
                                            <div>
                                                <span className="me-2">
                                                    <GlobeIcon fs="16px" />
                                                </span>
                                                <span>{organization?.website}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {tab === 0 &&
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
                            {tab === 1 &&
                                <div>
                                    <div className="box mb-3">
                                        <div className="fs-18 fw-semibold mb-1">Dự án sắp diễn ra</div>
                                        {
                                            organization?.events?.filter(event => event.status === EventStatus().ACCEPTED)
                                                .map(event =>
                                                    <div className="border-top-lightgray py-1">
                                                        <EventCard event={event} isHorizontal={true} />
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="box mb-3">
                                        <div className="fs-18 fw-semibold mb-1">Dự án đang diễn ra</div>
                                        {
                                            organization?.events?.filter(event => event.status === EventStatus().ACTIVE)
                                                .map(event =>
                                                    <div className="border-top-lightgray py-1">
                                                        <EventCard event={event} isHorizontal={true} />
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className="box mb-3">
                                        <div className="fs-18 fw-semibold mb-1">Dự án đã hoàn thành</div>
                                        {
                                            organization?.events?.filter(event => event.status === EventStatus().CLOSED)
                                                .map(event =>
                                                    <div className="border-top-lightgray py-1">
                                                        <EventCard event={event} isHorizontal={true} />
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        isShowCreateEventPopup &&
                        <PopUp
                            title="Tạo sự kiện mới"
                            content={
                                <CreateEventForm organizationId={organization?.id} />
                            }
                            closeHandle={() => setIsShowCreateEventPopup(false)}
                            width="60%"
                        />
                    }

                </>
            }
        />
    )
}