import React from 'react'
import { connect } from 'react-redux'
import SnackBar from 'node-snackbar'

import { submitReportReview } from '../../actions/index.js'
const queryString = require('query-string');


class ChatRatingView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            comment: '',
            selectedNo: 0
        }
    }

    componentDidMount() {

    }

    submit = ()=>{
        const parsed = queryString.parse(this.props.location.search)

        if(!this.state.selectedNo){
            setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please select the rating" });
            }, 500)
            return ;
        }
        // if(!this.state.comment){
        //     setTimeout(() => {
        //         SnackBar.show({ pos: 'bottom-center', text: "Please add some comment" });
        //     }, 500)
        //     return ;
        // }

        let dataParams = {
            ratings: this.state.selectedNo,
            comment: this.state.comment,
            appointment_id: parsed.appointment_id || ''
        }

        this.props.submitReportReview(dataParams, (resp, error)=>{
            if(resp){

                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Feedback Submitted Successfully" });
                    //this.props.history.push('/');
                }, 500);

                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Feedback Submitted Successfully" });
                    this.props.history.push('/');
                }, 500);

            }else if(error){

                setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Please try after sometime" });
                }, 500);

            }

        })

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
                                    <img className="img-fluid cursor-pntr" onClick={ ()=>this.setState({selectedNo: 1}) } src={ASSETS_BASE_URL + `${this.state.selectedNo>=1?'/img/stargold.svg':'/img/Stargray.svg'}`} />
                                    <img className="img-fluid cursor-pntr" onClick={ ()=>this.setState({selectedNo: 2}) } src={ASSETS_BASE_URL + `${this.state.selectedNo>=2?'/img/stargold.svg':'/img/Stargray.svg'}`} />
                                    <img className="img-fluid cursor-pntr" onClick={ ()=>this.setState({selectedNo: 3}) } src={ASSETS_BASE_URL + `${this.state.selectedNo>=3?'/img/stargold.svg':'/img/Stargray.svg'}`} />
                                    <img className="img-fluid cursor-pntr" onClick={ ()=>this.setState({selectedNo: 4}) } src={ASSETS_BASE_URL + `${this.state.selectedNo>=4?'/img/stargold.svg':'/img/Stargray.svg'}`} />
                                    <img className="img-fluid cursor-pntr" onClick={ ()=>this.setState({selectedNo: 5}) } src={ASSETS_BASE_URL + `${this.state.selectedNo>=5?'/img/stargold.svg':'/img/Stargray.svg'}`} />
                                    <p className="star-txt-lft">Poor</p>
                                    <p className="star-txt-rht">Excellent</p>
                                </div>
                            </div>
                            <div className="chat-fb-comment">
                                <h3>Any Comments?</h3>
                                <textarea className="fb-textAra" onChange={ (e)=>this.setState({comment: e.target.value}) }>{this.state.comment}</textarea>
                                <p>Max 200 Character</p>
                            </div>
                        </div>
                        <div className="cf-footer">
                            <button className="fb-btn-sec" onClick={this.submit}>
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
        submitReportReview: (dataParams, cb)=>dispatch(submitReportReview(dataParams, cb))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRatingView)