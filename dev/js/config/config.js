const BASE_CONFIG = {
    FCM_CONFIG: {
        apiKey: "AIzaSyAAwnvfm-CXnO8s_WWz-yxEzX1---QzoL0",
        authDomain: "docprime-5c123.firebaseapp.com",
        databaseURL: "https://docprime-5c123.firebaseio.com",
        projectId: "docprime-5c123",
        storageBucket: "docprime-5c123.appspot.com",
        messagingSenderId: "247429343742"
    },
    FCM_PUBLIC_VAPID_KEYL: "BORw457Re6DHFlxAKSxxTziilo7sQZZT5lL305Ccqbl1U-YLfU_HyIcaXNRRHo85hNOPGBmVF64IlCfSISuP5pU"
}

const PROD_CONFIG = {
    API_BASE_URL: "https://docprime.com",
    SOCKET_BASE_URL: "https://beta.docprime.com",
    SOCKET_BASE_PATH: "/io",
    RAVEN_DSN_KEY: "https://bbd8f89e401548749ce274c4e9dd9741@sentry.io/1244528",
    PG_URL: "https://pay.docprime.com/dp/pay/init",
    CHAT_URL: "https://telemed.docprime.com/livechat"
}

const STAGING_CONFIG = {
    API_BASE_URL: "https://liveqa.docprime.com",
    SOCKET_BASE_URL: "https://liveqa.docprime.com",
    SOCKET_BASE_PATH: "/io",
    RAVEN_DSN_KEY: "https://bbd8f89e401548749ce274c4e9dd9741@sentry.io/1244528",
    PG_URL: "https://pgdev.policybazaar.com/dp/pay/init",
    CHAT_URL: "https://chatqa.docprime.com/livechat"
}

const DEV_CONFIG = {
    // API_BASE_URL: 'http://10.0.28.32:8080',
    // API_BASE_URL: 'http://localhost:8080',
    API_BASE_URL: "https://liveqa.docprime.com",
    // SOCKET_BASE_URL: "http://10.0.28.32:4444",
    SOCKET_BASE_URL: "https://liveqa.docprime.com",
    // SOCKET_BASE_URL: "http://localhost:4444",
    SOCKET_BASE_PATH: "/io",
    PG_URL: "https://pgdev.policybazaar.com/dp/pay/init",
    CHAT_URL: "https://chatqa.docprime.com/livechat"
}

let CONFIG = { ...BASE_CONFIG, ...DEV_CONFIG }

if (DOCPRIME_STAGING) {
    CONFIG = { ...BASE_CONFIG, ...STAGING_CONFIG }
}

if (DOCPRIME_PRODUCTION) {
    CONFIG = { ...BASE_CONFIG, ...PROD_CONFIG }
}

export default CONFIG