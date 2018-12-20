import React from 'react'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import ChatPanel from '../../commons/ChatPanel'
import SnackBar from 'node-snackbar'

class AdsBookingView extends React.Component{
	constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
		
    }
    
	render(){
		return <div>
                <div className="profile-body-wrap">
                    <ProfileHeader />

                    <section className="container parent-section book-appointment-section">
                        <div className="row main-row parent-section-row">
                            <div className="col-12 col-md-7 col-lg-7 ins-main-padding">
                                <div className="ins-card-head">
                                    <div className="ins-name-head">
                                        <p>
                                            Find best medical services near you        
                                        </p>
                                    </div>
                                    
                                </div>
                                {/* insurance input screen */}
                                <section className="section-margin-bottom">
                                    <div className="widget">
                                        <div className="insurance-member-container">
                                            <div className="insurance-member-details">
                                                <h3>Let us know what you are looking for?</h3>
                                                <input type="text" value="" />
                                                <h3>Tell us about yourself</h3>
                                                <div className="row no-gutters">                                                   
                                                    <div className="col-12">
                                                        <div className="ins-form-radio">
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">
                                                                    Male
                                                             <input type="radio" defaultChecked name="Male" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                            <div className="dtl-radio">
                                                                <label className="container-radio">
                                                                    Female
                                                             <input type="radio" defaultChecked name="female" />
                                                                    <span className="doc-checkmark"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="ins-form-group inp-margin-right ">
                                                            <input type="text" id="name" className="form-control ins-form-control" required autoComplete="off" />
                                                            <label className="form-control-placeholder" htmlFor="name">Name</label>
                                                            <img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="ins-form-group">
                                                            <input type="number" id="emails" className="form-control ins-form-control" required autoComplete="off" />
                                                            <label className="form-control-placeholder" htmlFor="emails">Phone Number</label>
                                                            <img className="ins-input-img" src={ASSETS_BASE_URL + "/img/email.svg"} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* insurance input screen */}
                                {/* ===============isurance 6th screen=============== */}
                            </div>
                            <ChatPanel newChatBtn={true}/>
                        </div>
                    </section>
                </div>
            </div>
	}
}

export default AdsBookingView