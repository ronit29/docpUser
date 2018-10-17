import React from 'react';
import ExpansionPanel from './expansionPanel'

export default ({ i, test }) => {
    let { deal_price, mrp } = test
    let test_package = test.package || []
    return <li className="clearfix" key={i}>
        <p>aaaaaaaaaa</p>
        {deal_price}
        {mrp}
        <ul className="list drop-down-list">
            {
                test_package.map((pack, j) => {
                    return <ExpansionPanel
                        key={j}
                        heading={pack.name}
                        contentList={pack.parameters || []}
                    />
                })
            }
        </ul>

    </li>
}