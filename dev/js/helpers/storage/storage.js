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
        cookies.set('tokenauth', token, { path: '/' })
        return Promise.resolve(true)
    },
    getAuthToken: () => {
        return Promise.resolve(cookies.get('tokenauth'))
    },
    checkAuth: () => {
        return !!cookies.get('tokenauth')
    },
    deleteAuth: () => {
        cookies.remove('tokenauth', { path: '/' })
        cookies.remove('tokenauth')
        deleteAllCookies()
        return Promise.resolve()
    }
}

export default STORAGE