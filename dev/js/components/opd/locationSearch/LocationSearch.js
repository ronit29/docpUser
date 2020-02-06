import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Loader from '../../commons/Loader'
import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'
import SnackBar from 'node-snackbar'
import GTM from '../../../helpers/gtm.js'
import { _autoCompleteService, _getlocationFromLatLong, _getLocationFromPlaceId } from '../../../helpers/mapHelpers'
import ExpansionPanel from '../../diagnosis/commons/labTests/expansionPanel';
const queryString = require('query-string');

class LocationSearch extends React.Component {
    constructor(props) {
        super(props)
        const parsed = queryString.parse(this.props.location.search)
        this.state = {
            search: "",
            searchResults: [],
            detectLoading: false,
            redirect_to: parsed.redirect_to,
            defaultTest: [],
            radioChecked: "",
            testName: '',
            showLocationResult: true
        }
    }

    getLocation(location) {
        _autoCompleteService(location, function (results, status) {
            results = results || []
            this.setState({ searchResults: results })
        }.bind(this))
    }

    inputHandler(e) {
        this.setState({
            search: e.target.value,
            showLocationResult: true
        })
        this.getLocation(e.target.value)

    }

    selectLocation(location) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not select location." });
            }
        }, 5000)
        this.setState({ detectLoading: true, search: location.description, showLocationResult: false })

        _getLocationFromPlaceId(location.reference, (location_object) => {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'UserLocation', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'user-location', 'location': location_object.name || '', 'place_id': location_object.place_id || '', 'formatted_address': location_object.formatted_address || ''
            }
            GTM.sendEvent({ data: data })

            this.props.selectLocation(location_object, 'autoComplete').then(() => {
                this.setState({ detectLoading: false })
                if (this.state.redirect_to) {
                    if (this.props.location.search && this.props.location.search.includes('?lab_card=true')) {
                        // do nothing
                    } else {
                        if (this.state.redirect_to.includes('searchresults')) {
                            this.props.history.replace(this.state.redirect_to)
                            return
                        }
                        this.props.history.push(this.state.redirect_to)
                    }
                } else {
                    if (this.props.location.search && this.props.location.search.includes('?lab_card=true')) {
                        // do nothing
                    } else {
                        this.props.history.go(-1)
                    }
                }
            })
        })
    }

    componentDidMount() {
        let input = document.getElementById('topLocationSearch')
        input.focus()
        if (this.props.location.search && this.props.location.search.includes('?lab_card=true')) {
            const parsed = queryString.parse(this.props.location.search)
            let testIds = []
            if (parsed.id) {
                testIds = parsed.id.split(',').map(x => parseInt(x))
                this.setState({ defaultTest: testIds })
            }
            this.props.fetchTestList(parsed.id || '');
        }
    }

    detectLocation() {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }
        }, 5000)

        this.setState({ detectLoading: true })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                _getlocationFromLatLong(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude), 'locality', (location_object) => {
                    this.props.selectLocation(location_object, 'autoDetect').then(() => {
                        clearTimeout(timeout)
                        if (this.state.redirect_to) {
                            if (this.props.location.search && this.props.location.search.includes('?lab_card=true')) {
                                // do nothing
                            } else {
                                this.props.history.push(this.state.redirect_to)
                            }
                        } else {
                            if (this.props.location.search && this.props.location.search.includes('?lab_card=true')) {
                                // do nothing
                            } else {
                                this.props.history.go(-1)
                            }
                        }
                        this.setState({ detectLoading: false })
                    })
                })
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            }, (a, b, c) => {
                this.setState({ detectLoading: false })
                SnackBar.show({ pos: 'bottom-center', text: "Could not fetch location." });
            })
        }
        else {
            this.setState({ detectLoading: false })
            // geolocation is not supported
        }
    }

    static contextTypes = {
        router: () => null
    }

    selectCategoryTests(catId, test) {
        this.setState({ radioChecked: test.id, testName: test.name, defaultTest: [] })
    }

    doneBtnClick() {
        var selectedTest = {}
        if (this.state.radioChecked) {
            selectedTest.name = this.state.testName;
            selectedTest.id = this.state.radioChecked;
            this.props.toggleDiagnosisCriteria('test', selectedTest || {}, true);
        }
        this.props.history.go(-1);
    }

    focusOut() {
        let data = {
            'Category': 'ConsumerApp', 'Action': 'locationInputFocusOut', 'CustomerID': GTM.getUserId(), 'leadid': 0, 'event': 'location-search-focus-out', 'searchString': this.state.search
        }
        GTM.sendEvent({ data: data })
    }

    render() {

        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }} >
                <ProfileHeader />
                <section className="container parent-section parent-section-temp">
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <header className="skin-white location-detect-header searcLocationHeaderPadding"  >
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12" style={{ paddingTop: 10 }}>

                                            <div className="serch-nw-inputs">
                                                <input className="new-srch-inp" autoComplete="off" placeholder="Enter any city or locality" value={this.state.search} onChange={this.inputHandler.bind(this)} id="topLocationSearch" disabled={this.state.detectLoading} onBlur={() => this.focusOut()} />
                                                <img className="srch-inp-img" src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />
                                                <button className="srch-inp-btn-img" onClick={this.detectLocation.bind(this)}>Auto Detect <img src={ASSETS_BASE_URL + "/img/loc-track.svg"} /></button>
                                            </div>

                                            {/* <div className="search-row">
                                                <div className="adon-group location-detect-field">
                                                    <input type="text" value={this.state.search} onChange={this.inputHandler.bind(this)} className="form-control input-md search-input no-shadow" placeholder="Select any city or locality" id="topLocationSearch" disabled={this.state.detectLoading} />
                                                    <span className="ct-img ct-img-sm map-marker-blue"><img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} className="img-fluid" /></span>
                                                </div>
                                                <div className="detect-my-locaiton" onClick={this.detectLocation.bind(this)}>
                                                    <span className="ct-img ct-img-xs"><img src={ASSETS_BASE_URL + "/img/customer-icons/gps.svg"} className="img-fluid" /></span>Detect My Location
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {
                                this.state.detectLoading ? <div className="fullscreen"><Loader /></div> : ""
                            }
                            {
                                this.state.searchResults && this.state.searchResults.length && this.state.showLocationResult ?
                                    <section style={{ paddingBottom: 50, paddingTop: 0 }} className="locaton-detect-screen" >
                                        <div className=" widget widget-panel">
                                            <h4 className="panel-title widget-panel-grey">Search Result</h4>
                                            <div className="common-search-container pt-0">
                                                <div className="common-listing-cont">
                                                    <ul className="list city-list">
                                                        {
                                                            this.state.searchResults.map((result, i) => {
                                                                return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                                    <p>
                                                                        <a className="d-flex justify-content-between align-item-center w-100">{result.description}
                                                                        <span className="city-loc">City</span>
                                                                        </a>
                                                                    </p>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section> : ''
                            }
                            {
                                this.props.location.search && this.props.location.search.includes('?lab_card=true') ?
                                    <section className="lc-select-test widget-panel">
                                        <h4 className="panel-title">Select Test</h4>
                                        {
                                            this.props.testList && this.props.testList.length ?
                                                this.props.testList.filter(x => x.tests.length > 0).map((test, i) => {
                                                    return <ExpansionPanel
                                                        key={i}
                                                        locationSearch={true}
                                                        heading={test.category_name}
                                                        contentList={test.tests}
                                                        categoryId={test.category_id}
                                                        radioChecked={this.state.radioChecked}
                                                        selectCategory={this.selectCategoryTests.bind(this)}
                                                        defaultTest={this.state.defaultTest}
                                                    />
                                                }) : ''
                                        }
                                        <button className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={() => this.doneBtnClick()}>Done</button>
                                    </section> : ''
                            }
                            <div id="map" style={{ display: 'none' }}></div>
                        </div>

                        {
                            this.props.location.search && this.props.location.search.includes('?lab_card=true') ?
                                <RightBar extraClass=" chat-float-btn-2" msgTemplate="gold_general_template"/> :
                                <RightBar msgTemplate="gold_general_template"/>
                        }
                    </div>
                </section>
            </div>
        );
    }
}


export default LocationSearch
