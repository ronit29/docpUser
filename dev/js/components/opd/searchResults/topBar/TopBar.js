import React from 'react';
import { connect } from 'react-redux';

import Range from 'rc-slider/lib/Range';
import Checkbox from 'material-ui/Checkbox';


class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [0, 1500],
            sort_on: null,
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false,
            dropdown_visible: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteria })
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
    }

    handleInput(e) {
        let evName = e.target.name
        let checked = e.target.checked
        setTimeout(() => {
            this.setState({
                [evName]: checked
            })
        })
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            sits_at: this.state.sits_at,
            sort_on: this.state.sort_on,
            is_female: this.state.is_female,
            is_available: this.state.is_available,
            sits_at_clinic: this.state.sits_at_clinic,
            sits_at_hospital: this.state.sits_at_hospital
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
            priceRange: [0, 1500],
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false
        }
        try {
            for (let filter in def) {
                if (filter == 'priceRange') {
                    if (def[filter][0] != this.state[filter][0] || def[filter][1] != this.state[filter][1]) {
                        return true
                    }
                } else {
                    if (def[filter] != this.state[filter]) {
                        return true
                    }
                }
            }
            return false
        } catch (e) {
            return false
        }
    }

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias)

        return (
            <section className="filter-row sticky-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter-item">
                                <div className="action-filter">
                                    <ul className="inline-list">
                                        <li onClick={this.handleOpen.bind(this)}>
                                            <span className="ct-img ct-img-sm filter-icon text-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/range.svg"} className="img-fluid" /></span>
                                        </li>
                                        <li onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src={ASSETS_BASE_URL + "/img/customer-icons/filter.svg"} className="img-fluid" /></span>
                                            {
                                                this.isFilterApplied.call(this) ? <span className="applied-filter-noti" /> : ""
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="filter-title">
                                    {this.props.count} Results found {criteriaStr ? "for" : ""} <span className="fw-700"> {criteriaStr}</span>
                                </div>
                            </div>
                            {
                                this.state.dropdown_visible ?
                                    <div>
                                        <div className="sort-dropdown-overlay" onClick={this.hideSortDiv.bind(this)} ></div>
                                        <div className="sort-dropdown-div">
                                            <ul className="sort-dropdown-list">
                                                <li className={`sort-dropdown-list-item  ${!!!this.state.sort_on?'sort-item-selected':''}`} onClick={this.handleClose.bind(this,"")}>Relevance</li>
                                                <li className={`sort-dropdown-list-item ${this.state.sort_on=='fees'?'sort-item-selected':''}`} onClick={this.handleClose.bind(this,'fees')}>Fee</li>
                                                <li className={`sort-dropdown-list-item ${this.state.sort_on=='distance'?'sort-item-selected':''}`} onClick={this.handleClose.bind(this,'distance')}>Distance</li>
                                                <li className={`sort-dropdown-list-item ${this.state.sort_on=='experience'?'sort-item-selected':''}`} onClick={this.handleClose.bind(this,'experience')}>Experience</li>
                                            </ul>
                                        </div>
                                    </div> : ""
                            }
                        </div>
                    </div>
                </div>
                

                {
                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="overlay black">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                            <div className="widget-content">
                                <div className="filterRow filterRowShort">
                                    <span className="tl filterLabel">Available Today</span>
                                    <div className="filterInput">
                                        {/* <Checkbox name="is_available" checked={!!this.state.is_available} onChange={this.handleInput.bind(this)} className="checkFilter float-right filterInput" /> */}
                                        <input type="checkbox" name="is_available" checked={!!this.state.is_available} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" />
                                        <span className="opd-filter-checkbox"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow filterSitsAt">
                                    <span className="tl">Sits At</span>
                                    <div className="checkFilter">
                                        {/* <Checkbox name="sits_at_clinic" checked={!!this.state.sits_at_clinic} onChange={this.handleInput.bind(this)} className="checkFilter" /> */}
                                        <input type="checkbox" name="sits_at_clinic" checked={!!this.state.sits_at_clinic} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" style={{top: 39, left: 20}} />
                                        <span className="opd-filter-checkbox" style={{top: 39, left: 20}}></span>
                                    </div>
                                    <span className="checkFilterLabel">Clinic</span>
                                    <div className="checkFilter">
                                        {/* <Checkbox name="sits_at_hospital" checked={!!this.state.sits_at_hospital} onChange={this.handleInput.bind(this)} className="checkFilter" /> */}
                                        <input type="checkbox" name="sits_at_hospital" checked={!!this.state.sits_at_hospital} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" style={{top: 39, left: 128}} />
                                        <span className="opd-filter-checkbox" style={{top: 39, left: 128}}></span>
                                    </div>
                                    <span className="checkFilterLabel">Hospital</span>
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow">
                                    <span className="tl">Fees</span>
                                    <span className="tr">&#8377; {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">&#8377; 0</span>
                                    <span className="br">&#8377; 2000</span>

                                    <Range
                                        min={0}
                                        max={2000}
                                        value={this.state.priceRange}
                                        step={100}
                                        className="range"
                                        onChange={this.handleRange.bind(this, 'priceRange')}
                                    />
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow filterRowFemaleDoc">
                                    <span className="tl filterLabel">Female Doctor</span>
                                    <div className="filterInput">
                                        {/* <Checkbox name="is_female" checked={!!this.state.is_female} onChange={this.handleInput.bind(this)} className="checkFilter float-right filterInput" /> */}
                                        <input type="checkbox" name="is_female" checked={!!this.state.is_female} onChange={this.handleInput.bind(this)} className="opd-filter-hidden-checkbox" />
                                        <span className="opd-filter-checkbox"></span>
                                    </div>

                                </div>
                            </div>
                            <div className="widget-footer pd-0">
                                <button className="v-btn v-btn-primary btn-block btn-lg" onClick={this.applyFilters.bind(this)}>Apply</button>
                            </div>
                        </div>
                    </div> : ""
                }

            </section>
        );
    }
}


export default TopBar
