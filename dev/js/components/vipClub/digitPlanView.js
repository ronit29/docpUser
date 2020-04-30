import React from 'react'
import LeftBar from '../commons/LeftBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import DigitStaticDataView from './digitStaticDataView.js'
import CONFIG from '../../config'
import HelmetTags from '../commons/HelmetTags'
import GTM from '../../helpers/gtm'
import STORAGE from '../../helpers/storage';
import SnackBar from 'node-snackbar'
// const queryString = require('./node_modules/query-string');
import CarouselView from '../opd/searchResults/carouselView.js'

class DigitPlanView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // selected_plan_data: this.props.selected_plan ? this.props.selected_plan : '',
        }
    }

    render() {
        let self = this
        let is_gold_selected = false
        // let selected_gold_plan_price 
        //     {
        //         this.props.selected_plan_data && Object.keys(this.props.selected_plan_data).length > 0 && this.props.vipClubList.gold_plans && this.props.vipClubList.gold_plans.length?
        //         Object.entries(this.props.vipClubList.gold_plans).map(function ([key, value]) {
        //             if(value.is_selected){
        //                 selected_gold_plan_price = value.deal_price
        //             }
        //             if(parseInt(value.id) == parseInt(self.props.selected_plan_data.id)){
        //                 is_gold_selected = true
        //             }
        //         })
        //         :''
        //     }

        return (
            // && Object.keys(this.props.vipClubList).length > 0 && this.props.selected_plan_data &&
            this.props.plans && Object.keys(this.props.plans).length > 0 ? 
            <React.Fragment>
                <div>
                    <div className="profile-body-wrap">
                    <ProfileHeader showPackageStrip={true} />
                        <section className="container article-container bottomMargin">
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
                                            <div className="widget mrb-10">
                                                <table className="table table-bordered insurance-tbl insurance-checkboxes digitTbl">
                                                    <thead>
                                                        <tr>
                                                            <th className="tbl-first-head"><p>Coverage (1 Year)</p></th>
                                                            <th className="tbl-second-head"><p>Annual Premium</p></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><p className="ins-dtls-members-edit">{this.props.is_edit ? 'Change Insured Plan' : 'Insured Member Details'}
                                                            </p>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        {this.props.plans.map(plan=>
                                                            <tr key={plan.id}>
                                                                <td>
                                                                    <div className="dtl-radio">
                                                                        <label className="container-radio">{plan.name}
                                                                            <input type="radio" />
                                                                            <span className="doc-checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td><span>₹ {plan.amount}</span></td>
                                                            </tr>
                                                        )}
                                                        
                                                            
                                                    </tbody>
                                                </table>
                                            
                                            {/* <div className="term-cont-digi">
                                                <label className="ck-bx" htmlform="test11" style={{ 'fontWeight': '500', 'fontSize': '13px' }}>
                                                    <input type="checkbox" defaultChecked className="ins-chk-bx" value="" id="test11" name="fruit-1" />
                                                    <span className="checkmark"></span>I Agree to the </label>
                                                <p onClick={this.openPopup}>Terms and Conditions</p>
                                            </div> */}
                                        </div>
                                            <div className="bottomMargin"></div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                            {/* ==================== Common button ==================== */}
                            <div className="sticky-btn fixed insuBtnsContainer">
                                <button onClick={this.state.handlePlanSelect} className="insu-right-orng-btn ins-buy-btn">Proceed</button>
                            </div>
                            {/* ==================== Common button ==================== */}
                        </section>
                    </div>
                </div >
            </React.Fragment>
            : <div></div>
        );
    }
}

export default DigitPlanView