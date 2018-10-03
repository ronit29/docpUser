import React from 'react';
import { connect } from 'react-redux';

import { getLabByUrl, getLabById, selectLabTimeSLot, toggleDiagnosisCriteria, getLabTests } from '../../actions/index.js'

import LabView from '../../components/diagnosis/lab/index.js'

class Lab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id || null,
            defaultTest:[]
        }
    }

    static loadData(store, match) {
        if (match.params.id) {
            return store.dispatch(getLabById(match.params.id))
        } else {
            let url = match.url
            if (url) {
                url = url.split("/")[1]
            }
            return new Promise((resolve, reject) => {
                store.dispatch(getLabByUrl(url, [], (labId, url) => {
                    if (labId) {
                        resolve(labId)
                    } else {
                        reject({
                            url: url
                        })
                    }
                }))
            })
        }
    }

    static contextTypes = {
        router: () => null
    }

    componentDidMount() {
        let lab_id ;
        if (this.props.match.params.id) {
            let testIds = this.props.lab_test_data[this.props.match.params.id] || []
            lab_id = this.props.match.params.id

            if(!testIds.length){
                this.props.getLabTests(lab_id, '', true,(searchResults) => {
                    if (searchResults) {
                        this.setState({ defaultTest: searchResults })
                    }
                })
            }
            testIds = testIds.map(x => x.id)

            this.props.getLabById(this.props.match.params.id, testIds)
        } else {
            let url = this.props.match.url
            if (url) {
                url = url.split("/")[1]
            }
            this.props.getLabByUrl(url, [], (labId) => {
                if (labId) {
                    lab_id = labId
                    this.setState({ selectedLab: labId })
                    let testIds = this.props.lab_test_data[labId] || []
                    
                    if(!testIds.length){console.log('ccccccccc');console.log(lab_id)
                        this.props.getLabTests(lab_id, '',true, (searchResults) => {
                            if (searchResults) {
                                this.setState({ defaultTest: searchResults })

                                testIds = this.props.lab_test_data[labId] || []
                                testIds = testIds.map(x => x.id)
                                this.props.getLabById(labId, testIds)
                            }
                        })
                    }
                    
                }
            })
        }

        
        //always clear selected time at lab profile
        let slot = { time: {} }
        this.props.selectLabTimeSLot(slot, false)
    }

    render() {
        return (
            <LabView {...this.props} selectedLab={this.state.selectedLab} defaultTest ={this.state.defaultTest}/>
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    /**
     * initialServerData is server rendered async data required build html on server. 
     */
    let initialServerData = null
    let { staticContext } = passedProps
    if (staticContext && staticContext.data) {
        initialServerData = staticContext.data
    }

    const {
        lab_test_data,
        selectedLocation,
        selectedCriterias,
        filterCriteria,
        LOADED_SEARCH_CRITERIA_LAB
    } = state.SEARCH_CRITERIA_LABS

    let LABS = state.LABS

    return {
        lab_test_data,
        selectedCriterias,
        LABS, initialServerData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLabByUrl: (url, testIds, cb) => dispatch(getLabByUrl(url, testIds, cb)),
        getLabById: (labId, testIds) => dispatch(getLabById(labId, testIds)),
        selectLabTimeSLot: (slot, reschedule) => dispatch(selectLabTimeSLot(slot, reschedule)),
        toggleDiagnosisCriteria: (type, criteria, forceAdd) => dispatch(toggleDiagnosisCriteria(type, criteria, forceAdd)),
        getLabTests: (labid, search_string, callback) => dispatch(getLabTests(labid, search_string, callback))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lab);
