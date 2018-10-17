import React from 'react';
import ExpansionPanel from './expansionPanel'

export default ({ i, test, toggle }) => {
    let { deal_price, mrp, pre_test_info } = test
    let test_package = test.package || []
    return <li className="clearfix" key={i}>
        <div>
            <span className="test-price">
                <span className="pkg-current-price">&#8377; {deal_price}</span>
                <span className="pkg-old-price">&#8377; {mrp}</span>
            </span>
            <span className="test-name-item">
                <p className="pkg-info">aaaaaaaaaa  <button className="pkg-info-btn" onClick={() => {
                    toggle('showPackageInfo', test)
                }}>
                <img src={ASSETS_BASE_URL + "/img/customer-icons/info.svg"} />
                </button></p>
            </span>
        </div>
        <ul className="list drop-down-list">
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
        </ul>

    </li>
}