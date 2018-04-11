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
        this.getDoctorList();
    }

    getDoctorList() {
        this.props.getDoctors();
    }
    
    render() {

        return (
            <div className="searchResults">
                <TopBar />
                <DoctorsList { ...this.props } />
            </div>
        );
    }
}

export default SearchResultsView
