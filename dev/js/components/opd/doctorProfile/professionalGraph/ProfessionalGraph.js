import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

class ProfessionalGraph extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="professionalGraph">
                <h5>Professional Graph</h5>
                <div className="epanel">
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Education
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Memberships
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Experience
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Specializations
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            Awards
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        );
    }
}


export default ProfessionalGraph
