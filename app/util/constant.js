// export const APP_SERVER = "http://192.168.124.115:8080";

export const APP_SERVER = "http://localhost:8080";

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
    reportId: "6cc3b9a7-9ef4-4efa-9cdc-6611514a5bc0",
    groupId: "fcb5a89b-81ab-4843-869f-7e2e7e1b92fe",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=6cc3b9a7-9ef4-4efa-9cdc-6611514a5bc0&groupId=fcb5a89b-81ab-4843-869f-7e2e7e1b92fe"
}