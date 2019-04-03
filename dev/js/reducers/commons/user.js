import { SET_SUMMARY_UTM, SELECT_SEARCH_TYPE, APPEND_CITIES, SET_CHATROOM_ID, RESET_AUTH, APPEND_CHAT_HISTORY, APPEND_CHAT_DOCTOR, APPEND_ARTICLES, APPEND_ORDER_HISTORY, APPEND_USER_TRANSACTIONS, APPEND_UPCOMING_APPOINTMENTS, APPEND_NOTIFICATIONS, APPEND_ADDRESS, APPEND_USER_PROFILES, APPEND_USER_APPOINTMENTS, SELECT_USER_PROFILE, APPEND_HEALTH_TIP, APPEND_ARTICLE_LIST, SAVE_UTM_TAGS, SAVE_DEVICE_INFO, GET_APPLICABLE_COUPONS, GET_USER_PRESCRIPTION, START_LIVE_CHAT, CLOSE_POPUP, SELECT_TESTS, GET_OFFER_LIST, APPEND_CART, TOGGLE_LEFT_MENU, UPCOMING_APPOINTMENTS, IS_USER_CARED, SAVE_CHAT_FEEDBACK, SUBMIT_CHAT_FEEDBACK } from '../../constants/types';

const DUMMY_PROFILE = {
    gender: "m",
    id: 999999,
    is_default_user: true,
    name: "User",
    dob: new Date(),
    isDummyUser: true
}

