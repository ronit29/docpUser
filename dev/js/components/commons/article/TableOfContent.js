import React from 'react';

class TableOfContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let searchTestInfoData = this.props.searchTestInfoData
        let about_test = searchTestInfoData.about_test
        let why_get_tested = searchTestInfoData.why_get_tested
        let test_may_include = searchTestInfoData.test_may_include
        let this_package_will_include = searchTestInfoData.this_package_will_include
        let preparations = searchTestInfoData.preparations
        let faqs = searchTestInfoData.faqs

        let resp_test_id = this.props.resp_test_id
        
        return (
            <div className="widget table-of-content">
                <div className="widget-content">
                    <p className="fw-500 mrb-10">Table of Content</p>
                    <ul className="related-articles-list">
                        {
                            about_test && about_test.value != "" ?
                                <a href="#about-test" onClick={() => this.props.updateTabsValues('about_test_' + resp_test_id)}><li className="mrb-5">{about_test.title}</li></a> : ''
                        }
                        {
                            why_get_tested.value != "" ?
                                <a href="#why-get-tested" onClick={() => this.props.updateTabsValues('why_get_tested_' + resp_test_id)}><li className="mrb-5">{why_get_tested.title}</li></a> : ''
                        }
                        {
                            test_may_include.value.length > 0 ?
                                <a href="#test-includes" onClick={() => this.props.updateTabsValues('test_include_' + resp_test_id)}><li className="mrb-5">{test_may_include.title}</li></a> : ''
                            
                        }
                        {
                            this_package_will_include && this_package_will_include.tests && this_package_will_include.tests.length > 0 ?
                                <a href="#package-includes" onClick={() => this.props.updateTabsValues('test_include_' + resp_test_id)}><li className="mrb-5">{this_package_will_include.title}</li></a> : ''
                        }
                        {
                            preparations.value != '' ?
                                <a href="#test-preparations" onClick={() => this.props.updateTabsValues('test_preparations_' + resp_test_id)}><li className="mrb-5">{preparations.title}</li></a> : ''
                        }
                        {
                            faqs.length > 0 ?
                                <a href="#test-faq" onClick={() => this.props.updateTabsValues('test_faq_' + resp_test_id)}><li className="mrb-5">{faqs[0].title}</li></a> : ''
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default TableOfContent