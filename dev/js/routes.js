import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HelmetTags from './components/commons/HelmetTags'

import Loadable from 'react-loadable';
const loading = () => <div>Loading...</div>

const ArticleList = Loadable({
    loader: () => import('./containers/commons/articleList'),
    modules: ['./containers/commons/articleList'],
    webpack: () => [require.resolveWeak('./containers/commons/articleList')],
    loading,
});

const StaticPages = Loadable({
    loader: () => import('./containers/commons/StaticPages'),
    modules: ['./containers/commons/StaticPages'],
    webpack: () => [require.resolveWeak('./containers/commons/StaticPages')],
    loading,
});

const SearchCriteria = Loadable({
    loader: () => import('./containers/opd/SearchCriteria.js'),
    modules: ['./containers/opd/SearchCriteria.js'],
    webpack: () => [require.resolveWeak('./containers/opd/SearchCriteria.js')],
    loading,
});

const LocationSearch = Loadable({
    loader: () => import('./containers/opd/LocationSearch.js'),
    modules: ['./containers/opd/LocationSearch.js'],
    webpack: () => [require.resolveWeak('./containers/opd/LocationSearch.js')],
    loading,
});

const SearchResults = Loadable({
    loader: () => import('./containers/opd/SearchResults.js'),
    modules: ['./containers/opd/SearchResults.js'],
    webpack: () => [require.resolveWeak('./containers/opd/SearchResults.js')],
    loading,
});

const DoctorProfile = Loadable({
    loader: () => import('./containers/opd/DoctorProfile.js'),
    modules: ['./containers/opd/DoctorProfile.js'],
    webpack: () => [require.resolveWeak('./containers/opd/DoctorProfile.js')],
    loading,
});

const AppointmentSlot = Loadable({
    loader: () => import('./containers/opd/AppointmentSlot.js'),
    modules: ['./containers/opd/AppointmentSlot.js'],
    webpack: () => [require.resolveWeak('./containers/opd/AppointmentSlot.js')],
    loading,
});

const PatientDetails = Loadable({
    loader: () => import('./containers/opd/PatientDetails.js'),
    modules: ['./containers/opd/PatientDetails.js'],
    webpack: () => [require.resolveWeak('./containers/opd/PatientDetails.js')],
    loading,
});

const Booking_OPD = Loadable({
    loader: () => import('./containers/opd/Booking.js'),
    modules: ['./containers/opd/Booking.js'],
    webpack: () => [require.resolveWeak('./containers/opd/Booking.js')],
    loading,
});

const AppointmentReschedule = Loadable({
    loader: () => import('./containers/opd/AppointmentReschedule.js'),
    modules: ['./containers/opd/AppointmentReschedule.js'],
    webpack: () => [require.resolveWeak('./containers/opd/AppointmentReschedule.js')],
    loading,
});

const UserProfile = Loadable({
    loader: () => import('./containers/commons/UserProfile.js'),
    modules: ['./containers/commons/UserProfile.js'],
    webpack: () => [require.resolveWeak('./containers/commons/UserProfile.js')],
    loading,
});

const UserSignup = Loadable({
    loader: () => import('./containers/commons/UserSignup.js'),
    modules: ['./containers/commons/UserSignup.js'],
    webpack: () => [require.resolveWeak('./containers/commons/UserSignup.js')],
    loading,
});

const UserLogin = Loadable({
    loader: () => import('./containers/commons/UserLogin.js'),
    modules: ['./containers/commons/UserLogin.js'],
    webpack: () => [require.resolveWeak('./containers/commons/UserLogin.js')],
    loading,
});

const Notifications = Loadable({
    loader: () => import('./containers/commons/Notifications.js'),
    modules: ['./containers/commons/Notifications.js'],
    webpack: () => [require.resolveWeak('./containers/commons/Notifications.js')],
    loading,
});

const Home = Loadable({
    loader: () => import('./containers/commons/Home.js'),
    modules: ['./containers/commons/Home.js'],
    webpack: () => [require.resolveWeak('./containers/commons/Home.js')],
    loading,
});

const HomeChat = Loadable({
    loader: () => import('./containers/commons/HomeChat.js'),
    modules: ['./containers/commons/HomeChat.js'],
    webpack: () => [require.resolveWeak('./containers/commons/HomeChat.js')],
    loading,
});

const Wallet = Loadable({
    loader: () => import('./containers/commons/Wallet.js'),
    modules: ['./containers/commons/Wallet.js'],
    webpack: () => [require.resolveWeak('./containers/commons/Wallet.js')],
    loading,
});