const defaultState = {
    profiles: {},
    appointments: {},
    address: [],
    defaultProfile: null,
    selectedProfile: null,
    notifications: [],
    newNotification: 0,
    userUpcomingAppointments: [],
    userTransactions: [],
    userWalletBalance: 0,
    healthTips: [],
    orderHistory: [],
    articles: [],
    chatDoctors: {},
    chatHistory: [],
    chatRoomIds: {},
    citiesName: [],
    articleList: [],
    articleListData: [],
    ARTICLE_LOADED: false,
    articlePageCount: 0,
    pageButtonCount: 0,
    currentRoomId: null,
    utm_tags: {},
    device_info: 'desktop',
    liveChatStarted: false,
    applicableCoupons: [],
    userPrescriptions: [],
    primaryMobile: 0,
    userName: '',
    unread_count: '',
    rated_appoinments: {},
    selectedSearchType: 'opd',
    testList: {},
    userCashbackBalance: 0,
    summary_utm: false,
    summary_utm_validity: null,
    offerList: null,
    cart: null,
    toggleLeftMenu: false,
    upcoming_appointments:[],
    isUserCared:{},
    chat_feedback: []
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_USER_PROFILES: {
            let newState = {
                ...state,
                profiles: { ...state.profiles }
            }

            // add a dummy profile to keep system in working state
            // TODO: do this better way
            if (action.payload && action.payload.length == 0) {
                action.payload.push(DUMMY_PROFILE)
            } else {
                if (newState.profiles[DUMMY_PROFILE.id]) {
                    delete newState.profiles[DUMMY_PROFILE.id]
                    newState.selectedProfile = null
                }
            }

            newState.profiles = action.payload.reduce((profileMap, profile) => {
                if (profile.is_default_user) {
                    if (!newState.selectedProfile) {
                        newState.selectedProfile = profile.id
                        newState.primaryMobile = profile.phone_number
                        newState.userName = profile.name
                    }
                    newState.defaultProfile = profile.id
                }
                profileMap[profile.id] = profile
                return profileMap
            }, newState.profiles)

            if (!newState.selectedProfile && action.payload.length) {
                newState.selectedProfile = action.payload[0].id
            }

            if (!newState.defaultProfile && action.payload.length) {
                newState.defaultProfile = action.payload[0].id
            }

            return newState
        }

        case APPEND_USER_APPOINTMENTS: {
            let newState = {
                ...state,
                appointments: { ...state.appointments }
            }

            newState.appointments[action.payload.profile_id] = action.payload.appointments

            return newState
        }

        case APPEND_UPCOMING_APPOINTMENTS: {
            let newState = {
                ...state,
                userUpcomingAppointments: [].concat(state.userUpcomingAppointments)
            }

            newState.userUpcomingAppointments = action.payload.appointments

            return newState
        }


        case SELECT_USER_PROFILE: {
            let newState = {
                ...state
            }

            if (state.profiles[action.payload]) {
                newState.selectedProfile = action.payload
            }

            return newState
        }

        case APPEND_ADDRESS: {
            let newState = { ...state }
            newState.address = action.payload
            return newState
        }

        case APPEND_NOTIFICATIONS: {

            let newState = {
                ...state,
                notifications: state.notifications ? [...state.notifications] : []
            }

            newState.newNotification = 0
            newState.unread_count = action.payload.unread_count

            if (action.payload.replace) {
                newState.notifications = action.payload.notifications
            } else {
                newState.notifications = [...newState.notifications, ...action.payload.notifications]
            }

            newState.notifications.map((not) => {
                if (!not.viewed_at) {
                    newState.newNotification += 1
                }
            })

            return newState

        }

        case APPEND_USER_TRANSACTIONS: {

            let newState = {
                ...state,
                userTransactions: state.userTransactions ? [].concat(state.userTransactions) : [],
            }

            newState.userTransactions = action.payload.user_transactions
            newState.userWalletBalance = action.payload.user_wallet_balance
            newState.userCashbackBalance = action.payload.consumer_cashback

            return newState

        }

        case APPEND_HEALTH_TIP: {
            let newState = {
                ...state,
                healthTips: state.healthTips ? [].concat(state.healthTips) : [],
            }
            newState.healthTips = action.payload
            return newState
        }

        case APPEND_ORDER_HISTORY: {
            let newState = {
                ...state,
                orderHistory: state.orderHistory ? [].concat(state.orderHistory) : [],
            }
            newState.orderHistory = action.payload
            return newState
        }

        case APPEND_ARTICLES: {
            let newState = {
                ...state,
                articles: state.articles ? [].concat(state.articles) : [],
            }
            newState.articles = action.payload
            return newState
        }

        case APPEND_CHAT_DOCTOR: {
            let newState = {
                ...state,
                chatDoctors: { ...state.chatDoctors },
                chatRoomIds: { ...state.chatRoomIds },
            }
            newState.chatRoomIds = {}
            newState.chatDoctors[action.payload.doctorId] = action.payload.data
            newState.chatRoomIds[action.payload.roomId] = action.payload.doctorId
            return newState
        }

        case APPEND_CHAT_HISTORY: {
            let newState = {
                ...state,
                chatHistory: [],
            }
            newState.chatHistory = action.payload
            return newState
        }

        case RESET_AUTH: {
            return { ...defaultState, summary_utm: state.summary_utm, summary_utm_validity: state.summary_utm_validity }
        }

        case APPEND_CITIES: {
            let newState = {
                ...state,
            }
            newState.citiesName = action.payload
            return newState
        }

        case SET_CHATROOM_ID: {
            let newState = { ...state }
            newState.currentRoomId = action.payload
            return newState
        }

        case APPEND_ARTICLE_LIST: {
            let newState = {
                ...state,
                articleList: [].concat(state.articleList)
            }

            newState.articlePageCount = Math.ceil(action.payload.total_articles / 10)

            newState.pageButtonCount = action.staticPage || 1

            newState.ARTICLE_LOADED = true
            if (action.replaceList) {
                newState.articleList = action.payload.result
            } else {
                newState.articleList = newState.articleList.concat(action.payload.result)
            }

            //dedupe
            let dedupe = {}
            let final_articles = []
            for (let article of newState.articleList) {
                let id = article.id || article.url
                if (!dedupe[id]) {
                    final_articles.push(article)
                    dedupe[id] = true
                }
            }

            newState.articleList = final_articles
            newState.articleListData = action.payload

            return newState
        }

        case SAVE_UTM_TAGS: {
            let newState = {
                ...state
            }
            newState.utm_tags = action.payload
            return newState
        }

        case SAVE_DEVICE_INFO: {
            let newState = {
                ...state
            }
            newState.device_info = action.payload
            return newState
        }

        case START_LIVE_CHAT: {
            let newState = {
                ...state
            }
            newState.liveChatStarted = action.payload

            if (action.deleteRoomId) {
                newState.chatRoomIds = {}
            }
            return newState
        }

        case GET_APPLICABLE_COUPONS: {
            let newState = {
                ...state
            }
            newState.applicableCoupons = action.payload
            return newState
        }

        case GET_USER_PRESCRIPTION: {
            let newState = {
                ...state
            }
            newState.userPrescriptions = action.payload
            return newState
        }
        case CLOSE_POPUP: {
            let newState = {
                ...state,
                rated_appoinments: { ...state.rated_appoinments }
            }

            newState.rated_appoinments[action.payload.appointment_id] = true
            return newState
        }

        case SELECT_SEARCH_TYPE: {
            let newState = {
                ...state
            }
            if(action.payload.includes('lab') || action.payload.includes('opd') || action.payload.includes('ipd') ){
                newState.selectedSearchType = action.payload
            }
            return newState
        }

        case SELECT_TESTS: {
            let newState = {
                ...state
            }
            newState.testList = action.payload
            return newState
        }

        case SET_SUMMARY_UTM: {
            let newState = { ...state }
            newState.summary_utm = action.payload.toggle
            newState.summary_utm_validity = action.payload.validity
            return newState
        }

        case GET_OFFER_LIST: {
            let newState = {
                ...state
            }
            newState.offerList = action.payload
            return newState
        }

        case APPEND_CART: {
            let newState = {
                ...state
            }

            newState.cart = action.payload.cart_items
            return newState
        }

        case TOGGLE_LEFT_MENU: {
            let newState = {
                ...state
            }
            if (action.defaultVal) {
                newState.toggleLeftMenu = action.toggle
            } else {
                newState.toggleLeftMenu = !newState.toggleLeftMenu
            }

            return newState
        }

        case UPCOMING_APPOINTMENTS: {
            let newState = {
                ...state
            }
            newState.upcoming_appointments = action.payload
            return newState
        }

        case IS_USER_CARED: {
            let newState = {
                ...state
            }
            newState.isUserCared = action.payload
            return newState
        }

        case SAVE_CHAT_FEEDBACK: {
            let newState = {
                ...state
            }

            newState.chat_feedback = [].concat(newState.chat_feedback)

            newState.chat_feedback = newState.chat_feedback.filter((data)=>{
                if(data.type.includes(action.ques)){
                    return false
                }
                return true
            })

            newState.chat_feedback.push({type: action.ques, data: action.data})
            return newState
        }

        case SUBMIT_CHAT_FEEDBACK: {
            let newState = {
                ...state
            }

            newState.chat_feedback = {}
            return newState
        }
        
    }
    return state
}