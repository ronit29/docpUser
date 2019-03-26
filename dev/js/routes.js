import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HelmetTags from './components/commons/HelmetTags'

import Loadable from 'react-loadable'
const loading = () => <div></div>

/**
 * OPD ROUTES
 */
const LocationSearch = Loadable({
    loader: () => import('./opd_routes').then(c => c.LocationSearch),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const SearchResults = Loadable({
    loader: () => import('./opd_routes').then(c => c.SearchResults),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const DoctorProfile = Loadable({
    loader: () => import('./opd_routes').then(c => c.DoctorProfile),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const AppointmentSlot = Loadable({
    loader: () => import('./opd_routes').then(c => c.AppointmentSlot),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const PatientDetails = Loadable({
    loader: () => import('./opd_routes').then(c => c.PatientDetails),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const Booking_OPD = Loadable({
    loader: () => import('./opd_routes').then(c => c.Booking_OPD),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})
const AppointmentReschedule = Loadable({
    loader: () => import('./opd_routes').then(c => c.AppointmentReschedule),
    modules: ['./opd_routes'],
    webpack: () => [require.resolveWeak('./opd_routes')],
    loading,
})


/**
 * LAB ROUTES
 */

const Booking_LAB = Loadable({
    loader: () => import('./lab_routes').then(c => c.Booking_LAB),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const DX_SearchCriteria = Loadable({
    loader: () => import('./lab_routes').then(c => c.DX_SearchCriteria),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const DX_SearchResults = Loadable({
    loader: () => import('./lab_routes').then(c => c.DX_SearchResults),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const Lab = Loadable({
    loader: () => import('./lab_routes').then(c => c.Lab),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const DX_BookingSummary = Loadable({
    loader: () => import('./lab_routes').then(c => c.DX_BookingSummary),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const TestSelector = Loadable({
    loader: () => import('./lab_routes').then(c => c.TestSelector),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const AppointmentSlot_Lab = Loadable({
    loader: () => import('./lab_routes').then(c => c.AppointmentSlot_Lab),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const HealthPackage = Loadable({
    loader: () => import('./lab_routes').then(c => c.HealthPackage),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const HealthPackageAdvisor = Loadable({
    loader: () => import('./lab_routes').then(c => c.HealthPackageAdvisor),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const ThyrocarePackage = Loadable({
    loader: () => import('./lab_routes').then(c => c.ThyrocarePackage),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const TaxSaverTC = Loadable({
    loader: () => import('./lab_routes').then(c => c.TaxSaverTC),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})
const DX_SearchPackages = Loadable({
    loader: () => import('./lab_routes').then(c => c.DX_SearchPackages),
    modules: ['./lab_routes'],
    webpack: () => [require.resolveWeak('./lab_routes')],
    loading,
})

/**
 * STATIC ROUTES
 */


const Article = Loadable({
    loader: () => import('./static_routes.js').then(c => c.Article),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})
const ArticleList = Loadable({
    loader: () => import('./static_routes.js').then(c => c.ArticleList),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})
const StaticPages = Loadable({
    loader: () => import('./static_routes.js').then(c => c.StaticPages),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})
const CitiesSiteMap = Loadable({
    loader: () => import('./static_routes.js').then(c => c.CitiesSiteMap),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})
const SpecializationSiteMap = Loadable({
    loader: () => import('./static_routes.js').then(c => c.SpecializationSiteMap),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})
const adsBooking = Loadable({
    loader: () => import('./static_routes.js').then(c => c.adsBooking),
    modules: ['./static_routes.js'],
    webpack: () => [require.resolveWeak('./static_routes.js')],
    loading,
})


/**
 * IPD ROUTES
 */

const IPDInfo = Loadable({
    loader: () => import('./ipd_routes.js').then(c => c.IPDInfo),
    modules: ['./ipd_routes.js'],
    webpack: () => [require.resolveWeak('./ipd_routes.js')],
    loading,
})
const IpdForm = Loadable({
    loader: () => import('./ipd_routes.js').then(c => c.IpdForm),
    modules: ['./ipd_routes.js'],
    webpack: () => [require.resolveWeak('./ipd_routes.js')],
    loading,
})
const IpdHospitalSearch = Loadable({
    loader: () => import('./ipd_routes.js').then(c => c.IpdHospitalSearch),
    modules: ['./ipd_routes.js'],
    webpack: () => [require.resolveWeak('./ipd_routes.js')],
    loading,
})
const IpdHospitalDetail = Loadable({
    loader: () => import('./ipd_routes.js').then(c => c.IpdHospitalDetail),
    modules: ['./ipd_routes.js'],
    webpack: () => [require.resolveWeak('./ipd_routes.js')],
    loading,
})
const IpdDetail = Loadable({
    loader: () => import('./ipd_routes.js').then(c => c.IpdDetail),
    modules: ['./ipd_routes.js'],
    webpack: () => [require.resolveWeak('./ipd_routes.js')],
    loading,
})

/**
 * LOGGED IN ROUTES
 */


// const UserProfile = Loadable({
//     loader: () => import('./logged_in_routes.js').then(c => c.UserProfile),
//     modules: ['./logged_in_routes.js'],
//     webpack: () => [require.resolveWeak('./logged_in_routes.js')],
//     loading,
// })
const UserSignup = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.UserSignup),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const UserLogin = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.UserLogin),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Notifications = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Notifications),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Home = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Home),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const HomeChat = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.HomeChat),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Wallet = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Wallet),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const NotFound = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.NotFound),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
// const Payment = Loadable({
//     loader: () => import('./logged_in_routes.js').then(c => c.Payment),
//     modules: ['./logged_in_routes.js'],
//     webpack: () => [require.resolveWeak('./logged_in_routes.js')],
//     loading,
// })
const ChatHistory = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.ChatHistory),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const AgentLogin = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.AgentLogin),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const DirectBooking = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.DirectBooking),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const CouponSelectNewView = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.CouponSelectNewView),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Search = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Search),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const searchTestInfo = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.searchTestInfo),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Referral = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Referral),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Cart = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Cart),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const OrderSummary = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.OrderSummary),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const MobileViewChat = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.MobileViewChat),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const RatingsView = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.RatingsView),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const MyRatings = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.MyRatings),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})
const Offers = Loadable({
    loader: () => import('./logged_in_routes.js').then(c => c.Offers),
    modules: ['./logged_in_routes.js'],
    webpack: () => [require.resolveWeak('./logged_in_routes.js')],
    loading,
})


import Payment from './containers/commons/Payment'
import UserProfile from './containers/commons/UserProfile.js'


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
    { path: '/ipdInfo', exact: true, component: IPDInfo },
    { path: '/ipd/:id/getPriceEstimate', exact: true, component: IpdForm },
    { path: '/ipd/searchHospitals', exact: true, component: IpdHospitalSearch },
    { path: '/ipd/hospital/:hospitalId', exact: true, component: IpdHospitalDetail },
    { path: '/ipd/:ipd_id/detail', exact: true, component: IpdDetail },
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