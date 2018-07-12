import React from 'react';
import { connect } from 'react-redux';

import Menu, { MenuItem } from 'material-ui/Menu';
import Range from 'rc-slider/lib/Range';

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [100, 5000],
            distanceRange: [1, 35],
            sortBy: null
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ ...props.filterCriteria })
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteria })
    }

    applyFilters() {
        let filterState = {
            priceRange: this.state.priceRange,
            distanceRange: this.state.distanceRange,
            sortBy: this.state.sortBy
        }
        this.props.applyFilters(filterState)
        this.setState({ openFilter: false })
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose(type) {
        this.setState({ anchorEl: null, sortBy: type }, () => {
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
            priceRange: [100, 5000],
            distanceRange: [1, 35]
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

    render() {

        let criteriaStr = this.getCriteriaString(this.props.selectedCriterias)

        return (
            <section className="filter-row sticky-header-2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="filter-item">
                                <div className="action-filter">
                                    <ul className="inline-list">
                                        <li onClick={this.handleOpen.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right"><img src="/assets/img/customer-icons/range.svg" className="img-fluid" /></span></li>
                                        <li onClick={this.toggleFilter.bind(this)}><span className="ct-img ct-img-sm filter-icon text-right applied-filter"><img src="/assets/img/customer-icons/filter.svg" className="img-fluid" /></span>
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
                        </div>
                    </div>
                </div>
                <Menu
                    id="sort-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose.bind(this, null)}
                >
                    <MenuItem onClick={this.handleClose.bind(this, "")}>Relavance</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'fees')}>Fee</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this, 'distance')}>Distance</MenuItem>
                </Menu>

                {
                    this.state.openFilter ? <div onClick={this.toggleFilter.bind(this)} className="overlay black">
                        <div className="widget filter-popup" onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                            <div className="widget-content">
                                <div className="filterRow">
                                    <span className="tl">Price</span>
                                    <span className="tr">Rs {this.state.priceRange[0]} to {this.state.priceRange[1]}</span>
                                    <span className="bl">Rs 100</span>
                                    <span className="br">Rs 20000</span>

                                    <Range
                                        min={100}
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
                                    <span className="bl">1 > KM</span>
                                    <span className="br">50 KM</span>

                                    <Range
                                        min={1}
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

            </section>
        );
    }
}


export default TopBar
