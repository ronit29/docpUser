import React from 'react'
import GTM from '../../../helpers/gtm.js'

class HomePagePackageCategory extends React.PureComponent {

    navigateTo(PkgData, e){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'HomePageComparePackageClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-page-compare-package-clicked', 'package_id': PkgData
        }
        GTM.sendEvent({ data: data })

        let packages={}
        let selectedPkgCompareIds=[]
        this.props.historyObj.push('/package/compare?category_ids='+ PkgData.id)
    }

    scroll(type) {
        var elmnt = document.getElementById("top_pkgCat")
        let outerDivWidth = elmnt.offsetWidth
        let childDivWidth = document.getElementsByClassName('top_pkgCat')[0].offsetWidth
        let cardCount = document.getElementsByClassName('top_pkgCat')[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById("top_pkgCat").scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById('leftArrow_pkgCat').classList.add("d-none")
            }
            document.getElementById('RightArrow_pkgCat').classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById('RightArrow_pkgCat').classList.add("d-none")
            }
            document.getElementById('leftArrow_pkgCat').classList.remove("d-none")
        }
    }
    ViewAll(){
        let package_category_ids=[]
       this.props.top_data.map((data, i) => {
            package_category_ids.push(data.id)
       })
       this.props.historyObj.push('/searchpackages?package_category_ids='+ package_category_ids)
    }
	
	render(){

		return(
		     <div className="pakg-slider-container mt-10 mb-10">
                <div className="pkgSliderHeading">
                    <h5>Health Package Categories</h5>
                    {/*<span onClick={this.ViewAll.bind(this)}>View All</span>*/}
                </div>
                <div className="pkgSliderContainer" id="top_pkgCat">
                    <div className='pkgCardsList d-inline-flex sub-wd-cards top_pkgCat'>
                    	{
                    		this.props.top_data.map((data, i) => {
                    			return <a className="pkgcustCards health-pkg-card-width" key={i} onClick={this.navigateTo.bind(this, data)}>
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
                    <div className="pkg-btnlft d-none" id="RightArrow_pkgCat" onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id="leftArrow_pkgCat" onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
            </div>
		)
	}
}

export default HomePagePackageCategory