"use client"

import Post from './common/post'
import { useContext, useEffect, useState } from 'react'
import { CONTEXT } from './layout'
import { Slide } from 'react-slideshow-image'
import TwoColLayout from './Layout/twoColLayout'
import PostPopup from './common/postPopup'
import CreateOrganizationForm from './common/createOrganizationForm'
import { BackIcon, CloseCircleIcon, CloseIcon } from './common/icon'
import Link from 'next/link'
import UserForm from './common/userForm'

const Tab = {
  MAIN: "MAIN",
  CREATE_ORGANIZATION: "CREATE_ORGANIZATION",
  PERSONAL_INFOMATION: "PERSONAL_INFOMATION"
}

export default function Home() {
  const [globalState, setGlobalState] = useContext(CONTEXT);
  const [user, setUser] = useState();
  const [isShowNewPostPopUp, setIsShowNewPostPopUp] = useState(false);
  const [tab, setTab] = useState(Tab.MAIN);
  const [outstandingEvents, setOutstandingEvents] = useState([
    {
      id: "65807933facc820684501fc0",
      name: "Chắp cánh ước mơ",
      organizationId: "657cb6982063285eb9527c2a",
      banner: "https://storage.googleapis.com/vinatim_bucket/banner/d403972c-3b0e-469c-a868-6ddc31ee1056---20191213092950cc36c1590a411b63ca45167f724cc59e.jpg.w3840.h2160.jpg",
      description: "Dự án từ thiện \"Chắp Cánh Ước Mơ\" nhằm hỗ trợ và động viên các em nhỏ có hoàn cảnh khó khăn, đặc biệt là trẻ em mồ côi hoặc đang sống trong điều kiện đặc biệt khó khăn. Dự án này cung cấp cơ hội và tài trợ cho các em tham gia vào các hoạt động giáo dục, nghệ thuật, thể thao và hướng nghiệp, nhằm giúp họ phát triển tối đa tiềm năng cá nhân và xây dựng một tương lai tươi sáng hơn.",
      // moneyProgress: 0,
      donateTypes: [
        "MONEY",
        "CLOTHES"
      ],
      addresses: [
        {
          "areaId": "656ab85d923ac95866bdb308",
          "detail": "hồng bàng"
        }
      ],
      categories: [
        "EMERGENCY",
        "CHILDREN"
      ],
      startDate: "2023-12-20T17:00:00.000Z",
      endDate: "2023-12-28T17:00:00.000Z",
      moneyGoal: 100000000,
      nonMoneyGoal: "1000 bộ quần áo"
    },
    {
      id: "65807933facc820684501fc0",
      name: "Chắp cánh ước mơ",
      organizationId: "657cb6982063285eb9527c2a",
      banner: "https://storage.googleapis.com/vinatim_bucket/banner/d403972c-3b0e-469c-a868-6ddc31ee1056---20191213092950cc36c1590a411b63ca45167f724cc59e.jpg.w3840.h2160.jpg",
      description: "Dự án từ thiện \"Chắp Cánh Ước Mơ\" nhằm hỗ trợ và động viên các em nhỏ có hoàn cảnh khó khăn, đặc biệt là trẻ em mồ côi hoặc đang sống trong điều kiện đặc biệt khó khăn. Dự án này cung cấp cơ hội và tài trợ cho các em tham gia vào các hoạt động giáo dục, nghệ thuật, thể thao và hướng nghiệp, nhằm giúp họ phát triển tối đa tiềm năng cá nhân và xây dựng một tương lai tươi sáng hơn.",
      // moneyProgress: 0,
      donateTypes: [
        "MONEY",
        "CLOTHES"
      ],
      addresses: [
        {
          "areaId": "656ab85d923ac95866bdb308",
          "detail": "hồng bàng"
        }
      ],
      categories: [
        "EMERGENCY",
        "CHILDREN"
      ],
      startDate: "2023-12-20T17:00:00.000Z",
      endDate: "2023-12-28T17:00:00.000Z",
      moneyGoal: 100000000,
      nonMoneyGoal: "1000 bộ quần áo"
    },
    {
      id: "65807933facc820684501fc0",
      name: "Chắp cánh ước mơ",
      organizationId: "657cb6982063285eb9527c2a",
      banner: "https://storage.googleapis.com/vinatim_bucket/banner/d403972c-3b0e-469c-a868-6ddc31ee1056---20191213092950cc36c1590a411b63ca45167f724cc59e.jpg.w3840.h2160.jpg",
      description: "Dự án từ thiện \"Chắp Cánh Ước Mơ\" nhằm hỗ trợ và động viên các em nhỏ có hoàn cảnh khó khăn, đặc biệt là trẻ em mồ côi hoặc đang sống trong điều kiện đặc biệt khó khăn. Dự án này cung cấp cơ hội và tài trợ cho các em tham gia vào các hoạt động giáo dục, nghệ thuật, thể thao và hướng nghiệp, nhằm giúp họ phát triển tối đa tiềm năng cá nhân và xây dựng một tương lai tươi sáng hơn.",
      // moneyProgress: 0,
      donateTypes: [
        "MONEY",
        "CLOTHES"
      ],
      addresses: [
        {
          "areaId": "656ab85d923ac95866bdb308",
          "detail": "hồng bàng"
        }
      ],
      categories: [
        "EMERGENCY",
        "CHILDREN"
      ],
      startDate: "2023-12-20T17:00:00.000Z",
      endDate: "2023-12-28T17:00:00.000Z",
      moneyGoal: 100000000,
      nonMoneyGoal: "1000 bộ quần áo"
    },
    {
      id: "65807933facc820684501fc0",
      name: "Chắp cánh ước mơ",
      organizationId: "657cb6982063285eb9527c2a",
      banner: "https://storage.googleapis.com/vinatim_bucket/banner/d403972c-3b0e-469c-a868-6ddc31ee1056---20191213092950cc36c1590a411b63ca45167f724cc59e.jpg.w3840.h2160.jpg",
      description: "Dự án từ thiện \"Chắp Cánh Ước Mơ\" nhằm hỗ trợ và động viên các em nhỏ có hoàn cảnh khó khăn, đặc biệt là trẻ em mồ côi hoặc đang sống trong điều kiện đặc biệt khó khăn. Dự án này cung cấp cơ hội và tài trợ cho các em tham gia vào các hoạt động giáo dục, nghệ thuật, thể thao và hướng nghiệp, nhằm giúp họ phát triển tối đa tiềm năng cá nhân và xây dựng một tương lai tươi sáng hơn.",
      // moneyProgress: 0,
      donateTypes: [
        "MONEY",
        "CLOTHES"
      ],
      addresses: [
        {
          "areaId": "656ab85d923ac95866bdb308",
          "detail": "hồng bàng"
        }
      ],
      categories: [
        "EMERGENCY",
        "CHILDREN"
      ],
      startDate: "2023-12-20T17:00:00.000Z",
      endDate: "2023-12-28T17:00:00.000Z",
      moneyGoal: 100000000,
      nonMoneyGoal: "1000 bộ quần áo"
    }
  ]);

  useEffect(() => {
    setUser(globalState.myInfo);
  }, [globalState.myInfo])

  return (
    <TwoColLayout
      left={
        <div>
          <div className="d-flex align-items-center">
            <div className="avatar me-3">
              <img src={globalState?.myInfo?.avatar}></img>
            </div>
            <div className='pointer' onClick={() => setTab(Tab.PERSONAL_INFOMATION)}>
              <div className="fs-18 fw-semibold pointer">
                {globalState?.myInfo?.name}
              </div>
              {
                user?.status === "ACTIVE" || true &&
                <div>
                  <i className="bi bi-check-circle-fill color-green me-2"></i>
                  <span>Tài khoản đã xác thực</span>
                </div>
              }
            </div>
          </div>
          <div>
            <div className="mt-3 text-center">
              <button className="button-white w-100" onClick={() => setTab(Tab.CREATE_ORGANIZATION)}>Tạo tổ chức</button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-top-darkgray">
            <div className="color-gray fw-semibold mb-3">Tổ chức của bạn</div>
            {
              user?.memberOf?.map(organization =>
                <Link href={"/organization/" + organization.id}>
                  <div className="d-flex mt-2">
                    <div className="me-2">
                      <div className="avatar" style={{ width: "35px", height: "35px" }}>
                        <img src={organization.avatar}></img>
                      </div>
                    </div>
                    <div className="overflow-hidden fs-14 fw-semibold"
                      title={organization.name}
                      style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                      {organization.name}
                    </div>
                  </div>
                </Link>
              )
            }
            {
              (!user?.memberOf || user?.memberOf?.length === 0) &&
              <i>Bạn chưa có tổ chức nào</i>
            }
          </div>
          <div className="mt-3 pt-3 border-top-darkgray">
            <div className="color-gray fw-semibold mb-3">Tổ chức đang theo dõi</div>
            {
              user?.followerOf?.map(organization =>
                <div className="d-flex mt-2">
                  <div className="me-2">
                    <div className="avatar" style={{ width: "35px", height: "35px" }}>
                      <img src={organization.avatar}></img>
                    </div>
                  </div>
                  <div className="overflow-hidden fs-14 fw-semibold"
                    title={organization.name}
                    style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                    {organization.name}
                  </div>
                </div>
              )
            }
            {
              (!user?.followerOf || user?.followerOf?.length === 0) &&
              <i>Bạn chưa theo dõi tổ chức nào</i>
            }
          </div>
          <div className="mt-3 pt-3 border-top-darkgray">
            <div className="color-gray fw-semibold mb-3">Dự án đã quan tâm</div>
            {
              user?.interestedIn?.map(event =>
                <div className="d-flex mt-2">
                  <div className="overflow-hidden fw-semibold"
                    title={event.name}
                    style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: "40px" }}>
                    {event.name}
                  </div>
                </div>
              )
            }
            {
              (!user?.interestedIn || user?.interestedIn?.length === 0) &&
              <i>Bạn chưa quan tâm dự án nào</i>
            }
          </div>
          {/* {
            isShowNewPostPopUp &&
            <PostPopup closeHandle={() => setIsShowNewPostPopup(false)} />
          }
          {
            isShowCreateOrganisationPopup &&
            <CreateOrganisationPopup closeHandle={() => setIsShowCreateOrganisationPopup(false)} />
          } */}
        </div>
      }
      right={
        <>
          <div style={{ display: tab === Tab.MAIN ? "" : "none" }}>
            <div className='mb-4'>
              <Slide indicators={false} arrows={true}>
                {
                  outstandingEvents?.map(event =>
                    <div className="each-slide-effect position-relative">
                      <div style={{
                        backgroundImage: `url(${event.banner})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        filter: "blur(2px)",
                        height: "35vw"
                      }}>
                      </div>
                      <div className='position-absolute top-0 bottom-0 start-0 end-0 color-white d-flex flex-column align-items-end justify-content-center'
                        style={{ paddingLeft: "40%", paddingRight: "50px" }}>
                        <div className='fw-semibold mb-3 fs-30'>{event.name}</div>
                        <div className='text-end mb-3'>{event.description}</div>
                        <div>
                          <button className='button-green'>Quyên góp</button>
                        </div>
                      </div>
                    </div>
                  )
                }
              </Slide>
            </div>
            <div>
              <div className='d-flex' 
              style={{ backgroundImage: 'url("https://storage.googleapis.com/vinatim_bucket/banner/index-background.png")',
              backgroundSize: 'cover'
              }}>
                <div className="col-4">
                  <div className="text-center m-auto py-5 px-4">
                    <img src="https://storage.googleapis.com/vinatim_bucket/banner/vinatim_banner.png" height="250px"></img>
                  </div>
                </div>
                <div className='text-white col-8' style={{padding: "50px 50px 50px 80px"}}>
                  <div className="fs-25 fw-bold text-center mb-5" style={{ fontFamily: "cursive" }}>VINATIM - LAN TỎA YÊU THƯƠNG</div>
                  <div className='row'>
                    <div className='col-4 content-center-vertical mb-5'>
                      <div className='fs-25 fw-semibold mb-2'>1000</div>
                      <div className='fs-14'>Tổ chức thiện nguyện</div>
                    </div>
                    <div className='col-4 content-center-vertical mb-5'>
                      <div className='fs-25 fw-semibold mb-2'>1000</div>
                      <div className='fs-14'>Chiến dịch thiện nguyện</div>
                    </div>
                    <div className='col-4 content-center-vertical mb-5'>
                      <div className='fs-25 fw-semibold mb-2'>499.764.654</div>
                      <div className='fs-14'>Số tiền đã quyên góp</div>
                    </div>
                    <div className='col-4 content-center-vertical'>
                      <div className='fs-25 fw-semibold mb-2'>379.764.654</div>
                      <div className='fs-14'>Số tiền đã ủng hộ</div>
                    </div>
                    <div className='col-4 content-center-vertical'>
                      <div className='fs-25 fw-semibold mb-2'>1000</div>
                      <div className='fs-14'>Lượt ủng hộ</div>
                    </div>
                    <div className='col-4 content-center-vertical'>
                      <div className='fs-25 fw-semibold mb-2'>1000</div>
                      <div className='fs-14'>Thành viên tham gia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-4 border-top-darkgray'>
              <div className='mb-3'>
                <div className="bg-white rounded-5 w-100 p-2" onClick={() => setIsShowNewPostPopUp(true)}>
                  <span className="avatar me-3">
                    <img src={user?.avatar || "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_2.jpg"}></img>
                  </span>
                  <span>
                    Bạn đang nghĩ gì vậy ...
                  </span>
                </div>
                {
                  isShowNewPostPopUp &&
                  <PostPopup closeHandle={() => setIsShowNewPostPopUp(false)} />
                }

              </div>
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
          </div>


          <div className='box' style={{ display: tab === Tab.CREATE_ORGANIZATION ? "" : "none" }}>
            <div className='fs-25 text-center fw-semibold pb-2 border-bottom-darkgray position-relative'>
              <span>Tạo tổ chức mới</span>
              <div className='position-absolute end-0 top-0 pointer' onClick={() => setTab(Tab.MAIN)}>
                <CloseCircleIcon />
              </div>
            </div>
            <div>
              <CreateOrganizationForm />
            </div>
          </div>

          <div className='box' style={{ display: tab === Tab.PERSONAL_INFOMATION ? "" : "none" }}>
            <div className='fs-25 text-center fw-semibold pb-2 border-bottom-darkgray position-relative'>
              <span>Thông tin cá nhân</span>
              <div className='position-absolute end-0 top-0 pointer' onClick={() => setTab(Tab.MAIN)}>
                <CloseCircleIcon />
              </div>
            </div>
            <div className='mt-3'>
              <UserForm userId={globalState?.myInfo?.id} />
            </div>
          </div>
        </>
      }
    />
  )
}
