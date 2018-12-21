import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = { focusInput: 0 }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    componentWillReceiveProps(props) {
        if (props.locationType && props.locationType != "geo") {
            this.setState({ focusInput: 0 })
        }
    }

    searchProceed(doctor_name = "", hospital_name = "") {
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


        this.props.history.push('/opd/searchresults')
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
        this.searchProceed("", "")
    }

    render() {
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for disease or doctor" type="opd" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)} focusInput={this.state.focusInput}>
                    <section className="opd-search-section mbl-pdng-zero">
                        {
                            this.state.focusInput
                                ? <div>
                                    <p className="location-error-msg">Please Select Location</p>
                                </div>
                                : ''
                        }

                        {
                            (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) ? <CommonlySearched
                                heading={`View Selected (${this.props.selectedCriterias.length})`}
                                data={this.props.selectedCriterias}
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
                            heading="Common Dental Treatments"
                            type="procedures_category"
                            data={this.props.procedure_categories}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'procedures_category')}
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
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchCriteriaView
