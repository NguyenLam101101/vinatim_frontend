"use client"

import { PowerBIEmbed } from "powerbi-client-react"
import { useContext, useEffect, useState } from "react";
import { ENDPOINT, POWER_BI } from "../util/constant";
import { callGetAPI } from "../util/callAPI";
import { models } from "powerbi-client";
import { CONTEXT } from "../layout";


export default function Dashboard({pageName, filter, width, height}) {
    const [embedToken, setEmbedToken] = useState();
    // const [pageName, setPageName] = useState<string>(PAGE_NAME.admin_user);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("groupId", POWER_BI.groupId);
        params.set("reportId", POWER_BI.reportId);
        callGetAPI(ENDPOINT.getPowerBIEmbedToken + params.toString())
            .then(body => {
                if (body?.code === 0) {
                    setEmbedToken(body.data);
                }
            })
    }, [])


    return (
        <div className="py-2">
            <div style={{ height: height || "1000px", width: width || "100%"}}>
                <PowerBIEmbed
                    embedConfig={
                        {
                            accessToken: embedToken,
                            embedUrl: POWER_BI.embedUrl,
                            id: POWER_BI.reportId,
                            permissions: models.Permissions.Read,
                            tokenType: models.TokenType.Embed,
                            type: 'report',
                            pageName: pageName,
                            filters: filter,
                            settings: {
                                filterPaneEnabled: false,
                                navContentPaneEnabled: false
                            }
                        }
                    }
                    cssClassName={"w-100 h-100"}
                />
            </div>
        </div>
    )
}