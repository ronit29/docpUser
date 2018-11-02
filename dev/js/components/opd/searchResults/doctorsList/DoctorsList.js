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
            page: 1
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

    render() {

        let { DOCTORS, doctorList } = this.props

        return (
            <section style={{ paddingTop: 10 }} ref="checkIfExists">
                {
                    this.state.renderBlock ? <Loader /> :
                        <div className="container-fluid">
                            <div className="search-result-card-collpase">
                                <div className="search-details-data-less">
                                <h5>Anaesthesiologists in Chennai </h5>
                                <p>Anaesthesiologists in Chennai are acclaimed for taking care of patients during and post-surgery so that the procedure goes well without being felt by the patients, in and around Chennai, prevent any glitch in between the surgery. The best Anaesthesiologists in Chennai are always ready to cater to the needs of their patients.</p>
                                <h5>When should you Book Appointments with Anaesthesiologists in Chennai?</h5>
                                <p>An Anaesthesiologists is a health professional that has been trained in providing enough amount of anaesthesia required by the patients to undergo the surgery. The field specializes in diagnosing, identifying, and successfully giving anaesthesia to the patients. Booking appointments with Anaesthesiologists in Chennai helps in the following manner: Anaesthesiologists help the patients by providing them anaesthesia and protect them from any ill effects of anaesthesia during and after surgery. Anaesthesia gives the best possible relief from all kind of surgical pain.The benefits are not just limited to patients but also enable doctors to perform surgery without any glitch and provide them comfortable working conditions. </p>
                                <p>And this is not it. At docprime, you can search for a health expert and certified Anaesthesiologists across all different locations in Chennai.
                                Why Should You Book Online Anaesthesiologists Appointments in Chennai?
                                </p>
                                <p>Ensures Your Comfort:
                                When you are looking for experienced Anaesthesiologists in Chennai, booking appointments online can be done right on your hands via the mobile application which saves your time and energy. This gives you more convenience when you are suffering from a disease or illness. It simply saves energy and time that would have been lost while you travel to and fro from the hospital or clinic simply to get an appointment. </p>
                                <p>Educates You And Your Family:
                                At docprime, you can not only find the best and most experienced Anaesthesiologists in Chennai but also learn about the causes, symptoms, treatments, precautions, and other aspects of the concerned health condition in the comfort of your home.</p>
                                <p>Attends Elderly:
                                Often, aged individuals need medical attention and they find it difficult to commute to the clinics in Chennai simply to get an appointment for a later date. Now book appointments with a doctor right from your home with just a few clicks of your mouse and let them address the health concerns of your beloved elderly family members.</p>
                                
                                </div>
                                <span className="rd-more">Read More</span>

                            </div>
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
