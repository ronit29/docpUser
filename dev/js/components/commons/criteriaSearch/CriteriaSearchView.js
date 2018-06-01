import React from 'react';
import { lightBaseTheme } from 'material-ui/styles';
import Loader from '../../commons/Loader'

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
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 1000)
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

        } else {
            this.props.getDiagnosisCriteriaResults(this.state.searchValue, (searchResults) => {
                if (searchResults) {
                    let tests = searchResults.tests.map(x => { return { ...x, type: 'test' } })
                    this.setState({ searchResults: [...tests], loading: false })
                }
            })
        }
    }

    addCriteria(criteria) {
        if (this.props.type == 'opd') {

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
            <div>
                <header className="skin-primary fixed horizontal top ct-header">
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

                        <section className="wrap wrap-100">
                            <div className="widget-panel">
                                <h4 className="panel-title">Search Result</h4>
                                <div className="panel-content">

                                    <ul className="list search-result-list">
                                        {
                                            this.state.searchResults.map((curr, i) => {
                                                return <li onClick={this.addCriteria.bind(this, curr)} key={i}><a>{curr.name}</a></li>
                                            })
                                        }
                                    </ul>

                                </div>
                            </div>
                        </section>
                        : (this.props.checkForLoad ? this.props.children : <Loader />)

                }
            </div>
        );
    }
}


export default CriteriaSearchView
