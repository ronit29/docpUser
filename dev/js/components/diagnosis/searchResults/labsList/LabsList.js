import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'

class LabsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: true,
            loading: false
        }
    }

    getLocationParam(tag) {
        // this API assumes the context of react-router-4
        const paramString = this.props.location.search
        const params = new URLSearchParams(paramString)
        return params.get(tag)
    }

    loadMore(page) {
        this.setState({ hasMore: false, loading: true })

        try {
            let searchState = this.getLocationParam('search')
            let filterCriteria = this.getLocationParam('filter')
            if (filterCriteria) {
                filterCriteria = JSON.parse(filterCriteria)
            } else {
                filterCriteria = {}
            }
            searchState = JSON.parse(searchState)

            this.props.getLabs(searchState, filterCriteria, false, page + 1, (hasMore) => {
                this.setState({ loading: false })
                setTimeout(() => {
                    this.setState({ hasMore })
                }, 1000)
            })

        } catch (e) {
            this.setState({ loading: false })
            console.error(e)
        }

    }

    render() {

        let { LABS, labList } = this.props

        return (
            <section className="wrap search-book-result">
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
                                    labList.map((labId, i) => {
                                        if (LABS[labId]) {
                                            return <LabProfileCard {...this.props} details={LABS[labId]} key={i} />
                                        } else {
                                            return ""
                                        }
                                    })
                                }
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
                {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
            </section>
        );
    }
}


export default LabsList
