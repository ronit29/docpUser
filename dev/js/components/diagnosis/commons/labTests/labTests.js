import React from 'react';
import { connect } from 'react-redux';
import GTM from '../../../../helpers/gtm.js'
import PackageTest from './packageTest.js'
import PackageInfo from './packageInfo.js'
import STORAGE from '../../../../helpers/storage'
const queryString = require('query-string');


class LabTests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPackageInfo: false,
            packageInfoTest: null
        }
    }

    openTests() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'UserSelectingAddRemoveLabTests', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'user-selecting-add-remove-lab-tests'
        }
        GTM.sendEvent({ data: data })

        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
    }

    toggle(which, data = null) {
        this.setState({ [which]: !this.state[which], packageInfoTest: data })
    }

    toggleTest(test_to_toggle) {
        let test = Object.assign({}, test_to_toggle)
        test.add_to_common = true

        this.props.toggleDiagnosisCriteria('test', test)
    }
    testInfo(test_id,url,event) {
        let lab_id = this.props.selectedLab
        let selected_test_ids = this.props.lab_test_data[this.props.selectedLab] || []
        selected_test_ids = selected_test_ids.map(x => x.id)
            let lat = 28.644800
            let long = 77.216721
            if(this.props.selectedLocation !== null){
                lat = this.props.selectedLocation.geometry.location.lat
                long = this.props.selectedLocation.geometry.location.lng

                if (typeof lat === 'function') lat = lat()
                if (typeof long === 'function') long = long()
            }
        if(url && url !=''){
            this.props.history.push('/'+url+'?test_ids=' + test_id + '&selected_test_ids='+selected_test_ids +'&lab_id=' + lab_id +'&lat='+lat+'&long='+long)
        }else{
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids='+selected_test_ids +'&lab_id=' + lab_id +'&lat='+lat+'&long='+long)
        }
        event.stopPropagation()
        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'lab-test-page'
        }
        GTM.sendEvent({ data: data })
    }

    searchTests(){
        this.props.selectSearchType('lab')
        this.props.history.push('/search')
    }

    render() {

        let is_package = false
        let number_of_tests = 0
        let defaultTests = []
        let showDefaultTests = false
        let hide_price = false
        let selectedTestIds = []
        let selectedTests = []
        let selectedPackage = []
        let unSelectedTests = []
        let unSelectedPackage = []
        let test_info = ''
        let show_details = ''
        let {is_plan_applicable} = this.props
        let { is_insurance_applicable, is_vip_applicable, is_covered_under_gold } = this.props
        let is_user_insured = false
        let selectedTestsCount = 0
        let vip_amount = 0
        let finalMrp = 0
        let price_to_pay =0

        //For Insured Person Remove unselected Tests/Packages

        if(this.props.profiles && this.props.profiles[this.props.defaultProfile]){
            is_user_insured = this.props.profiles[this.props.defaultProfile].is_insured
        }


        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
            selectedTestsCount = this.props.currentLabSelectedTests.filter(x=>x.is_selected).length

            this.props.currentLabSelectedTests.map((test, i) => {
                if (test.hide_price) {
                    hide_price = true
                }

                if (test.is_package) {
                    is_package = true
                    number_of_tests = test.number_of_tests
                }

                if (test.is_package) {
                    if (test.is_selected) {
                        finalMrp+= parseInt(test.mrp)
                        if(test.vip){
                            vip_amount+= parseInt(test.vip.vip_gold_price||0) + parseInt(test.vip.vip_convenience_amount||0)    
                        }
                        selectedPackage.push(<PackageTest is_insurance_applicable ={is_insurance_applicable} is_plan_applicable={is_plan_applicable} key={i} i={i} test={test} toggle={this.toggle.bind(this)} toggleTest={this.toggleTest.bind(this)} testInfo={this.testInfo.bind(this)} hide_price={hide_price} selectedTestsCount={selectedTestsCount} is_user_insured={is_user_insured} is_vip_applicable={is_vip_applicable} is_user_vip={this.props.is_user_vip} is_user_gold_vip={this.props.is_user_gold_vip} />)
                    } else {
                        unSelectedPackage.push(<PackageTest is_insurance_applicable ={is_insurance_applicable} is_plan_applicable={is_plan_applicable} key={i} i={i} test={test} toggle={this.toggle.bind(this)} toggleTest={this.toggleTest.bind(this)} hide_price={hide_price} testInfo={this.testInfo.bind(this)} selectedTestsCount={selectedTestsCount} is_vip_applicable={is_vip_applicable} is_user_vip={this.props.is_user_vip} is_user_gold_vip={this.props.is_user_gold_vip} />)
                    }

                } else {
                    if (test.is_selected) {
                        finalMrp+= parseInt(test.mrp)
                        price_to_pay = parseInt(test.deal_price);
                        if(test.vip && (this.props.is_user_vip || this.props.is_user_gold_vip) ){
                            vip_amount+= parseInt(test.vip.vip_gold_price||0) + parseInt(test.vip.vip_convenience_amount||0)    
                            price_to_pay = parseInt(test.vip.vip_amount||0) + parseInt(test.vip.vip_convenience_amount||0)
                        }
                        if (test.test.show_details) {
                            // test_info = <span className="srch-heading" style={{ float: 'right', cursor: 'pointer', color: '#e46608' }} onClick={this.testInfo.bind(this)}> Test Info</span>
                            test_info= <span style={{'marginLeft':'5px',marginTop:'1px',display:'inline-block', 'cursor':'pointer'}} onClick={this.testInfo.bind(this,test.test.id,test.url)}>
                                    <img src="https://cdn.docprime.com/cp/assets/img/icons/Info.svg" style={{width:'15px'}}/>
                            </span>
                        }

                        selectedTests.push(hide_price? <li key={i + "srt"}>
                            <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                {test.test.name}
                                <input type="checkbox" checked={test.is_selected ? true : false} />
                                <span className="checkmark" />
                            </label>
                            <span className="test-price text-sm">Free</span>
                        </li>
                            : <li key={i + "srt"}>
                                <label className={`${(this.props.is_user_vip && !this.props.is_user_gold_vip)?'':'ck-bx'}`} style={{ fontWeight: 400, fontSize: 14 }}>
                                    {test.test.name} {test.test.show_details ? test_info : ''}
                                    {
                                        (this.props.is_user_vip && !this.props.is_user_gold_vip)?'':<input type="checkbox" checked={test.is_selected ? true : false} onChange={this.toggleTest.bind(this, test)} />    
                                    }
                                    
                                    {
                                        (this.props.is_user_vip && !this.props.is_user_gold_vip)?'':<span className="checkmark" />
                                    }
                                </label>
                                {
                                    // is_vip_applicable || is_covered_under_gold?''
                                    // :
                                    is_insurance_applicable || test.included_in_user_plan?
                                     <span className="test-price text-sm">₹ 0 </span>
                                    :price_to_pay == test.mrp.split('.')[0]?
                                        <span className="test-price text-sm">&#8377; {price_to_pay}</span>
                                        :<span className="test-price text-sm">&#8377; {price_to_pay}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span>
                                }
                            </li>)
                    } else {
                        price_to_pay = parseInt(test.deal_price);
                        if(test.vip && (this.props.is_user_vip || this.props.is_user_gold_vip) ){
                            price_to_pay = parseInt(test.vip.vip_amount||0) + parseInt(test.vip.vip_convenience_amount||0)
                        }
                        if (test.test.show_details) {
                            test_info= <span style={{'marginLeft':'5px',marginTop:'1px',display:'inline-block', 'cursor':'pointer'}} onClick={this.testInfo.bind(this,test.test.id,test.url)}>
                                    <img src="https://cdn.docprime.com/cp/assets/img/icons/Info.svg" style={{width:'15px'}}/>
                            </span>
                        }
                        
                        unSelectedTests.push(test.hide_price
                            ? <li className="clearfix" key={i}>
                                <span className="test-price">Free</span>
                            </li>
                            : <li key={i + "srt"}>
                                <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                    {test.test.name} {test.test.show_details ? test_info : ''}
                                    <input type="checkbox" checked={test.is_selected ? true : false} onChange={this.toggleTest.bind(this, test)} />
                                    <span className="checkmark" />
                                </label>
                                {    
                                    ( (is_insurance_applicable || !selectedTestsCount) && test.insurance && test.insurance.is_insurance_covered && test.insurance.is_user_insured) || test.included_in_user_plan?
                                        <span className="test-price text-sm">₹ 0 </span>
                                        :price_to_pay == test.mrp.split('.')[0]?
                                            <span className="test-price text-sm">&#8377; {price_to_pay}</span>
                                            :<span className="test-price text-sm">&#8377; {price_to_pay}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span>
                                            </span>
                                }
                            </li>)
                    }
                }
            })
            selectedTestIds = this.props.currentLabSelectedTests.map(x => x.test_id)

        }

        //For Insured Person Remove unselected Tests/Packages

        if(this.props.is_user_vip && !this.props.is_user_gold_vip /*is_user_insured || is_vip_applicable || is_covered_under_gold*/) {
            unSelectedTests = []
            unSelectedPackage = []
        }



        const parsed = queryString.parse(this.props.location.search)
        if (parsed && parsed.price_list && parsed.price_list == 'true') {
            showDefaultTests = true
        }

        let totalAmount = 0;
        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
            for (var i = 0; i < this.props.currentLabSelectedTests.length; i++) {
                totalAmount = totalAmount + this.props.currentLabSelectedTests[i].deal_price;
            }
        }

        if (this.props.data.lab_tests && this.props.data.lab_tests.length && showDefaultTests) {
            defaultTests = this.props.data.lab_tests.map((test, i) => {
                return <li className="clearfix" key={i}>
                    <span className="test-price">&#8377; {test.deal_price}<span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span></span><span className="fw-400 text-md test-name-item /*lb-tst-cstm-pdng*/">{test.test.name}</span></li>
            })
        }

        let is_home_collection_enabled = false
        let distance_related_charges = 0
        let home_pickup_charges = false
        let testsArray = []
        if (this.props.data && this.props.data.lab) {
            is_home_collection_enabled = this.props.data.lab.is_home_collection_enabled
            distance_related_charges = this.props.data.distance_related_charges
            home_pickup_charges = this.props.data.lab.home_pickup_charges
        }

        if (this.props.currentLabSelectedTests && this.props.currentLabSelectedTests.length) {
            testsArray = this.props.currentLabSelectedTests.filter(x => x.is_selected)
        }

        let pickup_text = ""
        let extra_price = ""
        let showPriceTag = 0
        let showPickupText = true

        if (testsArray.length) {
            for (let i = 0; i < testsArray.length; i++) {
                if (!testsArray[i].is_home_collection_enabled) {
                    showPickupText = false
                }
            }
        }

        if (is_home_collection_enabled && distance_related_charges == 1 && !hide_price && showPickupText) {
            pickup_text = "Home pickup charges applicable"
        }

        if (is_home_collection_enabled && !distance_related_charges && !hide_price && showPickupText) {
            pickup_text = "Home visit charges"
            showPriceTag = 1
            extra_price = this.props.data.lab.home_pickup_charges
        }

        if(is_insurance_applicable){
            pickup_text = ''
        }
        let vip_discount_price = finalMrp - vip_amount
        return (
            <div>
                <div className="widget-content pb-details pb-test nw-listing-pddng clearfix">
                    {/* {
                        is_package && number_of_tests ? <h4 className="wc-title text-md fw-700">{number_of_tests} Test Included</h4> : <h4 className="wc-title text-md fw-700">Selected Tests {test_info}
                        </h4>
                    } */}

                    {
                        this.props.location && this.props.location.search && this.props.location.search.includes('from=insurance_network') ?
                        '' :
                        <ul className="list all-test-list pdngRgt">
                            {selectedTests}
                            {selectedPackage}
                            {hide_price? '' : unSelectedTests}
                            {hide_price? '' : unSelectedPackage}
                        </ul>
                    }
                    
                    {
                        pickup_text && (!this.props.location || !this.props.location.search || !this.props.location.search.includes('from=insurance_network')) ? <div className="clearfix homePickui">

                            <p className="health-visit-charge">{pickup_text}</p>

                            {
                                showPriceTag ? <p className="prc-tstcoin mb-0"> &#8377;{extra_price == "" ? '0' : extra_price}</p> : ''

                            }
                            {
                                !showPriceTag && extra_price >= 0 && extra_price ? <p className="prc-tstcoin mb-0"> &#8377;{extra_price}</p> : ""
                            }
                        </div> : ""
                    }
                    <div>
                        <p className="label-cpn text-left">Coupon applies at booking summary</p>
                    </div>
                    {/*
                        STORAGE.checkAuth() || totalAmount < 100 ?
                            '' :
                                this.props.location && this.props.location.search && this.props.location.search.includes('from=insurance_network') ?
                                    '' :
                                    <div className="signup-off-container lab-signup-offr">
                                        <span className="signup-off-doc">+ &#8377; 100 OFF <b>on Signup</b> </span>
                                    </div>
                    */}
                    {
                        (STORAGE.isAgent() || ( !hide_price && !is_user_insured)) && (this.props.location && this.props.location.search && this.props.location.search.includes('from=insurance_network')) ? <div className="pb-view d-flex align-items-center justify-content-between">
                        {
                            !is_vip_applicable && !is_user_insured && this.props.data && this.props.data.total_test_count && this.props.data.total_test_count != '' ?
                            <span className="text-md fw-500">{this.props.data.total_test_count} total tests</span> : ''
                        }
                        {
                            is_user_insured || is_vip_applicable || is_covered_under_gold?''
                            :<a href="javascript:;" className="link-text text-md fw-500" onClick={this.openTests.bind(this)}>View all tests</a>
                        }
                            
                        </div>
                        :''
                    }

                    {
                       (is_vip_applicable || is_user_insured ) && !selectedTestsCount?
                        <div className="pb-view text-right">
                            <a href="javascript:;" className="link-text text-md fw-700" onClick={this.searchTests.bind(this)}>Search tests</a>
                        </div>
                        :''
                    }

                    {
                        is_insurance_applicable?
                        <div className="ins-val-bx">Covered Under Insurance</div>
                        :''
                    }
                    {
                        this.state.showPackageInfo ? <PackageInfo content={this.state.packageInfoTest} toggle={this.toggle.bind(this, 'showPackageInfo')} /> : ""
                    }
                </div>

                {showDefaultTests ?
                    <div className="widget-content pb-details pb-test">
                        <h4 className="wc-title text-md fw-700">Price List</h4>

                        <ul className="list pb-list pb-test-list">
                            {defaultTests}
                        </ul>
                        <div className="pb-view text-right">
                            <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View More & Select Tests</a>
                        </div>
                    </div>
                    : ''
                }
                {/* ============================= gold card details ============================= */}
                {
                    !is_covered_under_gold && !is_vip_applicable && !is_insurance_applicable && vip_discount_price > 0 && false ?
                    <div className="widget cpn-blur mrb-15 cursor-pointer" onClick={(e) => {
                        e.stopPropagation();
                        let analyticData = {
                            'Category': 'ConsumerApp', 'Action': 'LabProfileVipGoldClick', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'lab-profile-gold-click',
                        }
                        GTM.sendEvent({ data: analyticData })
                        this.props.history.push('/vip-gold-details?is_gold=true&source=lab-profile-gold-click&lead_source=Docprime')
                    }}>
                        <div className="widget-content d-flex jc-spaceb align-item-center">
                            <div className="gold-crd-lft">
                                <p><span>Save ₹{vip_discount_price}</span> on this appointment </p>
                                <p className="gld-crd-sb-txt">Become <img src={ASSETS_BASE_URL + '/img/gold-sm.png'} /> member</p>
                            </div>
                            <div className="gold-crd-rgt">
                                <p>Get Gold</p>
                            </div>
                        </div>
                    </div>
                    :''}
                {/* ============================= gold card details ============================= */}

            </div>
        );
    }
}


export default LabTests
