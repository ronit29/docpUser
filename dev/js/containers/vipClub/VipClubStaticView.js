import React from 'react'
import { connect } from 'react-redux'

import { } from '../../actions/index.js'
// import VipClubView from '../../components/vipClub/vipClubView.js'
// import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClubStaticView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

        if (STORAGE.checkAuth()) {
            // this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container container-top-margin">
                    <div className="row main-row parent-section-row">
                        <div className="col-12">
                            <div className="container-fluid vip-new-container">
                                <div className="widget mrb-15 mrng-top-12">
                                    <div className="fnl-vip-cont">
                                        <img src={ASSETS_BASE_URL + '/img/dp-vip.png'} />
                                        <p className="mn-para">Your request for Docprime VIP has been <br/>submitted successfully</p>
                                        <p className="sb-para">Our team will contact you soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(VipClubStaticView)