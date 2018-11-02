import React from 'react';
import { connect } from 'react-redux';

import DoctorResultCard from '../../commons/doctorResultCard'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import ClinicResultCard from '../../commons/clinicResultCard';

class DoctorsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: true,
            loading: false,
            renderBlock: false,
            page: 1,
            readMore: 'search-details-data-less'
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
        let data = {
            'Category': 'ConsumerApp', 'Action': 'DoctorSearchPagination', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-search-pagination', 'Pages': this.state.page
        }
        GTM.sendEvent({ data: data })

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
        this.props.getDoctorList(null, page + 1, (hasMore) => {
            this.setState({ loading: false, page: page + 1 })
            setTimeout(() => {
                this.setState({ hasMore })
            }, 1000)
        })

    }

    toggleScroll(){
        if(window){
            window.scrollTo(0,0)
        }
        this.setState({readMore:'search-details-data-less'})
    }

    render() {

        let { DOCTORS, doctorList } = this.props

        return (
            <section style={{ paddingTop: 10 }} ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid">
                            {
                                this.props.search_content && this.props.search_content !=''?
                                <div className="search-result-card-collpase">
                                    <div className={this.state.readMore} dangerouslySetInnerHTML={{ __html: this.props.search_content }} >
                                    </div>
                                    
                                    {   this.state.readMore && this.state.readMore != ''?
                                        <span className="rd-more" onClick={()=>this.setState({readMore:''})}>Read More</span>
                                        :''
                                    }

                                    {   this.state.readMore == ''?
                                        <span className="rd-more" onClick={this.toggleScroll.bind(this)}>Read Less</span>
                                        :''
                                    }

                                </div>
                                :''
                            }
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
                                                if (i == 1 && DOCTORS[docId]) {
                                                    return <div key={i}>
                                                        <div className="no-risk-container mt-3">
                                                            <div className="no-rsk">
                                                                <div className="rsk-image">
                                                                    <img className="" src={ASSETS_BASE_URL + "/img/customer-icons/group-98.png"} />
                                                                </div>
                                                                <div className="rsk-content">
                                                                    <h4 className="rsk-hdng">Amazing Savings... No Risks!</h4>
                                                                    <ul className="rsk-lstng ff">
                                                                        <li className="lst-bfr">Upto 50% Off on doctor and lab bookings</li>
                                                                        <li className="lst-bfr">100% money back guarantee -  No questions!</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            this.props.clinic_card ? <ClinicResultCard {...this.props} details={DOCTORS[docId]} key={i} rank={i} /> : <DoctorResultCard {...this.props} details={DOCTORS[docId]} key={i} rank={i} />
                                                        }
                                                    </div>

                                                } else {
                                                    if (DOCTORS[docId]) {
                                                        return <div>
                                                            {
                                                                this.props.clinic_card ? <ClinicResultCard {...this.props} details={DOCTORS[docId]} key={i} rank={i} /> : <DoctorResultCard {...this.props} details={DOCTORS[docId]} key={i} rank={i} />
                                                            }
                                                        </div>

                                                    } else {
                                                        return ""
                                                    }
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
