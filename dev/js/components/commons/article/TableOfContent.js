import React from 'react';

class TableOfContent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { about_test, why_get_tested, test_may_include, this_package_will_include, preparations, faqs } = this.props.searchTestInfoData
        let resp_test_id = this.props.resp_test_id
        
        return (
            <div className="widget table-of-content">
                <div className="widget-content">
                    <p className="fw-500 mrb-10">Table of Content</p>
                    <ul className="related-articles-list">
                        {
                            about_test && about_test.value && about_test.title?
                                <a href="#about-test" onClick={() => this.props.updateTabsValues('about_test_' + resp_test_id)}><li className="mrb-5">{about_test.title}</li></a> : ''
                        }
                        {
                            why_get_tested && why_get_tested.value && why_get_tested.title?
                                <a href="#why-get-tested" onClick={() => this.props.updateTabsValues('why_get_tested_' + resp_test_id)}><li className="mrb-5">{why_get_tested.title}</li></a> : ''
                        }
                        {
                            test_may_include && test_may_include.title && test_may_include.value &&  test_may_include.value.length > 0 ?
                                <a href="#test-includes" onClick={() => this.props.updateTabsValues('test_include_' + resp_test_id)}><li className="mrb-5">{test_may_include.title}</li></a> : ''
                            
                        }
                        {
                            this_package_will_include && this_package_will_include.title && this_package_will_include.tests && this_package_will_include.tests.length > 0 ?
                                <a href="#package-includes" onClick={() => this.props.updateTabsValues('test_include_' + resp_test_id)}><li className="mrb-5">{this_package_will_include.title}</li></a> : ''
                        }
                        {
                            preparations && preparations.title && preparations.value?
                                <a href="#test-preparations" onClick={() => this.props.updateTabsValues('test_preparations_' + resp_test_id)}><li className="mrb-5">{preparations.title}</li></a> : ''
                        }
                        {
                            faqs && faqs.length > 0 && faqs[0].title?
                                <a href="#test-faq" onClick={() => this.props.updateTabsValues('test_faq_' + resp_test_id)}><li className="mrb-5">{faqs[0].title}</li></a> : ''
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default TableOfContent