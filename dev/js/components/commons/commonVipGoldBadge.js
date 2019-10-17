import React from 'react';
import GTM from '../../helpers/gtm.js'
// let is_labopd_enable_for_vip = is_vip_enabled
//         let is_labopd_enable_for_gold = is_gold
//         let is_vip_member = false
//         let is_gold_member = false
//         let covered_under_vip = false
        
export default (props)=> {
	let { is_labopd_enable_for_vip, is_labopd_enable_for_gold, is_vip_member, is_gold_member, covered_under_vip, vip_data, discounted_price, mrp, enabled_for_hospital_booking, is_doc, is_package } = props;
	console.log(props);
	let vip = vip_data;
	return (
		<React.Fragment>
			{//for Vip Gold Purchase User
				is_gold_member && covered_under_vip && 
				<React.Fragment>
					<div className="text-right mb-2">
	                    <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
	                </div>
                </React.Fragment>
			}

			{//for Vip Purchase User
				is_vip_member && covered_under_vip && !is_gold_member && 
				<React.Fragment>
					<div className="text-right mb-2">
	                    <img className="vip-main-ico img-fluid" src={ASSETS_BASE_URL + '/img/viplog.png'} />
	                </div>
                </React.Fragment>
			}
			{//for gold or vip enabled user
				(is_gold_member || is_vip_member ) && covered_under_vip && <p className="cst-doc-price">₹ {vip.vip_amount+vip.vip_convenience_amount} <span className="cstm-doc-cut-price">₹ {mrp} </span></p>
			}
			{//for non gold ,non vip but for lab having gold or vip
				!((is_gold_member || is_vip_member ) && covered_under_vip) && (is_labopd_enable_for_gold || is_labopd_enable_for_vip) && <p className="cst-doc-price">₹ {vip.is_gold_member?vip.vip_gold_price+vip.vip_convenience_amount:discounted_price} <span className="cstm-doc-cut-price">₹ {mrp} </span></p>
			}
			{
				//for Non gold & non vip user, non gold vip but for vip enabled lab
				!is_package && !is_doc && !is_gold_member && !is_vip_member && !is_labopd_enable_for_gold && is_labopd_enable_for_vip && 
				<div className="d-flex align-items-center justify-content-end" style={{ cursor: 'pointer', marginTop: 5, marginBottom: 5, position: 'relative', zIndex: 1 }} onClick={(e) => {
                        this.props.clearVipSelectedPlan()
                        this.props.history.push('/vip-club-details?source=lablisting&lead_source=Docprime')
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'LabCardVIPClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'lab-card-vip-clicked'
                        }
                        GTM.sendEvent({ data: data })
                    }}>
                        <p className="fw-500 grn-txt-vip">Save 25% with</p>
                        <img src={ASSETS_BASE_URL + '/img/viplog.png'} style={{ width: 18, marginLeft: 4, marginRight: 2 }} />
                        <img src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} style={{ transform: 'rotate(-90deg)' }} />
                    </div>
			}
			{
				//for non gold & non vip , for hospital having gold
				   !is_package && !is_doc && !is_gold_member && !is_vip_member && discounted_price>(vip.vip_convenience_amount||0 + vip.vip_gold_price||0) && is_labopd_enable_for_gold && 
				    	<div className="d-flex align-items-center justify-content-end goldCard" onClick={() => this.goldClicked()}>
                           
                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_gold_price+ vip.vip_convenience_amount||0}</span><img style={{transform: 'rotate(-90deg)', width: '10px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                            
                        </div>
			}
			{
				// for Non gold & non vip user, non gold vip but for vip enabled doctor
                !is_package &&  is_doc && enabled_for_hospital_booking && !is_gold_member && !is_vip_member && !is_labopd_enable_for_gold && is_labopd_enable_for_vip ?
                    <div className="d-flex align-items-center justify-content-end" style={{ cursor: 'pointer', marginTop: 5, marginBottom: 5, position: 'relative', zIndex: 1 }} onClick={() => {
                        this.props.clearVipSelectedPlan()
                        this.props.history.push('/vip-club-details?source=doctorlisting&lead_source=Docprime')
                        let data = {
                            'Category': 'ConsumerApp', 'Action': 'DoctorCardVIPClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'doctor-card-vip-clicked'
                        }
                        GTM.sendEvent({ data: data })
                    }}>
                        <p className="fw-500 grn-txt-vip">Save 70% with</p>
                        <img src={ASSETS_BASE_URL + '/img/viplog.png'} style={{ width: 18, marginLeft: 4, marginRight: 2 }} />
                        <img src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} style={{ transform: 'rotate(-90deg)' }} />
                    </div>
                    : ''
            }

            {
				//for non gold & non vip , for hospital having gold doctor
				!is_package && is_doc && enabled_for_hospital_booking && !is_gold_member && !is_vip_member && discounted_price>(vip.vip_convenience_amount||0 + vip.vip_gold_price||0) && is_labopd_enable_for_gold && 
				    	<div className="d-flex align-items-center justify-content-end goldCard" onClick={() => this.props.goldClicked()}>
                           
                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_gold_price+ vip.vip_convenience_amount||0}</span><img style={{transform: 'rotate(-90deg)', width: '10px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                            
                        </div>
			}

			{
				//for non gold & non vip , for hospital having gold package
				is_package && !is_gold_member && !is_vip_member && discounted_price>(vip.vip_convenience_amount||0 + vip.vip_gold_price||0) && is_labopd_enable_for_gold && 
				    	<div className="d-flex align-items-center justify-content-end goldCard" onClick={() => this.props.goldClicked()}>
                           
                            <img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'}/> 
                            <p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_gold_price+ vip.vip_convenience_amount||0}</span><img style={{transform: 'rotate(-90deg)', width: '10px'}} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'}/>
                            
                        </div>
			}

		</React.Fragment>
		)	
}