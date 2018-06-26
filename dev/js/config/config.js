const BASE_CONFIG = {
    FCM_CONFIG: {
        apiKey: "AIzaSyBJ1VRIJd33At0MVcs8jr7guREZ8ARi2-I",
        authDomain: "panacea-ondoc.firebaseapp.com",
        databaseURL: "https://panacea-ondoc.firebaseio.com",
        projectId: "panacea-ondoc",
        storageBucket: "panacea-ondoc.appspot.com",
        messagingSenderId: "553214005281"
    },
    FCM_PUBLIC_VAPID_KEYL: "BLx7NZrgK8dSjbUjycqyv0_KQfgnHj5_e108RsX9aD45q_3EOPtYbV32u7S5WbBW2eDodGmzaX5QlNWLQStt7bE"
}

const PROD_CONFIG = {
    API_BASE_URL: "https://qa.docprime.com",
    SOCKET_BASE_URL: "https://qa.docprime.com",
    SOCKET_BASE_PATH: "/io",
}

const DEV_CONFIG = {
    // API_BASE_URL: 'http://10.0.28.32:8080',
    API_BASE_URL: 'http://localhost:8080',
    SOCKET_BASE_URL: "https://qa.docprime.com",
    SOCKET_BASE_PATH: "/io",
}

let CONFIG = { ...BASE_CONFIG, ...DEV_CONFIG }
if (DOCPRIME_PRODUCTION) {
    CONFIG = { ...BASE_CONFIG, ...PROD_CONFIG }
}

export default CONFIG