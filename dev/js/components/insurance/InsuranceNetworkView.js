import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import LocationElements from '../../containers/commons/locationElements';

class InsuranceNetworkView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: this.props.networkType,
            searchValue: '',
            placeholder: '',
            searchCities: [],
            selectedChar: 0,
            showAlphabets: true,
            topLabActive: true,
            docSearch: 'name'
        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        let searchString = this.getCharacter(this.state.selectedChar)
        if (this.state.type == 'doctor') {
            this.updateInsuranceNetwork(this.state.type, searchString, this.state.docSearch)
        }
        else {
            this.updateInsuranceNetwork(this.state.type, searchString)
        }
        this.setState({ placeholder: `Search ${this.state.type}` })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedLocation != this.props.selectedLocation) {
            let selectedLocation = ''
            let lat = 28.644800
            let long = 77.216721
            selectedLocation = nextProps.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
            let searchString = this.getCharacter(this.state.selectedChar)
            this.props.getInsuranceNetworks(lat, long, this.state.type, searchString)
        }
    }

    getCharacter(index) {
        return String.fromCharCode(97 + index)
    }

    updateInsuranceNetwork(type, string, searchBy = '') {
        let { lat, long } = this.getLocation()
        this.props.getInsuranceNetworks(lat, long, type, string, searchBy) // get user insurance networks
    }

    getLocation() {
        let selectedLocation = ''
        let lat = 28.644800
        let long = 77.216721
        if (this.props.selectedLocation) {
            selectedLocation = this.props.selectedLocation;
            lat = selectedLocation.geometry.location.lat
            long = selectedLocation.geometry.location.lng
            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        return { lat, long }
    }

    tabClick(type) {
        if (type == 'doctor') {
            this.setState({
                type: type,
                placeholder: 'Search doctor',
                searchValue: '',
                selectedChar: 0,
                docSearch: 'name'
            })
            let searchString = this.getCharacter(0)
            this.updateInsuranceNetwork(type, searchString, 'name')
        }
        else if (type == 'lab') {
            this.setState({
                type: type,
                placeholder: 'Search lab',
                searchValue: '',
                topLabActive: true,
                selectedChar: null
            })
            this.updateInsuranceNetwork(type, '')
        }
        this.props.setNetworkType(type)
        this.setState({ showAlphabets: true })
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        if (this.state.type == 'doctor') {
            if (e.target.value) {
                this.setState({ showAlphabets: false })
                this.updateInsuranceNetwork(this.state.type, e.target.value, this.state.docSearch)
            } else {
                if (this.state.docSearch == 'name') {
                    this.setState({ showAlphabets: true })
                } else {
                    this.setState({ showAlphabets: false })
                }
                let searchString = this.getCharacter(this.state.selectedChar)
                this.updateInsuranceNetwork(this.state.type, searchString, this.state.docSearch)
            }
        }
        else {
            if (e.target.value) {
                this.setState({ showAlphabets: false })
                this.updateInsuranceNetwork(this.state.type, e.target.value)
            } else {
                this.setState({ showAlphabets: true })
                let searchString = this.getCharacter(this.state.selectedChar)
                this.updateInsuranceNetwork(this.state.type, searchString)
            }
        }
    }

    selectLocation(city) {
        this.child.selectLocation((city), () => {
            this.setState({ searchCities: [] })
        })
    }

    getCityListLayout(searchResults = []) {
        if (searchResults.length) {
            this.setState({ searchCities: searchResults })
        } else {
            this.setState({ searchCities: [], searchValue: '' })
        }
    }

    alphabetClick(index) {
        this.setState({ selectedChar: index, topLabActive: false })
        let searchString = this.getCharacter(index)
        if (this.state.type == 'doctor') {
            this.updateInsuranceNetwork(this.state.type, searchString, 'name')
        }
        else {
            this.updateInsuranceNetwork(this.state.type, searchString)
        }
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    getAlphabets() {
        let alphabets = []
        for (let i = 0; i <= 25; i++) {
            alphabets.push(String.fromCharCode(65 + i))
        }
        return alphabets
    }

    resultClick(id, url) {
        if (url) {
            this.props.history.push(`/${url}?from=insurance_network`)
        }
        else {
            this.props.history.push(`/opd/doctor/${id}?from=insurance_network`)
        }
    }

    topLabClick = () => {
        this.setState({
            topLabActive: true,
            selectedChar: null
        })
        this.updateInsuranceNetwork('lab', '')
    }

    radioClick(type) {
        let searchString = this.getCharacter(this.state.selectedChar)
        this.setState({ searchValue: '', showAlphabets: true })
        if (type == 'name') {
            this.setState({ docSearch: 'name', showAlphabets: true })
            this.updateInsuranceNetwork('doctor', searchString, 'name')
        }
        else {
            this.setState({ docSearch: 'specialization', showAlphabets: false })
        }
    }

    render() {
        let alphabets = this.getAlphabets()
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} showPackageStrip={true} />
                <section className="container dp-container-div">
                    <div className="row">
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="ntwrk-tabs">
                                            <div className="text-center" onClick={() => this.tabClick('doctor')} style={this.state.type == 'doctor' ? { borderBottom: '2px solid #f78631' } : {}}>
                                                <p className="fw-500">Doctors</p>
                                            </div>
                                            <div className="text-center" onClick={() => this.tabClick('lab')} style={this.state.type == 'lab' ? { borderBottom: '2px solid #f78631' } : {}}>
                                                <p className="fw-500">Diagnostic Labs</p>
                                            </div>
                                        </div>
                                        <div className="widget mb-10">
                                            <div className="search-top-container">
                                                <div className="serch-nw-inputs-container">
                                                    <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' fromCriteria={true} commonSearchPage={true} />
                                                    {/* radio buttons */}
                                                    {
                                                        this.state.type == 'doctor' ?
                                                            <div className="srch-radio-btns ipd-srch-radio-btn">
                                                                <div className="dtl-radio">
                                                                    <label className="container-radio" style={{ fontSize: 13 }}>Search by name<input type="radio" onChange={() => this.radioClick('name')} checked={this.state.docSearch == 'name'} name="radio" />
                                                                        <span className="doc-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                                <div className="dtl-radio">
                                                                    <label className="container-radio" style={{ fontSize: 13 }}>Search by specialization<input type="radio" onChange={() => this.radioClick('specialization')} checked={this.state.docSearch == 'specialization'} name="radio" />
                                                                        <span className="doc-checkmark"></span>
                                                                    </label>
                                                                </div>
                                                            </div> : ''
                                                    }
                                                    <div className="serch-nw-inputs mb-0">
                                                        <input type="text" autoComplete="off" className="d-block new-srch-doc-lab" id="search_bar" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.state.placeholder} />
                                                        <img style={{ width: '15px' }} className="srch-inp-img" src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.searchCities.length > 0 ?
                                                <section>
                                                    <div className="widget searchMargin">
                                                        <div className="common-search-container pt-0">
                                                            <div className="common-listing-cont">
                                                                <ul>
                                                                    {
                                                                        this.state.searchCities.map((result, i) => {
                                                                            return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                                                <p>{result.description}</p>
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
                                            this.state.searchCities.length == 0 ?
                                                <section className="widget searchMargin">
                                                    {
                                                        <div className="ntwrk-alpha-div">
                                                            {
                                                                !this.state.searchValue && this.props.insuranceNetwork && this.props.insuranceNetwork.total_count ?
                                                                    <p className="fw-500" style={{ paddingLeft: 10, marginBottom: 4 }}>{this.props.insuranceNetwork.total_count} {this.state.type}s covered under insurance</p>
                                                                    : ''
                                                            }
                                                            {
                                                                this.state.showAlphabets ?
                                                                    <div className="d-flex top-ntwrks-div">
                                                                        {
                                                                            this.state.type == 'lab' ?
                                                                                <div className="top-ntwrks" onClick={this.topLabClick}>
                                                                                    <p className={`${this.state.topLabActive ? `fw-500 text-primary` : `fw-500`}`}>Top Labs</p>
                                                                                </div> : ''
                                                                        }
                                                                        <ul className="ntwrk-alpha">
                                                                            {
                                                                                alphabets && alphabets.length ?
                                                                                    alphabets.map((character, i) => {
                                                                                        return <li key={i} onClick={() => this.alphabetClick(i)} style={i == this.state.selectedChar ? { cursor: 'auto' } : { cursor: 'pointer' }} >
                                                                                            <span className={i == this.state.selectedChar ? 'alphaSelected ntwrk-char fw-500' : 'ntwrk-char fw-500'}>{character}</span>
                                                                                        </li>
                                                                                    }) : ''
                                                                            }
                                                                        </ul>
                                                                    </div> : ''
                                                            }
                                                        </div>
                                                    }
                                                    <div>
                                                        {
                                                            this.props.insuranceNetwork && this.props.insuranceNetwork.results && this.props.insuranceNetwork.results.length ?
                                                                <ul>
                                                                    {
                                                                        this.props.insuranceNetwork.results.map((result, index) => {
                                                                            return <li key={index} className="ntwrk-list-item" onClick={() => this.resultClick(result.id, result.url)}>
                                                                                <div className="ntwrk-list-content">
                                                                                    <p className="ntwrk-list-content-name fw-500">{result.name}</p>
                                                                                    <div className="d-flex align-items-center flex-wrap">
                                                                                        {
                                                                                            result.specializations && result.specializations.length ?
                                                                                                <div className="d-flex align-items-center flex-wrap" style={{ marginRight: 4 }}>
                                                                                                    <p className="ntwrk-list-content-city fw-500">{result.specializations[0]}</p>
                                                                                                    <span style={{ marginLeft: 4, color: '#757575' }}>|</span>
                                                                                                </div> : ''
                                                                                        }
                                                                                        <p className="ntwrk-list-content-city fw-500">{result.city}</p>
                                                                                    </div>
                                                                                </div>
                                                                                {
                                                                                    result.distance ?
                                                                                        <div className="ntwrk-list-dist">
                                                                                            <p className="fw-500">{result.distance} km</p>
                                                                                        </div> : ''
                                                                                }
                                                                            </li>
                                                                        })
                                                                    }
                                                                </ul>
                                                                :
                                                                this.props.insuranceNetwork && this.props.insuranceNetwork.results && !this.props.insuranceNetwork.results.length ?
                                                                    <p className="fw-500 text-center" style={{ fontSize: 18, padding: '15px 0px' }} >No results found !!</p> : ''
                                                        }
                                                    </div>
                                                </section> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => this.props.history.go(-1)} className="v-btn p-3 v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn">Back</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default InsuranceNetworkView