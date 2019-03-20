import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HelmetTags from './components/commons/HelmetTags'

import SearchCriteria from './containers/opd/SearchCriteria.js'
import LocationSearch from './containers/opd/LocationSearch.js'
import SearchResults from './containers/opd/SearchResults.js'
import DoctorProfile from './containers/opd/DoctorProfile.js'
import AppointmentSlot from './containers/opd/AppointmentSlot.js'
import PatientDetails from './containers/opd/PatientDetails.js'
import Booking_OPD from './containers/opd/Booking.js'
import AppointmentReschedule from './containers/opd/AppointmentReschedule.js'

import UserProfile from './containers/commons/UserProfile.js'
import UserSignup from './containers/commons/UserSignup'
import UserLogin from './containers/commons/UserLogin'
import Notifications from './containers/commons/Notifications'
import Home from './containers/commons/Home'
import HomeChat from './containers/commons/HomeChat'
import Wallet from './containers/commons/Wallet'
import NotFound from './containers/commons/404'
import Article from './containers/commons/article'
import ArticleList from './containers/commons/articleList'
import Payment from './containers/commons/Payment'
import ChatHistory from './containers/commons/chatHistory'
import StaticPages from './containers/commons/StaticPages'
import MobileViewChat from './components/commons/mobileViewChat/MobileViewChat'
import RatingsView from './containers/commons/RatingsView.js'
import MyRatings from './containers/commons/MyRatings.js'

import Booking_LAB from './containers/diagnosis/Booking.js'
import DX_SearchCriteria from './containers/diagnosis/SearchCriteria.js'
import DX_SearchResults from './containers/diagnosis/SearchResults.js'
import Lab from './containers/diagnosis/Lab.js'
import DX_BookingSummary from './containers/diagnosis/BookingSummary.js'
import TestSelector from './containers/diagnosis/TestSelector'
import AppointmentSlot_Lab from './containers/diagnosis/AppointmentSlot.js'
import HealthPackage from './containers/diagnosis/HealthPackage';

import AgentLogin from './containers/commons/agentLogin.js'
import DirectBooking from './containers/commons/directBooking.js'
import CouponSelectNewView from './containers/commons/CouponsView.js'
import CitiesSiteMap from './containers/commons/CitiesSiteMap.js'
import SpecializationSiteMap from './containers/commons/SpecializationSiteMap'
import Search from './containers/commons/search'
import searchTestInfo from './containers/commons/searchTestInfo'
import adsBooking from './containers/commons/adsBooking.js'
import DX_SearchPackages from './containers/diagnosis/SearchPackages.js'
import Offers from './containers/commons/Offers';
import Referral from './containers/commons/referral'
import Cart from './containers/commons/cart'
import OrderSummary from './containers/commons/OrderSummary'
import HealthPackageAdvisor from './containers/diagnosis/HealthPackageAdvisor';
import ThyrocarePackage from './containers/diagnosis/ThyrocarePackage';
import TaxSaverTC from './components/diagnosis/searchPackages/TaxSaverTC.js'
import PrimeCare from './containers/care/primeCare.js'
import PrimeCareBooking from './containers/care/primeCareBooking.js'
import PrimeCareSuccess from './containers/care/primeCareSuccess.js'
import Compare from './containers/commons/ComparePackages.js'
import IPDInfo from './containers/ipd/IpdInfo.js'
import IpdForm from './containers/ipd/IpdForm.js'
import IpdHospitalSearch from './containers/ipd/IpdHospitalSearch.js'
import IpdHospitalDetail from './containers/ipd/IpdHospitalDetail.js'
import IpdDetail from './containers/ipd/IpdDetail.js'


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
    { path: '/search/testinfo', exact: true, component: searchTestInfo , RENDER_ON_SERVER: true },
    { path: '/bookings', exact: true, component: adsBooking },
    { path: '/full-body-checkup-health-packages', exact: true, component: DX_SearchPackages, RENDER_ON_SERVER: true },
    { path: '/health-package-advisor', exact: true, component: HealthPackageAdvisor, RENDER_ON_SERVER: true },
    { path: '/searchpackages', exact: true, component: DX_SearchPackages, redirect: false, redirectTo: "full-body-checkup-health-packages", RENDER_ON_SERVER: true },
    { path: '/tax-saver-health-packages', exact: true, component: DX_SearchPackages, RENDER_ON_SERVER: true },
    { path: '/tax-saver-health-packages-tc', exact: true, component: TaxSaverTC, RENDER_ON_SERVER: true },
    { path: `/*-tpp`, component: searchTestInfo, RENDER_ON_SERVER: true },
    { path: '/sms/booking', exact: true, component: DirectBooking },
    { path: '/prime/plans', exact: true, component: PrimeCare },
    { path: '/prime/booking', exact: true, component: PrimeCareBooking },
    { path: '/prime/success', exact: true, component: PrimeCareSuccess },
    { path: '/compare', exact:true, component: Compare},
    { path: '/ipdInfo', exact: true, component: IPDInfo},
    { path: '/ipd/:id/getPriceEstimate',exact: true, component: IpdForm},
    { path: '/ipd/searchHospitals',exact: true, component: IpdHospitalSearch},
    { path: '/ipd/hospital/:hospitalId', exact: true, component: IpdHospitalDetail},
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