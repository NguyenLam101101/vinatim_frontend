"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { createContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-notifications/lib/notifications.css';
import 'react-slideshow-image/dist/styles.css';
import { callGetAPI } from './util/callAPI';
import { ENDPOINT } from './util/constant';
import { NotificationContainer } from 'react-notifications';

const inter = Inter({ subsets: ['latin'] })
export const CONTEXT = createContext();

export default function RootLayout({ children }) {
  const [globalState, setGlobalState] = useState({ isLoading: false });

  useEffect(() => {
    callGetAPI(ENDPOINT.getMyInfo)
      .then(body => {
        if (body?.code == 0) {
          setGlobalState({ ...globalState, myInfo: body.data });
        }
      })
  }, [])

  return (
    <CONTEXT.Provider value={[globalState, setGlobalState]}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <NotificationContainer />
          {
            globalState.isLoading &&
            <div className='position-fixed top-0 bottom-0 start-0 end-0 d-flex' style={{ backgroundColor: "rgba(150, 150, 150, 0.7)" }}>
              <div className="spinner-border text-primary m-auto" style={{ height: "40px", width: "40px" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        </body>
      </html>
    </CONTEXT.Provider>

  )
}
