import CookieHelper from './cookie.js'

function deleteAllCookies() {
    if (document) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}

function setCookie(name, value, days) {
    if (document) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}

function getCookie(name) {
    var nameEQ = name + "=";
    if (document) {
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }else if(CookieHelper && CookieHelper.getReq){
        try{
            let req = CookieHelper.getReq();
            if(req && req.headers && req.headers.cookie) {
                let cookies = req.headers.cookie
                var ca = cookies.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        }catch(e){

        }
        
    }
}

function eraseCookie(name) {
    if (document) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    if (base64Url && window && typeof window =="object") {
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        return JSON.parse(window.atob(base64));
    } else {
        return {}
    }
};

const STORAGE = {
    setAuthToken: (token) => {
        setCookie('tokenauth', token, 10)
        return Promise.resolve(true)
    },
    getAuthToken: () => {
        return Promise.resolve(getCookie('tokenauth'))
    },
    checkAuth: () => {
        return !!getCookie('tokenauth')
    },
    deleteAuth: () => {
        eraseCookie('tokenauth')
        // deleteAllCookies()
        return Promise.resolve()
    },
    isAgent: () => {
        let token = getCookie('tokenauth')
        if (token) {
            let jwtData = parseJwt(token)
            return !!jwtData.agent_id
        }

    },
    setUserId: (userId) => {
        setCookie('user_id', userId, 10)
        return Promise.resolve(true)
    },
    getUserId: () => {
        return getCookie('user_id')
    },
    deleteUserId: () => {
        eraseCookie('user_id')
        return Promise.resolve(true)
    },
    setVisitorInfo: (visitorId) => {
        setCookie('visitinfo', visitorId, 10)
        return Promise.resolve(true)
    },
    getVisitorInfo: () => {
        return getCookie('visitinfo') || ''
    },
    deleteVisitorInfo: () => {
        eraseCookie('visitinfo')
        return Promise.resolve(true)
    },
    setAppointmentDetails: (token) => {
        setCookie('booking_info', token, 5)
        return Promise.resolve(true)
    },
    setAnyCookie: (name, value, day) =>{
        setCookie(name, value, day)
    },
    getAnyCookie: (name)=>{
        return getCookie(name)
    }


}

export default STORAGE