import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel, {
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const Widget = ({ heading, contentList }) => {
    return <li>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div className="title">
                    {heading} <span className="float-right"></span>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="more-content">
                    {
                        contentList.map((cont, i) => {
                            return <div className="form-group" key={i}>
                                <label className="fw-700 text-sm text-primary">{cont.heading}</label>
                                <p className="fw-700 text-md text-light">{cont.content}</p>
                            </div>
                        })
                    }
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    </li>
}


class ProfessionalGraph extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let { name, profile_img, qualifications, phone_number, email, practicing_since, gender, languages, license, mobiles, awards, associations, medical_services, experiences } = this.props.details

        qualifications = qualifications[0]

        return (
            <div className="widget-panel">
                <h4 className="panel-title">Professional Graph</h4>
                <div className="panel-content pd-0">
                    <ul className="list drop-down-list">
                        {
                            qualifications ? <Widget
                                heading={"Qualification"}
                                contentList={[
                                    { heading: "Qualification", content: qualifications.qualification },
                                    { heading: "Specialization", content: qualifications.specialization },
                                    { heading: "College", content: qualifications.college }
                                ]}
                            /> : ""
                        }

                        {
                            languages && languages.length ? <Widget
                                heading={"Language"}
                                contentList={[
                                    {
                                        heading: "Known Language", content: languages.reduce((final, curr) => {
                                            final += `${curr.language} | `
                                            return final
                                        }, "")
                                    }
                                ]}
                            /> : ""
                        }

                        {
                            awards && awards.length ? <Widget
                                heading={"Awards"}
                                contentList={
                                    awards.map((award) => {
                                        return { heading: "", content: `${award.name}, ${award.year}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            associations && associations.length ? <Widget
                                heading={"Associate Membership"}
                                contentList={
                                    associations.map((association) => {
                                        return { heading: "", content: `${association.name}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            experiences && experiences.length ? <Widget
                                heading={"Experience"}
                                contentList={
                                    experiences.map((experience) => {
                                        return { heading: "", content: `${experience.hospital}, ${experience.start_year} - ${experience.end_year}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            medical_services && medical_services.length ? <Widget
                                heading={"Subscribed Services"}
                                contentList={
                                    medical_services.map((service) => {
                                        return { heading: "", content: `${service.name}` }
                                    })
                                }
                            /> : ""
                        }
                    </ul>
                </div>
            </div>
        );
    }
}


export default ProfessionalGraph