const NotFound = Loadable({
    loader: () => import('./containers/commons/404.js'),
    modules: ['./containers/commons/404.js'],
    webpack: () => [require.resolveWeak('./containers/commons/404.js')],
    loading,
});

const Article = Loadable({
    loader: () => import('./containers/commons/article.js'),
    modules: ['./containers/commons/article.js'],
    webpack: () => [require.resolveWeak('./containers/commons/article.js')],
    loading,
});

const Payment = Loadable({
    loader: () => import('./containers/commons/Payment.js'),
    modules: ['./containers/commons/Payment.js'],
    webpack: () => [require.resolveWeak('./containers/commons/Payment.js')],
    loading,
});

const ChatHistory = Loadable({
    loader: () => import('./containers/commons/chatHistory.js'),
    modules: ['./containers/commons/chatHistory.js'],
    webpack: () => [require.resolveWeak('./containers/commons/chatHistory.js')],
    loading,
});

const MobileViewChat = Loadable({
    loader: () => import('./containers/commons/MobileViewChat.js'),
    modules: ['./containers/commons/MobileViewChat.js'],
    webpack: () => [require.resolveWeak('./containers/commons/MobileViewChat.js')],
    loading,
});

const RatingsView = Loadable({
    loader: () => import('./containers/commons/RatingsView.js'),
    modules: ['./containers/commons/RatingsView.js'],
    webpack: () => [require.resolveWeak('./containers/commons/RatingsView.js')],
    loading,
});

const MyRatings = Loadable({
    loader: () => import('./containers/commons/MyRatings.js'),
    modules: ['./containers/commons/MyRatings.js'],
    webpack: () => [require.resolveWeak('./containers/commons/MyRatings.js')],
    loading,
});

const Booking_LAB = Loadable({
    loader: () => import('./containers/diagnosis/Booking.js'),
    modules: ['./containers/diagnosis/Booking.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/Booking.js')],
    loading,
});

const DX_SearchCriteria = Loadable({
    loader: () => import('./containers/diagnosis/SearchCriteria.js'),
    modules: ['./containers/diagnosis/SearchCriteria.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchCriteria.js')],
    loading,
});

const DX_SearchResults = Loadable({
    loader: () => import('./containers/diagnosis/SearchResults.js'),
    modules: ['./containers/diagnosis/SearchResults.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchResults.js')],
    loading,
});

const Lab = Loadable({
    loader: () => import('./containers/diagnosis/Lab.js'),
    modules: ['./containers/diagnosis/Lab.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/Lab.js')],
    loading,
});

const DX_BookingSummary = Loadable({
    loader: () => import('./containers/diagnosis/BookingSummary.js'),
    modules: ['./containers/diagnosis/BookingSummary.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/BookingSummary.js')],
    loading,
});

const TestSelector = Loadable({
    loader: () => import('./containers/diagnosis/TestSelector.js'),
    modules: ['./containers/diagnosis/TestSelector.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/TestSelector.js')],
    loading,
});

const AppointmentSlot_Lab = Loadable({
    loader: () => import('./containers/diagnosis/AppointmentSlot.js'),
    modules: ['./containers/diagnosis/AppointmentSlot.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/AppointmentSlot.js')],
    loading,
});

const HealthPackage = Loadable({
    loader: () => import('./containers/diagnosis/HealthPackage.js'),
    modules: ['./containers/diagnosis/HealthPackage.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/HealthPackage.js')],
    loading,
});

const AgentLogin = Loadable({
    loader: () => import('./containers/commons/agentLogin.js'),
    modules: ['./containers/commons/agentLogin.js'],
    webpack: () => [require.resolveWeak('./containers/commons/agentLogin.js')],
    loading,
});

const DirectBooking = Loadable({
    loader: () => import('./containers/commons/directBooking.js'),
    modules: ['./containers/commons/directBooking.js'],
    webpack: () => [require.resolveWeak('./containers/commons/directBooking.js')],
    loading,
});

const CouponSelectNewView = Loadable({
    loader: () => import('./containers/commons/CouponsView.js'),
    modules: ['./containers/commons/CouponsView.js'],
    webpack: () => [require.resolveWeak('./containers/commons/CouponsView.js')],
    loading,
});

const CitiesSiteMap = Loadable({
    loader: () => import('./containers/commons/CitiesSiteMap.js'),
    modules: ['./containers/commons/CitiesSiteMap.js'],
    webpack: () => [require.resolveWeak('./containers/commons/CitiesSiteMap.js')],
    loading,
});

