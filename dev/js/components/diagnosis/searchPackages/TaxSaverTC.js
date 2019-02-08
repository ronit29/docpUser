import React from 'react';
import CriteriaSearch from '../../commons/criteriaSearch'
import HelmetTags from '../../commons/HelmetTags'
import CONFIG from '../../../config'


class TaxSaverTC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    render(){
        let LOADED_LABS_SEARCH = true
        return (
            <div>
                <div id="map" style={{ display: 'none' }}></div>
                <HelmetTags tagsData={{
                    canonicalUrl: `${CONFIG.API_BASE_URL}/tax-saver-health-packages-tc`,
                    title: 'Full Body Checkup - Book Health Checkup Packages & get 50% off - docprime',
                    description: 'Book Full Body Checkup Packages and get 50% off. Health Checkup packages includes &#10003 60Plus Tests & &#10003 Free Home Sample Collection starting at Rs. 499.'
                }} noIndex={false} />                
                <CriteriaSearch {...this.props} checkForLoad={LOADED_LABS_SEARCH || this.state.showError} title="Search for Test and Labs." goBack={true} lab_card={!!this.state.lab_card} newChatBtn={true}>
                </CriteriaSearch>
            </div>
            )
    }
}


export default TaxSaverTC