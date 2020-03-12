import React from 'react'

class CarouselView extends React.Component {

	scroll(type) {
        var elmnt = document.getElementById(`top_${this.props.dataType}`)

        if(elmnt && document.getElementsByClassName(`top_${this.props.dataType}_list`) && document.getElementById(`leftArrow_${this.props.dataType}`) && document.getElementById(`RightArrow_${this.props.dataType}`)) {

        	let outerDivWidth = elmnt.offsetWidth
	        let childDivWidth = document.getElementsByClassName(`top_${this.props.dataType}_list`)[0].offsetWidth
	        let cardCount = document.getElementsByClassName(`top_${this.props.dataType}_list`)[0].childElementCount
	        let cardWidth = Math.ceil(childDivWidth / cardCount)

	        let leftScroll = elmnt.scrollLeft
	        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
	        let cardEnd = cardCount * cardWidth

	        if (type == 'right') {
	            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
	            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
	                document.getElementById(`leftArrow_${this.props.dataType}`).classList.add("d-none")
	            }
	            document.getElementById(`RightArrow_${this.props.dataType}`).classList.remove("d-none")
	        } else {
	            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
	            if (leftScroll - scrollVal <= 0) {
	                document.getElementById(`RightArrow_${this.props.dataType}`).classList.add("d-none")
	            }
	            document.getElementById(`leftArrow_${this.props.dataType}`).classList.remove("d-none")
	        }
        }
    }

	render(){

		let { topHeading, dataList, dataType, topHospital, extraHeading, viewAll } = this.props
		return(
			<div className="pakg-slider-container mt-10 mb-10 pkg-ntwk-mrgn">
                <div className="pkgSliderHeading pl-1">
                    <h5>{topHeading||''}</h5>
                    {extraHeading && (viewAll || dataList.length>= 20) && <span onClick={() => this.props.navigateTo()}>{extraHeading}</span>}
                    {/*<span>View All</span>*/}
                </div>
                <div className="pkgSliderContainer network-slider" id={`top_${this.props.dataType}`}>
                    <div className={`pkgCardsList d-inline-flex sub-wd-cards top_${this.props.dataType}_list`}>
                    	{
                    		dataList.map((data, key)=>{
                			return <a key={`${key}_${data.id}`} href='' className="pkgcustCards"  onClick={()=>this.props.carouselCardClicked(data,topHospital?true:false)}>
	                            <div className="pkgcardImgCont">
	                            	{
	                            		data.logo && <img style={{width: '82px'}} className="img-fluid" src={data.logo} />
	                            	}
	                            </div>
	                            <p className="pkgtstName prcd-height">
	                                {data.name}
	                            </p>
	                        </a>
                    		})
                    	}
                    </div>
                </div>
                <div className="pkglftRhtbtncont netwrk-btns">
                    <div className="pkg-btnlft d-none" id={`RightArrow_${dataType}`} onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id={`leftArrow_${dataType}`} onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
            </div>
			)
	}
}

export default CarouselView;