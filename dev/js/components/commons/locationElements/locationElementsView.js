import React from 'react'
import SnackBar from 'node-snackbar'


class LocationElementsView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            search: '',
            searchResults: [],
            detectLoading: false
        }
    }

    componentWillReceiveProps(props) {
        
        if(props.selectedLocation && this.props.selectedLocation){
                let lat = this.props.selectedLocation.geometry.location.lat
                if (typeof lat === 'function') lat = lat()
                let nextLat = props.selectedLocation.geometry.location.lat
                if (typeof nextLat === 'function') nextLat = nextLat()

                if(this.state.search){
                    if (lat != nextLat) {
                        this.setState({ search: props.selectedLocation.formatted_address })
                    }
                }else if(props.locationType!="geo"){
                    this.setState({ search: props.selectedLocation.formatted_address })
                }
            }
        
    }

    componentDidMount() {
        this.props.onRef(this)
        
        if(this.props.locationType && this.props.locationType!="geo" && this.props.selectedLocation && this.props.selectedLocation.formatted_address){
            this.setState({ search: this.props.selectedLocation.formatted_address })
        }

        if(document.getElementById('doc-input-field')){
            document.getElementById('doc-input-field').addEventListener('focusin',()=>{this.setState({search:''})})
            
            /*document.getElementById('doc-input-field').addEventListener('focusout',()=>{
                if(this.props.selectedLocation && this.props.selectedLocation.formatted_address){
                    this.setState({search:props.selectedLocation.formatted_address||''})
                }
            })*/
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    
    getLocation(location) {
        var auto = new google.maps.places.AutocompleteService()

        var request = {
            input: location,
            types: ['geocode'],
            componentRestrictions: { country: 'in' }
        };
        if (location) {
            auto.getPlacePredictions(request, function (results, status) {
                results = results || []
                this.setState({ searchResults: results })
                this.props.getCityListLayout(results)
            }.bind(this))
        }
    }

    inputHandler(e) {
        this.setState({
            search: e.target.value
        })
        this.getLocation(e.target.value)

    }

    selectLocation(location, cb) {
        let timeout = setTimeout(() => {
            if (this.state.detectLoading) {
                this.setState({ detectLoading: false })
               // SnackBar.show({ pos: 'bottom-center', text: "Could not select location." });
            }
        }, 5000)
        this.setState({ detectLoading: true })

        let map = new google.maps.Map(document.getElementById('map1'), {
            center: { lat: 28, lng: 77 },
            zoom: 15
        })
        let service = new google.maps.places.PlacesService(map);
        service.getDetails({
            reference: location.reference
        }, function (place, status) {

            let location_object = {
                formatted_address: place.formatted_address,
                name: place.name,
                place_id: place.place_id,
                geometry: place.geometry
            }

            this.props.selectLocation(location_object, 'autoComplete').then(() => {
                this.setState({ detectLoading: false, searchResults: [], search: place.formatted_address })
                cb()
            })

        }.bind(this))
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
                var latlng = { lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude) };

                let geocoder = new google.maps.Geocoder
                geocoder.geocode({ 'location': latlng }, (results, status) => {
                    if (results && results[0]) {
                        let location_object = {
                            formatted_address: results[0].formatted_address,
                            name: results[0].name,
                            place_id: results[0].place_id,
                            geometry: results[0].geometry
                        }

                        this.props.selectLocation(location_object, 'autoDetect').then(() => {
                            clearTimeout(timeout)

                            this.setState({ detectLoading: false })
                        })

                    }
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

    focusOut(){
        if(this.props.selectedLocation && this.props.selectedLocation.formatted_address){
            this.setState({search:props.selectedLocation.formatted_address||''})
        }
    }

    render() {

        return (
            // toggle class : 'doc-select-none'
            <div className="row" style={{ backgroundColor: '#f78316', marginTop:10 }}>

                <div className="col-12">
                    {
                        this.props.resultType == 'list'?
                        <p className="location-txt-msg">Tell us your exact location to get more relevant results:</p>
                        :''
                    }
                    <div className={this.props.resultType == 'list' ? "doc-caret" : "doc-select-none"}></div>
                    {
                        this.props.resultType == 'list' ? ''
                            : <div className="text-center">
                                <p className="fw-500 text-xs" style={{ color: '#fff' }}>IN</p>
                            </div>
                    }
                </div>
                <div className="col-12 mrt-10" style={{ paddingBottom: 10 }}>
                    <div className="doc-select-location-div">
                        <div className="doc-input-loc-div">
                            <input type="text" className="form-control doc-input-loc" id="doc-input-field" placeholder="Search your locality"  value={this.state.search} onChange={this.inputHandler.bind(this)} />
                            <span className="doc-input-loc-icon">
                                <img src={ASSETS_BASE_URL + "/img/customer-icons/map-marker-blue.svg"} />
                            </span>
                        </div>
                        <div className="doc-or-text text-center">
                            <p style={{ color: '#fff', fontSize: 28 }}>|</p>
                        </div>
                        <div className="doc-auto-detect-div" onClick={this.detectLocation.bind(this)}>
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/crosshairs-gps.png"} />
                            <p className="fw-500 text-sm" style={{ color: '#fff' }}>Auto Detect</p>
                        </div>
                    </div>
                </div>
                <div id="map1" style={{ display: 'none' }}></div>
            </div>
        )
    }
}

export default LocationElementsView