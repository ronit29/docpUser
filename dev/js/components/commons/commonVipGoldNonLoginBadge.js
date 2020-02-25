import React from 'react';
import GTM from '../../helpers/gtm.js'
// let is_labopd_enable_for_vip = is_vip_enabled
//         let is_labopd_enable_for_gold = is_gold
//         let is_vip_member = false
//         let is_gold_member = false
//         let covered_under_vip = false

export default (props) => {
	let { is_labopd_enable_for_vip, is_labopd_enable_for_gold, is_vip_member, is_gold_member, covered_under_vip, vip_data, discounted_price, mrp, enabled_for_hospital_booking, is_doc, is_package, deal_price } = props;
	let vip = vip_data;
	let show_deal_price = vip.is_labopd_enable_for_gold ? vip.vip_gold_price + vip.vip_convenience_amount : discounted_price
	let gold_price = vip.vip_convenience_amount + vip.vip_gold_price
	//let hide_gold_widget = gold_price > deal_price
	return (
		<React.Fragment>


			{
				//for non gold & non vip , for hospital having gold
				!is_package && !is_doc && !is_gold_member && !is_vip_member && discounted_price > (vip.vip_convenience_amount + vip.vip_gold_price) && is_labopd_enable_for_gold && is_labopd_enable_for_vip &&
				<div className="goldCard gold-price-card-addon">
					<div className="d-flex align-items-center justify-content-end" onClick={() => props.goldClicked()}>
						{/* <p className="gld-p-rc">For</p> */}
						<img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
						<p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_gold_price + vip.vip_convenience_amount || 0}</span><img style={{ transform: 'rotate(-90deg)', width: '10px', margin: '0px 10px 0px 0px' }} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />

					</div>
					<p className="glod-save-perc">Save {parseInt(((mrp - vip.vip_gold_price - vip.vip_convenience_amount) / mrp) * 100)}%</p>
				</div>
			}

			{
				//for non gold & non vip , for hospital having gold doctor
				!is_package && is_doc && enabled_for_hospital_booking && !is_gold_member && !is_vip_member && discounted_price > (vip.vip_convenience_amount + vip.vip_gold_price) && is_labopd_enable_for_gold && is_labopd_enable_for_vip &&
				<div className="goldCard gold-price-card-addon">
					<div className="d-flex align-items-center justify-content-end " onClick={() => props.goldClicked()}>
						{/* <p className="gld-p-rc">For</p> */}
						<img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
						<p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {vip.vip_gold_price + vip.vip_convenience_amount || 0}</span><img style={{ transform: 'rotate(-90deg)', width: '10px', margin: '0px 10px 0px 0px' }} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />

					</div>
			<p className="glod-save-perc">Save {parseInt(((mrp - vip.vip_gold_price - vip.vip_convenience_amount) / mrp) * 100)}%</p>
				</div>
			}

			{
				//for non gold & non vip , for hospital having gold package
				is_package && !is_gold_member && !is_vip_member && discounted_price > (vip.vip_convenience_amount + vip.vip_gold_price) && is_labopd_enable_for_gold && is_labopd_enable_for_vip &&
				<div className="goldCard gold-price-card-addon">
					<div className="d-flex align-items-center justify-content-end " onClick={() => props.goldClicked()}>

						{/* <p className="gld-p-rc">For</p> */}
						<img className="gld-cd-icon" src={ASSETS_BASE_URL + '/img/gold-sm.png'} />
						<p className="gld-p-rc">Price</p> <span className="gld-rate-lf">₹ {parseInt(vip.vip_gold_price) + parseInt(vip.vip_convenience_amount) || 0}</span><img style={{ transform: 'rotate(-90deg)', width: '10px', margin: '0px 10px 0px 0px' }} src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />

					</div>
					<p className="glod-save-perc">Save {parseInt(((mrp - vip.vip_gold_price - vip.vip_convenience_amount) / mrp) * 100)}%</p>
				</div>
			}

		</React.Fragment>
	)
}