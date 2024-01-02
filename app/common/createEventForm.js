import { useContext, useEffect, useRef, useState } from "react";
import MultiObjectsInput from "./multiObjectsInput";
import { Categories, DonateType, DonateTypes } from "./enum";
import AreaInput from "./areaInput";
import { CloseIcon } from "./icon";
import { callGetAPI, callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import { NotificationManager } from "react-notifications";
import Banner from "./banner";
import { CONTEXT } from "../layout";
import ImageInput from "./imageInput";

const initEventForm = {
    name: "",
    slogan: "",
    organisationId: "",
    createAt: "",
    createdBy: "",
    status: "",
    banner: "",
    bannerFile: null,
    interestedBy: [],
    approvedBy: "",
    approvedAt: "",
    description: "",
    progress: 50,
    donateTypes: [],
    addresses: [{}],
    categories: [],
    startDate: "",
    endDate: "",
    reviews: [],
    members: [],
    moneyGoal: "",
    nonMoneyGoal: ""
}

export default function CreateEventForm({ event, organizationId }) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [form, setForm] = useState(initEventForm);
    const [organizationMembers, setOrgnizationMembers] = useState([]);

    useEffect(() => {
        setForm({ ...form, organisationId: organizationId });
        if (organizationId) {
            callGetAPI(ENDPOINT.getOrganizationMembers + organizationId)
                .then(body => {
                    if (body?.data) {
                        setOrgnizationMembers(body.data);
                    }
                })
        }
    }, [organizationId])

    const createEvent = () => {
        setGlobalState({ ...globalState, isLoading: true });

        const members = form.members.map(member => ({userId: member.userId}));
        let data = {
            name: form.name,
            slogan: form.slogan,
            organizationId: organizationId,
            banner: form.banner,
            bannerFile: form.bannerFile,
            description: form.description,
            donateTypes: form.donateTypes,
            addresses: JSON.stringify(form.addresses),
            categories: form.categories,
            startDate: form.startDate,
            endDate: form.endDate,
            members: JSON.stringify(members),
            moneyGoal: parseInt(form.moneyGoal) || 0,
            nonMoneyGoal: form.nonMoneyGoal
        };

        callPostAPI(ENDPOINT.createEvent, data)
            .then(response => {
                if (response?.code === 0) {
                    NotificationManager.info('Đăng ký tạo sự kiện thành công! Đang chờ phê duyệt', "", 3000);
                }
                else{
                    NotificationManager.error('Có lỗi xảy ra', "", 3000);
                }
            })
            .finally(() => setGlobalState({ ...globalState, isLoading: false }))
    }

    return (
        <div className="d-flex flex-column p-2" style={{ gap: "15px" }}>
            <div class="form-group">
                <label className="require">Tên sự kiện</label>
                <input type="text"
                    class="form-control"
                    placeholder="Nhập tên sự kiện"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
            </div>
            <div class="form-group">
                <label className="require">Khẩu hiệu</label>
                <input type="text"
                    class="form-control"
                    placeholder="Nhập khẩu hiệu của dự án"
                    value={form.slogan}
                    onChange={e => setForm({ ...form, slogan: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label className="require">Ảnh bìa</label>
                <input type="file"
                    className="form-control"
                    placeholder="Tải ảnh bìa"
                    onChange={e => {
                        if (e.target.files.length > 0) {
                            let url = URL.createObjectURL(e.target.files[0]);
                            setForm({ ...form, banner: url, bannerFile: e.target.files[0] });
                        }
                    }}
                />
                {
                    form.banner &&
                    <div className="mt-3">
                        <Banner src={form.banner} rate={21 / 9} />
                    </div>
                }
            </div>
            <div class="form-group">
                <label className="require">Mô tả</label>
                <textarea
                    class="form-control"
                    placeholder="Mô tả về sự kiện của bạn"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    style={{ resize: "none" }}
                    rows="5"
                />
            </div>
            <div>
                <label className="require">Thời gian diễn ra</label>
                <div className="d-flex justify-content-between align-items-center">
                    <input
                        class="form-control"
                        type="date"
                        value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })}
                    />
                    <span className="mx-3">đến</span>
                    <input
                        class="form-control"
                        type="date"
                        value={form.endDate}
                        onChange={e => setForm({ ...form, endDate: e.target.value })}
                    />
                </div>
            </div>
            <MultiObjectsInput require={true}
                label="Hạng mục từ thiện"
                onChangeHandle={values => setForm({ ...form, categories: values })}
                objects={Categories()} />
            <MultiObjectsInput require={true}
                label="Hình thức từ thiện"
                onChangeHandle={values => setForm({ ...form, donateTypes: values })}
                objects={DonateTypes()} />
            {
                form.donateTypes?.length > 0 &&
                <div className="box border-lightgray">
                    <label>Mục tiêu của dự án</label>
                    <div>
                        {
                            form.donateTypes.includes("MONEY") &&
                            <div className="d-flex align-items-center mt-2">
                                <label className="require me-3 col-2">Tiền:</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Nhập số tiền mục tiêu"
                                    value={form.moneyGoal}
                                    onChange={e => setForm({ ...form, moneyGoal: e.target.value })}
                                />
                            </div>
                        }
                        {
                            form.donateTypes.filter(type => type !== "MONEY").length > 0 &&
                            <div className="d-flex align-items-center mt-2">
                                <label className="require me-3 col-2">Vật phẩm:</label>
                                <input type="text"
                                    class="form-control"
                                    placeholder="Nhập số lượng vật phẩm mục tiêu"
                                    value={form.nonMoneyGoal}
                                    onChange={e => setForm({ ...form, nonMoneyGoal: e.target.value })}
                                />
                            </div>
                        }
                    </div>
                </div>
            }
            <div>
                <label className="require">Khu vực từ thiện</label>
                {
                    <div className="box border-lightgray">
                        {
                            form.addresses?.map((address, index) =>
                                <div className="d-flex mb-4 align-items-center" key={index}>
                                    <div className="me-3">{index + 1}.</div>
                                    <div className="flex-grow-1">
                                        <AreaInput
                                            value={address?.areaId}
                                            hiddenLabel={true}
                                            onChangeHandle={value => {
                                                let newAddressList = [...form.addresses];
                                                if (!newAddressList[index])
                                                    newAddressList[index] = {};
                                                newAddressList[index].areaId = value;
                                                setForm({ ...form, addresses: newAddressList })
                                            }} />
                                        <input type="text"
                                            class="form-control mt-2"
                                            placeholder="Nhập địa chỉ chi tiết"
                                            value={address?.detail}
                                            onChange={e => {
                                                let newAddressList = [...form.addresses];
                                                if (!newAddressList[index])
                                                    newAddressList[index] = {};
                                                newAddressList[index].detail = e.target.value;
                                                setForm({ ...form, addresses: newAddressList })
                                            }}
                                        />
                                    </div>
                                    {
                                        form.addresses?.length > 1 &&
                                        <div className="ms-3 align-middle pointer"
                                            onClick={() => {
                                                let newAddressList = [...form.addresses];
                                                newAddressList.splice(index, 1);
                                                setForm({ ...form, addresses: newAddressList });
                                            }}
                                        >
                                            <CloseIcon />
                                        </div>
                                    }
                                </div>
                            )
                        }
                        <div>
                            <button className="button-white fs-13 py-1 px-2"
                                onClick={() => setForm({ ...form, addresses: [...form.addresses, {}] })}
                            >+ Thêm khu vực</button>
                        </div>
                    </div>
                }
            </div>
            <MultiObjectsInput label="Thành viên tham gia sự kiện"
                objects={organizationMembers.map(member => {
                    return (
                        {
                            key: member.userId,
                            name:
                                <span className="d-flex align-items-center">
                                    <div className="avatar me-2" style={{ height: "30px", width: "30px" }}>
                                        <img src={member.avatar}></img>
                                    </div>
                                    <div>
                                        {member.name}
                                    </div>
                                </span>
                        }
                    )
                })}
                onChangeHandle={value => {
                    setForm({
                        ...form, members: organizationMembers
                            .filter(member => value.includes(member.userId))
                            .map(member => new Object(
                                {
                                    userId: member.userId,
                                    name: member.name,
                                    avatar: member.avatar
                                }
                            ))
                    })
                }}
            />
            <button className="w-100 button-blue mt-3" onClick={createEvent}>Tạo sự kiện</button>
        </div>
    )
}