const SpecializationSiteMap = Loadable({
    loader: () => import('./containers/commons/SpecializationSiteMap.js'),
    modules: ['./containers/commons/SpecializationSiteMap.js'],
    webpack: () => [require.resolveWeak('./containers/commons/SpecializationSiteMap.js')],
    loading,
});

const Search = Loadable({
    loader: () => import('./containers/commons/search.js'),
    modules: ['./containers/commons/search.js'],
    webpack: () => [require.resolveWeak('./containers/commons/search.js')],
    loading,
});

const searchTestInfo = Loadable({
    loader: () => import('./containers/commons/searchTestInfo.js'),
    modules: ['./containers/commons/searchTestInfo.js'],
    webpack: () => [require.resolveWeak('./containers/commons/searchTestInfo.js')],
    loading,
});

const adsBooking = Loadable({
    loader: () => import('./containers/commons/adsBooking.js'),
    modules: ['./containers/commons/adsBooking.js'],
    webpack: () => [require.resolveWeak('./containers/commons/adsBooking.js')],
    loading,
});

const DX_SearchPackages = Loadable({
    loader: () => import('./containers/diagnosis/SearchPackages.js'),
    modules: ['./containers/diagnosis/SearchPackages.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchPackages.js')],
    loading,
});

const Offers = Loadable({
    loader: () => import('./containers/commons/Offers'),
    modules: ['./containers/commons/Offers'],
    webpack: () => [require.resolveWeak('./containers/commons/Offers')],
    loading,
});

const Referral = Loadable({
    loader: () => import('./containers/commons/referral'),
    modules: ['./containers/commons/referral'],
    webpack: () => [require.resolveWeak('./containers/commons/referral')],
    loading,
});

const Cart = Loadable({
    loader: () => import('./containers/commons/cart'),
    modules: ['./containers/commons/cart'],
    webpack: () => [require.resolveWeak('./containers/commons/cart')],
    loading,
});

const OrderSummary = Loadable({
    loader: () => import('./containers/commons/OrderSummary'),
    modules: ['./containers/commons/OrderSummary'],
    webpack: () => [require.resolveWeak('./containers/commons/OrderSummary')],
    loading,
});

