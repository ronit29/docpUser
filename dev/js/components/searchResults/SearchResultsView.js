import React from 'react';

import DoctorsList from '../../components/searchResults/doctorsList/index.js'
import TopBar from '../../components/searchResults/topBar/index.js'


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        try {
            let searchState = this.getLocationParam('search')
            searchState = JSON.parse(searchState)
            this.getDoctorList(searchState)
        } catch (e) {
            this.getDoctorList()
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    getDoctorList(searchState) {
        this.props.getDoctors(searchState);
    }

    render() {

        return (
            <div className="searchResults">
                {
                    this.props.LOADING ? "" :
                        <div>
                            <TopBar />
                            <DoctorsList {...this.props} />
                        </div>
                }
            </div>
        );
    }
}

export default SearchResultsView
