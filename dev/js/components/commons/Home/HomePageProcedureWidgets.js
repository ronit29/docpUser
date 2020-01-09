import React from 'react'
import GTM from '../../../helpers/gtm.js'

class TopProcedureWidgets extends React.PureComponent {

    navigateTo(data, e) {
        e.preventDefault()
        e.stopPropagation()
        let selectedCriteria = {
            type: 'ipd',
            id: data.id,
            name: data.name
        }
        
        let gtmData = {
            'Category': 'ConsumerApp', 'Action': 'HomeWidgetProcedureClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-procedure-clicked', 'selected': data.name || '', 'selectedId': data.id || ''
        }
        GTM.sendEvent({ data: gtmData })

        this.props.toggleIPDCriteria(selectedCriteria, true)
        
        if(data.url){
            this.props.historyObj.push(`/${data.url}?showPopup=true`)
        }else{
            this.props.historyObj.push(`/ipdInfo?ipd_id=${data.id}&showPopup=true`)
        }
    }

    scroll(type) {
        var elmnt = document.getElementById("top_ipd")
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName('top_ipd_list')[0].offsetWidth
        let cardCount = document.getElementsByClassName('top_ipd_list')[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById("top_ipd").scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById('leftArrow_ipd').classList.add("d-none")
            }
            document.getElementById('RightArrow_ipd').classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById('RightArrow_ipd').classList.add("d-none")
            }
            document.getElementById('leftArrow_ipd').classList.remove("d-none")
        }
    }
	
	render(){

		return(
		     <div className="pakg-slider-container mt-10 mb-10">
                <div className="pkgSliderHeading">
                    <h5>Top Procedures</h5>
                    {/*<span>View All</span>*/}
                </div>
                <div className="pkgSliderContainer" id="top_ipd">
                    <div className='pkgCardsList d-inline-flex sub-wd-cards top_ipd_list'>
                    	{
                    		this.props.top_data.map((data, i) => {
                    			return <a href={data.url?`${data.url}`:`ipdInfo?ipd_id=${data.id}`} className="pkgcustCards" key={this.props.mergeState?i:data.url?data.url:i} onClick={this.navigateTo.bind(this, data)}>
				                            <div className="pkgcardImgCont">
				                                <img className="img-fluid" src={data.svg_icon?data.svg_icon:data.icon} />
				                            </div>
				                            <p className="pkgtstName prcd-height">
				                                {data.name}
				                        	</p>
				                        </a>		
                    		})
                    	}
                    </div>
                </div>
                <div className="pkglftRhtbtncont">
                    <div className="pkg-btnlft d-none" id="RightArrow_ipd" onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id="leftArrow_ipd" onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
            </div>
		)
	}
}

export default TopProcedureWidgets