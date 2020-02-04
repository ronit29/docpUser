import React from 'react';
import ProfileHeader from '../../DesktopProfileHeader'
import LeftBar from '../../LeftBar'
import RightBar from '../../RightBar'
import Footer from '../../Home/footer'
import MyReviewCard from '../../ratingsProfileView/MyReviewCard.js';
const queryString = require('query-string');
import Disclaimer from '../../Home/staticDisclaimer.js'

class UserReview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            compliments: [],
            sms_id: null,
            footerData: null
        }
    }

    static contextTypes = {
        router: () => null
    }

    performLoginOps = () => {
        this.props.getRatingCompliments((err, compliments) => {// get user ratings
            if (!err && compliments) {
                this.setState({ compliments })
            }
        })
        this.props.getUserReviews((err, data) => {
            if (!err && data) {
                this.setState({ data })
            }
        })
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
        const parsed = queryString.parse(this.props.location.search)
        let sms_token = parsed.token ? parsed.token : null;
        let sms_id = parsed.id ? parsed.id : null;
        let user_id = parsed.user_id ? parsed.user_id : null;

        if (sms_token) {
            this.props.OTTLogin(sms_token,user_id).then((order_id) => {
                this.setState({ sms_id })
                this.performLoginOps()
            })
        } else {
            this.performLoginOps()
        }

    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="rev-txt">Your Reviews</h2>
                                        {this.state.data ? this.state.data.map(rating => <MyReviewCard {...this.props} sms_id={this.state.sms_id} details={rating} comp={this.state.compliments} key={rating.id} />) : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RightBar />
                    </div>
                </section>
                <Disclaimer />
                <Footer footerData={this.state.footerData} />
            </div>
        );
    }
}


export default UserReview
