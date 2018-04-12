
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getTime = (timeStamp) => {
    var date = new Date(timeStamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    return hours + ':' + minutes.substr(-2)
}
export const getDayName = (timeStamp) => {
    return days[new Date(timeStamp).getDay()]

}