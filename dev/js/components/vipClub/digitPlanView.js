import React from 'react'
import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import DigitStaticDataView from './digitStaticDataView.js'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
import VipLoginPopup from './digitLogin.js'
// const queryString = require('./node_modules/query-string');
import CarouselView from '../opd/searchResults/carouselView.js'

class DigitPlanView extends React.Component {
    constructor(props) {
        super(props)
        let defaultPlan = '';
        
        this.state = {
            // selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
            showPopup: false,
           selected_plan_data: defaultPlan ? defaultPlan : '',
           selected_plan_id: defaultPlan.id ? defaultPlan.id:'',
           toggleTabType: false,
        }
    }

    componentWillReceiveProps(props) {
        let planData = props.plans;
        let defaultPlan = '';
        for (var i = 0; i < planData.length; i++) {
            if(planData[i].is_selected==true ){
                defaultPlan = planData[i];   
            }
        }   
        this.state.selected_plan_id = defaultPlan.id ? defaultPlan.id:'';
        this.state.selected_plan_data=  defaultPlan ? defaultPlan : '';
        
    }
    
    proceed() {
        if (STORAGE.checkAuth()) {
            let url  = '/covid-form'
            this.props.history.push(url)
        }else{
            this.setState({ showPopup: true })
        }
    }

    selectPlan(plan) {
        this.setState({selected_plan_data:plan,selected_plan_id:plan.id})
        this.props.selectDigitPlan(plan)
    }
    hideLoginPopup() {
        this.setState({ showPopup: false })
    }
    allDigitPlan = () =>{
        let tablCont = document.getElementById('digitTbl');
        let vwDgt = document.getElementById('digiVe');
        console.log(tablCont,vwDgt);
        tablCont.classList.remove('digitTableCollapse');
        vwDgt.classList.add('d-none');
    }
    render() {
        let self = this
        

        return (
            // && Object.keys(this.props.vipClubList).length > 0 && this.props.selected_plan_data &&
            this.props.plans && Object.keys(this.props.plans).length > 0 ? 
            <React.Fragment>
                <div>
                    <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true} />
                        <section className="container article-container bottomMargin">
                        {
                        this.state.showPopup ?
                            <VipLoginPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} closeLeadPopup={this.hideLoginPopup.bind(this)} /> : ''
                        }
                            <div className="row main-row parent-section-row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-10 center-column">
                                    <div className="container-fluid mt-20">
                                        <div>
                                            {/* ==================== top section with icons and listing ==================== */}
                                            <DigitStaticDataView /> 
                                            {/* ==================== top section with icons and listing ==================== */}
                                            {/* ==================== Steps Container ==================== */}
                                            <div className="widget mrb-10 digi-step">
                                                <div className="ins-status-container">
                                                    <div className="navigation_menu" id="">
                                                        <ul className="navigation_tabs" id="">
                                                            <li className="tab_inactive">
                                                                <a href="#">Choose Your Plan</a>
                                                            </li>
                                                            <li className='tab_disabled'>
                                                                <a href="#">Fill Member Details</a>
                                                            </li>
                                                            <li className="tab_disabled">
                                                                <a href="#">Payment</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* ==================== Steps Container ==================== */}
                                            {/* ==================== table Container ==================== */}
                                            <div className="widget mrb-10 digitTableCollapse transition" id="digitTbl">
                                                <table className="table table-bordered insurance-tbl insurance-checkboxes digitTbl">
                                                    <thead>
                                                        <tr>
                                                            <th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
                                                            <th className="tbl-second-head"><p>Annual Premium</p></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><p className="ins-dtls-members-edit">{this.props.is_edit ? 'Coverage Amounts' : 'Coverage Amounts'}
                                                            </p>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        {this.props.plans.map(plan=>
                                                            <tr key={plan.id}>
                                                                <td>
                                                                    <div className="dtl-radio" onClick={()=>self.selectPlan(plan,self)}>
                                                                        <label className="container-radio">{plan.name}
                                                                            <input type="radio" checked={this.state.selected_plan_id == plan.id}/>
                                                                            <span className="doc-checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td><span>₹ {plan.amount}</span></td>
                                                            </tr>
                                                        )}
                                                        
                                                            
                                                    </tbody>
                                                </table>
                                                <p className="digitPlan" id="digiVe" onClick={this.allDigitPlan}>View All</p>
                                        </div>
                                            <div className="bottomMargin"></div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button onClick={()=>this.proceed()} className="insu-right-orng-btn ins-buy-btn">Proceed</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                </div>
            </React.Fragment>
            : <div></div>
        );
    }
}

export default DigitPlanView