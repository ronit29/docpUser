import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    searchProceed(doctor_name, hospital_name) {
        let selectedCriterias = ((doctor_name && doctor_name.length > 0) || (hospital_name && hospital_name.length > 0)) ? [] : this.props.selectedCriterias
        selectedCriterias = selectedCriterias.map((x) => {
            delete x.icon
            return x
        })
        let searchData = {
            selectedCriterias: selectedCriterias,
            selectedLocation: this.props.selectedLocation,
        }
        
        let data = {
        'Category':'ConsumerApp','Action':'ShowDoctorsClicked','CustomerID':GTM.getUserId(),'leadid':0,'event':'show-doctors-clicked'}
        GTM.sendEvent({ data: data })

        searchData = encodeURIComponent(JSON.stringify(searchData))
        let filterData = encodeURIComponent(JSON.stringify(this.props.filterCriteria))
        this.props.history.push(`/opd/searchresults?search=${searchData}&filter=${filterData}&doctor_name=${doctor_name}&hospital_name=${hospital_name}`, {
            scrollTop: true
        })
    }


    render() {
        return (
            <div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for disease or doctor" type="opd" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)}>
                    <section className="opd-search-section">
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
                            heading="Common Conditions"
                            type="condition"
                            data={this.props.conditions}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />

                        <CommonlySearched
                            heading="Common Specialities"
                            type="speciality"
                            data={this.props.specializations}
                            selected={this.props.selectedCriterias.filter(x => x.type == 'speciality')}
                            toggle={this.props.toggleOPDCriteria.bind(this)}
                        />

                        <button onClick={this.searchProceed.bind(this, "", "")} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Doctors</button>

                    </section>
                </CriteriaSearch>
            </div>
        );
    }
}

export default SearchCriteriaView
