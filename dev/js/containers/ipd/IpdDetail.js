import React from 'react'
import { connect } from 'react-redux'
import LeftBar from '../../components/commons/LeftBar'
import RightBar from '../../components/commons/RightBar'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import Footer from '../../components/commons/Home/footer'
import { getIpdInfo } from '../../actions/index.js'
const queryString = require('query-string')

class IpdDetailView extends React.Component {

	componentDidMount(){
		if(window){
			window.scrollTo(0,0)
		}
		if(this.props.match.params.ipd_id){
			this.props.getIpdInfo(this.props.match.params.ipd_id, this.props.selectedLocation)
		}
	}

	render(){

		return(
			<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
                    	<div className="col-12 col-md-7 col-lg-7 center-column">
                    		{
                    			this.props.IPD_INFO_LOADED?
                    			<div className ="ipd-section">
									<h4 className="section-heading"><img src="https://cdn.docprime.com/cp/assets/img/icons/back-arrow.png" className="img-fluid" style={{ width: '20px',marginRight: '10px', verticalAlign: '-3px' }} onClick={()=>this.props.history.go(-1)}/>{` About ${this.props.ipd_info.about.name}`}</h4>
                    				<div className="widget custom-li-style" dangerouslySetInnerHTML={{ __html: this.props.ipd_info.about.details}}></div>
		                    	</div>
		                    	:''	
                    		}
	                    	
	                    </div>
	                    <RightBar msgTemplate="gold_general_template"/>
	                </div>

	            </section>
	            <Footer/>
	        </div>

			)
	}
}

const mapStateToProps = (state) => {

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	const {
		selectedCriterias,
		ipd_info,
		IPD_INFO_LOADED,
		commonSelectedCriterias
	} = state.SEARCH_CRITERIA_IPD

    return{
    	selectedLocation, selectedCriterias, ipd_info, IPD_INFO_LOADED, commonSelectedCriterias
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getIpdInfo: (ipd_id, selectedLocation) => dispatch(getIpdInfo(ipd_id, selectedLocation))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdDetailView)