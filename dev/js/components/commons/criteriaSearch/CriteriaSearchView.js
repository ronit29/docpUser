import React from 'react';
import Loader from '../../commons/Loader'

import LeftBar from '../LeftBar'
import RightBar from '../RightBar'
import ProfileHeader from '../DesktopProfileHeader'


const debouncer = (fn, delay) => {
    let timer = null
    return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this)
        }, delay)
    }
}


class CriteriaSearchView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            searchResults: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 500)
        let input = document.getElementById('topCriteriaSearch')
        // input.focus()
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        this.getSearchResults()
    }

    getSearchResults() {
        this.setState({ loading: true })

        if (this.props.type == 'opd') {
            this.props.getOPDCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults) {
                    searchResults.conditions = searchResults.conditions.map(x => { return { ...x, type: 'condition' } })
                    searchResults.specializations = searchResults.specializations.map(x => { return { ...x, type: 'speciality' } })
                    let results = [
                        {
                            title: 'Conditions',
                            values: searchResults.conditions
                        },
                        {
                            title: 'Specializations',
                            values: searchResults.specializations
                        }
                    ]
                    this.setState({ searchResults: [...results], loading: false })
                }
            })
        } else {
            this.props.getDiagnosisCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults) {
                    let tests = searchResults.tests.map(x => { return { ...x, type: 'test' } })
                    let results = [
                        {
                            title: 'Tests',
                            values: tests
                        }
                    ]
                    this.setState({ searchResults: results, loading: false })
                }
            })
        }
    }

    addCriteria(criteria) {
        if (this.props.type == 'opd') {
            this.props.toggleOPDCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        } else {
            this.props.toggleDiagnosisCriteria(criteria.type, criteria)
            this.setState({ searchValue: "" })
        }
    }


    render() {

        let location = "Gurgaon"
        if (this.props.selectedLocation) {
            location = this.props.selectedLocation.formatted_address.slice(0, 25)
        }

        return (
            <div className="profile-body-wrap">
                <ProfileHeader />
                <section className={this.props.paddingTopClass ? "container parent-section condition-search-section" : "container parent-section"} >
                    <div className="row main-row parent-section-row">
                        <LeftBar />

                        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-0 center-column">
                            <header className="skin-primary fixed horizontal top search-book-header sticky-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="navigate-row">
                                                <ul className="inline-list top-nav alpha-bx text-white"
                                                    onClick={() => {
                                                        this.props.history.go(-1)
                                                    }}
                                                >
                                                    <li><span className="ct-img ct-img-sm arrow-img"><img src="/assets/img/customer-icons/left-arrow.svg" className="img-fluid" /></span></li>
                                                    <li><div className="screen-title">Search</div></li>
                                                </ul>
                                                <ul className="inline-list top-nav beta-bx float-right text-right text-white"
                                                    onClick={() => {
                                                        this.props.history.push('/locationsearch')
                                                    }}
                                                >
                                                    <li><div className="screen-title"><span className="ct-img ct-img-sm map-marker-img"><img src="/assets/img/customer-icons/map-marker.svg" className="img-fluid" /></span> {location}</div></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="search-row">
                                                <div className="adon-group">
                                                    <input type="text" className="form-control input-md search-input" id="topCriteriaSearch" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder={this.props.title} onClick={() => {
                                                        if (this.props.goBack) {
                                                            this.props.history.go(-1)
                                                        }
                                                    }} />
                                                    <span className="ct-img ct-img-sm search-icon"><img src="/assets/img/customer-icons/search-icon.svg" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {
                                this.state.searchValue ?

                                    <section>
                                        {
                                            this.state.searchResults.map((cat, j) => {
                                                return <div className="widget-panel" key={j}>
                                                    <h4 className="panel-title">{cat.title}</h4>
                                                    <div className="panel-content">
                                                        <ul className="list search-result-list">
                                                            {
                                                                cat.values.length < 1 ? <li><a>No Results Found ...</a></li> : ""
                                                            }
                                                            {
                                                                cat.values.map((curr, i) => {
                                                                    return <li onClick={this.addCriteria.bind(this, curr)} key={i}><a>{curr.name}</a>
                                                                        { i < cat.values.length - 1 ? <hr className="search-list-hr" /> : "" }
                                                                    </li>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        {
                                            this.props.type == 'opd' ? <div className="widget-panel">
                                                <h4 className="panel-title">Name Search</h4>
                                                <div className="panel-content">
                                                    <ul className="list search-result-list">
                                                        <li onClick={() => {
                                                            this.props.searchProceed(this.state.searchValue, "")
                                                        }}><a>Search Doctors with name {this.state.searchValue}</a></li>
                                                    </ul>
                                                </div>
                                                <div className="panel-content">
                                                    <ul className="list search-result-list">
                                                        <li onClick={() => {
                                                            this.props.searchProceed("", this.state.searchValue)
                                                        }}><a>Search Hospitals with name {this.state.searchValue}</a></li>
                                                    </ul>
                                                </div>
                                            </div> : ""
                                        }
                                    </section>
                                    : (this.props.checkForLoad ? this.props.children : <Loader />)
                            }
                        </div>

                        <RightBar />
                    </div>
                </section>
            </div>
        );
    }
}


export default CriteriaSearchView
