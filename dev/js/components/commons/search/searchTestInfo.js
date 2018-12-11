import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'

class SearchTestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsValue: [],
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
        if (this.props.selectedCriterias.length > 0) {
            let test_id = []
            {
                Object.entries(this.props.selectedCriterias).map(function ([key, value]) {
                    test_id.push(value.id)
                })
            }
            this.props.searchTestData(test_id)
        }
    }
    closeTestInfo(){
        this.props.history.push('/search')
    }
    render() {
        if (this.props.searchTestInfoData.length > 0) {
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
                                                                return <div className="test-info-acrd-head-main" id={value.id}>
                                                                    <button className="test-top-main-haeding" onClick={self.ButtonHandler.bind(self, 'test_'+value.id)}>{value.name}<span className={self.state.tabsValue.indexOf('test_'+value.id) > -1 ?'acrd-arw-rotate':''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf('test_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'about_test_'+value.id)}>About the test <span className={self.state.tabsValue.indexOf('about_test_'+value.id) > -1 ? 'acrd-arw-rotate' : ''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.about_test }}></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'why_get_tested_'+value.id)}>Why get tested? <span className={self.state.tabsValue.indexOf('why_get_tested_'+value.id) > -1 ? 'acrd-arw-rotate' : ''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.why_get_tested }}></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_include_'+value.id)}>This test may include <span className={self.state.tabsValue.indexOf('test_include_'+value.id) > -1 ? 'acrd-arw-rotate' : ''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_include_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                                <ul>
                                                                                    {Object.entries(value.test_may_include).map(function ([k, test_include]) {
                                                                                        return <li>{test_include}</li>
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_preparations_'+value.id)}>Preparations for the test <span className={self.state.tabsValue.indexOf('test_preparations_'+value.id) > -1 ? 'acrd-arw-rotate' : ''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_preparations_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                                <div dangerouslySetInnerHTML={{ __html: value.preparations }}>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="test-sub-accordion">
                                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self, 'test_faq_'+value.id)}>FAQ <span className={self.state.tabsValue.indexOf('test_faq_'+value.id) > -1 ? 'acrd-arw-rotate' : ''}><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_faq_'+value.id) > -1 ? 'hide' : ''}`}>
                                                                                {Object.entries(value.faqs).map(function ([k, faq]) {
                                                                                    return <ul>
                                                                                        <li>{faq.test_question}</li>
                                                                                        <li>{faq.test_answer}</li>
                                                                                    </ul>
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
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