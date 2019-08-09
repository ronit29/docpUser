import React from 'react'
import GTM from '../../../helpers/gtm.js'

class TopHospitalWidgets extends React.Component {

	navigateTo(data, e) {
        e.preventDefault()
        e.stopPropagation()
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'HomeWidgetHospitalClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-hospital-clicked', 'selected': '', 'selectedId': data.id || ''
        }
        GTM.sendEvent({ data: gtmData })

        let redirectUrl = ''

        if(data.url) {
            redirectUrl = `/${data.url}?showPopup=true`
        }else {
            redirectUrl = `/ipd/hospital/${data.id}?showPopup=true`
        }

        /*if(this.props.is_ipd_form_submitted){

        }else {
            redirectUrl+= '&get_feedback=1'
        }*/

        this.props.history.push(redirectUrl)
    }

    scroll(type) {
        var elmnt = document.getElementById("top_hospitals")
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName('top_hospitals_list')[0].offsetWidth
        let cardCount = document.getElementsByClassName('top_hospitals_list')[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById("top_hospitals").scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById('leftArrow_hsptl').classList.add("d-none")
            }
            document.getElementById('RightArrow_hsptl').classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById('RightArrow_hsptl').classList.add("d-none")
            }
            document.getElementById('leftArrow_hsptl').classList.remove("d-none")
        }
    }
	
	render(){

		return(
		     <div className="pakg-slider-container mb-10">
                <div className="pkgSliderHeading">
                    <h5>Top Hospitals</h5>
                    {/*<span>View All</span>*/}
                </div>
                <div className="pkgSliderContainer" id="top_hospitals">
                    <div className='pkgCardsList d-inline-flex sub-wd-cards top_hospitals_list'>
                    	{
                    		this.props.top_data.map((data, i) => {
                    			return <a key={this.props.mergeState?i:data.url?data.url:i} href={data.url?`/${data.url}`:`/ipd/hospital/${data.id}`} className="pkgcustCards" onClick={this.navigateTo.bind(this, data)}>
				                            <div className="pkgcardImgCont">
				                                <img style={{width:82}} className="img-fluid" src={data.logo} />
				                            </div>
				                            <p className="pkgtstName">
				                                {data.h1_title?data.h1_title:data.name}
				                        	</p>
				                        </a>		
                    		})
                    	}
                    </div>
                </div>
                <div className="pkglftRhtbtncont">
                    <div className="pkg-btnlft d-none" id="RightArrow_hsptl" onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id="leftArrow_hsptl" onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
            </div>
		)
	}
}

export default TopHospitalWidgets