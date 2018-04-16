import React from 'react';
import { connect } from 'react-redux';

import EmotiIcon from 'material-ui-icons/AccountCircle';
import HomeIcon from 'material-ui-icons/Home';
import ClockIcon from 'material-ui-icons/AvTimer';
import LocationsIcon from 'material-ui-icons/LocationOn';

import DoctorProfileCard from '../../commons/doctorProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let { DOCTORS, doctorList } = this.props
        var doctorViewList = [];
        doctorList.map((docId, i) => {

            doctorViewList.push(
                <DoctorProfileCard details={DOCTORS[docId]} selectDoctor={this.props.selectDoctor} key={i} />
            );


        });

        return (
            <div className="doctorsList">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.props.getDoctors}
                    hasMore={false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {doctorViewList}

                </InfiniteScroll>
            </div>
        );
    }
}


export default DoctorsList
