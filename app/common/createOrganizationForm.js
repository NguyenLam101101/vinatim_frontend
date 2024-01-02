import { useContext, useEffect, useRef, useState } from "react";
import PopUp from "./popUp";
import { ButtonGroupVertical } from "./buttonGroup";
import { CloseIcon, SearchIcon } from "./icon";
import AreaInput from "./areaInput";
import { callGetAPI, callPostAPI } from "../util/callAPI";
import { ENDPOINT } from "../util/constant";
import { NotificationManager } from 'react-notifications';
import Banner from "./banner";
import { CONTEXT } from "../layout";

const initOrganizationForm = {
    name: "",
    avatar: "",
    banner: "",
    avatarFile: null,
    bannerFile: null,
    description: "",
    address: {
        areaId: "",
        detail: ""
    },
    phone: "",
    website: "",
    email: "",
    status: "UNVERIFIED",
    members: [],
    representative: "",
    activities: "",
}

export default function CreateOrganizationForm({ organization }) {
    const [globalState, setGlobalState] = useContext(CONTEXT);
    const [form, setForm] = useState(initOrganizationForm);
    const [tab, setTab] = useState(0);
    const [memberSearch, setMemberSearch] = useState("");
    const [isCommitted, setIsCommitted] = useState(false);

    useEffect(() => {
        if (organization) {
            setForm({
                name: organization.name,
                avatar: organization.avatar,
                banner: organization.banner,
                avatarFile: null,
                bannerFile: null,
                description: organization.description,
                address: {
                    areaId: organization?.address?.areaId,
                    detail: organization?.address?.detail
                },
                phone: organization.phone,
                website: organization.website,
                email: organization.email,
                status: organization.status,
                members: organization.members,
                representative: organization.representative,
                activities: organization.activities
            })
        }
    }, [organization])

    useEffect(() => {
        if (globalState.myInfo && !organization) {
            setForm({ ...form, members: [{ userId: globalState.myInfo.id, name: globalState.myInfo.name, avatar: globalState.myInfo.avatar, role: "ADMIN" }] });
        }
    }, [globalState.myInfo])

    const createOrganization = () => {
        const members = form.members.map(member => ({ userId: member.userId, role: member.role }));
        let formRequest = {
            ...form,
            address: JSON.stringify(form.address),
            members: JSON.stringify(members)
        };
        callPostAPI(ENDPOINT.createOrganization, formRequest)
            .then(response => {
                if (response?.code === 0) {
                    NotificationManager.info('Đăng ký tạo tổ chức thành công! Đang chờ phê duyệt', "", 3000);
                }
            })
    }

    const searchMember = () => {
        callGetAPI(ENDPOINT.findUserByEmailOrPhone + memberSearch.trim())
            .then(response => {
                console.log(response);
                if (response?.code === 0) {
                    if (response?.data) {
                        setForm({
                            ...form,
                            members: [...form.members, { userId: response?.data.id, role: "ADMIN", name: response?.data.name, avatar: response?.data.avatar }]
                        });
                    }
                    else {
                        NotificationManager.error('Không tồn tại người dùng', "", 3000);
                    }
                }
            })
    }

    return (
        <div className="d-flex mt-3">
            <div className="col-3 pe-3">
                <ButtonGroupVertical
                    selectedIndex={tab}
                    options={["Thông tin chung", "Thông tin liên hệ", "Thành viên", "Cam kết"]}
                    onClickEvent={index => setTab(index)}
                />
            </div>
            <div className="col-9">
                {
                    tab === 0 &&
                    <div className="d-flex flex-column" style={{ gap: "15px" }}>
                        <div className="form-group">
                            <label className="require">Tên tổ chức</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên tổ chức"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="require">Mô tả</label>
                            <textarea
                                className="form-control"
                                placeholder="Mô tả về tổ chức của bạn"
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                style={{ resize: "none" }}
                                rows="7"
                            />
                        </div>
                        <div className="form-group">
                            <label>Hoạt động và thành tích</label>
                            <textarea
                                className="form-control"
                                placeholder="Liệt kê các hoạt động và thành tích đã có"
                                value={form.activities}
                                onChange={e => setForm({ ...form, activities: e.target.value })}
                                style={{ resize: "none" }}
                                rows="7"
                            />
                        </div>
                        <div className="form-group">
                            <label className="require">Ảnh đại diện</label>
                            <input type="file"
                                className="form-control"
                                placeholder="Tải ảnh đại diện"
                                onChange={e => {
                                    if (e.target.files.length > 0) {
                                        let url = URL.createObjectURL(e.target.files[0]);
                                        setForm({ ...form, avatar: url, avatarFile: e.target.files[0] });
                                    }
                                }}
                            />
                            {
                                form.avatar &&
                                <div className="text-center mt-3">
                                    <img style={{ width: "100px", height: "100px", borderRadius: "50%" }} src={form.avatar}></img>
                                </div>
                            }
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
                    </div>
                }
                {
                    tab === 1 &&
                    <div className="d-flex flex-column" style={{ gap: "15px" }}>
                        <div className="form-group">
                            <label className="require">Người đại diện</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tên người đại diện"
                                value={form.representative}
                                onChange={e => setForm({ ...form, representative: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="require">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="require">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập email của tổ chức"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập địa chỉ website của tổ chức"
                                value={form.website}
                                onChange={e => setForm({ ...form, website: e.target.value })}
                            />
                        </div>
                        <AreaInput
                            require={true}
                            value={form.address.areaId}
                            onChangeHandle={id => setForm({ ...form, address: { ...form.address, areaId: id } })}
                        />
                        <div className="form-group">
                            <label className="require">Địa chỉ chi tiết</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Số nhà, tên đường,..."
                                value={form.address.detail}
                                onChange={e => setForm({ ...form, address: { ...form.address, detail: e.target.value } })}
                            />
                        </div>
                    </div>
                }
                {
                    tab === 2 &&
                    <div>
                        <div className="form-group">
                            <label>Thêm thành viên</label>
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Nhập email hoặc số điện thoại"
                                    value={memberSearch}
                                    onChange={e => setMemberSearch(e.target.value)}
                                />
                                <div className="pointer" onClick={searchMember}>
                                    <SearchIcon fs="16px" />
                                </div>
                            </div>
                        </div>
                        {
                            form.members.map((member, index) =>
                                <div className="d-flex align-items-center mt-3">
                                    <div className="d-flex align-items-center col-8">
                                        <div className="avatar me-3">
                                            <img src={member.avatar}></img>
                                        </div>
                                        <div>
                                            {member.name}
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <select
                                            className="form-control"
                                            value={member.role}
                                            onChange={e => {
                                                let newMembers = [...form.members];
                                                newMembers[index].role = e.target.value;
                                                setForm({ ...form, members: newMembers })
                                            }}
                                        >
                                            <option value="ADMIN">Quản trị viên</option>
                                            <option value="MEMBER">Thành viên</option>
                                        </select>
                                    </div>
                                    <div className="col-1 text-end pointer"
                                        onClick={() => {
                                            let newMembers = [...form.members];
                                            newMembers.splice(index, 1)
                                            setForm({ ...form, members: newMembers })
                                        }}>
                                        <CloseIcon />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                {
                    tab === 3 &&
                    <div>
                        <div className="fs-18 mb-2">Cam kết của tổ chức với VinaTim</div>
                        <ul>
                            <li className="mb-2">Cam kết công bố công khai sử dụng tài khoản thiện nguyện trên các kênh thông tin đại chúng gồm: Tên chủ tài khoản, số tài khoản, mục đích sử dụng, báo cáo các sao kê tự động.</li>
                            <li className="mb-2">Cam kết đồng ý với các điều khoản và điều kiện của nền tảng VinaTim về minh bạch sử dụng số tiền quyên góp và chịu trách nhiệm pháp lý đầy đủ với mọi quy định và luật lệ liên quan đến việc quản lý và sử dụng số tiền quyên góp.</li>
                            <li className="mb-2">Đồng ý chấp nhận sự kiểm soát và giám sát từ các cơ quan quản lý liên quan để đảm bảo tính minh bạch và trung thực trong mọi giao dịch tài chính.</li>
                            <li className="mb-2">Chúng tôi hoan nghênh sự giám sát và đánh giá từ cộng đồng và các bên liên quan để đảm bảo rằng chúng tôi duy trì một mức độ minh bạch cao và tuân thủ mọi quy định. Bằng cách này, chúng tôi hy vọng có thể xây dựng niềm tin và hỗ trợ lâu dài từ phía cộng đồng quyên góp và mọi đối tác liên quan.</li>
                        </ul>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                className="me-2"
                                checked={isCommitted}
                                onClick={() => setIsCommitted(!isCommitted)}
                            />
                            <label>
                                Đồng ý với
                                <span className="color-blue"> chính sách và điều khoản </span>
                                của VinaTim.
                            </label>
                        </div>
                    </div>
                }
                <div className="text-center mt-4">
                    {tab < 3 &&
                        <button className="button-white"
                            onClick={() => {
                                setTab(Math.min(tab + 1, 3))
                            }}
                        >Tiếp</button>
                    }
                    {
                        tab === 3 &&
                        <button
                            disabled={!isCommitted}
                            className="button-green"
                            onClick={createOrganization}>
                            Tạo</button>
                    }
                </div>
            </div>
        </div>
    )
}

