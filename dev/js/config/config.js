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
    SOCKET_BASE_URL: "https://docprime.com",
    SOCKET_BASE_PATH: "/io",
    RAVEN_DSN_KEY: "https://bbd8f89e401548749ce274c4e9dd9741@sentry.io/1244528",
    RAVEN_SERVER_DSN_KEY: "https://b8816627d7f84535bfd7d634d94916a3@sentry.io/1290505",
    PG_URL: "https://pay.docprime.com/dp/pay/dpOrder",
    CHAT_URL: "https://telemed.docprime.com/livechat",
    CHAT_API_URL: "https://telemed.docprime.com/api/v1",
    env: "production",
    UAID: 'UA-124740649-1',
    Tracker: 'docobj',
    API_BASE_URL_ELASTIC_SEARCH: 'https://l74e1dhn67.execute-api.ap-south-1.amazonaws.com/default',
    SEARCH_ELASTIC_VIEW: true,
    ENABLE_INSURANCE: true,
    GOOGLE_SERVICE_URL: 'https://docprime.com/ls',
    CHAT_API_UTILITY_API:'https://chatapi.docprime.com'
}

const STAGING_CONFIG = {
    API_BASE_URL: "https://kubeqa1.docprime.com",
    SOCKET_BASE_URL: "https://kubeqa1.docprime.com",
    SOCKET_BASE_PATH: "/io",
    RAVEN_DSN_KEY: "https://293dcc01cda545df925ccb2f7837b6a3@sentry.io/1341625",
    RAVEN_SERVER_DSN_KEY: "https://43567a5b14bb4aee988d45a95d55cc9c@sentry.io/1290589",
    PG_URL: "https://payqa.docprime.com/dp/pay/dpOrder",
    CHAT_URL: "https://chatqa.docprime.com/livechat",
    CHAT_API_URL: "https://chatqa.docprime.com/api/v1",
    env: "staging",
    UAID: 'UA-124740649-2',
    Tracker: 'docqa',
    API_BASE_URL_ELASTIC_SEARCH: 'https://oxbgjks1i2.execute-api.ap-south-1.amazonaws.com/default',
    SEARCH_ELASTIC_VIEW: true,
    ENABLE_INSURANCE: true,
    GOOGLE_SERVICE_URL: 'https://docprime.com/ls',
    CHAT_API_UTILITY_API:'https://chatapi.docprime.com'
}

const DEV_CONFIG = {
    // API_BASE_URL: "http://10.0.145.30:8000",
    API_BASE_URL: "https://kubeqa2.docprime.com",
    // SOCKET_BASE_URL: "http://10.0.28.67:4444",
    SOCKET_BASE_URL: "https://docprime.com",
    // SOCKET_BASE_URL: "http://localhost:4444",
    SOCKET_BASE_PATH: "/io",
    PG_URL: "https://payqa.docprime.com/dp/pay/dpOrder",
    CHAT_URL: "https://chatqa.docprime.com/livechat",
    CHAT_API_URL: "https://chatqa.docprime.com/api/v1",
    env: "dev",
    UAID: 'UA-124740649-2',
    Tracker: 'docqa',
    API_BASE_URL_ELASTIC_SEARCH: 'https://oxbgjks1i2.execute-api.ap-south-1.amazonaws.com/default',
    SEARCH_ELASTIC_VIEW: true,
    ENABLE_INSURANCE: true,
    GOOGLE_SERVICE_URL: 'https://docprime.com/ls',
    CHAT_API_UTILITY_API:'http://chatapi.docprime.com'
}

let CONFIG = { ...BASE_CONFIG, ...DEV_CONFIG }

if (DOCPRIME_STAGING) {
    CONFIG = { ...BASE_CONFIG, ...STAGING_CONFIG }
}

if (DOCPRIME_PRODUCTION) {
    CONFIG = { ...BASE_CONFIG, ...PROD_CONFIG }
}

if (API_BASE_URL) {
    CONFIG.API_BASE_URL = API_BASE_URL
}

if (SOCKET_BASE_URL) {
    CONFIG.SOCKET_BASE_URL = SOCKET_BASE_URL
}

export default CONFIG
