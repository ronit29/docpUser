import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'

class SearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    searchProceedOPD(doctor_name = "", hospital_name = "") {
        // handle doctor name, hospital name
        this.props.mergeOPDState({
            filterCriteria: {
                ...this.props.filterCriteria,
                doctor_name, hospital_name
            }
        }, true)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowDoctorsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-doctors-clicked'
        }
        GTM.sendEvent({ data: data })

        this.props.history.push({
            pathname: '/opd/searchresults',
            state: { search_back: true }
        })
    }

    searchProceedLAB(lab_name = "") {
        // handle doctor name, hospital name
        this.props.mergeLABState({
            filterCriteria: {
                ...this.props.filterCriteria,
                lab_name
            }
        }, true)

        this.props.history.push({
            pathname: '/lab/searchresults',
            state: { search_back: true }
        })
    }

    showDoctors() {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }
        this.props.cloneCommonSelectedCriterias(this.props.selectedCriterias)
        this.searchProceedOPD("", "")
    }

    showLabs() {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }
        this.searchProceedLAB("")
    }

    render() {
        return (
            <section>
                <div id="map" style={{ display: 'none' }}></div>
                <div className="container-fluid">

                    {
                        this.props.selected == "opd" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for disease or doctor" type="opd" paddingTopClass={true} searchProceed={this.searchProceedOPD.bind(this)} focusInput={this.state.focusInput}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.filter(x => !x.type.includes("procedures")).length > 0) ? <CommonlySearched
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias.filter(x => !x.type.includes("procedures"))}
                                        selectedPills={true}
                                        selected={[]}
                                        toggle={this.props.toggleOPDCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched
                                    heading="Common Specialities"
                                    type="speciality"
                                    data={this.props.specializations}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'speciality')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <CommonlySearched
                                    heading="Common Conditions"
                                    type="condition"
                                    data={this.props.conditions}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <button onClick={this.showDoctors.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg static-btn">Show Doctors</button>

                            </section>
                        </CriteriaSearch> : ""
                    }

                    {
                        this.props.selected == "lab" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_LAB} title="Search for tests or lab" paddingTopClass={true} searchProceed={this.searchProceedLAB.bind(this)}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) ? <CommonlySearched
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias}
                                        selected={[]}
                                        selectedPills={true}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched
                                    heading="Common Test"
                                    type="test"
                                    data={this.props.common_tests}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'test')}
                                    toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                />

                                <button onClick={this.showLabs.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg static-btn">Show Labs</button>

                            </section>
                        </CriteriaSearch> : ""
                    }

                    {
                        this.props.selected == "procedures" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for disease or doctor" type="opd" paddingTopClass={true} searchProceed={this.searchProceedOPD.bind(this)} focusInput={this.state.focusInput}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.filter(x => x.type.includes("procedures")).length > 0) ? <CommonlySearched
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias.filter(x => x.type.includes("procedures"))}
                                        selectedPills={true}
                                        selected={[]}
                                        toggle={this.props.toggleOPDCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched
                                    heading="Common Dental Treatments"
                                    type="procedures_category"
                                    data={this.props.procedure_categories}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'procedures_category')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <button onClick={this.showDoctors.bind(this)} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg static-btn">Show Doctors</button>

                            </section>
                        </CriteriaSearch> : ""
                    }


                </div>
            </section>
        );
    }
}

export default SearchView
