"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { callGetAPI } from "../../util/callAPI";
import { ENDPOINT } from "../../util/constant";
import { CONTEXT } from "../../layout";
import SearchLayout from "../../Layout/searchLayout";
import FollowOrganizationButton from "../../common/followOrganizationButton";
import Link from "next/link";
import { StarIcon } from "../../common/icon";

const initFilter = {
    name: "",
    province: "",
    page: 0,
    size: 10
}

export default function OrganizationSearchPage() {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const params = useSearchParams();
    const text = params.get("q");
    const [organizations, setOrganizations] = useState([]);
    const [filter, setFilter] = useState(initFilter);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        callGetAPI(ENDPOINT.getAreas)
            .then(body => {
                if (body?.code == 0) {
                    let provinces1 = Array.from(new Set(body.data.map((area) => area.province || "")));
                    setProvinces(provinces1);
                }
            });
    }, [])

    const searchOrganization = () => {
        setGlobalState({ ...globalState, isLoading: true });
        const params = new URLSearchParams();
        params.set("name", filter.name);
        params.set("province", filter.province);
        params.set("page", filter.page);
        params.set("size", filter.size);
        callGetAPI(ENDPOINT.filterOrganizations + params.toString())
            .then(body => {
                if (body?.code === 0) {
                    setOrganizations(body.data);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }))
    }

    useEffect(() => {
        setGlobalState({ ...globalState, isLoading: true });
        setFilter({ ...filter, name: text });
        const params = new URLSearchParams();
        params.set("name", text);
        params.set("page", filter.page);
        params.set("size", filter.size);
        callGetAPI(ENDPOINT.filterOrganizations + params.toString())
            .then(body => {
                if (body?.code === 0) {
                    console.log(body.data)
                    setOrganizations(body.data);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }))
    }, [])

    return (
        <SearchLayout selectedTab={1} searchText={text}>
            <div>
                <div className="box mb-3" style={{ backgroundColor: "var(--color-light-green)" }}>
                    <div className="row">
                        <div className="form-group col-5">
                            <label>Tên tổ chức</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên tổ chức"
                                value={filter?.name}
                                onChange={e => setFilter({ ...filter, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group col-5">
                            <label>Thành phố</label>
                            <select
                                className="form-control"
                                value={filter?.province}
                                onChange={e => setFilter({ ...filter, province: e.target.value })}
                            >
                                <option value="">Tất cả</option>
                                {
                                    provinces.map(province =>
                                        <option value={province}>
                                            {province}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col-2 d-flex">
                            <button className="button-blue mt-auto ms-auto" onClick={searchOrganization}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                {
                    (!organizations || organizations.length === 0) &&
                    <div className="text-center">Không có kết quả phù hợp</div>
                }

                {
                    organizations.map(organization =>
                        <div className="d-flex align-items-center box mb-3">
                            <div className="avatar me-3" style={{ height: "60px", width: "60px" }}>
                                <img src={organization.avatar}></img>
                            </div>
                            <div className="flex-grow-1">
                                <Link href={"/organization/" + organization.id}>
                                    <div className="fs-18 fw-semibold">
                                        {organization.name}
                                    </div>
                                </Link>

                                <div>
                                    {
                                        organization?.rate > 0 ?
                                            <span className="me-3">
                                                <span className="me-1">{organization.rate}</span>
                                                <StarIcon fs="18px" />
                                            </span>
                                            :
                                            <span className="me-3">Chưa có đánh giá</span>
                                    }
                                    {
                                        organization?.followerCount > 0 ?
                                            <span>{organization.followerCount || 0} người theo dõi</span>
                                            :
                                            <span>Chưa có người theo dõi</span>
                                    }
                                </div>
                            </div>
                            <div className="text-end">
                                <FollowOrganizationButton organizationId={organization.id} />
                            </div>
                        </div>
                    )
                }
            </div>
        </SearchLayout>
    )
}