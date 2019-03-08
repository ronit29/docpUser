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
        this.state = {
            articleData: articleData,
            medicineURL: false,
            replyOpenFor: null,
            comment: '',
            articleLoaded: articleLoaded
        }
    }

    componentDidMount() {
        this.getArticleData()
        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.props.match.path.split('-')[1] === 'mddp') {
            // this.setState({ medicineURL: true });
        }

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

    authorClick(e) {
        e.preventDefault()
        if (this.state.articleData.author.url) {
            this.props.history.push(this.state.articleData.author.url)
        } else {
            this.props.history.push(`/opd/doctor/${this.state.articleData.author.id}`)
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

    render() {

        let isUserLogin = Object.values(this.props.profiles).length || STORAGE.checkAuth()
        let commentsExists = this.state.articleData && this.state.articleData.comments.length ? this.state.articleData.comments.length : null

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
                                            <div className="article-author-div mrb-20">
                                                <InitialsPicture className="initialsPicture-ds initialsPicture-author" name={this.state.articleData.author.name} has_image={!!this.state.articleData.author.profile_img} >
                                                    <img className="fltr-usr-image img-round" src={this.state.articleData.author.profile_img} alt={`Dr. ${this.state.articleData.author.name}`} title={`Dr. ${this.state.articleData.author.name}`} />
                                                </InitialsPicture>
                                                <div className="author-dtls">
                                                    <div className="author-name-div">
                                                        <span style={{ margin: '0 6px 0 0' }}>Written By :</span>
                                                        {
                                                            this.state.articleData.author.url ?
                                                                <a href={`/${this.state.articleData.author.url}`} onClick={(e) => this.authorClick(e)}>
                                                                    <h3 className="fw-500 text-primary">{`Dr. ${this.state.articleData.author.name}`}</h3>
                                                                </a> :
                                                                <a href={`/opd/doctor/${this.state.articleData.author.id}`} onClick={(e) => this.authorClick(e)}>
                                                                    <h3 className="fw-500 text-primary">{`Dr. ${this.state.articleData.author.name}`}</h3>
                                                                </a>
                                                        }
                                                    </div>
                                                    <div className="author-exp-div">
                                                        <span>{this.state.articleData.author.speciality[0].name} | {this.state.articleData.author.experience} years of experience</span>
                                                    </div>
                                                    <div className="article-date">
                                                        <span>Published Date : {this.state.articleData.published_date}</span>
                                                    </div>
                                                </div>
                                            </div> : ''
                                    }

                                    <div className="docprime-article" dangerouslySetInnerHTML={{ __html: this.state.articleData.body }}>
                                    </div>
                                    {
                                        this.state.articleData && this.state.articleData.last_updated_at ?
                                            <div className="last-updated text-right">
                                                <span>Last updated on : {this.state.articleData.last_updated_at}</span>
                                            </div> : ''
                                    }
                                    {/* DISCOUNT WIDGET CODE BELOW */}
                                    {/* {
                                        this.props.match.path.split('-')[1] === 'mddp' ?
                                            <div className="fixed horizontal bottom no-round fw-500 sticky-btn d-flex align-items-center justify-content-around discount-widget" onClick={() => this.props.history.push('/opd/searchresults')}>
                                                <div className="dw-info">
                                                    <p className="fw-700" style={{ fontSize: 18 }}>Trouble with Health ?</p>
                                                    <p className="fw-500" style={{ fontSize: 14 }}>Book doctor appointments</p>
                                                    <p className="fw-500" style={{ fontSize: 14 }}>@ upto <span className="fw-700">50% off</span></p>
                                                </div>
                                                <div className="dw-book-btn text-center">
                                                    <p className="fw-500">Book Now</p>
                                                </div>
                                            </div> : ''
                                    } */}
                                </div> : ""
                            }
                        </div>
                        <RightBar colClass="col-lg-4" articleData={this.state.articleData} />
                    </div>

                    <div className="row">
                        {
                            this.state.articleLoaded && this.props.match.path.split('-')[1] != 'nmdp' ?
                                this.state.articleData && this.state.articleData.comments && this.state.articleData.comments.length ?
                                    <div className="col-12 col-md-7 col-lg-8 center-column">
                                        <h4 className="comments-main-heading">{`User Comments (${this.state.articleData.comments.length})`}</h4>
                                        {
                                            this.state.articleData.comments.map((comment, key) => {
                                                return <Reply key={comment.id} commentReplyClicked={this.commentReplyClicked.bind(this)} isUserLogin={isUserLogin} {...this.props} {...this.state} getArticleData={this.getArticleData.bind(this)} postReply={this.postReply.bind(this)} handleInputComment={this.handleInputComment.bind(this)} commentData={comment} commentsExists={commentsExists} />
                                            })}
                                    </div>
                                    : ''
                                : ''
                        }

                        {
                            this.state.articleLoaded && this.props.match.path.split('-')[1] != 'nmdp' ?
                            <div className="col-12 col-md-7 col-lg-8 center-column">
                                <div className="widget mrb-15 mrng-top-12">
                                    <div className="widget-content">
                                        <CommentBox {...this.props} {...this.state} getArticleData={this.getArticleData.bind(this)} commentsExists={commentsExists} parentCommentId={this.state.replyOpenFor} />
                                    </div>
                                </div>
                            </div>
                            :''
                        }
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Article