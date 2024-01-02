import MultiObjectsInput from "../common/multiObjectsInput";
import Navbar from "../common/navbar";

export default function ProjectLayout({ children }) {
    return (
        <main>
            <Navbar />
            <div className="d-flex p-3">
                <div className="w-25 pe-3">
                    <div className="p-3 rounded-2 bg-white">
                        <div className="mb-3">
                            <div className="fw-semibold fs-13">Thời gian</div>
                            <div className="fs-12 d-flex justify-content-between">
                                <input className="border-lightgray rounded-2 color-gray flex-grow-1 me-2" style={{ height: "34px" }} type="date"></input>
                                <input className="border-lightgray rounded-2 color-gray flex-grow-1" style={{ height: "34px" }} type="date"></input>
                            </div>
                        </div>
                        <div className="mb-3">
                            <MultiObjectsInput label="Địa điểm" />
                        </div>
                        <div className="mb-3">
                            <MultiObjectsInput label="Hạng mục" />
                        </div>
                        <div className="mb-3">
                            <MultiObjectsInput label="Hình thức" />
                        </div>
                        <div className="text-center">
                            <button className="px-3 fs-13 button-green">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </main>
    )
}