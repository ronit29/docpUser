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
    goBack(){
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
                                            <h3 className="textInfoHeadTitle mrng-top-12"><img onClick={this.goBack.bind()} src={ASSETS_BASE_URL + '/img/icons/back-arrow.png'} className="img-fluid" style={{ width: '20px',marginRight:'10px' }} />About Preventive Health Package </h3>
                                            <div className="widget mrb-15 mrng-top-12">
                                                <div className="widget-content">
                                                    <div className="taxFullContent">
                                                        <h4>What is preventive health care?</h4>
                                                        <p>Preventive health care tips include identification and minimization of disease risk factors, existing disease course improvement, and early disease detection through screening. This has become crucial since it allows people to know about their health issues well within time. Unknowingly you may be sitting on a health landmine because diagnosis of cancer in later stages is completely ineffectual and heart disease may translate into instant death. These are silent killers and the only way to deal with them is to remain aware of the issues through regular checkups and taking preventive care.</p>
                                                    </div>
                                                    <div className="taxFullContent">
                                                        <h4>Preventive healthcare packages</h4>
                                                        <ul>
                                                            <li><b>Regular checkups - </b>Under this preventive care plan the policyholder can go for regular checkups at specific hospitals to know if all is right with their current heath.</li>

                                                            <li><b>Family plans -</b> Family plans bring into the preventive healthcare safety net every member of your family. From adults to kids everybody can enjoy the benefits on offer.</li>


                                                            <li><b>Executive plans -</b> This preventive plan gives cover to employees of various organizations so that they can go for regular checkups and the like in the hospitals mentioned in the policy. </li>

                                                            <li><b>Child plans -</b> Child preventive healthcare insurance plans allows parents to go for regular checkups for their children between zero and thirteen years of age who are covered under this policy.</li>

                                                            <li><b>Diabetes plans -</b> Diabetes may affect the vital organs of the body including brain, kidney, liver, and heart. Therefore, regular checkup of patients is necessary. Diabetes plan give you coverage in this regard.</li>


                                                        </ul>
                                                        <p>Consider your specific situation and then choose the plan that thoroughly suits your needs. It is also possible to go for custom plans, which are ideal for your specific scenario. The main aim of this is to keep people aware of their health issues and deal with them in a proper manner. Neglecting a disease and allowing it to fester may lead to fatal or irreversible conditions and the preventive care plans does not let this happen</p>
                                                    </div>
                                                    <div className="taxFullContent">
                                                        <h4>Preventive healthcare packages</h4>
                                                        <p>Preventive plans include various tests such as a blood test for sugar and cholesterol, pressure monitoring, cancer screening, Pap smear, HIV and genetic testing.</p>
                                                        <p>In today’s lifestyle, stress has become our constant companion. Long hours spent at the office meeting deadlines, interpersonal conflicts, and keeping up with regularly changing technology is becoming too much to bear. No wonder, health problems are ubiquitous. While development in medical science allows professionals to combat various ailments, awareness among common people is crucial. Preventive medical care insurance surely offers a way out. So, do not ignore this pressing issue, because it may become too late to soon!</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <RightBar />
                    </div>
                </section>
            </div>

        )
    }
}


export default TaxSaverTC