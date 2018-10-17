import React from 'react';
import ExpansionPanel from './expansionPanel'

export default ({ i, test, toggle }) => {
    let { deal_price, mrp, pre_test_info } = test
    let test_package = test.package || []
    return <li className="clearfix" key={i}>
        <p>aaaaaaaaaa</p>
        <button onClick={() => {
            toggle('showPackageInfo', test)
        }}>OPEN</button>
        {deal_price}
        {mrp}
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