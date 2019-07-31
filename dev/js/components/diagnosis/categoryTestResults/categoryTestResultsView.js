import React from 'react';

import LabsList from './TestCategoryList/TestCategoryList.js'
import CriteriaSearch from '../../commons/criteriaSearch'
import TopBar from './newTopBar'
import NAVIGATE from '../../../helpers/navigate/index.js';
import CONFIG from '../../../config'
import HelmetTags from '../../commons/HelmetTags'
import Footer from '../../commons/Home/footer'
import ResultCount from './topBar/result_count.js'
const queryString = require('query-string');

class SearchResultsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    resetQuickFilters(){
        this.setState({quickFilter: {}})
    }

    render() {
        let show_pagination = this.props.labList && this.props.labList.length > 0
        let url = `${CONFIG.API_BASE_URL}${this.props.location.pathname}`
        url = url.replace(/&page=\d{1,}/, "")
        let page = ""
        let curr_page = parseInt(this.props.page)
        let prev = ""
        if (curr_page > 1) {
            page = `?page=${curr_page}`
            prev = url
            if (curr_page > 2) {
                prev += `?page=${curr_page - 1}`
            }
        }
        let next = ""
        if (this.props.count > curr_page * 20) {
            next = url + `?page=${curr_page + 1}`
        }

        // check if this was the landing page
        let landing_page = false
        if (typeof window == 'object' && window.ON_LANDING_PAGE) {
            landing_page = true
        }
        let count = 0
        if(this.props.labList && this.props.labList.all_categories && this.props.labList.all_categories.length){ 
            this.props.labList.all_categories.map((data, i) => {
                count += parseInt(data['No_of_tests'])
            })
        }

        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                {<HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}${page}`,
                    title: this.props.labList?this.props.labList.title:'',
                    description: this.props.labList?this.props.labList.meta_description:'',
                    prev: prev,
                    next: next
                }} noIndex={false}/>}

                <CriteriaSearch {...this.props} checkForLoad={landing_page || this.props.LOADED_LABS_SEARCH || this.state.showError} title="Search for Test and Labs." goBack={true} lab_card={!!this.state.lab_card} newChatBtn={true} searchLabs={true}>
                    {
                        this.state.showError ? <div className="norf">No Results Found!!</div> : <div>
                            {<TopBar {...this.props} count = {count}/>}

                            {
                                this.props.labList && this.props.labList.length ==0?
                                <div className="container-fluid cardMainPaddingRmv">
                                    <div className="pkg-card-container mt-20 mb-3">
                                        <div className="pkg-no-result">
                                            <p className="pkg-n-rslt">No result found!</p>
                                            {/*
                                                this.isFilterApplied(this.props.filterCriteria)?
                                                <React.Fragment>
                                                <img className="n-rslt-img" src={ASSETS_BASE_URL + '/img/no-result.png'} />
                                                <p className="pkg-ty-agn cursor-pntr" onClick={this.applyQuickFilter.bind(this, {viewMore: true})}>Try again with fewer filters</p>
                                                </React.Fragment>
                                            : <React.Fragment>
                                                <img style={{width:'130px'}} className="n-rslt-img" src={ASSETS_BASE_URL + '/img/vct-no.png'} />
                                                <p className="pkg-ty-agn text-dark text-center">Can’t find your lab here?<br></br>Help us to list your lab</p>
                                                <button className="referDoctorbtn" onClick={()=>{this.props.history.push('/doctorsignup?member_type=2')}}>Refer your Lab</button>
                                                </React.Fragment>
                                            */}
                                        </div>
                                    </div>
                                </div>
                                :<React.Fragment>

                                    <LabsList {...this.props}/>

                                </React.Fragment>
                            }

                        </div>
                    }
                </CriteriaSearch>

                {/*<Footer footerData={this.state.footerData} />*/}
            </div>
        );
    }
}

export default SearchResultsView
