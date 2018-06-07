import React from 'react';
import { connect } from 'react-redux';

import Menu, { MenuItem } from 'material-ui/Menu';
import Range from 'rc-slider/lib/Range';
import Checkbox from 'material-ui/Checkbox';


class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [100, 1500],
            sort_on: null,
            sits_at_clinic: false,
            sits_at_hospital: false,
            is_female: false,
            is_available: false
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
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sort_on: type }, () => {
            if (type) {
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

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias)

        return (
            <section className="filter-row">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter-item">
                                <div className="action-filter">
                                    <ul className="inline-list">
                                        <li onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src="/assets/img/customer-icons/range.svg" className="img-fluid" /></span></li>
                                        <li onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src="/assets/img/customer-icons/filter.svg" className="img-fluid" /></span><span className="applied-filter-noti" /></li>
                                    </ul>
                                </div>
                                <div className="filter-title">
                                    {this.props.count} Results found for <span className="fw-700"> {criteriaStr}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Menu
                    id="sort-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose.bind(this, null)}
                >
                    <MenuItem onClick={this.handleClose.bind(this, 'name')}>Relavance</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'price')}>Fee</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'distance')}>Distance</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'experience')}>Experience</MenuItem>
                </Menu>

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
                                       <Checkbox name="is_available" checked={!!this.state.is_available} onChange={this.handleInput.bind(this)} className="checkFilter float-right filterInput" />
                                    </div>
                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow filterSitsAt">
                                    <span className="tl">Sits At</span>
                                    <div className="checkFilter">
                                        <Checkbox name="sits_at_clinic" checked={!!this.state.sits_at_clinic} onChange={this.handleInput.bind(this)} className="checkFilter" />
                                    </div>
                                    <span className="checkFilterLabel">Clinic</span>
                                    <div className="checkFilter">
                                        <Checkbox name="sits_at_hospital" checked={!!this.state.sits_at_hospital} onChange={this.handleInput.bind(this)} className="checkFilter" />
                                    </div>
                                    <span className="checkFilterLabel">Hospital</span>

                                </div>
                            </div>
                            <div className="widget-content">
                                <div className="filterRow">
                                    <span className="tl">Fees</span>
                                    <span className="tr">Rs {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">Rs 100</span>
                                    <span className="br">Rs 2000</span>

                                    <Range
                                        min={100}
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
                                    <Checkbox name="is_female" checked={!!this.state.is_female} onChange={this.handleInput.bind(this)} className="checkFilter float-right filterInput" />
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
