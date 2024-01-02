export function Categories() {
    return (
        [
            { key: "EMERGENCY", name: "Khẩn cấp" },
            { key: "CHILDREN", name: "Trẻ em" },
            { key: "DISASTER", name: "Thiên tai" },
            { key: "MEDICAL", name: "Y tế" },
            { key: "ENVIRONMENT", name: "Môi trường" },
            { key: "EDUCATION", name: "Giáo dục" },
            { key: "OTHERS", name: "Khác" }
        ]
    )
};

export function DonateTypes() {
    return (
        [
            { key: "MONEY", name: "Tiền" },
            { key: "FnB", name: "Thực phẩm và đồ uống" },
            { key: "CLOTHES", name: "Quần áo, giày dép" },
            { key: "MEDICINE", name: "Thuốc men" },
            { key: "STATIONERY", name: "Văn phòng phẩm" },
            { key: "OTHERS", name: "Khác" }
        ]
    )
}

export function Units() {
    return (
        [
            { key: "BỘ", name: "Bộ" },
            { key: "KG", name: "Kg" },
            { key: "THÙNG", name: "Thùng" },
            { key: "CHIẾC", name: "Chiếc" },
            { key: "SUẤT", name: "Suất" },
            { key: "QUYỂN", name: "Quyển" },
            { key: "VND", name: "VND" }
        ]
    )
}

export function EventStatus(){
    return (
        {
            PENDING: "PENDING",
            ACCEPTED: "ACCEPTED",
            REJECTED: "REJECTED",
            ACTIVE: "ACTIVE",
            CLOSED: "CLOSED"
        }
    )
}