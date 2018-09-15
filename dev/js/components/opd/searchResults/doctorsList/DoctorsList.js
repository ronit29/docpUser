import React from 'react';
import { connect } from 'react-redux';

import DoctorResultCard from '../../commons/doctorResultCard'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'

class DoctorsList extends React.Component {
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
        //             let scroll_pos = window.OPD_SCROLL_POS ? (window.OPD_SCROLL_POS) : 0
        //             // TODO: improve scroll back logic
        //             window.scrollTo(0, scroll_pos || 0)
        //             window.OPD_SCROLL_POS = 0

        //             window.onscroll = function () {
        //                 window.OPD_SCROLL_POS = window.pageYOffset
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

            let specializations = this.getLocationParam('specializations')
            let conditions = this.getLocationParam('conditions')
            let lat = this.getLocationParam('lat')
            let long = this.getLocationParam('long')
            let min_fees = parseInt(this.getLocationParam('min_fees'))
            let max_fees = parseInt(this.getLocationParam('max_fees'))
            let sort_on = this.getLocationParam('sort_on')
            let is_available = this.getLocationParam('is_available') === "true"
            let is_female = this.getLocationParam('is_female') === "true"
            let doctor_name = this.getLocationParam('doctor_name')
            doctor_name = doctor_name || ""
            let hospital_name = this.getLocationParam('hospital_name')
            hospital_name = hospital_name || ""
            let force_location_fromUrl = !!this.getLocationParam('force_location')

            let searchState = {
                specializations, conditions
            }
            searchState.selectedLocation = {
                geometry: { location: { lat, lng: long } }
            }
            let filterCriteria = {
                min_fees, max_fees, sort_on, is_available, is_female
            }
            if (doctor_name) {
                filterCriteria.doctor_name = doctor_name
            }
            if (hospital_name) {
                filterCriteria.hospital_name = hospital_name
            }

            filterCriteria.priceRange = {}
            filterCriteria.priceRange[0] = filterCriteria.min_fees
            filterCriteria.priceRange[1] = filterCriteria.max_fees

            this.props.getDoctors(searchState, filterCriteria, false, page + 1, (hasMore) => {
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

        let { DOCTORS, doctorList } = this.props

        return (
            <section style={{ paddingTop: 10 }} ref="checkIfExists">
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
                                            doctorList.map((docId, i) => {
                                                if (DOCTORS[docId]) {
                                                    return <DoctorResultCard {...this.props} details={DOCTORS[docId]} key={i} rank ={i} />
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


export default DoctorsList
