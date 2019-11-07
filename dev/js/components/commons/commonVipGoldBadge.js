import React from 'react';
import GTM from '../../helpers/gtm.js'
// let is_labopd_enable_for_vip = is_vip_enabled
//         let is_labopd_enable_for_gold = is_gold
//         let is_vip_member = false
//         let is_gold_member = false
//         let covered_under_vip = false
        
export default (props)=> {
	let { is_labopd_enable_for_vip, is_labopd_enable_for_gold, is_vip_member, is_gold_member, covered_under_vip, vip_data, discounted_price, mrp, enabled_for_hospital_booking, is_doc, is_package, deal_price } = props;
	let vip = vip_data;
	let show_deal_price = vip.is_labopd_enable_for_gold?vip.vip_gold_price+vip.vip_convenience_amount:discounted_price 
	let gold_price = vip.vip_convenience_amount + vip.vip_gold_price
	//let hide_gold_widget = gold_price > deal_price
	
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
				(is_gold_member || is_vip_member ) && covered_under_vip && <p className="cst-doc-price">₹ {vip.vip_amount+vip.vip_convenience_amount} <span className="cstm-doc-cut-price">₹ {parseInt(mrp)} </span></p>
			}
			{//for non gold ,non vip but for lab having gold or vip
				!((is_gold_member || is_vip_member ) && covered_under_vip) && !is_vip_member && is_labopd_enable_for_gold && is_labopd_enable_for_vip && 
				<React.Fragment>
					{
						show_deal_price!=mrp && gold_price<mrp?
						<p className="cst-doc-price">₹ {parseInt(show_deal_price)} <span className="cstm-doc-cut-price">₹ {parseInt(mrp)} </span></p>
						: (mrp>=gold_price)?
						<p className="cst-doc-price">₹ {parseInt(mrp)}</p>:''
					}
				</React.Fragment>
			}
			{
				//for Non gold & non vip user, non gold vip but for vip enabled lab
				!is_package && !is_doc && !is_gold_member && !is_vip_member && !is_labopd_enable_for_gold && is_labopd_enable_for_vip && 
				<div className="d-flex align-items-center justify-content-end" style={{ cursor: 'pointer', marginTop: 5, marginBottom: 5, position: 'relative', zIndex: 1 }} onClick={(e) => {
                        props.clearVipSelectedPlan()
                        props.history.push('/vip-club-details?source=lablisting&lead_source=Docprime')
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
				// for Non gold & non vip user, non gold vip but for vip enabled doctor
                !is_package &&  is_doc && enabled_for_hospital_booking && !is_gold_member && !is_vip_member && !is_labopd_enable_for_gold && is_labopd_enable_for_vip ?
                    <div className="d-flex align-items-center justify-content-end" style={{ cursor: 'pointer', marginTop: 5, marginBottom: 5, position: 'relative', zIndex: 1 }} onClick={() => {
                        props.clearVipSelectedPlan()
                        props.history.push('/vip-club-details?source=doctorlisting&lead_source=Docprime')
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

		</React.Fragment>
		)	
}