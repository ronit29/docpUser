import React from 'react';

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
            searchResults: []
        }
    }

    componentDidMount() {
        this.getSearchResults = debouncer(this.getSearchResults.bind(this), 1000)
        let input = document.getElementById('topCriteriaSearch')
        input.focus()
    }

    inputHandler(e) {
        this.setState({ searchValue: e.target.value })
        this.getSearchResults()
    }

    getSearchResults() {
        this.props.getDiagnosisCriteriaResults(this.state.searchValue, (searchResults) => {
            this.setState({ searchResults: searchResults.result })
        })
    }

    addCriteria(criteria, type) {
        criteria.type = type
        this.props.toggleDiagnosisCriteria(criteria)
        this.context.router.history.goBack()
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="locationSearch">
                <div className="locationSearchBox">
                    <input className="topSearch" id="topCriteriaSearch" onChange={this.inputHandler.bind(this)} value={this.state.searchValue} placeholder="Search for tests, labs, packages ..etc" />
                    {
                        this.state.searchResults.map((type, i) => {
                            return <div className="searchResultType" key={i}>
                                <p>{type.name}</p>
                                {
                                    type.data.map((resultData, j) => {
                                        return <span key={j} className="pac-item" onClick={this.addCriteria.bind(this, resultData, type.type)}>
                                            <p className="head">{resultData.name}</p>
                                            <p className="sub">{resultData.sub_name || resultData.address}</p>
                                        </span>
                                    })
                                }
                            </div>
                        })

                    }
                </div>
            </div>
        );
    }
}


export default CriteriaSearchView
