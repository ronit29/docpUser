import React from 'react';
import ExpansionPanel from './expansionPanel'

class PackageTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            testListVisible: props.test.is_selected ? true : false
        }
    }

    packageNameClick() {
        this.setState({ testListVisible: !this.state.testListVisible });
    }

    render() {
        let { i, test, toggle } = this.props
        let { deal_price, mrp, pre_test_info, insurance } = test
        let test_package = test.package || []
        let test_info
        if (test.test.show_details) {
            test_info= <span style={{'marginRight':'5px',marginTop:'2px',display:'inline-block'}} onClick={this.props.testInfo.bind(this,test.test.id,test.test.url)}>
                    <img src="https://cdn.docprime.com/cp/assets/img/icons/info.svg" />
            </span>
        }
        return (
            <li key={i} style={{ paddingRight: '0px' }} className="clearfix pdngRgt">
                <label className="ck-bx" style={{ fontWeight: '400', fontSize: '14px' }} >
                    <p style={{ paddingRight: '120px' }}>
                        {test.test.name} {test.test.show_details?test_info:''}
                    </p>
                    
                    {
                        test.number_of_tests ? <span style={{ fontSize: '12px', fontWeight: '600', color: '#757575',display: 'block', marginTop: 5 }}>{this.props.is_insurance_applicable?'':
                            `(includes ${test.number_of_tests} Tests)`}
                            {
                                this.props.is_plan_applicable && !this.props.is_insurance_applicable? <p className="pkg-discountCpn" style={{display:'inline-block',float:'right'}}>Docprime Care Benefit</p>:''
                            }
                            {
                                false && this.props.is_insurance_applicable && this.state.testListVisible?
                                <div className="ins-val-bx">Covered Under Insurance</div>
                                :''
                            }
                        </span> : ''
                    }
                    {
                        this.props.hide_price ?
                            <input type="checkbox" value="on" checked={this.props.test.is_selected ? true : false} />
                            : <input type="checkbox" value="on" checked={this.props.test.is_selected ? true : false} onChange={(e) => {
                                this.props.toggleTest(test)
                            }} />

                    }

                    <span className="checkmark"></span>

                </label>
                <div className="pdng-left-pkg">
                    <span style={{ paddingRight: '0px' }}>

                        {/*<button className="pkg-info-btn" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggle('showPackageInfo', test)
                        }}>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/info.svg"} />
                        </button>*/}

                    </span>
                    {
                        ( (this.props.is_insurance_applicable || !this.props.selectedTestsCount) && insurance.is_insurance_covered) || !test_package.length?''
                        :<button className="pkg-info-btn info-san" onClick={() => this.packageNameClick()}>
                            <span className="">{this.state.testListVisible ? 'Hide details' : 'View details'}</span>
                        </button>
                    }
                    
                </div>
                {
                 this.props.is_plan_applicable || test.hide_price || ( (this.props.is_insurance_applicable || !this.props.selectedTestsCount) && insurance.is_insurance_covered)? "" : <span className="test-price text-sm">₹ {parseInt(deal_price)}<span className="test-mrp">₹ {parseInt(mrp)}</span></span>

                }
                    
                {
                    this.props.is_plan_applicable || ( (this.props.is_insurance_applicable || !this.props.selectedTestsCount) && insurance.is_insurance_covered)? <span className="test-price text-sm">₹ 0</span>:''
                }
                {/*                 
                <div>
                    <span className="test-price">
                        {
                            test.hide_price ? "" : <span className="test-price">&#8377; {deal_price}<span className="test-mrp">&#8377; {mrp}</span></span>
                        }
                    </span>
                    <span className="test-name-item">
                        <input type="checkbox" checked={this.props.test.is_selected ? true : false} onChange={this.props.toggleTest.bind(this, test)} />
                        <span className="checkmark" />
                        <p className="pkg-info" onClick={() => this.packageNameClick()} >{test.test.name}
                            <button className="pkg-info-btn" onClick={() => { toggle('showPackageInfo', test) }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/info.svg"} />
                            </button>
                        </p>
                    </span>
                </div> */}
                {
                    !this.props.is_insurance_applicable && this.state.testListVisible ?
                        <ul className="list drop-down-list lisitng-in-lab">
                            {
                                test_package.map((pack, j) => {
                                    return <ExpansionPanel
                                        key={j}
                                        heading={pack.name}
                                        content={pack.why}
                                        contentList={pack.parameters || []}
                                    />
                                })
                            }
                        </ul> : ''
                }
            </li>
        );
    }
}

export default PackageTest