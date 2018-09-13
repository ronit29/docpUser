import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import HelmetTags from '../../commons/HelmetTags'

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleData: props.initialServerData
        }
    }

    componentDidMount() {
        let articleId = this.props.match.url
        if (articleId) {
            articleId = articleId.substring(1, articleId.length)
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
    }

    onHomeClick(event, link) {
        event.preventDefault();
        this.props.history.push(link);
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">

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
                                this.state.articleData ? <div className="container-fluid transaction-column" style={{ paddingTop: 20 }} >

                                    <HelmetTags tagsData={{
                                        title: (this.state.articleData.seo ? this.state.articleData.seo.title : ""),
                                        description: (this.state.articleData.seo ? this.state.articleData.seo.description : ""),
                                        keywords: (this.state.articleData.seo ? this.state.articleData.seo.keywords : "")
                                    }} />

                                    <div itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="mrb-20" style={{ wordBreak: 'break-word' }}>
                                        <a href="/" onClick={(e)=>this.onHomeClick(e, "/")} itemProp="url"><span itemProp="title" className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span></a>
                                        <span className="breadcrumb-arrow">&gt;</span>
                                        <div itemProp="child" itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="breadcrumb-link-div">
                                            <a href={`/${this.state.articleData.category.url}`} onClick={(e)=>this.onHomeClick(e, `/${this.state.articleData.category.url}`)} itemProp="url"><span itemProp="title" className="fw-500 breadcrumb-title breadcrumb-colored-title">{this.state.articleData.category.name}</span></a>
                                        </div>
                                        <span className="breadcrumb-arrow">&gt;</span>
                                        <div itemProp="child" itemScope itemType="http://data-vocabulary.org/Breadcrumb" className="breadcrumb-link-div">
                                            <span itemProp="title" className="fw-500 breadcrumb-title">{this.state.articleData.title}</span>
                                        </div>
                                    </div>

                                    <div><img style={{ width: '100%', paddingBottom: '4px' }} src={this.state.articleData.header_image} /></div>
                                    <div className="docprime-article" dangerouslySetInnerHTML={{ __html: this.state.articleData.body }}>
                                    </div>
                                </div> : ""
                            }
                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default Article
