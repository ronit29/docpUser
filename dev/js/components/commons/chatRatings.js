import React from 'react'
import { connect } from 'react-redux'
//import {  } from '../../../actions/index.js'
const queryString = require('query-string');

class ChatRatingView extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <div className="customer-feedback cf-hght">
                    <div className="cf-card">
                        <div className="cf-body fb-chat-main">
                            <h1 className="fb-main-hdng"> Lab Report Review<br /> Feedback</h1>
                            <p className="fb-main-txt">Your feedback will help us improve services for the thousands of patients visiting us everyday.</p>
                            <h5 className="fb-sub-hdng">Please rate your interaction with the doctor. </h5>
                            <div className="star-rating-cont">
                                <div className="cht-fb-star">
                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/stargold.svg'} />
                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/stargold.svg'} />
                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/stargold.svg'} />
                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/Stargray.svg'} />
                                    <img className="img-fluid" src={ASSETS_BASE_URL + '/img/Stargray.svg'} />
                                    <p className="star-txt-lft">Poor</p>
                                    <p className="star-txt-rht">Excellent</p>
                                </div>
                            </div>
                            <div className="chat-fb-comment">
                                <h3>Any Comments?</h3>
                                <textarea className="fb-textAra"></textarea>
                                <p>Max 200 Character</p>
                            </div>
                        </div>
                        <div className="cf-footer">
                            <button className="fb-btn-sec">
                            Submit
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRatingView)