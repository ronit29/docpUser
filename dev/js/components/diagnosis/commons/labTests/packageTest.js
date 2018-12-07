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
        let { deal_price, mrp, pre_test_info } = test
        let test_package = test.package || []
        return (
            <li key={i} style={{paddingRight: '0px'}} className="clearfix" key={i}>
                <label className="ck-bx" style={{fontWeight: '400', fontSize: '14px'}} >
                    <p style={{paddingRight: '120px'}} onClick={(e) => {
                        this.props.toggleTest.bind(this, test)
                        e.preventDefault()
                        e.stopPropagation()
                        }}>
                    {test.test.name}
                        <button className="pkg-info-btn" onClick={() => { toggle('showPackageInfo', test) }}>
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/info.svg"} />
                            </button>
                        
                    </p>
                    <input type="checkbox" value="on" checked={this.props.test.is_selected ? true : false} onChange={(e) => {
                        this.props.toggleTest.bind(this, test)
                        e.preventDefault()
                        e.stopPropagation()
                    }}/>
                    <span className="checkmark"></span>

                </label>
                <button className="pkg-info-btn info-san" onClick={() => this.packageNameClick()}>
                        <span className="">{this.state.testListVisible?'View less':'View all'}</span>
                    </button>
                {
                    test.hide_price ? "" :<span className="test-price text-sm">₹ {deal_price}<span className="test-mrp">₹ {mrp}</span></span>

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
                    this.state.testListVisible ?
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