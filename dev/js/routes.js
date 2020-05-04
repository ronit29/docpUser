
import React, { Component } from 'react';
import CONFIG from './config'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HelmetTags from './components/commons/HelmetTags'
const queryString = require('query-string');


import Loadable from 'react-loadable'
const loading = () => <div className="loading_Linebar_container">
    <div className="loading_bar_line"></div>
</div>


const AgentLogin = Loadable({
    loader: () => import('./containers/commons/agentLogin.js'),
    modules: ['./containers/commons/agentLogin.js'],
    webpack: () => [require.resolveWeak('./containers/commons/agentLogin.js')],
    loading,
})
const DirectBooking = Loadable({
    loader: () => import('./containers/commons/directBooking.js'),
    modules: ['./containers/commons/directBooking.js'],
    webpack: () => [require.resolveWeak('./containers/commons/directBooking.js')],
    loading,
})
const CouponSelectNewView = Loadable({
    loader: () => import('./containers/commons/CouponsView.js'),
    modules: ['./containers/commons/CouponsView.js'],
    webpack: () => [require.resolveWeak('./containers/commons/CouponsView.js')],
    loading,
})
const Search = Loadable({
    loader: () => import('./containers/commons/search'),
    modules: ['./containers/commons/search'],
    webpack: () => [require.resolveWeak('./containers/commons/search')],
    loading,
})
const searchTestInfo = Loadable({
    loader: () => import('./containers/commons/searchTestInfo'),
    modules: ['./containers/commons/searchTestInfo'],
    webpack: () => [require.resolveWeak('./containers/commons/searchTestInfo')],
    loading,
})
const Referral = Loadable({
    loader: () => import('./containers/commons/referral'),
    modules: ['./containers/commons/referral'],
    webpack: () => [require.resolveWeak('./containers/commons/referral')],
    loading,
})
const Cart = Loadable({
    loader: () => import('./containers/commons/cart'),
    modules: ['./containers/commons/cart'],
    webpack: () => [require.resolveWeak('./containers/commons/cart')],
    loading,
})
const OrderMedicine = Loadable({
    loader: () => import('./containers/commons/orderMedicine.js'),
    modules: ['./containers/commons/orderMedicine.js'],
    webpack: () => [require.resolveWeak('./containers/commons/orderMedicine.js')],
    loading,
})
const OrderSummary = Loadable({
    loader: () => import('./containers/commons/OrderSummary'),
    modules: ['./containers/commons/OrderSummary'],
    webpack: () => [require.resolveWeak('./containers/commons/OrderSummary')],
    loading,
})
const MobileViewChat = Loadable({
    loader: () => import('./components/commons/mobileViewChat/MobileViewChat'),
    modules: ['./components/commons/mobileViewChat/MobileViewChat'],
    webpack: () => [require.resolveWeak('./components/commons/mobileViewChat/MobileViewChat')],
    loading,
})
const RatingsView = Loadable({
    loader: () => import('./containers/commons/RatingsView.js'),
    modules: ['./containers/commons/RatingsView.js'],
    webpack: () => [require.resolveWeak('./containers/commons/RatingsView.js')],
    loading,
})
const MyRatings = Loadable({
    loader: () => import('./containers/commons/MyRatings.js'),
    modules: ['./containers/commons/MyRatings.js'],
    webpack: () => [require.resolveWeak('./containers/commons/MyRatings.js')],
    loading,
})
const Offers = Loadable({
    loader: () => import('./containers/commons/Offers'),
    modules: ['./containers/commons/Offers'],
    webpack: () => [require.resolveWeak('./containers/commons/Offers')],
    loading,
})
const PrimeCare = Loadable({
    loader: () => import('./containers/care/primeCare.js'),
    modules: ['./containers/care/primeCare.js'],
    webpack: () => [require.resolveWeak('./containers/care/primeCare.js')],
    loading,
})
const PrimeCareBooking = Loadable({
    loader: () => import('./containers/care/primeCareBooking.js'),
    modules: ['./containers/care/primeCareBooking.js'],
    webpack: () => [require.resolveWeak('./containers/care/primeCareBooking.js')],
    loading,
})
const PrimeCareSuccess = Loadable({
    loader: () => import('./containers/care/primeCareSuccess.js'),
    modules: ['./containers/care/primeCareSuccess.js'],
    webpack: () => [require.resolveWeak('./containers/care/primeCareSuccess.js')],
    loading,
})
const Compare = Loadable({
    loader: () => import('./containers/commons/ComparePackages.js'),
    modules: ['./containers/commons/ComparePackages.js'],
    webpack: () => [require.resolveWeak('./containers/commons/ComparePackages.js')],
    loading,
})
const UserSignup = Loadable({
    loader: () => import('./containers/commons/UserSignup'),
    modules: ['./containers/commons/UserSignup'],
    webpack: () => [require.resolveWeak('./containers/commons/UserSignup')],
    loading,
})
const UserLogin = Loadable({
    loader: () => import('./containers/commons/UserLogin'),
    modules: ['./containers/commons/UserLogin'],
    webpack: () => [require.resolveWeak('./containers/commons/UserLogin')],
    loading,
})
const Wallet = Loadable({
    loader: () => import('./containers/commons/Wallet'),
    modules: ['./containers/commons/Wallet'],
    webpack: () => [require.resolveWeak('./containers/commons/Wallet')],
    loading,
})
const NotFound = Loadable({
    loader: () => import('./containers/commons/404'),
    modules: ['./containers/commons/404'],
    webpack: () => [require.resolveWeak('./containers/commons/404')],
    loading,
})

