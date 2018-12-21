import React from 'react';
import { connect } from 'react-redux';

import CommonlySearched from '../../commons/commonlySearched/index.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import GTM from '../../../helpers/gtm.js'

class SearchCriteriaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focusInput: 0
        }
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

    searchProceed(lab_name = "") {
        // handle doctor name, hospital name
        this.props.mergeLABState({
            filterCriteria: {
                ...this.props.filterCriteria,
                lab_name
            }
        }, true)
        this.props.history.push('/lab/searchresults')
    }

    showLabs() {
        if (this.props.locationType == "geo") {
            this.setState({ focusInput: 1 })
            if (window) {
                window.scrollTo(0, 0)
            }
            return null
        }
        this.searchProceed("")
    }

    render() {

        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <CriteriaSearch {...this.props} checkForLoad={this.props.LOADED_SEARCH_CRITERIA_LAB} title="Search for tests or lab" paddingTopClass={true} searchProceed={this.searchProceed.bind(this)}>
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
                </CriteriaSearch>

            </div>
        );
    }
}

export default SearchCriteriaView
