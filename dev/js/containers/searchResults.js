import React from 'react';
import { connect } from 'react-redux';

import { } from '../actions/index.js'
import SortIcon from 'material-ui-icons/Sort';
import FilterIcon from 'material-ui-icons/FilterList';
import Menu, { MenuItem } from 'material-ui/Menu';

import DoctorsList from '../components/searchResults/doctorsList/index.js'
import TopBar from '../components/searchResults/topBar/index.js'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null
        }
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    render() {

        return (
            <div className="searchResults">
                <TopBar />
                <DoctorsList />
                <DoctorsList />
                <DoctorsList />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
