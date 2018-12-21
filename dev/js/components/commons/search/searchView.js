import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'
import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'
const queryString = require('query-string');

class SearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }

        const parsed = queryString.parse(this.props.location.search)

        let data = {
            'Category': 'ConsumerApp', 'Action': 'OpenSearchPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': `open-search-from-${parsed.from || "default"}`, from: parsed.from
        }

        GTM.sendEvent({ data: data })
    }

    searchProceedOPD(doctor_name = "", hospital_name = "") {
        // handle doctor name, hospital name
        this.props.mergeOPDState({
            filterCriteria: {
                ...this.props.filterCriteria,
                doctor_name, hospital_name
            },
            page: 1
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
            },
            page: 1
        }, true)

        this.props.history.push({
            pathname: '/lab/searchresults',
            state: { search_back: true }
        })
    }

    showDoctors(type) {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }

        if (type) {
            this.props.filterSelectedCriteria(type)
        }

        if (type == 'opd') {
            this.props.cloneCommonSelectedCriterias(this.props.selectedCriterias.filter(x => !x.type.includes("procedures")))
        } else {
            this.props.cloneCommonSelectedCriterias(this.props.selectedCriterias.filter(x => x.type.includes("procedures")))
        }

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
                        this.props.selected == "opd" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for doctor or disease" type="opd" paddingTopClass={true} searchProceed={this.searchProceedOPD.bind(this)} focusInput={this.state.focusInput} hideHeaderOnMobile={true}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.filter(x => !x.type.includes("procedures")).length > 0) ? <CommonlySearched {...this.props}
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias.filter(x => !x.type.includes("procedures"))}
                                        selectedPills={true}
                                        selected={[]}
                                        toggle={this.props.toggleOPDCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched {...this.props}
                                    heading="Common Specialities"
                                    type="speciality"
                                    data={this.props.specializations}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'speciality')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <CommonlySearched {...this.props}
                                    heading="Common Conditions"
                                    type="condition"
                                    data={this.props.conditions}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'condition')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <button onClick={this.showDoctors.bind(this, 'opd')} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Doctors</button>

                            </section>
                        </CriteriaSearch> : ""
                    }

                    {
                        this.props.selected == "lab" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_LAB} title="Search for tests or lab" paddingTopClass={true} searchProceed={this.searchProceedLAB.bind(this)} focusInput={this.state.focusInput} hideHeaderOnMobile={true}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.length > 0) ? <CommonlySearched {...this.props}
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias}
                                        selected={[]}
                                        selectedPills={true}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched {...this.props}
                                    heading="Common Test"
                                    type="test"
                                    data={this.props.common_tests.filter(x => !x.is_package)}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'test').filter(x => !x.is_package)}
                                    toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                />

                                {
                                    this.props.common_tests.filter(x => x.is_package).length ? <CommonlySearched {...this.props}
                                        heading="Common Health Packages"
                                        type="test"
                                        data={this.props.common_tests.filter(x => x.is_package)}
                                        selected={this.props.selectedCriterias.filter(x => x.type == 'test').filter(x => x.is_package)}
                                        toggle={this.props.toggleDiagnosisCriteria.bind(this)}
                                    /> : ""
                                }

                                <button onClick={this.showLabs.bind(this)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Labs</button>

                            </section>
                        </CriteriaSearch> : ""
                    }

                    {
                        this.props.selected == "procedures" ? <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_OPD} title="Search for dental treatments" type="opd" paddingTopClass={true} searchProceed={this.searchProceedOPD.bind(this)} focusInput={this.state.focusInput} hideHeaderOnMobile={true}>
                            <section className="opd-search-section mbl-pdng-zero">

                                {
                                    (this.props.selectedCriterias && this.props.selectedCriterias.filter(x => x.type.includes("procedures")).length > 0) ? <CommonlySearched {...this.props}
                                        heading={`View Selected (${this.props.selectedCriterias.length})`}
                                        data={this.props.selectedCriterias.filter(x => x.type.includes("procedures"))}
                                        selectedPills={true}
                                        selected={[]}
                                        toggle={this.props.toggleOPDCriteria.bind(this)}
                                    /> : ""
                                }

                                <CommonlySearched {...this.props}
                                    heading="Common Dental Treatments"
                                    type="procedures_category"
                                    data={this.props.procedure_categories}
                                    selected={this.props.selectedCriterias.filter(x => x.type == 'procedures_category')}
                                    toggle={this.props.toggleOPDCriteria.bind(this)}
                                />

                                <button onClick={this.showDoctors.bind(this, 'procedures')} className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Show Doctors</button>

                            </section>
                        </CriteriaSearch> : ""
                    }


                </div>
            </section>
        );
    }
}

export default SearchView
