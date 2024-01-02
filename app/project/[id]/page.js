"use client";

import { useEffect, useRef, useState } from "react"
import Statement from "../statement";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { callGetAPI } from "../../util/callAPI";
import { ENDPOINT } from "../../util/constant";
import OneColLayout from "../../Layout/oneColLayout";
import Banner from "../../common/banner";
import { Rating } from "@mui/material";
import { ButtonGroup } from "../../common/buttonGroup";
import Post from "../../common/post";
import InTransactions from "../../common/inTransaction";
import OutTransactions from "../../common/outTransaction";
import { BookmarkIcon, ReplyIcon, ThreeHeartIcon } from "../../common/icon";
import Dashboard from "../../common/dashboard";
import { models } from "powerbi-client";

export default function ProjectDetailPage() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [tab, setTab] = useState(0);
  const [myRate, setMyRate] = useState(0);
  const [event, setEvent] = useState();

  const selectTab = (index) => {
    setTab(index);
  }

  useEffect(() => {
    if (id) {
      callGetAPI(ENDPOINT.getEvent + id)
        .then(body => {
          if (body?.code === 0) {
            setEvent(body.data);
          }
        })
    }
  }, [])

  return (
    <OneColLayout
      children=
      {
        <div>
          <div className="bg-white d-flex justify-content-center">
            <div className="col-md-8">
              <div>
                <div>
                  <Banner src={event?.banner} rate={21 / 9} />
                </div>
                <div className="py-3">
                  <div className="fw-bold fs-25 me-3">{event?.name}</div>
                  <div className="color-gray">
                    <Link href={"/organization/" + event?.organization?.id}>
                      {event?.organization?.name}
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center pb-3">
                  <Rating
                    name="simple-controlled"
                    value={myRate}
                    onChange={(event, newValue) => {
                      setMyRate(newValue);
                    }}
                  />
                  <span className="ms-2">{event?.averageRate || 4.8}</span>
                </div>
                <div className="py-3 fs-13" style={{ borderTop: "1px solid darkgray" }}>
                  <button className="flex-grow-1 me-2 button-white"><BookmarkIcon fs="15px" /> <span className="ms-1">Quan tâm</span></button>
                  <Link href={"/donate/" + event?.id}>
                    <button className="flex-grow-1 me-2 button-white"><ThreeHeartIcon fs="15px" /> <span className="ms-1">Quyên góp</span></button>
                  </Link>
                  <button className="flex-grow-1 button-white"><ReplyIcon fs="15px" /> <span className="ms-1">Chia sẻ</span></button>
                </div>
              </div>
              <div className="pb-3">
                <div className="d-flex justify-content-between gap-3">
                  <div className="text-center flex-grow-1 rounded-2 p-2 bg-light-green">
                    <h6>{event?.interestedBy?.length || 0} người</h6>
                    <div className="color-gray">Số người quan tâm</div>
                  </div>
                  <div className="text-center flex-grow-1 rounded-2 p-2 bg-light-green">
                    <h6>115 lượt</h6>
                    <div className="color-gray">Số lượt quyên góp</div>
                  </div>
                  <div className="text-center flex-grow-1 rounded-2 p-2 bg-light-green">
                    <h6>34 lượt</h6>
                    <div className="color-gray">Số lượt chia sẻ</div>
                  </div>
                </div>
              </div>
              <div className="py-1" style={{ borderTop: "1px solid darkgray" }}>
                <ButtonGroup options={["Giới thiệu", "Thảo luận", "Lịch sử quyên góp", "Lịch sử chi", "Thống kê"]} onClickEvent={selectTab} />
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex flex-column m-auto col-md-8 col-12" style={{ gap: "12px" }}>
            {
              tab === 0 &&
              <div>
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
              </div>
            }
            {
              tab === 2 &&
              <div className="box">
                <InTransactions eventId={event?.id} />
              </div>
            }
            {
              tab === 3 &&
              <div className="box">
                <OutTransactions eventId={event?.id} />
              </div>
            }
            {
              tab === 4 &&
              <div>
                <Dashboard
                  filter={
                    [
                      {
                        $schema: "http://powerbi.com/product/schema#advanced",
                        target: {
                          table: "vinatim_olap FACT_EVENT_REVIEWS",
                          column: "eventId"
                        },
                        operator: "In",
                        values: [event.id],
                        filterType: models.FilterType.BasicFilter,
                        requireSingleSelection: true
                      },
                      {
                        $schema: "http://powerbi.com/product/schema#advanced",
                        target: {
                          table: "vinatim_olap FACT_IN_TRANSACTIONS",
                          column: "eventId"
                        },
                        operator: "In",
                        values: [event.id],
                        filterType: models.FilterType.BasicFilter,
                        requireSingleSelection: true
                      },
                      {
                        $schema: "http://powerbi.com/product/schema#advanced",
                        target: {
                          table: "vinatim_olap FACT_OUT_TRANSACTIONS",
                          column: "eventId"
                        },
                        operator: "In",
                        values: [event.id],
                        filterType: models.FilterType.BasicFilter,
                        requireSingleSelection: true
                      }
                    ]
                  }
                  pageName="ReportSectione86abfe0ba70ed12c00c"
                />
              </div>
            }
          </div>
        </div>
      }
    />
  )
}