import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel from './ExpansionPanel';

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
                <div className="panel-content expansion-content pd-0">
                    <ul className="list drop-down-list">
                        {
                            qualifications ? <ExpansionPanel
                                heading={"Qualification"}
                                contentList={[ qualifications, qualifications
                                    // { heading: "Qualification", content: qualifications.qualification },
                                    // { heading: "Specialization", content: qualifications.specialization },
                                    // { heading: "College", content: qualifications.college }
                                ]}
                                qulification={true}
                            /> : ""
                        }

                        {
                            languages && languages.length ? <ExpansionPanel
                                heading={"Language"}
                                contentList={[
                                    {
                                        heading: "", content: languages.reduce((final, curr) => {
                                            final += `${curr.language} | `
                                            return final
                                        }, "")
                                    }
                                ]}
                            /> : ""
                        }

                        {
                            awards && awards.length ? <ExpansionPanel
                                heading={"Awards"}
                                contentList={
                                    awards.map((award) => {
                                        return { heading: "", content: `${award.name}, ${award.year}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            associations && associations.length ? <ExpansionPanel
                                heading={"Associate Membership"}
                                contentList={
                                    associations.map((association) => {
                                        return { heading: "", content: `${association.name}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            experiences && experiences.length ? <ExpansionPanel
                                heading={"Experience"}
                                contentList={
                                    experiences.map((experience) => {
                                        return { heading: "", content: `${experience.hospital}, ${experience.start_year} - ${experience.end_year}` }
                                    })
                                }
                            /> : ""
                        }

                        {
                            medical_services && medical_services.length ? <ExpansionPanel
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
