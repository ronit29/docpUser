import React from 'react';
import { connect } from 'react-redux';

import DoctorProfileCard from '../../commons/doctorProfileCard/index.js'
// import InfiniteScroll from 'react-infinite-scroller';


class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let { DOCTORS, doctorList } = this.props

        return (
            <section className="wrap search-result-dr">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {
                                doctorList.map((docId, i) => {
                                    return <DoctorProfileCard {...this.props} details={DOCTORS[docId]} key={i} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default DoctorsList
