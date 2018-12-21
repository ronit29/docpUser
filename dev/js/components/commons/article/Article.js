import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../Home/footer'
import GTM from '../../../helpers/gtm'
import InitialsPicture from '../initialsPicture';
// import RelatedArticles from './RelatedArticles'

class Article extends React.Component {
    constructor(props) {
        super(props)
        let footerData = null
        let articleData = null
        if (this.props.initialServerData) {
            articleData = this.props.initialServerData.articleData
        }
        this.state = {
            articleData: articleData,
            medicineURL: false,
        }
    }

    componentDidMount() {
        let articleId = this.props.match.url
        if (articleId) {
            articleId = articleId.toLowerCase().substring(1, articleId.length)
            this.props.fetchArticle(articleId, this.props.location.search.includes('preview'), (err, data) => {
                if (!err && !this.state.articleData) {
                    this.setState({ articleData: data })
                } else {

                }
            })
        }

        if (window) {
            window.scrollTo(0, 0)
        }

        if (this.props.match.path.split('-')[1] === 'mddp') {
            // this.setState({ medicineURL: true });
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

    authorClick() {
        if (this.state.articleData.author.url) {
            this.props.history.push(this.state.articleData.author.url)
        } else {
            this.props.history.push(`/opd/doctor/${this.state.articleData.author.id}`)
        }
    }

    render() {
        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container article-container">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-8 center-column">

                            {/* <header className="wallet-header article-header sticky-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2">
                                            <img src={ASSETS_BASE_URL + "/img/icons/back-orange.svg"} className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-8 logo-col">
                                            <p className="wallet-title fw-500">{this.state.articleData ? this.state.articleData.title : "Article"}</p>
                                        </div>
                                    </div>
                                </div>
                            </header> */}
                            {
                                this.state.articleData ? <div className="container-fluid article-column">

                                    <HelmetTags tagsData={{
                                        title: (this.state.articleData.seo ? this.state.articleData.seo.title : ""),
                                        description: (this.state.articleData.seo ? this.state.articleData.seo.description : ""),
                                        keywords: (this.state.articleData.seo ? this.state.articleData.seo.keywords : ""),
                                        canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                                    }} />

                                    {/* <div itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="mrb-20" style={{ wordBreak: 'break-word' }}>
                                        <a href="/" onClick={(e) => this.onHomeClick(e, "/")} itemProp="url"><span itemProp="title" className="fw-500 breadcrumb-title breadcrumb-colored-title">Ask a Doctor</span></a>
                                        <span className="breadcrumb-arrow">&gt;</span>
                                        <div itemProp="child" itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="breadcrumb-link-div">
                                            <a href={`/${this.state.articleData.category.url}`} onClick={(e) => this.onHomeClick(e, `/${this.state.articleData.category.url}`)} itemProp="url"><span itemProp="title" className="fw-500 breadcrumb-title breadcrumb-colored-title">{this.state.articleData.category.name}</span></a>
                                        </div>
                                        <span className="breadcrumb-arrow">&gt;</span>
                                        <div itemProp="child" itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="breadcrumb-link-div">
                                            <span itemProp="title" className="fw-500 breadcrumb-title">{this.state.articleData.title.split('|')[0]}</span>
                                        </div>
                                    </div> */}

                                    <ul className="mrb-10 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
                                        <li className="breadcrumb-list-item">
                                            <a href="/" onClick={(e) => this.onHomeClick(e, "/")}>
                                                <span className="fw-500 breadcrumb-title breadcrumb-colored-title">Ask a Doctor</span>
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
                                            <span className="fw-500 breadcrumb-title">{this.state.articleData.title.split('|')[0]}</span>
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

                                    {/* {
                                        this.state.medicineURL ?
                                            <div className="mrt-20 mrb-10 article-chat-div d-md-none">
                                                <p className="fw-500">Ask a doctor about {this.state.articleData.title.split('|')[0]} and any related queries.</p>
                                                <button onClick={() => {
                                                    let analyticData = {
                                                        'Category': 'ChatNow', 'Action': 'ChatNow Click', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'chat-now'
                                                    }
                                                    GTM.sendEvent({ data: analyticData })
                                                    this.props.history.push('/mobileviewchat')
                                                }} >Chat Now</button>
                                            </div> : ''
                                    } */}

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
                                            <div className="article-author-div mrb-20" onClick={() => this.authorClick()}>
                                                <InitialsPicture className="initialsPicture-ds initialsPicture-author" name={this.state.articleData.author.name} has_image={!!this.state.articleData.author.profile_img} >
                                                    <img className="fltr-usr-image img-round" src={this.state.articleData.author.profile_img} alt={this.state.articleData.author.name} title={this.state.articleData.author.name} />
                                                </InitialsPicture>
                                                <div className="author-dtls">
                                                    <div className="author-name-div">
                                                        <h3 className="fw-500 text-primary">{this.state.articleData.author.name}</h3>
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
                                </div> : ""
                            }
                        </div>
                        <RightBar colClass="col-lg-4" articleData={this.state.articleData} />
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default Article