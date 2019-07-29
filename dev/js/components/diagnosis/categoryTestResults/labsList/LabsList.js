import React from 'react';

import LabProfileCard from '../../commons/labProfileCard/index.js'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../../commons/Loader'
import GTM from '../../../../helpers/gtm'
import LabResultCard from '../../commons/labResultCard'
import BannerCarousel from '../../../commons/Home/bannerCarousel.js';

class LabsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasMore: false,
            loading: false,
            renderBlock: false,
            page: 0,
            is_insured: props.filterCriteria && props.filterCriteria.is_insured?props.filterCriteria.is_insured:false,
            avg_ratings: ''
        }
    }

    bookNow(){

    }

    render() {
        return (
            <section className="wrap search-book-result variable-content-section" ref="checkIfExists">
                <div className="container-fluid cardMainPaddingRmv">
                    <div className="row no-gutters">
                        <div className="col-12">
                            <ul>
                                {this.props.labList && this.props.labList.all_categories.length ? 
                                    this.props.labList.all_categories.map((data, i) => {
                                        return <li key={i} id={data.lab_test_cat_id}>{data.lab_test_cat_name}
                                                {
                                                    data.lab_test_tests && data.lab_test_tests.length?
                                                    data.lab_test_tests.map((test_data, k) => {
                                                        return <div className="cstm-docCard mb-3" key={k} id={test_data.id}>
                                                                <div className="cstm-docCard-content" style={{cursor:'pointer'}}>
                                                                <div className="row no-gutters">
                                                                    <div className="col-8">
                                                                        <div className="cstm-doc-details-container labCardUiresponsive">
                                                                           <div className="cstm-doc-content-container">
                                                                                  <a href="/city-xray-scan-clinic-pvt-ltd-palam-in-palam-new-delhi-lpp">
                                                                                     <h2 className="cstmDocName">
                                                                                     {test_data.name}
                                                                                     </h2>
                                                                                  </a>
                                                                                  <p>Available in {test_data.count} Labs</p>
                                                                           </div>
                                                                        </div>
                                                                    </div>
                                                                <div className="col-4">
                                                                    <p className="cstm-doc-price">Starting at</p>
                                                                    <p className="cst-doc-price">₹ {test_data.deal_price}
                                                                    </p>
                                                                    <button className="cstm-book-btn" onClick={this.bookNow.bind(this)}>Book Now</button>
                                                                 </div>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    })
                                                    :''
                                                }
                                        </li>
                                    })
                                :''}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default LabsList
