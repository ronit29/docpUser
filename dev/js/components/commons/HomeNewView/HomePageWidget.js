import React from 'react'
import PrescriptionUpload from '../../../containers/commons/PrescriptionUpload.js'


class HomePageWidgets extends React.PureComponent {

	constructor(props) {
        super(props);
        this.state = {

        }
    }

    scroll(type) {
        let dataType = this.props.dataType
        var elmnt = document.getElementById(dataType)

        if(elmnt) {
            let outerDivWidth = elmnt.offsetWidth
            let cardCount = elmnt.children && elmnt.children.length?elmnt.children.length:9;
            let childDivWidth = elmnt.scrollWidth?elmnt.scrollWidth:3000;
            let cardWidth = Math.ceil(childDivWidth / cardCount)

            let leftScroll = elmnt.scrollLeft

            if (type == 'right') {
                elmnt.scroll({ left: leftScroll + outerDivWidth, behavior: 'smooth' })
                if (childDivWidth <= (leftScroll +  2*outerDivWidth ) )  {
                    document.getElementById(`${dataType}_leftArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_RightArrow_hsptl`).classList.remove("d-none")
            } else {
                elmnt.scroll({ left: leftScroll - outerDivWidth, behavior: 'smooth' })
                if (leftScroll - outerDivWidth <= 0) {
                    document.getElementById(`${dataType}_RightArrow_hsptl`).classList.add("d-none")
                }
                document.getElementById(`${dataType}_leftArrow_hsptl`).classList.remove("d-none")
            }
        }
    }

    navigateTo = (where, e) =>{
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        if (this.props.type) {
            this.props.selectSearchType(this.props.type)
        }
        this.props.historyObj.push(where)
    }

    goldClicked =()=>{
        let data = {
            'Category': 'ConsumerApp', 'Action': 'HomePackageGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-homepage-package-gold-clicked'
        }
        GTM.sendEvent({ data: data })
        this.props.historyObj.push('/vip-gold-details?is_gold=true&source=homepagepackagegoldlisting&lead_source=Docprime')
    }

	render(){

		let { dataType, heading, rightText, discount, topHospitals, topPackages, type, navTo, count } = this.props
        let dataList = this.props.list;

        if(dataList && dataList.length && count) {
            dataList = dataList.slice(0, count);
        }

        let opd_lab = (type=='lab' || type=='opd')

		return (
			<React.Fragment>
				<section className="card-block-row">
                    <div className={`top-card-row ${rightText?'d-flex align-item-center justify-content-between':''}`}>
                        <h6>{heading}</h6>
                        {
                        	rightText?
                        	<a className="d-flex align-item-center" href="/" onClick={(e)=>{
                        		e.preventDefault();
                        		this.props.rightButtonClicked({type, where:navTo});
                        	}}>
	                            <span style={{ marginRight: 10}} className={opd_lab?'right-text-col':''}>
                                    {rightText}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19.411" height="12.941" viewBox="0 0 19.411 12.941" className="ml-2">
                                        <g transform="translate(-0.282 -87.521)">
                                            <g transform="translate(0.282 87.521)">
                                                <path className="link-arrow-clr"
                                                    d="M19.293,91.517l-6.066-6.066a.4.4,0,0,0-.572.572L18.03,91.4H.4a.4.4,0,0,0,0,.809H18.03l-5.376,5.376a.4.4,0,1,0,.572.572l6.066-6.066A.4.4,0,0,0,19.293,91.517Z"
                                                    transform="translate(0 -85.333)" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
	                            {/* <img className="ml-2" height="12" src={ASSETS_BASE_URL + "/img/right-arrow.svg"} alt="arrow"/> */}
	                        </a>
	                        :''
                        }
                        {
                            this.props.fromGold?
                            <a style={{position:'absolute', right:0, top:0}}>
                                <span style={{ fontSize: '13px',marginRight:10 }} className="right-text-col" onClick={() => this.props.goldNetwork()}>View Docprime Gold Network</span>
                            </a>
                            :''
                        }
                    </div>
                    {
                    	discount?
                    	<div className="discount-badge d-none">
                            <h6>{`Upto ${discount} OFF`}</h6>
                        </div>
                        :''
                    }
                    {/* card slider */}
                    {
                        dataList && dataList.length?
                        <div className={`card-slider-container ${(type=='opd' || type=='lab')?'mbl-wdgt':''} `} id={dataType}>
                        {
                            type=='lab' && !this.props.is_user_insurance_active?
                            <PrescriptionUpload historyObj={this.props.historyObj} is_home_page={true} locationObj = {this.props.locationObj} profiles={this.props.profiles} afterUserLogin={this.props.afterUserLogin} labWidget={true}/>  
                            :''
                        }
                        {
                            dataList.map((listItem, i) => {

                            return <div className={`slider-card-column`} key={`${i}_dataType`} onClick={()=>this.props.searchFunc({...listItem, topHospitals, topPackages },this)}>
                                        <div className="slide-img-col d-flex justify-content-center align-item-center">
                                            <img className="img-fluid" src={listItem.svg_icon?listItem.svg_icon:listItem.icon?listItem.icon:listItem.logo} alt="Partners"/>
                                        </div>

                                        <h5 className="card-name">
                                            {listItem.name} 
                                            {
                                                listItem.no_of_tests > 0?<span className="ml-2" >{`(${listItem.no_of_tests} tests)`}</span>:''
                                            }
                                            
                                        </h5>
                                        {
                                            this.props.fromGold && listItem.vip_percentage?
                                                <h5 className="off-txt">{parseInt(listItem.vip_percentage)}% OFF</h5>
                                            :''
                                        }
                                        {
                                            type == "package"?
                                            <React.Fragment>
                                            {
                                            //for login, gold enabled member or vip enabled member
                                                listItem.vip && ( listItem.vip.is_gold_member || listItem.vip.is_vip_member ) && listItem.vip.covered_under_vip?
                                                <React.Fragment>
                                                    {
                                                        (listItem.vip.vip_amount + listItem.vip.vip_convenience_amount)!= listItem.mrp?
                                                        <h6 className="test-price fw-500 mt-3">&#8377; {listItem.mrp}</h6>:''
                                                    }
                                                    
                                                    <h6 className="gold-test-price fw-500 mt-3">
                                                        <img height="18" src={`${listItem.vip.is_gold_member?"https://cdn.docprime.com/cp/assets/img/gold-lg.png":"https://cdn.docprime.com/cp/assets/img/vip-lg.png"}` } alt="gold"/>
                                                        <span className="ml-2">Price &#8377; {listItem.vip.vip_amount + listItem.vip.vip_convenience_amount}</span>
                                                    </h6>
                                                </React.Fragment>
                                                :<React.Fragment>
                                                    {
                                                        listItem.discounted_price == listItem.mrp
                                                        ?<h6 className="test-price fw-500 mt-3" style={{marginTop: 10, marginBottom: 10}}>&#8377; {listItem.mrp}</h6>
                                                        :<div className="pkg-prc-ct" style={{marginTop: 10, marginBottom: 10}}>
                                                            <p className="justify-content-around" style={{fontSize: 12}}>
                                                                <span>₹ {listItem.discounted_price}
                                                                    <span className="pkg-ofr-cut-prc">₹ {listItem.mrp}</span>
                                                                </span> 
                                                                {
                                                                    parseInt(((listItem.mrp - listItem.discounted_price) / listItem.mrp) * 100)!=0 && (listItem.discounted_price != listItem.mrp)?
                                                                    <span className="pkg-hlth-offer">{parseInt(((listItem.mrp - listItem.discounted_price) / listItem.mrp) * 100)}% OFF</span>:''
                                                                }
                                                            </p>
                                                        </div>
                                                    }
                                                    {
                                                            listItem.vip && !listItem.vip.is_gold_member && !listItem.vip.is_vip_member && listItem.discounted_price>(listItem.vip.vip_convenience_amount + listItem.vip.vip_gold_price) && listItem.vip.is_gold && listItem.vip.is_enable_for_vip?
                                                            <div className="pkg-prc-ct home-screengoldprice" style={{ fontSize: 13}} onClick={this.goldClicked}>
                                                                <img style={{width: '32px','marginRight': '5px'}} src={ASSETS_BASE_URL + '/img/gold-sm.png'}/>
                                                                <span>Price</span>
                                                                <p style={{color:'black'}}>₹ {listItem.vip.vip_gold_price+ listItem.vip.vip_convenience_amount}</p>
                                                            </div>
                                                            :''
                                                    }
                                                </React.Fragment>
                                            }
                                            </React.Fragment>
                                            :''
                                        }
                                        
                                    </div>

                            })
                            
                        }
                        {
                            this.props.searchType ?
                                <div className="col-4 home-card-col search-icon-col" key={`search${this.props.searchType}`}>
                                    <div className="grid-img-cnt search-icon-col">
                                        <a href="#" onClick={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.navigateTo(navTo)}
                                        }>
                                            <img className="img-fluid" src={ASSETS_BASE_URL + "/images/vall.png"} />
                                            <span>Search more {this.props.searchType}</span>
                                        </a>
                                    </div>
                                </div> : ''
                        }
                        </div>
                        :''    
                    }
                    

                    {/* slider buttons */}
                    <a className="pkg-btnlft d-none" id={`${dataType}_RightArrow_hsptl`} onClick={this.scroll.bind(this, 'left')}> 
                        {/* <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.004" height="8.472" viewBox="0 0 5.004 8.472">
                            <g transform="translate(105.702) rotate(90)">
                                <g transform="translate(0 100.698)">
                                    <path className="link-arrow-clr"
                                        d="M8.336,101.116l-.278-.279a.465.465,0,0,0-.656,0L4.238,104l-3.169-3.169a.465.465,0,0,0-.655,0l-.278.278a.464.464,0,0,0,0,.655l3.773,3.787a.474.474,0,0,0,.329.149h0a.474.474,0,0,0,.328-.149l3.77-3.777a.47.47,0,0,0,0-.66Z"
                                        transform="translate(0 -100.698)" />
                                </g>
                            </g>
                        </svg>
                    </a>
                    <a className="pkg-btnrgt" id={`${dataType}_leftArrow_hsptl`} onClick={this.scroll.bind(this, 'right')}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="5.004" height="8.472" viewBox="0 0 5.004 8.472">
                            <g transform="translate(105.702) rotate(90)">
                                <g transform="translate(0 100.698)">
                                    <path className="link-arrow-clr"
                                        d="M8.336,101.116l-.278-.279a.465.465,0,0,0-.656,0L4.238,104l-3.169-3.169a.465.465,0,0,0-.655,0l-.278.278a.464.464,0,0,0,0,.655l3.773,3.787a.474.474,0,0,0,.329.149h0a.474.474,0,0,0,.328-.149l3.77-3.777a.47.47,0,0,0,0-.66Z"
                                        transform="translate(0 -100.698)" />
                                </g>
                            </g>
                        </svg>
                    </a>
                </section>
			</React.Fragment>
			)
	}
}

export default HomePageWidgets