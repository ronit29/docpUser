import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'


class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleData: null
        }
    }

    componentDidMount() {
        let articleId = this.props.match.params.id
        this.props.fetchArticle(articleId, (err, data) => {
            if (!err) {
                this.setState({ articleData: data })
            } else {
                
            }
        })
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column transaction-column">

                            <header className="wallet-header sticky-header">
                                <div className="container-fluid header-container">
                                    <div className="row header-row">
                                        <div className="col-2">
                                            <img src="/assets/img/icons/back-orange.svg" className="back-icon-orange" onClick={() => {
                                                this.props.history.go(-1)
                                            }} />
                                        </div>
                                        <div className="col-8 logo-col">
                                            <p className="wallet-title fw-500">{this.state.articleData ? this.state.articleData.title : "Article"}</p>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {
                                this.state.articleData ? <div className="container-fluid">
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
