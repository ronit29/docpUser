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

        return (
            <div className="orderDetails">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        Order Details
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}


export default OrderDetails
