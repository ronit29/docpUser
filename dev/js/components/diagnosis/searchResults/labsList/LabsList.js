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
            renderBlock: false
        }
    }

    componentDidMount() {
        /**
         * Below code ensures smooth back page transitions in case of huge data sets, and maintains scroll position.
         * renderBlock = true (by default) will block render until the page transition is completed, and once its done, it will then render and set scroll position accordingly
         */
        // setTimeout(() => {
        //     if (this.refs.checkIfExists) {
        //         this.setState({ renderBlock: false })
        //     }
        //     setTimeout(() => {
        //         if (window) {
        //             let scroll_pos = window.LAB_SCROLL_POS ? (window.LAB_SCROLL_POS) : 0
        //             // TODO: improve scroll back logic
        //             window.scrollTo(0, scroll_pos || 0)
        //             window.LAB_SCROLL_POS = 0

        //             window.onscroll = function () {
        //                 window.LAB_SCROLL_POS = window.pageYOffset
        //             }
        //         }
        //     }, 100)
        // }, 100)

    }

    componentWillUnmount() {
        // if (window) {
        //     window.onscroll = null
        // }
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

            let test_ids = this.getLocationParam('test_ids') || ""
            let lat = this.getLocationParam('lat')
            let long = this.getLocationParam('long')
            let place_id = this.getLocationParam('place_id') || ""
            let min_distance = parseInt(this.getLocationParam('min_distance')) || 0
            let max_distance = parseInt(this.getLocationParam('max_distance')) || 35
            let min_price = parseInt(this.getLocationParam('min_price')) || 0
            let max_price = parseInt(this.getLocationParam('max_price')) || 20000
            let sort_on = this.getLocationParam('sort_on') || null
            let lab_name = this.getLocationParam('lab_name') || ""
            lab_name = lab_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            let searchState = {
                selectedCriterias: test_ids
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }, place_id
            }
            let filterCriteria = {
                min_price, max_price, min_distance, max_distance, sort_on
            }
            if (lab_name) {
                filterCriteria.lab_name = lab_name
            }

            filterCriteria.priceRange = [0, 20000]
            filterCriteria.priceRange[0] = filterCriteria.min_price
            filterCriteria.priceRange[1] = filterCriteria.max_price

            filterCriteria.distanceRange = [0, 35]
            filterCriteria.distanceRange[0] = filterCriteria.min_distance
            filterCriteria.distanceRange[1] = filterCriteria.max_distance

            let searchUrl = null
            if (match.url.includes('-lbcit') || match.url.includes('-lblitcit')) {
                searchUrl = match.url
            }

            this.props.getLabs(searchState, filterCriteria, false, page + 1, (hasMore) => {
                this.setState({ loading: false })
                setTimeout(() => {
                    this.setState({ hasMore })
                }, 1000)
            }, false, searchUrl)

        } catch (e) {
            this.setState({ loading: false })
            console.error(e)
        }

    }

    render() {

        let { LABS, labList } = this.props

        return (
            <section className="wrap search-book-result variable-content-section" style={{ paddingTop: 10 }} ref="checkIfExists">
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
                                                    return <LabProfileCard {...this.props} details={LABS[labId]} key={i} rank={i} />
                                                } else {
                                                    return ""
                                                }
                                            })
                                        }
                                    </InfiniteScroll>
                                </div>
                            </div>
                            {this.state.loading ? <Loader classType="loaderPagination" /> : ""}
                        </div>
                }
            </section>
        );
    }
}


export default LabsList