const PackageCompare = Loadable({
    loader: () => import('./containers/diagnosis/PackageCompare.js'),
    modules: ['./containers/diagnosis/PackageCompare.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/PackageCompare.js')],
    loading,
})

const LocationSearch = Loadable({
    loader: () => import('./containers/opd/LocationSearch.js'),
    modules: ['./containers/opd/LocationSearch.js'],
    webpack: () => [require.resolveWeak('./containers/opd/LocationSearch.js')],
    loading,
})
const SearchResults = Loadable({
    loader: () => import('./containers/opd/SearchResults.js'),
    modules: ['./containers/opd/SearchResults.js'],
    webpack: () => [require.resolveWeak('./containers/opd/SearchResults.js')],
    loading,
})
const DoctorProfile = Loadable({
    loader: () => import('./containers/opd/DoctorProfile.js'),
    modules: ['./containers/opd/DoctorProfile.js'],
    webpack: () => [require.resolveWeak('./containers/opd/DoctorProfile.js')],
    loading,
})
const AppointmentSlot = Loadable({
    loader: () => import('./containers/opd/AppointmentSlot.js'),
    modules: ['./containers/opd/AppointmentSlot.js'],
    webpack: () => [require.resolveWeak('./containers/opd/AppointmentSlot.js')],
    loading,
})
const PatientDetails = Loadable({
    loader: () => import('./containers/opd/PatientDetails.js'),
    modules: ['./containers/opd/PatientDetails.js'],
    webpack: () => [require.resolveWeak('./containers/opd/PatientDetails.js')],
    loading,
})
const SeoBooking = Loadable({
    loader: () => import('./containers/opd/SeoBooking.js'),
    modules: ['./containers/opd/SeoBooking.js'],
    webpack: () => [require.resolveWeak('./containers/opd/SeoBooking.js')],
    loading,
})
const SeoBooking_Lab = Loadable({
    loader: () => import('./containers/diagnosis/SeoBooking.js'),
    modules: ['./containers/diagnosis/SeoBooking.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SeoBooking.js')],
    loading,
})
const Booking_OPD = Loadable({
    loader: () => import('./containers/opd/Booking.js'),
    modules: ['./containers/opd/Booking.js'],
    webpack: () => [require.resolveWeak('./containers/opd/Booking.js')],
    loading,
})
const TestsList = Loadable({
    loader: () => import('./containers/commons/testsList.js'),
    modules: ['./containers/commons/testsList.js'],
    webpack: () => [require.resolveWeak('./containers/commons/testsList.js')],
    loading,
})

const ChatFeedback = Loadable({
    loader: () => import('./containers/commons/ChatFeedback.js'),
    modules: ['./containers/commons/ChatFeedback.js'],
    webpack: () => [require.resolveWeak('./containers/commons/ChatFeedback.js')],
    loading,
})

const IpdList = Loadable({
    loader: () => import('./containers/commons/ipdLists.js'),
    modules: ['./containers/commons/ipdLists.js'],
    webpack: () => [require.resolveWeak('./containers/commons/ipdLists.js')],
    loading,
})

const CodPaymentPage = Loadable({
    loader: () => import('./containers/commons/codPayment.js'),
    modules: ['./containers/commons/codPayment.js'],
    webpack: () => [require.resolveWeak('./containers/commons/codPayment.js')],
    loading,
})

/**
 * IPD ROUTES
 */

const AppointmentReschedule = Loadable({
    loader: () => import('./containers/opd/AppointmentReschedule.js'),
    modules: ['./containers/opd/AppointmentReschedule.js'],
    webpack: () => [require.resolveWeak('./containers/opd/AppointmentReschedule.js')],
    loading,
})
const Article = Loadable({
    loader: () => import('./containers/commons/article'),
    modules: ['./containers/commons/article'],
    webpack: () => [require.resolveWeak('./containers/commons/article')],
    loading,
})
const ArticleList = Loadable({
    loader: () => import('./containers/commons/articleList'),
    modules: ['./containers/commons/articleList'],
    webpack: () => [require.resolveWeak('./containers/commons/articleList')],
    loading,
})
const StaticPages = Loadable({
    loader: () => import('./containers/commons/StaticPages'),
    modules: ['./containers/commons/StaticPages'],
    webpack: () => [require.resolveWeak('./containers/commons/StaticPages')],
    loading,
})
const CitiesSiteMap = Loadable({
    loader: () => import('./containers/commons/CitiesSiteMap.js'),
    modules: ['./containers/commons/CitiesSiteMap.js'],
    webpack: () => [require.resolveWeak('./containers/commons/CitiesSiteMap.js')],
    loading,
})
const SpecializationSiteMap = Loadable({
    loader: () => import('./containers/commons/SpecializationSiteMap'),
    modules: ['./containers/commons/SpecializationSiteMap'],
    webpack: () => [require.resolveWeak('./containers/commons/SpecializationSiteMap')],
    loading,
})
const adsBooking = Loadable({
    loader: () => import('./containers/commons/adsBooking.js'),
    modules: ['./containers/commons/adsBooking.js'],
    webpack: () => [require.resolveWeak('./containers/commons/adsBooking.js')],
    loading,
})
const InsuranceStaticView = Loadable({
    loader: () => import('./containers/insurance/InsuranceStaticView'),
    modules: ['./containers/insurance/InsuranceStaticView'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceStaticView')],
    loading,
})
const InsuranceView = Loadable({
    loader: () => import('./containers/insurance/InsuranceView'),
    modules: ['./containers/insurance/InsuranceView'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceView')],
    loading,
})
const InsuranceDetails = Loadable({
    loader: () => import('./containers/insurance/InsuranceDetails'),
    modules: ['./containers/insurance/InsuranceDetails'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceDetails')],
    loading,
})
const InsuranceReview = Loadable({
    loader: () => import('./containers/insurance/InsuranceReview'),
    modules: ['./containers/insurance/InsuranceReview'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceReview')],
    loading,
})
const InsuranceSuccess = Loadable({
    loader: () => import('./containers/insurance/InsuranceSuccess'),
    modules: ['./containers/insurance/InsuranceSuccess'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceSuccess')],
    loading,
})
const InsuranceViewUI = Loadable({
    loader: () => import('./containers/commons/InsuranceView.js'),
    modules: ['./containers/commons/InsuranceView.js'],
    webpack: () => [require.resolveWeak('./containers/commons/InsuranceView.js')],
    loading,
})
const InsuranceCertificate = Loadable({
    loader: () => import('./containers/insurance/InsuranceCertificate.js'),
    modules: ['./containers/insurance/InsuranceCertificate.js'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceCertificate.js')],
    loading,
})
const InsuranceCancellation = Loadable({
    loader: () => import('./containers/insurance/InsuranceCancellation.js'),
    modules: ['./containers/insurance/InsuranceCancellation.js'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceCancellation.js')],
    loading,
})

const InsuranceBankDetails = Loadable({
    loader: () => import('./containers/insurance/InsuranceBankDetails.js'),
    modules: ['./containers/insurance/InsuranceBankDetails.js'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceBankDetails.js')],
    loading,
})

const InsuranceNetwork = Loadable({
    loader: () => import('./containers/insurance/InsuranceNetwork.js'),
    modules: ['./containers/insurance/InsuranceNetwork.js'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceNetwork.js')],
    loading,
})
const InsuranceEndorsementDetails = Loadable({
    loader: () => import('./containers/insurance/InsuranceEndorsementDetails'),
    modules: ['./containers/insurance/InsuranceEndorsementDetails'],
    webpack: () => [require.resolveWeak('./containers/insurance/InsuranceEndorsementDetails')],
    loading,
})
const IPDInfo = Loadable({
    loader: () => import('./containers/ipd/IpdInfo.js'),
    modules: ['./containers/ipd/IpdInfo.js'],
    webpack: () => [require.resolveWeak('./containers/ipd/IpdInfo.js')],
    loading,
})
const IpdForm = Loadable({
    loader: () => import('./containers/ipd/IpdForm.js'),
    modules: ['./containers/ipd/IpdForm.js'],
    webpack: () => [require.resolveWeak('./containers/ipd/IpdForm.js')],
    loading,
})
const IpdHospitalSearch = Loadable({
    loader: () => import('./containers/ipd/IpdHospitalSearch.js'),
    modules: ['./containers/ipd/IpdHospitalSearch.js'],
    webpack: () => [require.resolveWeak('./containers/ipd/IpdHospitalSearch.js')],
    loading,
})
const IpdHospitalDetail = Loadable({
    loader: () => import('./containers/ipd/IpdHospitalDetail.js'),
    modules: ['./containers/ipd/IpdHospitalDetail.js'],
    webpack: () => [require.resolveWeak('./containers/ipd/IpdHospitalDetail.js')],
    loading,
})
const IpdDetail = Loadable({
    loader: () => import('./containers/ipd/IpdDetail.js'),
    modules: ['./containers/ipd/IpdDetail.js'],
    webpack: () => [require.resolveWeak('./containers/ipd/IpdDetail.js')],
    loading,
})
const Booking_LAB = Loadable({
    loader: () => import('./containers/diagnosis/Booking.js'),
    modules: ['./containers/diagnosis/Booking.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/Booking.js')],
    loading,
})
const DX_SearchCriteria = Loadable({
    loader: () => import('./containers/diagnosis/SearchCriteria.js'),
    modules: ['./containers/diagnosis/SearchCriteria.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchCriteria.js')],
    loading,
})
const DX_SearchResults = Loadable({
    loader: () => import('./containers/diagnosis/SearchResults.js'),
    modules: ['./containers/diagnosis/SearchResults.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchResults.js')],
    loading,
})
const Lab = Loadable({
    loader: () => import('./containers/diagnosis/Lab.js'),
    modules: ['./containers/diagnosis/Lab.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/Lab.js')],
    loading,
})
const DX_BookingSummary = Loadable({
    loader: () => import('./containers/diagnosis/BookingSummary.js'),
    modules: ['./containers/diagnosis/BookingSummary.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/BookingSummary.js')],
    loading,
})
const TestSelector = Loadable({
    loader: () => import('./containers/diagnosis/TestSelector'),
    modules: ['./containers/diagnosis/TestSelector'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/TestSelector')],
    loading,
})
const AppointmentSlot_Lab = Loadable({
    loader: () => import('./containers/diagnosis/AppointmentSlot.js'),
    modules: ['./containers/diagnosis/AppointmentSlot.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/AppointmentSlot.js')],
    loading,
})
const HealthPackage = Loadable({
    loader: () => import('./containers/diagnosis/HealthPackage'),
    modules: ['./containers/diagnosis/HealthPackage'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/HealthPackage')],
    loading,
})
const HealthPackageAdvisor = Loadable({
    loader: () => import('./containers/diagnosis/HealthPackageAdvisor'),
    modules: ['./containers/diagnosis/HealthPackageAdvisor'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/HealthPackageAdvisor')],
    loading,
})
const ThyrocarePackage = Loadable({
    loader: () => import('./containers/diagnosis/ThyrocarePackage'),
    modules: ['./containers/diagnosis/ThyrocarePackage'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/ThyrocarePackage')],
    loading,
})
const TaxSaverTC = Loadable({
    loader: () => import('./components/diagnosis/searchPackages/TaxSaverTC.js'),
    modules: ['./components/diagnosis/searchPackages/TaxSaverTC.js'],
    webpack: () => [require.resolveWeak('./components/diagnosis/searchPackages/TaxSaverTC.js')],
    loading,
})
const DX_SearchPackages = Loadable({
    loader: () => import('./containers/diagnosis/SearchPackages.js'),
    modules: ['./containers/diagnosis/SearchPackages.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/SearchPackages.js')],
    loading,
})
const Home = Loadable({
    loader: () => import('./containers/commons/Home'),
    modules: ['./containers/commons/Home'],
    webpack: () => [require.resolveWeak('./containers/commons/Home')],
    loading,
})
const HomeChat = Loadable({
    loader: () => import('./containers/commons/HomeChat'),
    modules: ['./containers/commons/HomeChat'],
    webpack: () => [require.resolveWeak('./containers/commons/HomeChat')],
    loading,
})
const Notifications = Loadable({
    loader: () => import('./containers/commons/Notifications'),
    modules: ['./containers/commons/Notifications'],
    webpack: () => [require.resolveWeak('./containers/commons/Notifications')],
    loading,
})
const ChatHistory = Loadable({
    loader: () => import('./containers/commons/chatHistory'),
    modules: ['./containers/commons/chatHistory'],
    webpack: () => [require.resolveWeak('./containers/commons/chatHistory')],
    loading,
})

const UserProfile = Loadable({
    loader: () => import('./containers/commons/UserProfile.js'),
    modules: ['./containers/commons/UserProfile.js'],
    webpack: () => [require.resolveWeak('./containers/commons/UserProfile.js')],
    loading,
})

const Payment = Loadable({
    loader: () => import('./containers/commons/Payment'),
    modules: ['./containers/commons/Payment'],
    webpack: () => [require.resolveWeak('./containers/commons/Payment')],
    loading,
})

const HospitalList = Loadable({
    loader: () => import('./containers/commons/hospitalList.js'),
    modules: ['./containers/commons/hospitalList.js'],
    webpack: () => [require.resolveWeak('./containers/commons/hospitalList.js')],
    loading,
})


const SingleChatPageFeedback = Loadable({
    loader: () => import('./containers/commons/SingleChatPageFeedback.js'),
    modules: ['./containers/commons/SingleChatPageFeedback.js'],
    webpack: () => [require.resolveWeak('./containers/commons/SingleChatPageFeedback.js')],
    loading,
})

const categoryTestResults = Loadable({
    loader: () => import('./containers/diagnosis/categoryTestResults.js'),
    modules: ['./containers/diagnosis/categoryTestResults.js'],
    webpack: () => [require.resolveWeak('./containers/diagnosis/categoryTestResults.js')],
    loading,
})

const LensFit = Loadable({
    loader: () => import('./containers/commons/lensFit'),
    modules: ['./containers/commons/lensFit'],
    webpack: () => [require.resolveWeak('./containers/commons/lensFit')],
    loading,
})

const CancelPolicyApp = Loadable({
    loader: () => import('./containers/commons/cancelPolicyApp.js'),
    modules: ['./containers/commons/cancelPolicyApp.js'],
    webpack: () => [require.resolveWeak('./containers/commons/cancelPolicyApp.js')],
    loading,
})

const VipClub = Loadable({
    loader: () => import('./containers/commons/VipClub'),
    modules: ['./containers/commons/VipClub'],
    webpack: () => [require.resolveWeak('./containers/commons/VipClub')],
    loading,
})

const VipClubView= Loadable({
    loader: () => import('./containers/vipClub/VipClub'),
    modules: ['./containers/vipClub/VipClub'],
    webpack: () => [require.resolveWeak('./containers/vipClub/VipClub')],
    loading,
})

const VipClubMemberDetailsView = Loadable({
    loader: () => import('./containers/vipClub/VipClubMemberDetails'),
    modules: ['./containers/vipClub/VipClubMemberDetails'],
    webpack: () => [require.resolveWeak('./containers/vipClub/VipClubMemberDetails')],
    loading,
})

const VipClubActivatedView = Loadable({
    loader: () => import('./containers/vipClub/VipClubActivatedDetails'),
    modules: ['./containers/vipClub/VipClubActivatedDetails'],
    webpack: () => [require.resolveWeak('./containers/vipClub/VipClubActivatedDetails')],
    loading,
})
const VipClubStaticView = Loadable({
    loader: () => import('./containers/vipClub/VipClubStaticView'),
    modules: ['./containers/vipClub/VipClubStaticView'],
    webpack: () => [require.resolveWeak('./containers/vipClub/VipClubStaticView')],
    loading,
})

const PaypalCancellation = Loadable({
    loader: () => import('./components/commons/PaypalCancellation.js'),
    modules: ['./components/commons/PaypalCancellation.js'],
    webpack: () => [require.resolveWeak('./components/commons/PaypalCancellation.js')],
    loading,  
})

const MedlifePolicyApp = Loadable({
    loader: () => import('./containers/commons/medlifePolicyApp.js'),
    modules: ['./containers/commons/medlifePolicyApp.js'],
    webpack: () => [require.resolveWeak('./containers/commons/medlifePolicyApp.js')],
    loading,
})

const CommonTnC = Loadable({
    loader: () => import('./components/commons/commonTnC.js'),
    modules: ['./components/commons/commonTnC.js'],
    webpack: () => [require.resolveWeak('./components/commons/commonTnC.js')],
    loading,  
})

const ChatRatings = Loadable({
    loader: () => import('./components/commons/chatRatings.js'),
    modules: ['./components/commons/chatRatings.js'],
    webpack: () => [require.resolveWeak('./components/commons/chatRatings.js')],
    loading,  
})

const DigitPlans = Loadable({
    loader: () => import('./containers/vipClub/digitInsurance.js'),
    modules: ['./containers/vipClub/digitInsurance.js'],
    webpack: () => [require.resolveWeak('./containers/vipClub/digitInsurance.js')],
    loading,  
})
const DigitForm = Loadable({
    loader: () => import('./containers/vipClub/DigitInsuranceFormPage.js'),
    modules: ['./containers/vipClub/DigitInsuranceFormPage.js'],
    webpack: () => [require.resolveWeak('./containers/vipClub/DigitInsuranceFormPage.js')],
    loading,  
})

const DigitReview = Loadable({
    loader: () => import('./containers/vipClub/DigitSummaryPage.js'),
    modules: ['./containers/vipClub/DigitSummaryPage.js'],
    webpack: () => [require.resolveWeak('./containers/vipClub/DigitSummaryPage.js')],
    loading,  
})
const DigitOrder = Loadable({
    loader: () => import('./containers/vipClub/DigitOrderPage.js'),
    modules: ['./containers/vipClub/DigitOrderPage.js'],
    webpack: () => [require.resolveWeak('./containers/vipClub/DigitOrderPage.js')],
    loading,  
})
const DigitUserRetrieve = Loadable({
    loader: () => import('./containers/vipClub/DigitUserRetrievePage.js'),
    modules: ['./containers/vipClub/DigitUserRetrievePage.js'],
    webpack: () => [require.resolveWeak('./containers/vipClub/DigitUserRetrievePage.js')],
    loading,  
})
/**
 * RENDER_ON_SERVER : true will enable Server-side-rendering  for that route.
 */

let routes = [

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
    { path: '/order-medicine', exact: true, component: OrderMedicine },

    { path: '/opd/searchresults', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/searchresults/location=*', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-sptcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-sptlitcit', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/*-ipddp', exact: true, component: SearchResults, RENDER_ON_SERVER: true },
    { path: '/opd/doctor/:id', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },
    { path: '/*-dpp', exact: true, component: DoctorProfile, RENDER_ON_SERVER: true },

    { path: '/opd/doctor/:id/:clinicId/book', exact: true, component: AppointmentSlot },
    { path: '/opd/doctor/:id/:clinicId/bookdetails', exact: true, component: PatientDetails },

    { path: '/*-dpp/booking', exact: true, component: SeoBooking, RENDER_ON_SERVER: true },

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

    { path: '/*-lpp/booking', exact: true, component: SeoBooking_Lab, RENDER_ON_SERVER: true },

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
    { path: '/tests', exact: true, component: TestsList, RENDER_ON_SERVER: true },
    { path: '/search/testinfo', exact: true, component: searchTestInfo, RENDER_ON_SERVER: true },
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
    { path: '/compare', exact: true, component: Compare },
    { path: '/ipdInfo', exact: true, component: IPDInfo, RENDER_ON_SERVER: true },
    { path: '/*-ipdp', exact: true, component: IPDInfo, RENDER_ON_SERVER: true },
    { path: '/ipd/:id/getPriceEstimate', exact: true, component: IpdForm },
    { path: '/ipd/searchHospitals', exact: true, component: IpdHospitalSearch, RENDER_ON_SERVER: true },
    { path: '/*-ipdhp', exact: true, component: IpdHospitalSearch, RENDER_ON_SERVER: true },
    { path: '/*-hspcit', exact: true, component: IpdHospitalSearch, RENDER_ON_SERVER: true },
    { path: '/*-hsplitcit', exact: true, component: IpdHospitalSearch, RENDER_ON_SERVER: true },
    { path: '/ipd/hospital/:hospitalId', exact: true, component: IpdHospitalDetail, RENDER_ON_SERVER: true },
    { path: '/*-hpp', exact: true, component: IpdHospitalDetail, RENDER_ON_SERVER: true },
    { path: '/ipd/:ipd_id/detail', exact: true, component: IpdDetail },
    { path: '/chat/feedback' , component: ChatFeedback },
    { path: '/package/compare', exact: true, component: PackageCompare },
    { path: '/*-hpcp', exact: true, component: PackageCompare },
    { path: '/ipd-procedures', exact: true, component: IpdList, RENDER_ON_SERVER: true },
    { path: '/order/paymentSummary', exact: true, component: CodPaymentPage },
    { path: '/hospitals', exact: true, component: HospitalList, RENDER_ON_SERVER: true },
    { path: '/Chat/Review', exact: true, component: SingleChatPageFeedback },
    { path: '/categoryTestResults', exact: true, component: categoryTestResults },
    { path: '/*-tpcp', exact: true, component: categoryTestResults },
    { path: '/hospitals/inventory', exact: true, component: HospitalList, RENDER_ON_SERVER: true },
    { path: '/lensfit-tnc', exact:true, component:LensFit,RENDER_ON_SERVER:true },
    { path: '/cancel-policy-app',exact:true, component: CancelPolicyApp},
    { path: '/vip-club', exact:true, component:VipClub,RENDER_ON_SERVER:true },
    { path: '/lensfit', exact:true, component:VipClub,RENDER_ON_SERVER:true },
    { path: '/vip-club-details',exact:true, component: VipClubView},
    { path: '/vip-club-member-details',exact:true, component: VipClubMemberDetailsView},
    { path: '/vip-club-activated-details',exact:true, component: VipClubActivatedView},
    { path: '/vip-club-static-pages', exact:true, component:VipClubStaticView},
    { path: '/terms-conditions-policy-paypal', exact:true, component:PaypalCancellation},
    { path: '/vip-gold-details',exact:true, component: VipClubView},
    { path: '/vip-club-gold-details',exact:true, component: VipClubView},
    { path: '/medlife-tnc-app',exact:true, component: MedlifePolicyApp},
    { path: '/terms-conditions/:id',exact:true, component: CommonTnC },
    { path: '/chat-ratings',exact:true, component: ChatRatings },
    { path: '/covid-plans',exact:true, component: DigitPlans },
    { path: '/covid-form',exact:true, component: DigitForm },
    { path: '/covid-review',exact:true, component:DigitReview},
    { path: '/covid-order/summary/:id',exact:true, component:DigitOrder},
    { path: '/digitinsurances',exact:true, component:DigitUserRetrieve}
]

if (CONFIG.ENABLE_INSURANCE) {
    routes = routes.concat([
        { path: '/insurance1', exact: true, component: InsuranceViewUI },
        { path: '/insurance/insurance-plans', exact: true, component: InsuranceStaticView, RENDER_ON_SERVER: true },
        { path: '/insurance/insurance-plan-view', exact: true, component: InsuranceView, RENDER_ON_SERVER: true },
        { path: '/insurance/insurance-user-details', exact: true, component: InsuranceDetails, RENDER_ON_SERVER: true },
        { path: '/insurance/insurance-endorsement-details', exact: true, component: InsuranceEndorsementDetails, RENDER_ON_SERVER: true },
        { path: '/insurance/insurance-user-details-review', exact: true, component: InsuranceReview, RENDER_ON_SERVER: true },
        { path: '/insurance/complete', exact: true, component: InsuranceSuccess, RENDER_ON_SERVER: true },
        { path: '/insurance/certificate', exact: true, component: InsuranceCertificate, RENDER_ON_SERVER: true },
        { path: '/insurance/cancelpolicy', exact: true, component: InsuranceCancellation, RENDER_ON_SERVER: true },
        { path: '/insurance/canceldetails', exact: true, component: InsuranceBankDetails, RENDER_ON_SERVER: true },
        { path: '/insurance/network', exact: true, component: InsuranceNetwork, RENDER_ON_SERVER: true },
    ])
}

routes.push({ path: '*', component: NotFound, NO_MATCH: true })

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