import React from 'react'

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

    goldClicked =()=>{
        let data = {
            'Category': 'ConsumerApp', 'Action': 'HomePackageGoldClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'vip-homepage-package-gold-clicked'
        }
        GTM.sendEvent({ data: data })
        this.props.historyObj.push('/vip-gold-details?is_gold=true&source=homepagepackagegoldlisting&lead_source=Docprime')
    }

	render(){

		let { dataType, heading, rightText, discount, topHospitals, topPackages, type, navTo } = this.props
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
	                            <span>{rightText}</span>
	                            <img className="ml-2" height="12" src={ASSETS_BASE_URL + "/img/right-arrow.svg"} alt="arrow"/>
	                        </a>
	                        :''
                        }
                    </div>
                    {
                    	discount?
                    	<div className="discount-badge">
                            <h6>{`Upto ${discount} OFF`}</h6>
                        </div>
                        :''
                    }
                    {/* card slider */}
                    {
                        this.props.list && this.props.list.length?
                        <div className={`card-slider-container ${(type=='opd' || type=='lab')?'mbl-wdgt':''} `} id={dataType}>
                        {
                            this.props.list.slice(0,20).map((listItem, i) => {

                            return <div className={`slider-card-column`} key={`${i}_dataType`} onClick={()=>this.props.searchFunc({...listItem, topHospitals, topPackages })}>
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
                                        
                                        {/* <h5 className="off-txt">30% OFF</h5>*/}
                                    </div>

                            })
                        }
                        </div>
                        :''    
                    }
                    

                    {/* slider buttons */}
                    <a className="pkg-btnlft" id={`${dataType}_RightArrow_hsptl`} onClick={this.scroll.bind(this, 'left')}> 
                        <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-left"/>
                    </a>
                    <a className="pkg-btnrgt" id={`${dataType}_leftArrow_hsptl`} onClick={this.scroll.bind(this, 'right')}> 
                        <img height="12" src={ASSETS_BASE_URL + "/img/color-chev.svg"} alt="chev-right"/>
                    </a>
                </section>
			</React.Fragment>
			)
	}
}

export default HomePageWidgets