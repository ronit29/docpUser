import Cookies from 'universal-cookie';
const cookies = new Cookies();

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

const STORAGE = {
    setAuthToken: (token) => {
        cookies.set('token', token)
        return Promise.resolve(true)
    },
    getAuthToken: () => {
        return Promise.resolve(cookies.get('token'))
    },
    checkAuth: () => {
        return !!cookies.get('token')
    },
    deleteAuth: () => {
        deleteAllCookies()
        // return Promise.resolve(cookies.remove('token'))
        return Promise.resolve()
    }
}

export default STORAGE