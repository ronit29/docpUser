import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel from './ExpansionPanel';

class ProfessionalGraph extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        let { name, profile_img, qualifications, phone_number, email, practicing_since, gender, languages, license, mobiles, awards, associations, medical_services, experiences } = this.props.details

        qualifications = qualifications || []

        return (
            <div className="widget-panel">
                <h2 className="panel-title" style={{ marginBottom: 0 }} >Professional Graph of Dr. {name}</h2>
                <div className="panel-content expansion-content pd-0">
                    <ul className="list drop-down-list">
                        {
                            qualifications ? <ExpansionPanel
                                heading={"Qualification"}
                                contentList={qualifications}
                                qulification={true}
                                image={"/assets/img/customer-icons/Education-01.svg"}
                            /> : ""
                        }

                        {
                            languages && languages.length ? <ExpansionPanel
                                heading={"Language"}
                                image={"/assets/img/customer-icons/Language-01.svg"}
                                contentList={[
                                    {
                                        heading: "", content: languages.reduce((final, curr, i) => {
                                            final += `${curr.language}`;
                                            if (i < languages.length - 1) final += " | ";
                                            return final
                                        }, "")
                                    }
                                ]}
                            /> : ""
                        }

                        {
                            awards && awards.length ? <ExpansionPanel
                                heading={"Awards"}
                                image={"/assets/img/customer-icons/Award-01.svg"}
                                contentList={
                                    awards.map((award) => {
                                        award.year = award.year || ""
                                        if (award.year) {
                                            return { heading: "", content: `${award.name}, ${award.year}` }
                                        } else {
                                            return { heading: "", content: `${award.name}` }
                                        }
                                    })
                                }
                            /> : ""
                        }

                        {
                            associations && associations.length ? <ExpansionPanel
                                heading={"Associate Membership"}
                                image={"/assets/img/customer-icons/AssociateMembership.svg"}
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
                                image={"/assets/img/customer-icons/Experienced-01.svg"}
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
                                image={"/assets/img/customer-icons/SubscribedServices-01.svg"}
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
