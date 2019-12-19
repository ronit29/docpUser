import React from 'react'
import SnackBar from 'node-snackbar'
import { _getlocationFromLatLong, _getLocationFromPlaceId, _autoCompleteService } from '../../../helpers/mapHelpers'
import GTM from '../../../helpers/gtm.js'

class LocationElementsView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            detectLoading: false,
            validationError: false,
            location_object: null,
            location_type: ''
        }
    }

    componentWillReceiveProps(props) {

        if (props.selectedLocation && this.props.selectedLocation) {
            if (this.state.search) {
                if (props.selectedLocation != this.props.selectedLocation) {
                    this.setState({ location_object: props.selectedLocation, search: props.selectedLocation.formatted_address })
                }
            } else if (!props.locationType.includes("geo")) {
                // this.setState({ location_object: props.selectedLocation, search: props.selectedLocation.formatted_address })
            }
        }
    }

    componentDidMount() {
        this.props.onRef(this)
        if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {

            this.setState({ location_object: this.props.selectedLocation, search: this.props.locationName || this.props.selectedLocation.formatted_address })

        }

        // if (!this.props.isTopbar) {
        //     setTimeout(() => {
        //         if (document.getElementById('doc-input-field')) {
        //             document.getElementById('doc-input-field').addEventListener('focusin', () => {
        //                 let search_val = ""
        //                 if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
        //                     search_val = this.props.locationName || this.props.selectedLocation.formatted_address
        //                 }
        //                 if (this.state.search == search_val) {
        //                     this.props.getCityListLayout()
        //                     this.setState({ location_object: null, search: '' })
        //                 }
        //             })

        //             document.getElementById('doc-input-field').addEventListener('focusout', () => {
        //                 if (!this.state.search) {
        //                     if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
        //                         this.setState({ location_object: this.props.selectedLocation, search: this.props.locationName || this.props.selectedLocation.formatted_address })
        //                     }
        //                     this.props.getCityListLayout()
        //                 }
        //                 // this.setState({ location_object: null, search: '' })
        //             })
        //         }
        //     }, 500)
        // }
    }

    onfocus(e) {
        if (!this.props.isTopbar) {
            let search_val = ""

            if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
                search_val = this.props.locationName || this.props.selectedLocation.formatted_address
            }
            if (this.state.search == search_val) {
                this.props.getCityListLayout()
                this.setState({ location_object: null, search: '' })
            }
        }
        if (e.target.getAttribute('id') === 'article-type-input-field') {
            var top = document.getElementsByClassName('articleTypeloc')[0];
            if(top.offsetParent) {
                window.scroll(0, top.offsetParent.offsetTop);
            }
        }
    }

    onblur() {
        if (!this.props.isTopbar) {
            if (!this.state.search) {
                if (this.props.locationType && !this.props.locationType.includes("geo") && this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
                    this.setState({ location_object: this.props.selectedLocation, search: this.props.locationName || this.props.selectedLocation.formatted_address })
                }
                this.props.getCityListLayout()
            }
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    getLocation(location) {
        _autoCompleteService(location, function (results, status) {
            results = results || []
            this.setState({ searchResults: results })

            //Search widget data identifiers
            let widget = {}
            widget.widgetId = this.props.widgetId || ''
            if (this.props.specialityId) {

                widget.specialityId = this.props.specialityId || ''
            }
            this.props.getCityListLayout(results, widget)
        }.bind(this))
    }

    inputHandler(e) {
        if (!e.target.value) {
            this.props.getCityListLayout()
        }

        this.setState({
            search: e.target.value
        })
        this.getLocation(e.target.value)
    }

    inputNoHandler(e) {
        this.setState({
            mobile_no: e.target.value,
            validationError: false
        })
    }

    selectLocation(location, cb) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
                // SnackBar.show({ pos: 'bottom-center', text: "Could not select location." });
            }
        }, 5000)
        this.setState({ detectLoading: true })

        _getLocationFromPlaceId(location.reference, (location_object) => {
            this.props.selectLocation(location_object, 'autoComplete').then(() => {
                this.setState({ detectLoading: false, searchResults: [], search: location_object.formatted_address })
                cb()
            })
        })
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

    focusOut() {
        if (this.props.selectedLocation && this.props.selectedLocation.formatted_address) {
            this.setState({ search: props.selectedLocation.formatted_address || '' })
        }
    }

    goToLocation() {
        if (this.props.isTopbar) {
            let redirect_to = ""
            /*if (window.location.pathname.includes('sptcit') || window.location.pathname.includes('sptlitcit')) {
                redirect_to = "/opd/searchresults"
            }

            if (window.location.pathname.includes('lbcit') || window.location.pathname.includes('lblitcit')) {
                redirect_to = "/lab/searchresults"
            }*/

            let location_url = '/locationsearch'
            if (redirect_to) {
                location_url += `?redirect_to=${redirect_to}`
            }
            this.props.history.push(location_url)
        }
    }

    clearSearch() {
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'ClearLocationSearchText', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'clear-location-search-text', 'searchString': this.state.search
        }
        GTM.sendEvent({ data: gtmData })
        this.setState({ search: '' })
        this.props.getCityListLayout()
    }


    render() {
        if (this.props.commonSearchPage) {
            return <div className="serch-nw-inputs">
                <input className="new-srch-inp" autoComplete="off" placeholder="Search Location" value={this.state.search} onChange={this.inputHandler.bind(this)} id="doc-input-field" onBlur={this.onblur.bind(this)} onFocus={this.onfocus.bind(this)} />
                <img className="srch-inp-img" src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />
                {
                    this.state.search ?
                        <span className="cursor-pntr search-close-icon" onClick={this.clearSearch.bind(this)}><img src={ASSETS_BASE_URL + '/img/sl-close.svg'} /></span>
                        : ''
                }

                <button className="srch-inp-btn-img" onClick={this.detectLocation.bind(this)}>Auto Detect <img src={ASSETS_BASE_URL + "/img/loc-track.svg"} /></button>
            </div>
        }

        if (this.props.articleSearchPage) {
            return <div className="articleTypeloc">
                <div className="articleInputContainer">
                    <button className="artc-btn-lft artc-disable">
                        {
                            this.props.commonSearch ?
                                <img style={{ width: '12px', marginRight: '10px' }} src={ASSETS_BASE_URL + "/img/new-loc-ico.svg"} />
                                : ''
                        }
                        {this.props.commonSearch ? 'Location' : this.props.specialityName}</button>
                    <input className={`artc-inp-loc`} type="text" autoComplete="off" placeholder="Location" value={this.state.search} onChange={this.inputHandler.bind(this)} id="doc-input-field article-type-input-field" onFocus={this.onfocus.bind(this)} onBlur={this.onblur.bind(this)} />
                </div>
            </div>
        }

        return (
            // toggle class : 'doc-select-none'
            <div className={`row ${this.props.fromVip?'searchForVip':''}`}  style={{ backgroundColor: `var(--text--primary--color)`, marginTop: 10, position: 'relative', zIndex: 11, marginLeft:2, marginRight:2 }} id="location_element">

                <div className="col-12">
                    {
                        this.props.resultType == 'list' ?
                            <p className="location-txt-msg">Select your location to get the most relevant results</p>
                            : ''
                    }
                    <div className={this.props.resultType == 'list' ? "doc-caret" : "doc-select-none"}></div>
                </div>

                <div className={`col-12 ${this.props.fromVip?'vip-srch-pdng-adj':''}`} style={{ paddingBottom: 10 }}>
                    <p className="vip-srch-slct">Select your location</p>
                    <div className="doc-select-location-div">
                        <div className="doc-input-loc-div" onClick={this.goToLocation.bind(this)}>
                            <input type="text" className="form-control doc-input-loc" id="doc-input-field" placeholder="Search your locality" value={this.state.search} onBlur={this.onblur.bind(this)} onFocus={this.onfocus.bind(this)} onChange={this.inputHandler.bind(this)} />
                            <span className="doc-input-loc-icon">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                            </span>
                            {
                                this.props.isTopbar ? "" : <div className="doc-or-text  text-center">
                                    <p style={{ color: '#fff', fontSize: 28 }}>|</p>
                                </div>
                            }
                            {
                                this.props.isTopbar ? "" : <div className="doc-auto-detect-div " onClick={this.detectLocation.bind(this)}>
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/crosshairs-gps.svg"} />
                                    <p className="fw-500 text-sm" style={{ color: '#fff' }}>Auto Detect</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div id="map1" style={{ display: 'none' }}></div>
            </div>
        )
    }
}

export default LocationElementsView