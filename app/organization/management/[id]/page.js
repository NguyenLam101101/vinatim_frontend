"use client"

import { useEffect, useState } from "react"
import { ButtonGroup, ButtonGroupVertical } from "../../../common/buttonGroup";
import CreateOrganizationForm from "../../../common/createOrganizationForm";
import InTransactionManagement from "../../../common/inTransactionManagement";
import { callGetAPI } from "../../../util/callAPI";
import { ENDPOINT } from "../../../util/constant";
import { usePathname } from "next/navigation";
import OutTransactions from "../../../common/outTransaction";
import OutTransactionManagement from "../../../common/outTransactionManagement";
import Navbar from "../../../common/navbar";
import { BankIcon, MoneyIcon } from "../../../common/icon";
import Dashboard from "../../../common/dashboard";
import { models } from "powerbi-client";

export default function OrganizationPage() {
    const pathname = usePathname();
    const organizationId = pathname.split("/")[3];
    const [organization, setOrganization] = useState();
    const [tab, setTab] = useState(0);

    useEffect(() => {
        callGetAPI(ENDPOINT.getOrganization + organizationId)
            .then(body => {
                if (body?.code === 0) {
                    setOrganization(body.data);
                }
            })
    }, [])

    return (
        <div style={{ minHeight: "100vh", width: "100%" }}>
            <Navbar />
            <div className="d-flex mt-3">
                <div className="col-3 ps-3">
                    <ButtonGroupVertical
                        buttonHeight="50px"
                        options={[
                            <div className="text-start">
                                <i className="bi bi-question-square-fill me-2"></i>
                                Thông tin tổ chức
                            </div>
                            ,
                            <div className="text-start">
                                <i className="bi bi-calendar-event-fill me-2"></i>
                                Quản lý sự kiện
                            </div>
                            ,
                            <div className="text-start">
                                <span className="me-2"><BankIcon fs="20px" /></span>
                                Quản lý quyên góp
                            </div>
                            ,
                            <div className="text-start">
                                <span className="me-2"><MoneyIcon fs="20px" /></span>
                                Quản lý chi
                            </div>
                            ,
                            <div className="text-start">
                                <i className="bi bi-bar-chart-fill me-2"></i>
                                Báo cáo thống kê
                            </div>
                        ]}
                        onClickEvent={index => setTab(index)}
                    />
                </div>
                <div className="col-9 pe-4">
                    {
                        tab === 0 &&
                        <div className="box">
                            <CreateOrganizationForm organization={organization} />
                        </div>
                    }
                    {
                        tab === 2 &&
                        <InTransactionManagement organization={organization} />
                    }
                    {
                        tab === 3 &&
                        <OutTransactionManagement organization={organization} />
                    }
                    {
                        tab === 4 &&
                        <div style={{display: tab === 4 ? "" : "none"}}>
                            <Dashboard
                                pageName="ReportSection"
                                filter={
                                    [
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap FACT_ORG_FOLLOWERS",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap FACT_ORG_REVIEWS",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap DIM_EVENT",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap FACT_IN_TRANSACTIONS",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap FACT_EVENT",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap DIM_EVENT_CATEGORY",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                        {
                                            $schema: "http://powerbi.com/product/schema#advanced",
                                            target: {
                                                table: "vinatim_olap DIM_EVENT_DONATETYPE",
                                                column: "orgId"
                                            },
                                            operator: "In",
                                            values: [organization?.id],
                                            filterType: models.FilterType.BasicFilter,
                                            requireSingleSelection: true
                                        },
                                    ]
                                }
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}