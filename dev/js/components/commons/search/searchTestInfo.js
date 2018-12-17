import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'

class SearchTestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsValue: [],
            lastSource:'',
            allFrequentlyTest:[],
            lab_id:'',
            frequently_heading:'',
            disableAddTest:[]
        }
    }
    ButtonHandler(field, event) {
        let tabs = [].concat(this.state.tabsValue)
        let self = this
        let found = false
        tabs = tabs.filter((x) => {
            if (x == field) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            tabs.push(field)
        }

        self.setState({ tabsValue: tabs })
    }
    componentDidMount() {
        var url_string = window.location.href
        var url = new URL(url_string);
        var test_id = url.searchParams.get("test_ids")
        let last_page = url.searchParams.get("from")
        let lab_id = ''
        lab_id = url.searchParams.get("lab_id")
        let test_id_val=[]
        let allTest =[]
        let all_test_id =[]
        let ferq_heading
        let url_test_ids = test_id.split(',')
         {Object.entries(url_test_ids).map(function ([key, value]) {
            all_test_id.push(parseInt(value))
         })}
        this.setState({lastSource:last_page})
        if(test_id != null){
            this.props.searchTestData(test_id,lab_id,(resp)=>{
                {Object.entries(resp).map(function ([key, value]) {
                    let testIds = allTest.map(x=>x.id)
                    if(testIds.indexOf(value.frequently_booked_together.value.id) == -1){
                        allTest = allTest.concat(value.frequently_booked_together.value)
                    }
                    if(resp.length >0){
                        ferq_heading = value.frequently_booked_together.title
                        all_test_id.concat(value.id)
                        let why_get_tested,test_include,test_preparations,test_faq,selected_test_id
                        why_get_tested = "why_get_tested_"+value.id
                        test_include = "test_include_"+value.id
                        test_preparations = "test_preparations_"+value.id
                        test_faq = "test_faq_"+value.id
                        test_id_val.push(why_get_tested)
                        test_id_val.push(test_include)
                        test_id_val.push(test_preparations)
                        test_id_val.push(test_faq)
                        if(key != 0){
                            selected_test_id = 'test_'+value.id 
                            test_id_val.push(selected_test_id)
                        }
                    }
                })}
                this.setState({ tabsValue: test_id_val,allFrequentlyTest: allTest,lab_id: lab_id,frequently_heading:ferq_heading,disableAddTest:all_test_id})
            })
        }
    }
    closeTestInfo() {
        if (this.state.lastSource == 'search') {
            this.props.history.push('/search')
        } else {
            window.history.back()
        }
    }
    frequentlyAddTest(field, name, event) {
        let self = this
        let test = {}
        let added_test = [].concat(this.state.disableAddTest)
        added_test.push(field)
        self.setState({ disableAddTest: added_test })
            if(this.state.lab_id != null){
                test.lab_id = this.state.lab_id
                test.extra_test = true
                test.type = 'test'
                test.name = name
                test.id = field
            }else{
                test.type = 'test'
                test.name = name
                test.id = field
            }
            test.hide_price = false
        self.props.toggleDiagnosisCriteria('test', test, false)
    }
    render() {
        if (this.props.searchTestInfoData && this.props.searchTestInfoData.length > 0) {
            let self = this
            return (
                <div>
                    <section className="fade-enter-done">
                        <div className="container-fluid">
                            <div className="profile-body-wrap">
                                {
                                    this.props.hideHeaderOnMobile ? <div className="hide-762"><ProfileHeader showSearch={true} /></div> : <ProfileHeader showSearch={true} />
                                }
                                <section className={"container parent-section book-appointment-section" + (this.props.hideHeaderOnMobile ? " mp0" : "")}>
                                    <div className="row main-row parent-section-row">
                                        <div className="col-12 col-md-7 col-lg-7 center-column">
                                            <div className="row mrb-20">
                                                <div className="col-12">
                                                    <h3 className="test-main-heding-h3 mrng-top-12">Test Information <img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} className="img-fluid" onClick={this.closeTestInfo.bind(this)} /></h3>
                                                    <div className="widget mrb-15 mrng-top-12">
                                                        <div className="test-info-continer-block">
                                                            {Object.entries(this.props.searchTestInfoData).map(function ([key, value]) {
                                                                return value.show_details?
                                                                 <div className="test-info-acrd-head-main" id={value.id}>
                                                                    <button className="test-top-main-haeding" onClick={self.ButtonHandler.bind(self, 'test_' + value.id)}>{value.name}<span className={self.state.tabsValue.indexOf('test_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf('test_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                        {value.about_test.value != ""?
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'about_test_' + value.id)}>{value.about_test.title} <span className={self.state.tabsValue.indexOf('about_test_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.about_test.value }}></div>
                                                                            </div>
                                                                        </div>
                                                                        :''
                                                                        }
                                                                        {value.why_get_tested.value != ""?
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'why_get_tested_' + value.id)}>{value.why_get_tested.title} <span className={self.state.tabsValue.indexOf('why_get_tested_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.why_get_tested.value }}></div>
                                                                            </div>
                                                                        </div>
                                                                        :''
                                                                        }
                                                                        {value.test_may_include.value.length > 0?
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_' + value.id)}>{value.test_may_include.title} <span className={self.state.tabsValue.indexOf('test_include_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_include_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                <ul>
                                                                                    {Object.entries(value.test_may_include.value).map(function ([k, test_include]) {
                                                                                        return <li>{test_include}</li>
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        :''
                                                                        }
                                                                        {value.preparations.value != ''?
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_preparations_' + value.id)}>{value.preparations.title}<span className={self.state.tabsValue.indexOf('test_preparations_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_preparations_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.preparations.value }}>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        :''
                                                                        }
                                                                        {value.faqs.length > 0?
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_faq_' + value.id)}>{value.faqs[0].title} <span className={self.state.tabsValue.indexOf('test_faq_' + value.id) > -1 ? 'acrd-arw-rotate' : 'acrd-show'}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_faq_' + value.id) > -1 ? 'hide' : ''}`}>
                                                                                {value.faqs.length>0? Object.entries(value.faqs).map(function ([k, faq])
                                                                                {
                                                                                    return <div>
                                                                                        <p>Q.{faq.value.test_question}</p>
                                                                                        <p>{faq.value.test_answer}</p>
                                                                                    </div>
                                                                                    }):''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        :''
                                                                        }
                                                                    </div>
                                                                </div>:''
                                                            })}
                                                        </div>
                                                    </div>
                                                    {
                                                        this.state.allFrequentlyTest.length >0?
                                                    <div className="widget mrb-15 mrng-top-12">
                                                        <div className="widget-content">
                                                           <h5 className="test-duo-heding"> {this.state.frequently_heading}</h5>
                                                            <ul className="test-duo-listing">
                                                                {Object.entries(this.state.allFrequentlyTest).map(function ([k, frequently]) {
                                                                    return <li><p>{frequently.lab_test}</p>
                                                                    <button className={self.state.disableAddTest.indexOf(frequently.id) >-1 ?'disable-btn':''} id={frequently.id} onClick={self.frequentlyAddTest.bind(self, frequently.id, frequently.lab_test)} disabled={self.state.disableAddTest.indexOf(frequently.id) >-1 ?true:''}>{self.state.disableAddTest.indexOf(frequently.id) >-1 ?'Test Added':'Add Test'}</button>
                                                                    </li>
                                                                })}
                                                            </ul>

                                                        </div>
                                                    </div>
                                                    :''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <ChatPanel />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            )
        } else {
            return (<div>

            </div>)
        }
    }
}
export default SearchTestView