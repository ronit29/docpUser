import React from 'react'
import ProfileHeader from '../DesktopProfileHeader';
import Footer from '../Home/footer';
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'

class DoctorsNearMeView extends React.Component {

    constructor(props) {
        super(props)

        var title = this.props.match.url.toLowerCase();
        title = title.substring(1, title.length)

        this.state = {
            title: title
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        this.props.getArticleList(this.state.title, 1, true);
    }

    render() {
        return (
            <div className="profile-body-wrap sitemap-body">
                <ProfileHeader />
                <section className="container dp-container-div">
                    <div className="row main-row parent-section-row">
                        {
                            this.props.ARTICLE_LOADED ? <HelmetTags tagsData={{
                                title: (this.props.articleListData.seo ? this.props.articleListData.seo.title : ""),
                                description: (this.props.articleListData.seo ? this.props.articleListData.seo.description : ""),
                                canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}${this.props.location.search}`
                            }} /> : null
                        }
                        <div className="col-12 mrng-top-12">
                            <ul className="mrb-10 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
                                <li className="breadcrumb-list-item">
                                    <a href="/" onClick={(e) => this.onHomeClick(e, "/")}>
                                        <span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span>
                                    </a>
                                </li>
                                <span className="breadcrumb-arrow">&gt;</span>
                                <li className="breadcrumb-list-item">
                                    <span className="fw-500 breadcrumb-title">{this.props.articleListData.category}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <div className="fw-500 sitemap-title mrt-20">{this.props.articleListData.category}</div>
                            <div className="row sitemap-row">
                                {
                                    this.props.articleList.length ?
                                        this.props.articleList.map((property, index) => {
                                            return <div className="col-12 col-md-6 col-lg-4">
                                                <div className="anchor-data-style">
                                                    <a href={`/${property.url}`} onClick={
                                                        (e) => {
                                                            e.preventDefault();
                                                            this.props.history.push(`/${property.url}`);
                                                        }
                                                    }>{property.title}</a>
                                                    <span className="sitemap-right-arrow">
                                                        <img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} />
                                                    </span>
                                                </div>
                                            </div>
                                        })
                                        : <p className="fw-500 text-center" style={{ fontSize: 20 }} >No Article Found !!</p>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default DoctorsNearMeView