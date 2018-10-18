import React from 'react';
import { connect } from 'react-redux';
import Range from 'rc-slider/lib/Range';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SnackBar from 'node-snackbar'
import LocationElements from '../../../../containers/commons/locationElements'

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [0, 20000],
            distanceRange: [0, 15],
            sort_on: null,
            shortURL: "",
            dropdown_visible: false,
            searchCities: [],
            showLocationPopup: false,
            overlayVisible: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteria })
        if (props.locationType && !props.locationType.includes("geo")) {
            this.setState({ showLocationPopup: false })
        } else {
            if (props.selectedLocation != this.props.selectedLocation) {
                this.setState({ showLocationPopup: true, overlayVisible: true })
            }
        }
        this.shortenUrl()
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
        this.shortenUrl()
        if (this.props.locationType.includes("geo")) {
            this.setState({ showLocationPopup: true, overlayVisible: true })
        }
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sort_on: this.state.sort_on
        }
        this.props.applyFilters(filterState)
        this.setState({ openFilter: false })
    }

    handleOpen(event) {
        // this.setState({ anchorEl: event.currentTarget })
        this.setState({
            dropdown_visible: true
        });
    }

    hideSortDiv() {
        this.setState({
            dropdown_visible: false
        });
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sort_on: type }, () => {
            if (type || type === "") {
                this.applyFilters()
            }
        })
    }

    toggleFilter() {
        this.setState({
            openFilter: !this.state.openFilter
        })
    }

    handleRange(type, range) {
        this.setState({
            [type]: range
        })
    }

    getCriteriaString(selectedCriterias) {
        if (selectedCriterias && selectedCriterias.length) {
            return selectedCriterias.reduce((final, curr, i) => {
                if (i != 0) {
                    final += ', '
                }
                final += `${curr.name}`
                return final
            }, "")
        }
    }

    isFilterApplied() {
        const def = {
            priceRange: [0, 20000],
            distanceRange: [0, 15]
        }
        try {
            for (let filter in def) {
                if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
                    return true
                }
            }
            return false
        } catch (e) {
            return false
        }
    }

    shortenUrl() {
        if (window) {
            let url = window.location.href + '&force_location=true'
            this.props.urlShortner(url, (err, data) => {
                if (!err) {
                    this.setState({ shortURL: data.tiny_url })
                }
            })
        }
    }

    getCityListLayout(searchResults = []) {
        if (searchResults.length) {
            this.setState({ searchCities: searchResults, overlayVisible: true })
        }
    }

    selectLocation(city) {
        this.child.selectLocation((city), () => {
            this.setState({ searchCities: [] })
        })
    }

    overlayClick() {
        this.setState({ overlayVisible: false, searchCities: [] });
    }

    numberInputHandler() {
        this.setState({ searchCities: [] });
    }

    hideLocationPopup() {
        debugger
        this.setState({ showLocationPopup: false });
    }

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias)

        return (
            <section className="filter-row sticky-header mbl-stick">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter-item">
                                <div className="action-filter">
                                    <ul className="inline-list">
                                        <li className="d-none d-md-inline-block">
                                            <CopyToClipboard text={this.state.shortURL}
                                                onCopy={() => { SnackBar.show({ pos: 'bottom-center', text: "Shortened URL Copied." }); }}>
                                                <span style={{ cursor: 'pointer' }}>
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/url-short.svg"} style={{ width: 80 }} />
                                                </span>
                                            </CopyToClipboard>
                                        </li>
                                        <li onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/range.svg"} className="img-fluid" /></span></li>
                                        <li onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src={ASSETS_BASE_URL + "/img/customer-icons/filter.svg"} className="img-fluid" /></span>
                                            {
                                                this.isFilterApplied.call(this) ? <span className="applied-filter-noti" /> : ""
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="filter-title">
                                    {this.props.count} Results found {criteriaStr ? "for" : ""} <span className="fw-700"> {criteriaStr}</span>

                                    <span onClick={() => {
                                        this.setState({
                                            showLocationPopup: !this.state.showLocationPopup,
                                            searchCities: []
                                        })
                                    }}>

                                        {
                                            this.state.showLocationPopup && false
                                                ? ''
                                                : (this.props.selectedLocation && this.props.selectedLocation.formatted_address) ? <span className="location-edit" style={{ color: '#f6843a', cursor: 'pointer' }}>{` in ${this.props.selectedLocation.formatted_address.split(', India')[0]}`}</span> : ''

                                        }
                                        <img style={{ width: 15, height: 15, marginLeft: 7, cursor: 'pointer' }} src={ASSETS_BASE_URL + "/img/customer-icons/edit.svg"} />
                                    </span>

                                </div>
                            </div>
                            {
                                this.state.dropdown_visible ?
                                    <div>
                                        <div className="sort-dropdown-overlay" onClick={this.hideSortDiv.bind(this)} ></div>
                                        <div className="sort-dropdown-div">
                                            <ul className="sort-dropdown-list">
                                                <li className={`sort-dropdown-list-item  ${!!!this.state.sort_on ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, "")}>Relevance</li>
                                                <li className={`sort-dropdown-list-item ${this.state.sort_on == 'fees' ? 'sort-item-selected' : ''}`} onClick={this.handleClose.bind(this, 'fees')}>Fee</li>
                                                <li className={`sort-dropdown-list-item ${this.state.sort_on == 'distance' ? 'sort-item-selected' : ''} `} onClick={this.handleClose.bind(this, 'distance')}>Distance</li>
                                            </ul>
                                        </div>
                                    </div> : ""
                            }
                        </div>
                    </div>
                    {
                        this.state.showLocationPopup ?
                            <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} numberInputHandler={() => this.numberInputHandler()} resultType='list' isTopbar={true} hideLocationPopup={() => this.hideLocationPopup()} />
                            : ''
                    }

                    {
                        this.state.showLocationPopup && this.state.overlayVisible ?
                            <div className="locationPopup-overlay" onClick={() => this.overlayClick()} ></div> : ''
                    }

                </div>

                {
                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="overlay black">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                            <div className="widget-content">
                                <div className="filterRow">
                                    <span className="tl">Price</span>
                                    <span className="tr">&#8377; {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">&#8377; 0</span>
                                    <span className="br">&#8377; 20000</span>

                                    <Range
                                        min={0}
                                        max={20000}
                                        value={this.state.priceRange}
                                        step={100}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'priceRange')}
                                    />
                                </div>
                                <div className="filterRow">
                                    <span className="tl">Distance</span>
                                    <span className="tr">{this.state.distanceRange[0]} to {this.state.distanceRange[1]} KM</span>
                                    <span className="bl">0 KM</span>
                                    <span className="br">50 KM</span>

                                    <Range
                                        min={0}
                                        max={50}
                                        value={this.state.distanceRange}
                                        step={1}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'distanceRange')}
                                    />
                                </div>
                            </div>
                            <div className="widget-footer pd-0">
                                <button className="v-btn v-btn-primary btn-block btn-lg" onClick={this.applyFilters.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </div> : ""
                }

                {
                    this.state.searchCities.length > 0 ?
                        <section style={{ position: 'relative', zIndex: 11 }}>
                            <div className="widget-panel">
                                <div className="panel-content">
                                    <ul className="list search-result-list">
                                        {
                                            this.state.searchCities.map((result, i) => {
                                                return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                    <a>{result.description}</a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </section> : ''
                }

            </section>
        );
    }
}


export default TopBar
