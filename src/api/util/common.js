/**
 * 处理时间得方法
 */
function add0(m) {
    return m < 10 ? "0" + m : m;
}

export function getTime(datetime) {
    if (datetime == 0) {
        return "----:--:-- --:--:--";
    }
    var time = new Date(datetime);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return (
        y +
        "-" +
        add0(m) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(mm) +
        ":" +
        add0(s)
    );
}

export function getTime2(datetime) {
    if (datetime == 0) {
        return "----:--:-- --:--:--";
    }
    var time = new Date(datetime);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return (
        y +
        "." +
        add0(m) +
        "." +
        add0(d) +
        " "
    );
}