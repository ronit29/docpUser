import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state={focusInput:0}
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    componentWillReceiveProps(props){
        if(props.locationType && props.locationType!="geo"){
            this.setState({ focusInput: 0 })
        }
    }

    searchProceed(doctor_name, hospital_name) {
        if(this.props.locationType =="geo"){
            this.setState({focusInput:1})

            if (window) {
            window.scrollTo(0, 0)
            }
            
            return null 
        }

        let selectedCriterias = ((doctor_name && doctor_name.length > 0) || (hospital_name && hospital_name.length > 0)) ? [] : this.props.selectedCriterias
        selectedCriterias = selectedCriterias.map((x) => {
            delete x.icon
            return x
        })
        let data = {
            'Category': 'ConsumerApp', 'Action': 'ShowDoctorsClicked', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'show-doctors-clicked'
        }
        GTM.sendEvent({ data: data })

        let url = this.buildURI(selectedCriterias, this.props.selectedLocation, this.props.filterCriteria, doctor_name, hospital_name)
        this.props.history.push(url)
    }

    buildURI(selectedCriterias, selectedLocation, filterCriteria, doctor_name, hospital_name) {
        let specialization_ids = selectedCriterias
            .filter((x) => {
                return x.type == "speciality"
            }).map((x) => {
                return x.id
            }).join(',')

        let condition_ids = selectedCriterias
            .filter((x) => {
                return x.type == "condition"
            }).map((x) => {
                return x.id
            }).join(',')


        let lat = 28.644800
        let long = 77.216721
        let place_id = ""

        if (selectedLocation) {
            place_id = selectedLocation.place_id
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()

            lat = parseFloat(parseFloat(lat).toFixed(6))
            long = parseFloat(parseFloat(long).toFixed(6))
        }

        let min_distance = filterCriteria.distanceRange[0]
        let max_distance = filterCriteria.distanceRange[1]
        let min_fees = filterCriteria.priceRange[0]
        let max_fees = filterCriteria.priceRange[1]
        let sort_on = filterCriteria.sort_on || ""
        let is_available = filterCriteria.is_available
        let is_female = filterCriteria.is_female

        let url = `/opd/searchresults?specializations=${specialization_ids}&conditions=${condition_ids}&lat=${lat}&long=${long}&min_fees=${min_fees}&max_fees=${max_fees}&min_distance=${min_distance}&max_distance=${max_distance}&sort_on=${sort_on}&is_available=${is_available}&is_female=${is_female}&doctor_name=${doctor_name}&hospital_name=${hospital_name}&place_id=${place_id}`

        return url
    }

    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for disease or doctor" type="opd" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)} focusInput={this.state.focusInput}>
                    <section className="opd-search-section mbl-pdng-zero">
                        {
                            this.state.focusInput
                            ?<div>
                                <p className="location-error-msg">Please Select Location</p>
                            </div>
                            :''
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
                            heading="Common Conditions"
                            type="condition"
                            data={this.props.conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />
                        
                        <button onClick={this.searchProceed.bind(this, "", "")} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Doctors</button>

                    </section>
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchCriteriaView
