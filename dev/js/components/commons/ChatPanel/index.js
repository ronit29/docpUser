import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile, setChatRoomId } from '../../../actions/index.js'

import { withRouter } from 'react-router'
import { getChatDoctorById, resetFilters, clearExtraTests, selectLocation, loginViaChat, startLiveChat, toggleDiagnosisCriteria, toggleOPDCriteria, unSetCommonUtmTags, ipdChatView, setPaymentStatus, sendAgentWhatsupPageURL } from '../../../actions/index.js'

import ChatPanelView from './ChatPanel'
import RelatedArticles from '../article/RelatedArticles'
import RecentArticles from '../article/RecentArticles'

class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ssrFlag: this.props.homePage
        }
    }

    componentDidMount() {
        this.setState({ ssrFlag: true })
    }

    render() {
        // let recentArticles = false
        // if (this.props.articleData && this.props.articleData.recent_articles) {
        //     recentArticles = this.props.articleData.recent_articles
        // }
        // let ct_style = this.props.homePage ? "col-md-5 mb-3" : this.props.colClass ? "col-12 col-md-5 mb-3" :this.props.newChatBtnAds ? '' : "col-md-5 mb-3"
        // if (this.props.homePage && !this.props.chatPage)
        //     ct_style = "col-md-5 mb-3 d-none d-md-block"
        // if(this.props.webChatPage)
        //     ct_style = "col-md-7 mb-3 onln-doc-cnslt "
/*      
        if((this.props.USER && this.props.USER.ipd_chat && this.props.USER.ipd_chat.showIpdChat) || (this.props.showHalfScreenChat && !this.props.showDesktopIpd)) {
            ct_style = ''
        }*/
        // if(this.props.showHalfScreenChat) {
        //     ct_style = 'cht-hide-hlf-scrn'
        // }
        return (

            <React.Fragment>
            {/*
            <div className={ct_style}>
                {
                    this.props.articleData ?
                        <div className="related-articles-div">
                            {
                                this.props.articleData.linked.length ?
                                    <div className="related-article-sub">
                                        {
                                            this.props.articleData.linked.map((linkedArticle, i) => {
                                                return <RelatedArticles key={i} linkedArticle={linkedArticle} {...this.props} />
                                            })
                                        }
                                    </div> : ''
                            }
                            {
                                recentArticles && recentArticles.items && recentArticles.items.length ?
                                    <RecentArticles recentArticlesItems={recentArticles.items} recentArticleTitle={recentArticles.title} /> : ''
                            }
                        </div> : ''
                }
                {
                    this.state.ssrFlag && false?
                        <ChatPanelView {...this.props} /> : ''
                }
            </div>
            */}

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, passedProps = {}) => {
    const USER = state.USER
    let DOCTORS = state.DOCTORS
    let doctor_search_data = {}
    let lab_search_data = {}
    let selectedLocation = state.SEARCH_CRITERIA_OPD.selectedLocation

    doctor_search_data.selectedCriterias = state.SEARCH_CRITERIA_OPD.selectedCriterias
    doctor_search_data.selectedLocation = state.SEARCH_CRITERIA_OPD.selectedLocation
    doctor_search_data.filterCriteria = state.SEARCH_CRITERIA_OPD.filterCriteria

    lab_search_data.selectedCriterias = state.SEARCH_CRITERIA_LABS.selectedCriterias
    lab_search_data.selectedLocation = state.SEARCH_CRITERIA_LABS.selectedLocation
    lab_search_data.filterCriteria = state.SEARCH_CRITERIA_LABS.filterCriteria

    return {
        USER, DOCTORS, doctor_search_data, lab_search_data, ...passedProps, selectedLocation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getChatDoctorById: (doctorId, roomId, cb) => dispatch(getChatDoctorById(doctorId, roomId, cb)),
        resetFilters: () => dispatch(resetFilters()),
        clearExtraTests: () => dispatch(clearExtraTests()),
        selectLocation: (location) => dispatch(selectLocation(location)),
        loginViaChat: (token) => dispatch(loginViaChat(token)),
        setChatRoomId: (roomId, extraParams) => dispatch(setChatRoomId(roomId, extraParams)),
        startLiveChat: (started, deleteRoomId) => dispatch(startLiveChat(started, deleteRoomId)),
        toggleDiagnosisCriteria: (type, test, forceAdd, filters) => dispatch(toggleDiagnosisCriteria(type, test, forceAdd, filters)),
        toggleOPDCriteria: (type, test, forceAdd, filters) => dispatch(toggleOPDCriteria(type, test, forceAdd, filters)),
        unSetCommonUtmTags: (type, tags) => dispatch(unSetCommonUtmTags(type, tags)),
        ipdChatView: (data) => dispatch(ipdChatView(data)),
        setPaymentStatus: (status) => dispatch(setPaymentStatus(status)),
        sendAgentWhatsupPageURL: (extraParams, cb) => dispatch(sendAgentWhatsupPageURL(extraParams, cb))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPanel))
