import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';


class OrderDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let price_breakup = []
        let totalPrice = 0
        let totalTests = 0
        if (this.props.data.price_breakup && this.props.data.price_breakup.breakup) {
            price_breakup = this.props.data.price_breakup.breakup.map((test, i) => {
                totalPrice += test.amount
                totalTests++
                return <div className="testPriceRow" key={i}>
                    <span className="tname">{test.name}</span>
                    <span className="tamount">Rs. {test.amount}</span>
                </div>
            })
        }

        return (
            <div className="orderDetails">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Order Details - {totalTests} Tests
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="priceCont">
                            {price_breakup}
                            <div className="testTotalRow">
                                <span className="tname">{"Total"}</span>
                                <span className="tamount">Rs. {totalPrice}</span>
                            </div>
                            <div className="testTotalRow">
                                <span className="tname">{"GST"}</span>
                                <span className="tamount">Rs. {totalPrice*1.18}</span>
                            </div>
                            <div className="testTotalRow">
                                <span className="tname">{"Payable"}</span>
                                <span className="tamount">Rs. {totalPrice*1.18}</span>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}


export default OrderDetails
