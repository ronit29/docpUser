import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../Home/footer'
import GTM from '../../../helpers/gtm'
import InitialsPicture from '../initialsPicture';
import STORAGE from '../../../helpers/storage';
import CommentBox from './ArticleCommentBox.js'
import SnackBar from 'node-snackbar'
import Reply from './Reply.js'
import BannerCarousel from '../Home/bannerCarousel';
import ArticleAuthor from '../articleAuthor/articleAuthor';
import LocationElements from '../../../containers/commons/locationElements'
import CommonSearch from '../../../containers/commons/CommonSearch.js'
import FixedMobileFooter from '../Home/FixedMobileFooter'
import FooterTestSpecializationWidgets from './FooterTestSpecializationWidgets.js'
// import RelatedArticles from './RelatedArticles'

class Article extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null

        let articleData = null
        let articleLoaded = false

        if (this.props.initialServerData) {
            articleData = this.props.initialServerData.articleData
            articleLoaded = true
        }

        let articleId = this.props.match.url
        articleId = articleId.toLowerCase().substring(1, articleId.length)
        if (this.props.articleData && this.props.articleData[articleId]) {
            articleData = this.props.articleData[articleId]
            articleLoaded = true
        }

        this.state = {
            articleData: articleData,
            replyOpenFor: null,
            comment: '',
            articleLoaded: articleLoaded,
            searchCities: [],
            searchWidget: '',
            specialization_id: '',
            hideFooterWidget: true
        }
    }

    componentDidMount() {
        if (!this.state.articleData) {
            this.getArticleData()
        }
        if (window) {
            window.scrollTo(0, 0)
        }
        if (this.props.match.path.split('-')[1] === 'mddp') {
            let selectedLocation = ''
            let lat = 28.644800
            let long = 77.216721
            if (this.props.selectedLocation) {
                selectedLocation = this.props.selectedLocation;
                lat = selectedLocation.geometry.location.lat
                long = selectedLocation.geometry.location.lng
                if (typeof lat === 'function') lat = lat()
                if (typeof long === 'function') long = long()
            }

            this.props.getOfferList(lat, long);
        }
        this.setState({hideFooterWidget: false})

    }

    getArticleData() {
        let articleId = this.props.match.url
        if (articleId) {
            articleId = articleId.toLowerCase().substring(1, articleId.length)
            this.props.fetchArticle(articleId, this.props.location.search.includes('preview'), (err, data) => {
                if (!err /*&& !this.state.articleData*/) {
                    this.setState({ articleData: data, articleLoaded: true, replyOpenFor: '' })
                } else {

                }
            })
        }
    }

    onHomeClick(event, link) {
        event.preventDefault();
        this.props.history.push(link);
    }

    facebookClick() {
        if (window) {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
        }
    }

    twitterClick() {
        if (window) {
            window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
        }
    }

    linkedinClick() {
        if (window) {
            window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${document.URL}&title=${this.state.articleData.title.split('|')[0]}&source=docprime.com`);
        }
    }

    whatsappClick() {
        if (window) {
            window.open(`https://wa.me/?text=${document.URL}`);
        }
    }

    commentReplyClicked(id) {
        this.setState({ replyOpenFor: id })
    }

    postReply(e) {
        e.preventDefault()
        if (!this.state.comment) {
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please write valid comment" })
            }, 500)
            return
        }
        let postData = {
            article: this.state.articleData.id,
            comment: this.state.comment,
            name: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile] ? this.props.profiles[this.props.defaultProfile].name : '',
            email: Object.values(this.props.profiles).length && this.props.profiles[this.props.defaultProfile] ? this.props.profiles[this.props.defaultProfile].email : '',
            parent: this.state.replyOpenFor
        }
        this.props.postComment(postData, (error, data) => {
            if (data) {
                this.setState({ comment: '' })
                this.getArticleData()
                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Comment Posted Sucessfully, Awaiting moderation" })
                }, 500)
            } else {
                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Could not post your comment, Try again!" })
                }, 500)
            }
        })
        return
    }

    handleInputComment(e) {
        this.setState({ comment: e.target.value })
    }

    getCityList(key) {

        return this.state.searchCities.length > 0 && this.state.searchWidget == key ?
            <section>
                <div className="widget mb-10">
                    <div className="common-search-container">
                        <p className="srch-heading">Location Search</p>
                        <div className="common-listing-cont">
                            <ul>
                                {
                                    this.state.searchCities.map((result, i) => {
                                        return <li key={i}>
                                            <p className="" onClick={this.selectLocation.bind(this, result)}>{result.description}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section> : ''

    }

    getCityListLayout(searchResults = [], searchParams = {}) {
        let specialization_id = ''
        let searchWidget = ''
        if (searchParams && Object.values(searchParams).length) {
            specialization_id = searchParams.specialityId
            searchWidget = searchParams.widgetId
        }
        if (searchResults.length) {
            this.setState({ searchCities: searchResults, searchWidget: searchWidget, specialization_id: specialization_id })
        } else {
            this.setState({ searchCities: [], searchWidget: searchWidget, specialization_id: specialization_id })
        }
    }

    selectLocation(city) {
        this.child.selectLocation((city), () => {

            this.setState({ searchCities: [] })
            let gtmData = {
                'Category': 'ConsumerApp', 'Action': 'ArticlePageLocationSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'article-page-location-selected', selectedId: this.state.specialization_id || ''
            }
            GTM.sendEvent({ data: gtmData })

            if (this.state.specialization_id) {

                let criteria = {}
                criteria.id = this.state.specialization_id
                criteria.name = ''
                criteria.type = 'speciality'
                this.props.cloneCommonSelectedCriterias(criteria)
                this.props.history.push(`/opd/searchresults`)
            }

        })
    }

    handleClose(){
        this.setState({hideFooterWidget: true})
    }

    render() {

        let isUserLogin = Object.values(this.props.profiles).length || STORAGE.checkAuth()
        let commentsExists = this.state.articleData && this.state.articleData.comments.length ? this.state.articleData.comments.length : null

        let locationName = ""
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            locationName = this.props.selectedLocation.formatted_address
        }

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container article-container">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-8 center-column">
                            {
                                this.state.articleData ? <div className="container-fluid article-column">

                                    <HelmetTags tagsData={{
                                        title: (this.state.articleData.seo ? this.state.articleData.seo.title : ""),
                                        description: (this.state.articleData.seo ? this.state.articleData.seo.description : ""),
                                        keywords: (this.state.articleData.seo ? this.state.articleData.seo.keywords : ""),
                                        canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`,
                                        schema: this.state.articleData.title === 'Blood Pressure | Causes, Treatment, Tests & Vaccines' ?
                                            {
                                                "@context": "http://schema.org",
                                                "@type": "MedicalCondition",
                                                "alternateName": "Blood Pressure",
                                                "associatedAnatomy": {
                                                    "@type": "AnatomicalStructure",
                                                    "name": "heart"
                                                },
                                                "cause": [
                                                    {
                                                        "@type": "MedicalCause",
                                                        "name": "Smoking, Stress,Genetics,Heart arrhythmias,Blood vessel dilation,Heat stroke, Pregnancy,Liver Disease"
                                                    }
                                                ],
                                                "code": {
                                                    "@type": "MedicalCode",
                                                    "code": "401",
                                                    "codingSystem": "ICD-9-CM"
                                                },
                                                "differentialDiagnosis": {
                                                    "@type": "DDxElement",
                                                    "diagnosis": {
                                                        "@type": "MedicalCondition",
                                                        "name": "Low Blood Pressure & High Blood Presure"
                                                    },
                                                    "distinguishingSign": [
                                                        {
                                                            "@type": "MedicalSymptom",
                                                            "name": "Severe headache,Fatigue,Mental Confusion,Pain in chest, Mental Confusion,Pale, damp, cold skin,Breathing difficulties, Weak Pulses"
                                                        }
                                                    ]
                                                },
                                                "name": "High & Low Blood Pressure",
                                                "possibleTreatment": [
                                                    {
                                                        "@type": "drug",
                                                        "name": "Consult Doctor"
                                                    }
                                                ],
                                                "riskFactor": [
                                                    {
                                                        "@type": "MedicalRiskFactor",
                                                        "name": "Age,Gender, Smoking, Total cholesterol"
                                                    }
                                                ],
                                                "secondaryPrevention": [
                                                    {
                                                        "@type": "LifestyleModification",
                                                        "name": "stopping smoking,weight management,increased physical activity"
                                                    }
                                                ],
                                                "signOrSymptom": [
                                                    {
                                                        "@type": "MedicalSymptom",
                                                        "name": "Light-headedness or wooziness, Fainting, Nausea, Exhaustion"
                                                    }
                                                ]
                                            } : ''
                                    }} />

                                    {
                                        this.props.match.path.split('-')[1] === 'mddp' && this.props.offerList && this.props.offerList.filter(x => x.slider_location === 'medicine_detail_page').length ?
                                            <BannerCarousel {...this.props} sliderLocation="medicine_detail_page" /> : ''
                                    }

                                    <ul className="mrb-10 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
                                        <li className="breadcrumb-list-item">
                                            <a href="/" onClick={(e) => this.onHomeClick(e, "/")}>
                                                <span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span>
                                            </a>
                                            <span className="breadcrumb-arrow">&gt;</span>
                                        </li>
                                        <li className="breadcrumb-list-item">
                                            <a href={`/${this.state.articleData.category.url}`} onClick={(e) => this.onHomeClick(e, `/${this.state.articleData.category.url}`)}>
                                                <span className="fw-500 breadcrumb-title breadcrumb-colored-title">{this.state.articleData.category.name}</span>
                                            </a>
                                            <span className="breadcrumb-arrow">&gt;</span>
                                        </li>
                                        <li className="breadcrumb-list-item">
                                            {
                                                this.props.match.path.split('-')[1] === 'nmdp' ?
                                                    <h2 className="fw-500 breadcrumb-title">{this.state.articleData.heading_title}</h2>
                                                    : <h2 className="fw-500 breadcrumb-title">{this.state.articleData.title.split('|')[0]}</h2>
                                            }
                                        </li>
                                    </ul>

                                    <div className="art-sharing-div mrt-20 mrb-20">
                                        <div className="art-sharing-btn mr-3" onClick={() => this.facebookClick()} >
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/facebook.svg"} />
                                        </div>
                                        <div className="art-sharing-btn ml-3 mr-3" onClick={() => this.twitterClick()}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/twitter.svg"} />
                                        </div>
                                        <div className="art-sharing-btn ml-3 mr-3" onClick={() => this.linkedinClick()}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/linkedin.svg"} />
                                        </div>
                                        <div className="art-sharing-btn ml-3" onClick={() => this.whatsappClick()}>
                                            <img src={ASSETS_BASE_URL + "/img/customer-icons/whatsapp.svg"} />
                                        </div>
                                    </div>

                                    {
                                        this.state.articleData.header_image ?
                                            <div>
                                                <img style={{ width: '100%', paddingBottom: '4px' }} src={this.state.articleData.header_image} alt={this.state.articleData.header_image_alt} />
                                            </div> : ""
                                    }

                                    {
                                        this.state.articleData && this.state.articleData.heading_title ? <div className="dp-article-heading mrb-20">
                                            <h1 className="fw-500">{this.state.articleData.heading_title}</h1>
                                        </div> : ""
                                    }

                                    {
                                        this.state.articleData && this.state.articleData.author ?
                                            <ArticleAuthor
                                                name={this.state.articleData.author.name}
                                                profileImage={this.state.articleData.author.profile_img}
                                                url={this.state.articleData.author.url}
                                                id={this.state.articleData.author.id}
                                                speciality={this.state.articleData.author.speciality[0].name}
                                                experience={this.state.articleData.author.experience}
                                                publishedDate={this.state.articleData.published_date}
                                                history={this.props.history}
                                            /> : ''
                                    }

                                    {
                                        this.state.articleData && this.state.articleData.body_doms && this.state.articleData.body_doms.map((val, key) => {

                                            if (val.type.includes('html')) {
                                                return <div key={key} className="docprime-article" dangerouslySetInnerHTML={{ __html: val.content }}>
                                                </div>
                                            } else if (val.type.includes('search_widget')) {
                                                return <div key={key} className="sticky-article-div">
                                                    {
                                                        val.content.lat && val.content.lng && val.content.location_name ?
                                                            <CommonSearch {...this.props} location={val.content.location_name} latitude={val.content.lat} longitude={val.content.lng} />
                                                            : val.content.specialization_id ?
                                                                <div>
                                                                    <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' locationName={locationName} articleSearchPage={true} specialityName={val.content.specialization_name} specialityId={val.content.specialization_id} widgetId={key} />
                                                                    {this.getCityList(key)}
                                                                </div>
                                                                : <div>
                                                                    <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' locationName='' widgetId={key} commonSearch={true} articleSearchPage={true} />
                                                                    {this.getCityList(key)}
                                                                    <CommonSearch {...this.props} commonSearch={true} />
                                                                </div>
                                                    }
                                                </div>

                                            }

                                        })
                                    }

                                    { /*<div className="docprime-article" dangerouslySetInnerHTML={{ __html: this.state.articleData.body }}>
                                    </div>*/}
                                    {
                                        this.state.articleData && this.state.articleData.last_updated_at ?
                                            <div className="last-updated text-right">
                                                <span>Last updated on : {this.state.articleData.last_updated_at}</span>
                                            </div> : ''
                                    }
                                    {
                                        this.props.match.path.split('-')[1] === 'mddp' ?
                                            <div className="mrt-20">
                                                <p className="article-disclaimer"><span className="fw-700">Disclaimer : </span>Docprime doesn’t endorse or take any guarantee of the accuracy or completeness of information provided on its website. Docprime shall not be held responsible for any aspect of healthcare administered with the information provided on its website.</p>
                                            </div> : ''
                                    }
                                </div> : ""
                            }
                            {
                                this.state.articleData && this.state.articleData.footer_widget && false?
                                    this.state.hideFooterWidget?''
                                    :<FooterTestSpecializationWidgets {...this.props} footerWidget={this.state.articleData.footer_widget} handleClose={this.handleClose.bind(this)}/>
                                :''
                            }
                            
                        </div>
                        <RightBar colClass="col-lg-4" articleData={this.state.articleData} />
                    </div>

                    <div className="row">
                        {
                            this.state.articleLoaded ?
                                this.state.articleData && this.state.articleData.comments && this.state.articleData.comments.length ?
                                    <div className="col-12 col-md-7 col-lg-8 center-column">
                                        <h4 className="comments-main-heading">{`User Comments (${this.state.articleData.comments.length})`}</h4>
                                        {
                                            this.state.articleData.comments.map((comment, key) => {
                                                return <Reply key={comment.id} commentReplyClicked={this.commentReplyClicked.bind(this)} isUserLogin={isUserLogin} {...this.props} {...this.state} getArticleData={this.getArticleData.bind(this)} postReply={this.postReply.bind(this)} handleInputComment={this.handleInputComment.bind(this)} commentData={comment} commentsExists={commentsExists} articlePage={true}/>
                                            })}
                                    </div>
                                    : ''
                                : ''
                        }

                        {
                            this.state.articleLoaded ?
                                <div className="col-12 col-md-7 col-lg-8 center-column">
                                    <div className="widget mrb-15 mrng-top-12">
                                        <div className="widget-content">
                                            <CommentBox {...this.props} {...this.state} getArticleData={this.getArticleData.bind(this)} commentsExists={commentsExists} parentCommentId={this.state.replyOpenFor} articlePage={true}/>
                                        </div>
                                    </div>
                                </div>
                                : ''
                        }
                    </div>
{/*
                    <FixedMobileFooter {...this.props} />*/}
                </section>
                <Footer />
            </div>
        );
    }
}

export default Article