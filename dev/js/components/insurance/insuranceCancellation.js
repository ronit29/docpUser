import React from 'react'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import ChatPanel from '../../components/commons/ChatPanel'
import Loader from '../commons/Loader'

class InsuranceCancellationView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showCancelPopup:false
		}
	}

	getGetOrdinal(n) {
   	var s=["th","st","nd","rd"],
       	v=n%100;
   		return n+(s[(v-20)%10]||s[v]||s[0]);
	}

	cancelPolicy(){
		this.setState({showCancelPopup:true})
	}

	clickPopUp(type){
		if(type  ==1){
			this.props.cancelInsurance()
		}else{
			this.setState({showCancelPopup:false})
		}
	}

	render() {
		if (1) {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				{this.state.showCancelPopup?
					<div className="search-el-popup-overlay " >
                        <div className="search-el-popup">
                            <div className="widget">
                                <div className="widget-content padiing-srch-el">
                                    <p className="srch-el-conent">Are you sure you want to cancel your policy?</p>
                                    <div className="search-el-btn-container">
                                        <button onClick={this.clickPopUp.bind(this, 1)}>Yes</button>
                                        <span className="src-el-btn-border"></span>
                                        <button onClick={this.clickPopUp.bind(this, 2)}>No</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                :''
				}
				<section className="container parent-section book-appointment-section container-top-margin">
					<div className="row main-row parent-section-row">
						<div className="col-12 col-md-7 col-lg-7">
								<a className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg sticky-btn text-center" style={{ color: "#ffffff" }} onClick={this.cancelPolicy.bind(this)}>cancel policy
								</a>
						</div>
						<ChatPanel />
					</div>
				</section>
			</div>
		} else {
			return <div className="profile-body-wrap" style={{ paddingBottom: 80 }} >
				<ProfileHeader />
				<Loader/>
			</div>
		}

	}
}

export default InsuranceCancellationView    