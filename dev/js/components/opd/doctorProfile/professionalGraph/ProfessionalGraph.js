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
            <div className="widget-panel">
                <h4 className="panel-title">Professional Graph</h4>
                <div className="panel-content pd-0">
                    <ul className="list drop-down-list">
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Education <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Associate Clinic/Hospital <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Language <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Awards <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Associate Membership <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Experinece <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                        <li>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <div className="title">
                                        Subscribed Serivces <span className="float-right"></span>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className="more-content">
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Qualification</label>
                                            <p className="fw-700 text-md text-light">MD</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">Specialization</label>
                                            <p className="fw-700 text-md text-light">Dermitology</p>
                                        </div>
                                        <div className="form-group">
                                            <label className="fw-700 text-sm text-primary">College</label>
                                            <p className="fw-700 text-md text-light">MGU University, 2009</p>
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default ProfessionalGraph
