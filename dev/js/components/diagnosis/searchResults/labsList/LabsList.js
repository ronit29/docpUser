import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'

class LabsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: true,
            loading: false,
            renderBlock: true
        }
    }

    componentDidMount() {
        /**
         * Below code ensures smooth back page transitions in case of huge data sets, and maintains scroll position.
         * renderBlock = true (by default) will block render until the page transition is completed, and once its done, it will then render and set scroll position accordingly
         */
        setTimeout(() => {
            this.setState({ renderBlock: false })
            setTimeout(() => {
                if (window) {
                    let scroll_pos = window.LAB_SCROLL_POS ? (window.LAB_SCROLL_POS) : 0
                    // TODO: improve scroll back logic
                    window.scrollTo(0, scroll_pos || 0)
                    window.LAB_SCROLL_POS = 0
                }
            }, 100)
        }, 100)

        setTimeout(() => {
            window.onscroll = function () {
                window.LAB_SCROLL_POS = window.pageYOffset
            }
        }, 1000)
    }

    componentWillUnmount() {
        if (window) {
            window.onscroll = null
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
            <section className="wrap search-book-result variable-content-section">
                {
                    this.state.renderBlock ? <Loader /> :
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
                }
                {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
            </section>
        );
    }
}


export default LabsList
