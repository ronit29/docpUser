import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'

class SearchTestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tabsValue:[],
            tabsDiv:[]
        }
    }
    ButtonHandler(field,event){
        let tabs = [].concat(this.state.tabsValue)
        let self = this
        let found = false
        tabs = tabs.filter((x) => {
            if(x == field){
                found = true
                return false
            }
            return true
        })
        if(!found){
            tabs.push(field)
        }
        self.setState({tabsValue:tabs})
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
    toggleDiv(field,event){
        console.log(field)
        let self = this
        let tabsDiv=[]
        tabsDiv.push(field) 
        self.setState({tabsDiv:tabsDiv})       
    }  
    render(){
        if(this.props.searchTestInfoData.length >0){
            let self = this
            return(
                <div>
                <div className="fade-enter-done">
                <div className="profile-body-wrap">     
                <section className="container parent-section book-appointment-section">
                <ProfileHeader />
                <section className="container container-top-margin">
                <div className="row main-row parent-section-row">
                    <div className="col-12 col-md-7 col-lg-7 center-column">
                        <section className="dr-profile-screen booking-confirm-screen">
                            <div className="container-fluid">
                                <div className="row mrb-20">
                                    <div className="col-12">
                                        <h3 className="test-main-heding-h3">Test Information</h3>
                                        <div className="widget mrb-15 mrng-top-12">
                                            <div className="test-info-continer-block">
                                            {Object.entries(this.props.searchTestInfoData).map(function([key, value]) {
                                                return <div className="test-info-acrd-head-main" id={value.id}>
                                                    <button className="test-top-main-haeding" onClick={self.toggleDiv.bind(self,value.id)}>{value.name}<span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                    <div className={`tst-main-acrd-data ${self.state.tabsValue.indexOf([value.id])>-1?'hide':''}`}>
                                                        <div className="test-sub-accordion">
                                                            <button className="tst-sub-acrd-heading"onClick={self.ButtonHandler.bind(self,'about_test')}>About the test <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('about_test')>-1?'hide':''}`}>
                                                                <div dangerouslySetInnerHTML={{ __html: value.about_test }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="test-sub-accordion">
                                                            <button className="tst-sub-acrd-heading"  onClick={self.ButtonHandler.bind(self,'why_get_tested')}>Why get tested? <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className= {`acrd-sub-content ${self.state.tabsValue.indexOf('why_get_tested')>-1?'hide':''}`}>
                                                                <div dangerouslySetInnerHTML={{ __html: value.why_get_tested }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="test-sub-accordion">
                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self,'test_include')}>This test may include <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className={`acrd-sub-content' ${self.state.tabsValue.indexOf('test_include')>-1?'hide':''}`}>
                                                                <ul>
                                                                {Object.entries(value.test_may_include).map(function([k,test_include]) {
                                                                    return <li>{test_include}</li>
                                                                })}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="test-sub-accordion">
                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self,'test_preparations')}>Preparations for the test <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className={`acrd-sub-content' ${self.state.tabsValue.indexOf('test_preparations')>-1?'hide':''}`}>
                                                                <div dangerouslySetInnerHTML={{ __html: value.preparations }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="test-sub-accordion">
                                                            <button className="tst-sub-acrd-heading" onClick={self.ButtonHandler.bind(self,'test_faq')}>FAQ <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className={`acrd-sub-content ${self.state.tabsValue.indexOf('test_faq')>-1?'hide':''}`}>
                                                                <ul>
                                                                <li dangerouslySetInnerHTML={{ __html: value.faq }}></li>
                                                                    <li>To review your overall health</li>
                                                                    <li> To diagnose a medical condtion</li>
                                                                    <li> To monitor a medical conditio</li>
                                                                    <li> To monitor medical treatment</li>
                                                                </ul>
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
                        </section>

                    </div>
                </div>
                </section> 
                <ChatPanel />      
                </section>          
                </div>
                </div>
                
                </div>
            )
        } else {
            return (<div>

            </div>)
        }
    }
}
export default SearchTestView