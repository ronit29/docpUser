import React from 'react'
export default ({props,toggle, navigateToVip}) => {
	return(
		<div>
				<div className="cancel-overlay vip-cncl-overlay" onClick={()=>toggle()}></div>
				<div className="widget cancel-appointment-div cancel-popup vip-pop-mbl">
					<img src={ASSETS_BASE_URL + "/img/icons/close.png"} style={{ cursor: 'pointer', zIndex: '9' }} className="close-modal" onClick={()=>toggle()}/>
					<div className="widget-header text-center action-screen-header" style={{ position: 'relative', paddingTop: '' }} >
						<p className="vp-pop-grn">Save 70% on Appointments</p>
						<p className="vp-pop-sub-txt"> Become Docprime <img src={ASSETS_BASE_URL + "/img/viplog.png"}/> member today </p>
						<button className="vp-pop-ch-btn" onClick={()=>navigateToVip()}>Know more</button>
					</div>
				
				</div>
			</div>
		)
}