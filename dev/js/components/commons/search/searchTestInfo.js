import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'

class SearchTestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
    render() {
        console.log(this.props.searchTestInfoData)
        if (this.props.searchTestInfoData.length > 0) {
            return (
                <div>
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
                                                        <div className="test-info-acrd-head-main">
                                                            <button className="test-top-main-haeding">Thyrocare Aarogyam 5 Package <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className="tst-main-acrd-data">
                                                                <div className="test-sub-accordion">
                                                                    <button className="tst-sub-acrd-heading">About the test <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className="acrd-sub-content">
                                                                        <p>Complete Blood Count</p>
                                                                        <p>A complete blood count, or CBC, is an easy and very common test that screens for certain disorders that can affect your health.</p>
                                                                        <p>A CBC determines if there are any increases or decreases in your blood cell counts. Normal values vary depending on your age and your gender. Your lab report will tell you the normal value range for your age and gender.</p>
                                                                        <p>A CBC can help diagnose a broad range of conditions, from anemia and infection to cancer.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="test-sub-accordion">
                                                                    <button className="tst-sub-acrd-heading">Why get tested? <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className="acrd-sub-content">
                                                                        <ul>
                                                                            <li>To review your overall health</li>
                                                                            <li> To diagnose a medical condtion</li>
                                                                            <li> To monitor a medical conditio</li>
                                                                            <li> To monitor medical treatment</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="test-info-continer-block">
                                                        <div className="test-info-acrd-head-main">
                                                            <button className="test-top-main-haeding">Thyrocare Aarogyam 5 Package <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                            <div className="tst-main-acrd-data">
                                                                <div className="test-sub-accordion">
                                                                    <button className="tst-sub-acrd-heading">About the test <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className="acrd-sub-content">
                                                                        <p>Complete Blood Count</p>
                                                                        <p>A complete blood count, or CBC, is an easy and very common test that screens for certain disorders that can affect your health.</p>
                                                                        <p>A CBC determines if there are any increases or decreases in your blood cell counts. Normal values vary depending on your age and your gender. Your lab report will tell you the normal value range for your age and gender.</p>
                                                                        <p>A CBC can help diagnose a broad range of conditions, from anemia and infection to cancer.</p>
                                                                    </div>
                                                                </div>
                                                                <div className="test-sub-accordion">
                                                                    <button className="tst-sub-acrd-heading">Why get tested? <span><img className="img-fluid" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></span></button>
                                                                    <div className="acrd-sub-content">
                                                                        <ul>
                                                                            <li>To review your overall health</li>
                                                                            <li> To diagnose a medical condtion</li>
                                                                            <li> To monitor a medical conditio</li>
                                                                            <li> To monitor medical treatment</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>

                    </section>
                    <section>
                        <h1>Test Information</h1>
                        {Object.entries(this.props.searchTestInfoData).map(function ([key, value]) {
                            return <div id={value.id}>
                                <h1>{value.preparations}</h1>
                                <p>{value.about_test}</p>
                                <p dangerouslySetInnerHTML={{ __html: value.why_get_tested }}></p>
                                {Object.entries(value.test_may_include).map(function ([k, test_include]) {
                                    return <p>{test_include}</p>
                                })}
                                <p>{value.preparations}</p>
                                <p>{value.faqs}</p>
                            </div>
                        })}
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