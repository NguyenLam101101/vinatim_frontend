"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { callGetAPI } from "../../util/callAPI";
import { ENDPOINT } from "../../util/constant";
import { CONTEXT } from "../../layout";
import SearchLayout from "../../Layout/searchLayout";
import MultiObjectsInput from "../../common/multiObjectsInput";
import { Categories, DonateTypes } from "../../common/enum";
import EventCard from "../../common/projectCard";


const initFilter = {
    name: "",
    province: "",
    categories: [],
    donateTypes: [],
    page: 0,
    size: 10
}

export default function EventSearchPage() {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const params = useSearchParams();
    const text = params.get("q");
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState(initFilter);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        setGlobalState({ ...globalState, isLoading: true });
        setFilter({...filter, name: text});
        const params = new URLSearchParams();
        params.set("name", text);
        params.set("page", filter.page);
        params.set("size", filter.size);
        callGetAPI(ENDPOINT.filterEvents + params.toString())
            .then(body => {
                if (body?.code === 0) {
                    setEvents(body.data);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }));
    }, []);

    useEffect(() => {
        callGetAPI(ENDPOINT.getAreas)
            .then(body => {
                if (body?.code == 0) {
                    let provinces1 = Array.from(new Set(body.data.map((area) => area.province || "")));
                    setProvinces(provinces1);
                }
            });
    }, [])

    const searchEvent = () => {
        setGlobalState({ ...globalState, isLoading: true });
        const params = new URLSearchParams();
        params.set("name", filter.name);
        params.set("province", filter.province);
        params.set("categories", filter.categories.toString());
        params.set("donateTypes", filter.donateTypes.toString());
        params.set("page", filter.page);
        params.set("size", filter.size);
        callGetAPI(ENDPOINT.filterEvents + params.toString())
            .then(body => {
                if (body?.code === 0) {
                    setEvents(body.data);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }))
    }

    return (
        <SearchLayout selectedTab={2} searchText={text}>
            <div>
                <div className="box mb-3" style={{ backgroundColor: "var(--color-light-green)" }}>
                    <div className="row">
                        <div className="form-group col-6 mb-2">
                            <label>Tên sự kiện</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên tổ chức"
                                value={filter?.name}
                                onChange={e => setFilter({ ...filter, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group col-6 mb-2">
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
                        <div className="col-6 mb-2">
                            <MultiObjectsInput
                                label="Loại hình"
                                objects={Categories()}
                                onChangeHandle={value => setFilter({ ...filter, categories: value })} />
                        </div>
                        <div className="col-6 mb-2">
                            <MultiObjectsInput
                                label="Hình thức"
                                objects={DonateTypes()}
                                onChangeHandle={value => setFilter({ ...filter, donateTypes: value })} />
                        </div>
                        <div className="mt-2 w-100 text-end">
                            <button className="button-blue" onClick={searchEvent}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                {
                    (!events || events.length === 0) &&
                    <div className="text-center">Không có kết quả phù hợp</div>
                }
                {
                    events.map(event =>
                        <div className="d-flex align-items-center mb-3">
                            <EventCard event={event} isHorizontal={true} />
                        </div>
                    )
                }
            </div>
        </SearchLayout>
    )
}