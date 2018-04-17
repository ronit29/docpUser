import React from 'react';

import DoctorsList from '../searchResults/doctorsList/index.js'
import TopBar from '../searchResults/topBar/index.js'


class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        
        console.log(this.props)
        debugger
        this.getDoctorList()
        // try {
        //     let searchState = this.getLocationParam('search')
        //     let filterState = this.getLocationParam('filter')
        //     if(filterState){
        //         filterState = JSON.parse(filterState)
        //     }
        //     searchState = JSON.parse(searchState)
        //     this.getDoctorList(searchState)
        // } catch (e) {
        //     this.getDoctorList()
        // }
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
        debugger
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