const HealthPackageAdvisor = Loadable({
    loader: () => import('./containers/diagnosis/HealthPackageAdvisor'),
    modules: ['./containers/diagnosis/HealthPackageAdvisor'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/HealthPackageAdvisor')],
    loading,
});

const ThyrocarePackage = Loadable({
    loader: () => import('./containers/diagnosis/ThyrocarePackage'),
    modules: ['./containers/diagnosis/ThyrocarePackage'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/ThyrocarePackage')],
    loading,
});

const TaxSaverTC = Loadable({
    loader: () => import('./components/diagnosis/searchPackages/TaxSaverTC.js'),
    modules: ['./components/diagnosis/searchPackages/TaxSaverTC.js'],
    webpack: () => [require.resolveWeak('./components/diagnosis/searchPackages/TaxSaverTC.js')],
    loading,
});

/**
 * RENDER_ON_SERVER : true will enable Server-side-rendering  for that route.
 */

const routes = [

    { path: '/', exact: true, component: Home, RENDER_ON_SERVER: true },
    { path: '/referral', exact: true, component: Referral },
    { path: '/online-consultation', exact: true, component: HomeChat, RENDER_ON_SERVER: true },
    { path: '/user', component: UserProfile },
    { path: '/locationsearch', exact: true, component: LocationSearch },
    { path: '/chathistory', exact: true, component: ChatHistory },
    { path: '/notifications', exact: true, component: Notifications },
    { path: '/login', exact: true, component: UserLogin },
    { path: '/signup', exact: true, component: UserSignup },
    { path: '/addprofile', exact: true, component: UserSignup },
    { path: '/wallet', exact: true, component: Wallet },
    { path: `/*-dsdp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/*-mddp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/*-artdp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/*-nmdp`, component: Article, RENDER_ON_SERVER: true },
    { path: `/all-diseases`, component: ArticleList, RENDER_ON_SERVER: true },
    { path: `/all-medicines`, component: ArticleList, RENDER_ON_SERVER: true },
    { path: `/all-articles`, component: ArticleList, RENDER_ON_SERVER: true },
    { path: '/doctors-near-me', exact: true, component: ArticleList, RENDER_ON_SERVER: true },
    { path: '/payment/:id', exact: true, component: Payment },
    { path: '/order/summary/:id', exact: true, component: OrderSummary },
    { path: '/mobileviewchat', exact: true, component: MobileViewChat },
    { path: '/search', exact: true, component: Search },
    { path: '/offers', exact: true, component: Offers },
    { path: '/cart', exact: true, component: Cart },

    // { path: '/opd', exact: true, component: SearchCriteria },
    { path: '/opd/searchresults', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/searchresults/location=*', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-sptcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-sptlitcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/doctor/:id', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },
    { path: '/*-dpp', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },
    { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/opd/doctor/:id/:clinicId/bookdetails', exact: true, component: PatientDetails },
    { path: '/coupon/:type/:id/:cid', exact: true, private: true, component: CouponSelectNewView },
    { path: '/opd/appointment/:refId', exact: true, component: Booking_OPD },
    { path: '/opd/reschedule/:refId', exact: true, component: AppointmentReschedule },

    // { path: '/lab', exact: true, component: DX_SearchCriteria },
    { path: '/lab/searchresults', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/lab/searchresults/location=*', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-lbcit', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-lblitcit', exact: true, component: DX_SearchResults, RENDER_ON_SERVER: true },
    { path: '/lab/:id', exact: true, component: Lab, RENDER_ON_SERVER: true },
    { path: '/*-lpp', exact: true, component: Lab, RENDER_ON_SERVER: true },
    { path: '/lab/:id/tests', exact: true, component: TestSelector },
    { path: '/lab/:id/timeslots', exact: true, component: AppointmentSlot_Lab },
    { path: '/lab/:id/book', exact: true, component: DX_BookingSummary },
    { path: '/lab/appointment/:refId', exact: true, component: Booking_LAB },

    { path: '/about', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/howitworks', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/privacy', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/disclaimer', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/contact', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/terms', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/careers', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/media', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/cancelpolicy', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/doctorsignup', exact: true, component: StaticPages, RENDER_ON_SERVER: true },
    { path: '/health-package-compare', exact: true, component: HealthPackage, RENDER_ON_SERVER: true },
    { path: '/thyrocare-aarogyam-packages', exact: true, component: ThyrocarePackage, RENDER_ON_SERVER: true },

    { path: '/agent/login', exact: true, component: AgentLogin },
    { path: '/agent/booking', exact: true, component: DirectBooking },
    { path: '/view-all-ratings', exact: true, component: RatingsView, RENDER_ON_SERVER: false },
    { path: '/myratings', exact: true, component: MyRatings, RENDER_ON_SERVER: false },
    { path: '/speciality-inventory', exact: true, component: SpecializationSiteMap, RENDER_ON_SERVER: true },
    { path: '/speciality-inventory/:speciality', exact: true, component: SpecializationSiteMap, RENDER_ON_SERVER: true },
    { path: '/city-inventory', exact: true, component: CitiesSiteMap, RENDER_ON_SERVER: true },
    { path: '/city-inventory/:city', exact: true, component: CitiesSiteMap, RENDER_ON_SERVER: true },
    { path: '/search/testinfo', exact: true, component: searchTestInfo, RENDER_ON_SERVER: true },
    { path: '/bookings', exact: true, component: adsBooking },
    { path: '/full-body-checkup-health-packages', exact: true, component: DX_SearchPackages, RENDER_ON_SERVER: true },
    { path: '/health-package-advisor', exact: true, component: HealthPackageAdvisor, RENDER_ON_SERVER: true },
    { path: '/searchpackages', exact: true, component: DX_SearchPackages, redirect: false, redirectTo: "full-body-checkup-health-packages", RENDER_ON_SERVER: true },
    { path: '/tax-saver-health-packages', exact: true, component: DX_SearchPackages, RENDER_ON_SERVER: true },
    { path: '/tax-saver-health-packages-tc', exact: true, component: TaxSaverTC, RENDER_ON_SERVER: true },
    { path: `/*-tpp`, component: searchTestInfo, RENDER_ON_SERVER: true },
    { path: '/sms/booking', exact: true, component: DirectBooking },
    { path: '*', component: NotFound, NO_MATCH: true },
]

class RouterConfig extends Component {

    static ROUTES = routes


    render() {
        return (
            <div>
                <HelmetTags />
                <Route
                    render={
                        ({ location }) => {
                            return (
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.pathname}
                                        classNames="fade"
                                        timeout={{ enter: 250, exit: 0 }}
                                        exit={false}
                                    >
                                        <Switch location={location}>
                                            {routes.map((route, i) => (
                                                <Route {...route} key={i} />
                                            ))}
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )
                        }
                    }
                />

            </div>
        )
    }

}


export default RouterConfig