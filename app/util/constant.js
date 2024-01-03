// export const APP_SERVER = "http://192.168.124.115:8080";

export const APP_SERVER = "http://34.143.138.70:8080";

export const ENDPOINT = {
    signup: "/public/signup",
    login: "/public/login",
    getAreas: "/public/get-areas",
    findUserByEmailOrPhone: "/public/find-user-by-email-or-phone?text=",
    createOrganization: "/organization/create",
    getOrganization: "/public/get-organization?id=",
    getEvent: "/public/get-event?id=",
    getOrganizationMembers: "/organization/members?id=",
    createEvent: "/event/create",
    getMyInfo: "/user/my-info",
    createInTransaction: "/transaction/in/create",
    createOutTransaction: "/transaction/out/create",
    updateUser: "/user/update",
    filterEvents: "/public/filter-event?",
    filterOrganizations: "/public/filter-organization?",
    getAcceptedInTransactions: "/public/get-accepted-inTransactions?",
    getOutTransactions: "/public/get-outTransactions?",
    getInTransactions: "/transaction/get-inTransactions?",
    approveInTransaction: "/transaction/in/approve?",
    getPowerBIEmbedToken: "http://localhost:8082/embed-token?"
}

export const POWER_BI = {
    reportId: "a407e210-97e7-49f3-8ff9-2f2cfefb6f61",
    groupId: "41b0d7d4-7cf5-4458-9dd9-9074b494c968",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=a407e210-97e7-49f3-8ff9-2f2cfefb6f61&groupId=41b0d7d4-7cf5-4458-9dd9-9074b494c968"
}

export const PAGE_NAME = {
    ORG_OVERVIEW: "ReportSection",
    ORG_EVENT: "ReportSectione86abfe0ba70ed12c00c",
    ADMIN_ORG: "ReportSectionbfb941c51cc24abbd4ce",
    ADMIN_EVENT: "ReportSection54deac0b940838bc0969",
    ADMIN_COMPLAINT: "ReportSection3b312ef226803929d13a",
    ADMIN_TRANSACTION: "ReportSectiondf827803e8c57a30224a",
    USER_ORG: "ReportSectionb3092ceb1ba537aeecdb"
}