import React from 'react'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import ChatPanel from '../../commons/ChatPanel'
import SnackBar from 'node-snackbar'

class AdsBookingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: '',
            name: '',
            text: '',
            phonenumber: ''
        }
    }
    handleChange(feild, event) {
        let gender_value = event.target.value
        this.setState({ [event.target.getAttribute('data-param')]: event.target.value })
    }

    handleSubmit() {

    }
    render() {
        console.log(this.state)
        return <div>
            <div className="profile-body-wrap">
                <ProfileHeader />

                <section className="container parent-section book-appointment-section">
                    <div className="row main-row parent-section-row">
                        <div className="col-12 col-md-7 col-lg-7 ins-main-padding">
                            <div className="wedget mb-3">
                                <div className="ins-card-head">
                                    <div className="ins-name-head">
                                        <p className="m-0">
                                            Find best medical services near you
                                        </p>
                                    </div>

                                </div>
                            </div>
                            {/* insurance input screen */}
                            <section className="section-margin-bottom">
                                <div className="widget">
                                    <div className="insurance-member-container">
                                        <div className="insurance-member-details">
                                            <h4>Let us know what you are looking for?</h4>
                                            <div className="fkd-textarea">
                                                <textarea placeholder="" value={this.state.text} data-param="name" onChange={this.handleChange.bind(this, 'text')}>
</textarea>
                                            </div>
                                            <h3 className="tell-hedng">Tell us about yourself</h3>
                                            <div className="row no-gutters">
                                                <div className="col-12">
                                                    <div className="ins-form-radio">
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">
                                                                Male
                                                              <input type="radio" name="gender" value='m' data-param='gender' checked={this.state.gender === 'm'} onChange={this.handleChange.bind(this, 'm')} />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                        <div className="dtl-radio">
                                                            <label className="container-radio">
                                                                Female
                                                              <input type="radio" name="gender" value='f' data-param='gender' checked={this.state.gender === 'f'} onChange={this.handleChange.bind(this, 'f')} />
                                                                <span className="doc-checkmark"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="ins-form-group inp-margin-right ">
                                                        <input type="text" id="name" className="form-control ins-form-control" required autoComplete="off" onChange={this.handleChange.bind(this, 'name')} value={this.state.name} />
                                                        <label className="form-control-placeholder" htmlFor="name">Name</label>
                                                        <img className="ins-input-img" style={{ width: '19px' }} src={ASSETS_BASE_URL + "/img/ins-usr.svg"} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="ins-form-group">
                                                        <input type="number" id="number" className="form-control ins-form-control" required autoComplete="off" onChange={this.handleChange.bind(this, 'phonenumber')} value={this.state.phonenumber} />
                                                        <label className="form-control-placeholder" htmlFor="number">Phone Number</label>
                                                        <span className="number-nine">+91</span>
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
                        <ChatPanel newChatBtn={true} bookingsGA={true} />
                    </div>
                </section>
            </div>
        </div>
    }
}

export default AdsBookingView