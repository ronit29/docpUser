import React from 'react'
import ProfileHeader from '../commons/DesktopProfileHeader'
import LocationElements from '../../containers/commons/locationElements';

class InsuranceNetworkView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorSelected: true,
            labSelected: false,
            searchValue: '',
            placeholder: 'Search Doctors',
            searchCities: [],
            selectedChar: 0
        }
    }

    componentDidMount() {

    }

    docTabClick() {
        this.setState({
            doctorSelected: true,
            labSelected: false,
            placeholder: 'Search Doctors'
        })
    }

    labTabClick() {
        this.setState({
            doctorSelected: false,
            labSelected: true,
            placeholder: 'Search Labs'
        })
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
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

    getCharacter(index) {
        return String.fromCharCode(97 + index)
    }

    alphabetClick(index) {
        this.setState({ selectedChar: index })
    }

    getAlphabets() {
        let alphabets = []
        for (let i = 0; i <= 25; i++) {
            alphabets.push(String.fromCharCode(65 + i))
        }
        return alphabets
    }

    render() {
        let alphabets = this.getAlphabets()
        let selectedAlphabet = this.getCharacter(this.state.selectedChar)
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <section className="container dp-container-div">
                    <div className="row">
                        <div className="col-12 col-md-7 col-lg-7 center-column">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="ntwrk-tabs">
                                            <div className="text-center" onClick={() => this.docTabClick()} style={this.state.doctorSelected ? { borderBottom: '2px solid #f78631' } : {}}>
                                                <p className="fw-500">Doctors</p>
                                            </div>
                                            <div className="text-center" onClick={() => this.labTabClick()} style={this.state.labSelected ? { borderBottom: '2px solid #f78631' } : {}}>
                                                <p className="fw-500">Diagnostic Labs</p>
                                            </div>
                                        </div>
                                        <div className="widget mb-10">
                                            <div className="search-top-container">
                                                <div className="serch-nw-inputs-container">
                                                    <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' fromCriteria={true} commonSearchPage={true} />
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
                                                <section className="widget mrb-20">
                                                    {
                                                        <div style={{ padding: '6px 0px 0px' }}>
                                                            {
                                                                this.state.doctorSelected ?
                                                                    <p className="fw-500" style={{ paddingLeft: 10, marginBottom: 4 }}>200 Doctors covered under insurance</p>
                                                                    :
                                                                    <p className="fw-500" style={{ paddingLeft: 10, marginBottom: 4 }}>200 Labs covered under insurance</p>
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
                                                        </div>
                                                    }
                                                    <div>
                                                        <ul>
                                                            <li className="ntwrk-list-item">
                                                                <div className="ntwrk-list-content">
                                                                    <p className="ntwrk-list-content-name fw-500">AD Diagnostic Lab</p>
                                                                    <p className="ntwrk-list-content-city fw-500">Gurgaon</p>
                                                                </div>
                                                                <div className="ntwrk-list-dist">
                                                                    <p className="fw-500">3 km</p>
                                                                </div>
                                                            </li>
                                                            <li className="ntwrk-list-item">
                                                                <div className="ntwrk-list-content">
                                                                    <p className="ntwrk-list-content-name fw-500">AD Diagnostic Lab</p>
                                                                    <p className="ntwrk-list-content-city fw-500">Gurgaon</p>
                                                                </div>
                                                                <div className="ntwrk-list-dist">
                                                                    <p className="fw-500">3 km</p>
                                                                </div>
                                                            </li>
                                                            <li className="ntwrk-list-item">
                                                                <div className="ntwrk-list-content">
                                                                    <p className="ntwrk-list-content-name fw-500">AD Diagnostic Lab</p>
                                                                    <p className="ntwrk-list-content-city fw-500">Gurgaon</p>
                                                                </div>
                                                                <div className="ntwrk-list-dist">
                                                                    <p className="fw-500">3 km</p>
                                                                </div>
                                                            </li>
                                                        </ul>
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