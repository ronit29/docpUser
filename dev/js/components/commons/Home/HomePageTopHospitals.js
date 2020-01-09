import React from 'react'
import GTM from '../../../helpers/gtm.js'

class TopHospitalWidgets extends React.PureComponent {

    constructor(props){
        super(props)
        this.state = {
            mergedState: false
        }
    }

    componentDidMount(){
        if(!this.props.topHospital){
            this.setState({mergedState: true})
        }
    }

	navigateTo(data, e) {
        e.preventDefault()
        e.stopPropagation()
        let gtmData = {}
        if(this.props.topHospital) {
            gtmData = {
               'Category': 'ConsumerApp', 'Action': 'HomeWidgetHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
            }
        }else{
            gtmData = {
               'Category': 'ConsumerApp', 'Action': 'HomeWidgetNearbyHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-nearby-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
            }
        }
        
        GTM.sendEvent({ data: gtmData })

        let redirectUrl = ''

        if(data.url) {
            redirectUrl = `/${data.url}`
        }else {
            redirectUrl = `/ipd/hospital/${data.id}`
        }

        if(data.is_ipd_hospital) {
            redirectUrl+= `?showPopup=true`
        }

        /*if(this.props.is_ipd_form_submitted){

        }else {
            redirectUrl+= '&get_feedback=1'
        }*/

        this.props.historyObj.push(redirectUrl)
    }

    scroll(type) {
        let dataType = this.props.dataType
        let dataList = `${this.props.dataType}_list`
        var elmnt = document.getElementById(dataType)
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName(dataList)[0].offsetWidth
        let cardCount = document.getElementsByClassName(dataList)[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById(dataType).scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById(`${dataType}_leftArrow_hsptl`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_RightArrow_hsptl`).classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById(`${dataType}_RightArrow_hsptl`).classList.add("d-none")
            }
            document.getElementById(`${dataType}_leftArrow_hsptl`).classList.remove("d-none")
        }
    }

    viewAllClicked(){
        this.props.nearbyHospitalViewAllClicked();
    }
	
	render(){
        
        let { topHeading, dataType, showViewAll }  = this.props
		return(
		     <div className="pakg-slider-container mb-10">
                <div className="pkgSliderHeading">
                    <h5>{topHeading}</h5>
                    {
                        showViewAll && this.props.top_data.length >=20 && <span onClick={()=>this.viewAllClicked()}>View All</span>
                    }
                </div>
                <div className="pkgSliderContainer" id={dataType}>
                    <div className={`pkgCardsList d-inline-flex sub-wd-cards ${dataType}_list`}>
                    	{
                    		this.props.top_data.slice(0,20).map((data, i) => {
                    			return <a key={this.state.mergedState?`${i}_list_${dataType}`:data.url?data.url:`${data.id}_${dataType}`} href={data.url?`/${data.url}`:`/ipd/hospital/${data.id}`} className="pkgcustCards" onClick={this.navigateTo.bind(this, data)}>
				                            <div className="pkgcardImgCont">
				                                <img style={{width:82}} className="img-fluid" src={data.svg_icon?data.svg_icon:data.logo} />
				                            </div>
				                            <p className="pkgtstName">
				                                {data.seo_title?data.seo_title:data.h1_title?data.h1_title:data.name}
				                        	</p>
				                        </a>		
                    		})
                    	}
                    </div>
                </div>
                <div className="pkglftRhtbtncont">
                    <div className="pkg-btnlft d-none" id={`${dataType}_RightArrow_hsptl`} onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id={`${dataType}_leftArrow_hsptl`} onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
            </div>
		)
	}
}

export default TopHospitalWidgets