export function timestampParsor(timestamp, mode) {
    console.log(timestamp);

    const date = new Date(+timestamp);
    return date.toLocaleDateString()
}

export function ts2DateStr(timestamp, mode) {

    if (!timestamp) {
        return "";
    }
    const datetime = new Date(+timestamp);
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    if (mode === "ymd") {
        return `${year}.${month >= 10 ? month : '0' + month}.${date >= 10 ? date : '0' + date}`
    }
    var hour = datetime.getHours();
    const minute = datetime.getMinutes();
    if (mode === "hm"){
        return `${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}`
    }
    const roughHourDouble = Math.round(2*hour + minute/30)/2;
    hour = Math.round(roughHourDouble);
    if (mode === "roughHm"){
        return `${hour >= 12 ? '오후' : '오전'} ${hour > 12 ? hour - 12 : hour }시 ${roughHourDouble > hour ? '반 ' : ' '}쯤`
    }
    return `${year}.${month >= 10 ? month : '0' + month}.${date >= 10 ? date : '0' + date}`
}