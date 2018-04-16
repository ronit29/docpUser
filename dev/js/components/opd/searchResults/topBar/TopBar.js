import React from 'react';
import { connect } from 'react-redux';

import SortIcon from 'material-ui-icons/Sort';
import FilterIcon from 'material-ui-icons/FilterList';
import Menu, { MenuItem } from 'material-ui/Menu';

class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            searchResults : true
        }
    }

    handleOpen(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="topBar">
                <SortIcon className="iconsortfilter" onClick={this.handleOpen.bind(this)} />
                <Menu
                    id="sort-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose.bind(this)}
                >
                    <MenuItem onClick={this.handleClose.bind(this)}>Relavance</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>Fee</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>Distance</MenuItem>
                    <MenuItem onClick={this.handleClose.bind(this)}>Apointment</MenuItem>
                </Menu>
                <FilterIcon className="iconsortfilter" onClick={() => {
                    this.context.router.history.push({
                        pathname : '/searchresults/filter',
                        search : window.location.search
                    })
                }} />
            </div>
        );
    }
}


export default TopBar
