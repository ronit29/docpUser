import React from 'react'
import GTM from '../../../helpers/gtm.js'

class HomePagePackageCategory extends React.Component {

    // navigateTo(data, e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     let selectedCriteria = {
    //         type: 'ipd',
    //         id: data.id,
    //         name: data.name
    //     }
        
    //     let gtmData = {
    //         'Category': 'ConsumerApp', 'Action': 'HomeWidgetProcedureClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'home-widget-procedure-clicked', 'selected': data.name || '', 'selectedId': data.id || ''
    //     }
    //     GTM.sendEvent({ data: gtmData })

    //     this.props.toggleIPDCriteria(selectedCriteria, true)
        
    //     if(data.url){
    //         this.props.history.push(`/${data.url}?showPopup=true`)
    //     }else{
    //         this.props.history.push(`/ipdInfo?ipd_id=${data.id}&showPopup=true`)
    //     }
    // }

    navigateTo(data, e){
        let data = {
            'Category': 'ConsumerApp', 'Action': 'HomePageCompareButton', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'compare-button-click'
        }
        GTM.sendEvent({ data: data })

        let packages={}
        let selectedPkgCompareIds=[]
        packages.id=this.props.packagesList.result[0].id
        packages.lab_id=this.props.packagesList.result[0].lab.id
        packages.img=this.props.packagesList.result[0].lab.lab_thumbnail
        packages.name=this.props.packagesList.result[0].name
        this.props.togglecompareCriteria(packages)
        if(this.props.compare_packages && this.props.compare_packages.length >0){
              this.props.compare_packages.map((packages, i) => {
                  selectedPkgCompareIds.push(packages.id+'-'+packages.lab_id)
              })
        }
        selectedPkgCompareIds.push(this.props.packagesList.result[0].id+'-'+this.props.packagesList.result[0].lab.id)
        this.props.history.push('/package/compare?package_ids='+selectedPkgCompareIds)
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
	
	render(){

		return(
		     <div className="pakg-slider-container mt-10 mb-10">
                <div className="pkgSliderHeading">
                    <h5>Health Package Categories test</h5>
                    {<span>View All</span>}
                </div>
                <div className="pkgSliderContainer" id="top_pkgCat">
                    <div className='pkgCardsList d-inline-flex sub-wd-cards top_pkgCat'>
                    	{
                    		this.props.top_data.map((data, i) => {
                    			return <a className="pkgcustCards health-pkg-card-width" key={i} onClick={this.navigateTo.bind(this, data)}>
		                            <div className="pkgcardImgCont">
		                                <img className="img-fluid" src={data.icon} />
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