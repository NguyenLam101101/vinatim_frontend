"use client"

import ProjectLayout from "../Layout/projectLayout";
import ProjectCard from "../common/projectCard";

export default function ProjectPage(props) {
    return (
        <ProjectLayout>
            <div>
                <div className="box mb-3">
                    <div className="fw-semibold fs-18 mb-2">Các hạng mục</div>
                    <div className="d-flex justify-content-between mb-3">
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/urgency.png"></img>
                            <div className="mt-2 fw-semibold">Khẩn cấp</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/medicine.svg"></img>
                            <div className="mt-2 fw-semibold">Y tế</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/disaster.png"></img>
                            <div className="mt-2 fw-semibold">Thiên tai</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/education.png"></img>
                            <div className="mt-2 fw-semibold">Giáo dục</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/children.png"></img>
                            <div className="mt-2 fw-semibold">Trẻ em</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/environment.png"></img>
                            <div className="mt-2 fw-semibold">Môi trường</div>
                        </div>
                        <div className="px-4 py-2 rounded-3 bg-light-gray text-center" style={{ width: "fit-content", maxHeight: "150px" }}>
                            <img src="http://localhost:3000/other.png"></img>
                            <div className="mt-2 fw-semibold">Khác</div>
                        </div>
                    </div>
                </div>
                <div className="mb-3 box">
                    <div className="fw-semibold fs-18 mb-2">
                        Dự án bạn quan tâm
                    </div>
                    <div id="carouselExampleInterval" style={{ padding: "0 30px" }} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev p-0" style={{ width: "30px" }} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" style={{ backgroundImage: 'none' }} aria-hidden="true"></span>
                            <i class="bi bi-caret-left-fill fs-25 text-black"></i>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next p-0" style={{ width: "30px" }} type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" style={{ backgroundImage: 'none' }} aria-hidden="true"></span>
                            <i class="bi bi-caret-right-fill fs-25 text-black"></i>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="mb-3 box">
                    <div className="fw-semibold fs-18 mb-2">
                        Có thể bạn quan tâm
                    </div>
                    <div id="carouselExampleInterval1" style={{ padding: "0 30px" }} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="10000">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="d-flex gap-2">
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                    <ProjectCard />
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev p-0" style={{ width: "30px" }} type="button" data-bs-target="#carouselExampleInterval1" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" style={{ backgroundImage: 'none' }} aria-hidden="true"></span>
                            <i class="bi bi-caret-left-fill fs-25 text-black"></i>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next p-0" style={{ width: "30px" }} type="button" data-bs-target="#carouselExampleInterval1" data-bs-slide="next">
                            <span className="carousel-control-next-icon" style={{ backgroundImage: 'none' }} aria-hidden="true"></span>
                            <i class="bi bi-caret-right-fill fs-25 text-black"></i>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </ProjectLayout>
    )
}