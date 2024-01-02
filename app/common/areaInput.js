"use client";

import { useEffect, useState } from "react";
import { callGetAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";

export default function AreaInput({ value, onChangeHandle, require, hiddenLabel, disable }) {
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState();
    const [selectedProvince, setSelectedProvince] = useState("");
    const [filterAreas, setFilterAreas] = useState([]);

    useEffect(() => {
        callGetAPI(ENDPOINT.getAreas).then(body => {
            if(body?.code === 0){
                setAreas(body.data);
                setFilterAreas(body.data);
                setSelectedArea(body.data.find(area => area.id === value));
            }
        })
    }, [])

    useEffect(() => {
        if (areas && value) {
            let selectedArea1 = areas.find(area => area.id === value);
            setSelectedArea(selectedArea1);
            setSelectedProvince(selectedArea1?.province);
            setFilterAreas(areas.filter(area => area.province === selectedArea1?.province));
        }
    }, [areas, value])

    const selectProvince = province => {
        setSelectedProvince(province);
        setSelectedArea(undefined);
        setFilterAreas(areas.filter(area => area.province === province));
        if (onChangeHandle) {
            onChangeHandle("");
        }
    }

    const selectDistrict = areaId => {
        setSelectedArea(filterAreas.find(area => area.id === areaId));
        if (onChangeHandle) {
            onChangeHandle(areaId);
        }
    }

    return (
        <div className="d-flex">
            <div className="form-group col-6 pe-2">
                {
                    !hiddenLabel &&
                    <label className={require && " require"}>Tỉnh/Thành phố</label>
                }
                <select
                    className="form-control"
                    value={selectedProvince}
                    disabled={disable || false}
                    onChange={e => selectProvince(e.target.value)}
                >
                    <option style={{ color: "darkgray", fontStyle: "italic" }} value="">Chọn Tỉnh/Thành phố</option>
                    {
                        [... new Set(areas.map(area => area.province))].map(province =>
                            <option value={province}>{province}</option>
                        )
                    }
                </select>
            </div>
            <div className="form-group col-6 ps-2">
                {
                    !hiddenLabel &&
                    <label className={require && " require"}>Quận/Huyện</label>
                }
                <select
                    className="form-control"
                    placeholder="Chọn Quận/Huyện"
                    disabled={disable || false}
                    value={selectedArea?.id}
                    onChange={e => selectDistrict(e.target.value)}
                >
                    <option style={{ color: "darkgray", fontStyle: "italic" }} value="">Chọn Quận/Huyện</option>
                    {
                        filterAreas.map(area =>
                            <option value={area.id}>{area.district}</option>
                        )
                    }
                </select>
            </div>
        </div>
    )
}