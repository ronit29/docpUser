import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'


const DUMMY_HTML = `
<div class="profile-body-wrap">
		<header class="profile-header" style="display: block;">
			<div class="smiley-img-div">
				<img src="img/customer-icons/smiley.png">
			</div>
			<div class="container">
				<div class="row header-row">
					<div class="col-12 text-center logo-icon-div">
						<a href="javascript:;"><img src="img/doc-prime-logo.png" class="logo-icon"></a>
					</div>
				</div>
			</div>
		</header>
		<div class="subheader"></div>
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-10 offset-md-1">
					<div class="error-widget text-center">
						<p class="error-head fw-500">404</p>
						<img src="img/icons/error.png">
						<p class="error-text fw-500">Page not found !</p>
						<p class="error-link">Go to <a href="javascript:;">docprime homepage</a></p>
					</div>
				</div>
			</div>
		</div>
	</div>
`


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
                                    <div dangerouslySetInnerHTML={{ __html: this.state.articleData.body }}>
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
