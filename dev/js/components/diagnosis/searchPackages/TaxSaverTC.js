import React from 'react';
import CriteriaSearch from '../../commons/criteriaSearch'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'


class TaxSaverTC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    goBack() {
        window.history.go(-1)
    }
    render() {
        let LOADED_LABS_SEARCH = true
        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }}>
                <ProfileHeader />
                <section className="container article-container">
                    <div className="row main-row parent-section-row">
                        <LeftBar />
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <section className="dr-profile-screen booking-confirm-screen">
                                <div className="container-fluid">
                                    <div className="row mrb-20">
                                        <div className="col-12">
                                            <h3 className="textInfoHeadTitle mrng-top-12"><img onClick={this.goBack.bind()} src={ASSETS_BASE_URL + '/img/icons/back-arrow.png'} className="img-fluid" style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }} />About Preventive Health Package </h3>
                                            <div className="widget mrb-15 mrng-top-12">
                                                <div className="widget-content">
                                                    <div className="taxFullContent">
                                                        <h4>You can avail tax benefit up to ₹ 5000 on preventive health care packages under Section 80D of the Income Tax Act</h4>
                                                        <h4>Preventive healthcare packages:</h4>
                                                        <p>In today’s lifestyle, stress has become a constant companion. Long hours spent at the office meeting deadlines, interpersonal conflicts, and keeping up with regularly changing technology is becoming too much to bear. No wonder, health problems are ubiquitous. While development in medical science allows professionals to combat various ailments, awareness among common people is crucial.</p>
                                                        <p>Preventive health care checkup means identification and minimization of disease risk factors, existing disease course improvement, and early disease detection through screening. This has become crucial since it allows people to know about their health issues well within time. You may be sitting on a health landmine and have no inkling of it. Diagnosis of cancer in later stages is completely ineffectual and heart disease may translate into instant death. These are silent killers and the only way to deal with them is to remain aware of the issues through regular checkups and taking preventive care.</p>
                                                    </div>
                                                    <div className="taxFullContent">
                                                        <h4>The most common tests under preventive healthcare packages are:  </h4>
                                                        <ul>
                                                            <li>Liver</li>
                                                            <li>Thyroid </li>
                                                            <li>Blood test </li>
                                                            <li>Sugar </li>
                                                            <li>Cholesterol </li>
                                                            <li>Vitamin profile </li>
                                                            <li>Full body check-up</li>
                                                            <li>Stool tests </li>
                                                            <li>Cardiac (Heart) </li>
                                                            <li>Cancer Screening </li>
                                                            <li>Pap smear </li>
                                                            <li>HIV  </li>
                                                            <li>Genetic testing etc. </li>
                                                        </ul>
                                                        <p>As people are becoming more health conscious, an increasing number of people are going for preventive healthcare packages. You can choose the healthcare plan that is most suited to your specific needs. The benefit can be availed for the individual, spouse, children or parent depending on the package undertaken. </p>
                                                        <p>Basically, consider your specific situation and then choose the plan that suits your needs. It is also possible to go for custom plans, which are ideal for a specific scenario. The main aim of this is to keep people aware of their health issues and deal with them in a proper manner. Neglecting a disease and allowing it to fester may lead to fatal or irreversible conditions and the preventive care plans does not let this happen</p>
                                                        <p className="fw-500 text-center">*The deduction is limited to preventive health checkups*</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <RightBar msgTemplate="gold_general_template"/>
                    </div>
                </section>
            </div>

        )
    }
}


export default TaxSaverTC