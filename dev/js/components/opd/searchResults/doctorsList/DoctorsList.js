import React from 'react';
import { connect } from 'react-redux';

import DoctorResultCard from '../../commons/doctorResultCard'
import InfiniteScroll from 'react-infinite-scroller';


class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: true
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    loadMore(page) {
        this.setState({ hasMore: false })

        try {

            let searchState = this.getLocationParam('search')
            let filterCriteria = this.getLocationParam('filter')
            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }
            searchState = JSON.parse(searchState)
            this.props.getDoctors(searchState, filterCriteria, false, page + 1, (hasMore) => {

                setTimeout(() => {
                    this.setState({ hasMore })
                }, 1000)
            })

        } catch (e) {

            console.error(e)
        }

    }

    render() {

        let { DOCTORS, doctorList } = this.props

        return (
            <section className="wrap search-result-dr">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadMore.bind(this)}
                                hasMore={this.state.hasMore}
                                useWindow={true}
                            >
                                {
                                    doctorList.map((docId, i) => {
                                        return <DoctorResultCard {...this.props} details={DOCTORS[docId]} key={i} />
                                    })
                                }
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default DoctorsList
