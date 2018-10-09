import React from 'react';

class Media extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {

		return (
			<div className="container media-container">
				<div className="row media-row">
					<div className="col-12 col-lg-3">
						<div className="media-media-sticky-div">
							<div className="media-list-div d-none d-lg-block">
								<ul className="media-list-options">
									<li>
										<p className="media-list-options-item media-selected-option">All Media</p>
									</li>
									{/* <li>
										<p class="media-list-options-item">News from Media</p>
									</li>
									<li>
										<p class="media-list-options-item">Press Releases</p>
									</li>
									<li>
										<p class="media-list-options-item">TV Commercials</p>
									</li>
									<li>
										<p class="media-list-options-item">News in Generals</p>
									</li> */}
								</ul>
							</div>
							<div className="media-contact-div d-none d-lg-block">
								<div className="media-contact-label-div">
									<p className="media-contact-label">Contact Us</p>
								</div>
								<div className="media-contact-items-div">
									<div className="media-contact-item">
										<div className="media-contact-subitem">
											<img src="/assets/img/media/email-icon.svg" style={{verticalAlign: 'middle'}} className="media-contact-icon" />
										</div>
										<div className="media-contact-subitem">
											<p className="media-contact-text">media@docprime.com</p>
										</div>
									</div>
									<div className="media-contact-item media-location-item">
										<div className="media-contact-subitem media-location-subitem">
											<img src="/assets/img/media/media-loc.svg" className="media-contact-icon" />
										</div>
										<div className="media-contact-subitem">
											<p className="media-contact-text">Plot no</p>
											<p className="media-contact-text">119, Sector 44</p>
											<p className="media-contact-text">Gurugram - 122001</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<div className="media-div-head">
							<img src="/assets/img/media/newspaper.png" />
							<span>Press Releases</span>
						</div>
						<div className="media-div-card">
							<p className="media-card-heading">Policybazaar.com to foray into healthcare and tech services</p>
							<p className="media-card-date">30 March, 2018</p>
							<p className="media-card-content">Policybazaar.com, India's largest insurance website and comparison portal, is planning to foray into the healthcare technology and services space</p>
							<p className="media-card-content">The new platform will provide consumers with easy, online and free access to PolicyBazaar's empanelled top-notch doctors and medical consultants.To begin with, the company intends to partner with 100 hospitals and 20,000 doctors, diagnostic centres, and clinics by the end of March 2019.The healthcare vertical also plans to offer a huge array of healthcare services, which includes in-hospital concierge services for its health insurance customers.By doing this, Policybazaar.com wants to be with its customers at the moment of truth, which is at the time of claims.
							  "Our foray into the healthcare services space is in sync with the vision of expanding the social security net of India. With this venture, we seek to fulfill the need of providing quality and affordable healthcare of the burgeoning population at large by connecting the consumers with our in-house medical practitioners. The new portal will facilitate the creation of an inclusive healthcare system, which will eventually offer customised options for in-patient department insurance based on detailed analysis undertaken after studying consumer healthcare habits and patient's interactions with the doctors," said Yashish Dahiya, co-founder and CEO, Policybazaar.com.In the long run, PolicyBazaar.com wants to offer its customers a better and personalised claim and in-hospital experience.Policybazaar is also going to work with insurers to create a new category of health insurance for Out-patient expenses (OPD) and provide free online medical consultation to consumers over phone and chat.
							  Policybazaar.com is in discussions with insurance companies to offer a first of its kind OPD insurance product.
                The company aims to offer 5 million OPD consultations by next FY.</p>
							<div className="media-icons-div">
								<a href="http://www.india.com/news/agencies/policybazaar-com-to-foray-into-healthcare-tech-service-space-3108739/" target="_blank"><img src="/assets/img/media/ind-blwh.png" onmouseover="this.src='/assets/img/media/ind-color.png'" onmouseout="this.src='/assets/img/media/ind-blwh.png'" /></a>
								<a href="http://www.abplive.in/business/policybazaar-com-to-foray-into-healthcare-and-tech-services-676864" target="_blank"><img src="/assets/img/media/abp-blwh.png" onmouseover="this.src='/assets/img/media/abp-color.png'" onmouseout="this.src='/assets/img/media/abp-blwh.png'" /></a>
								<a href="https://health.economictimes.indiatimes.com/news/health-it/policybazaar-com-to-foray-into-healthcare-tech/63577983" target="_blank"><img src="/assets/img/media/et-blwh.png" onmouseover="this.src='/assets/img/media/et-color.png'" onmouseout="this.src='/assets/img/media/et-blwh.png'" /></a>
								<a href="https://www.outlookindia.com/newsscroll/policybazaarcom-to-foray-into-healthcare-tech-service-space/1329181" target="_blank"><img src="/assets/img/media/out-blwh.png" onmouseover="this.src='/assets/img/media/out-color.png'" onmouseout="this.src='/assets/img/media/out-blwh.png'" /></a>
								<a href="https://www.deccanchronicle.com/business/companies/020418/policybazaarcom-to-foray-into-healthcare-technology.html" target="_blank"><img src="/assets/img/media/dc-blwh.png" onmouseover="this.src='/assets/img/media/dc-color.png'" onmouseout="this.src='/assets/img/media/dc-blwh.png'" /></a>
								<a href="https://www.gadgetsnow.com/tech-news/policybazaar-to-enter-healthcare-tech-and-services-space/articleshow/63265798.cms" target="_blank"><img src="/assets/img/media/gn-blwh.png" onmouseover="this.src='/assets/img/media/gn-color.png'" onmouseout="this.src='/assets/img/media/gn-blwh.png'" /></a>
							</div>
						</div>
						<div className="media-div-card">
							<p className="media-card-heading">New venture promoted to offer free online &amp; over phone medical consultations</p>
							<p className="media-card-date">13 June, 2018</p>
							<p className="media-card-content content-shown">Yashish Dahiya, Co-founder &amp; CEO, PolicyBazaar Group of Companies said: "We will be building a team of certified and quality medical professionals to give free online consultations to customers. This shall be supported by a robust offline network</p>
							<p className="media-card-content content-hidden">AI will play a key role in helping us build this in scale and efficiency.ETechAces Marketing &amp; Consulting Pvt. (ETechAces”), which owns India’s leading insurtech brand, PolicyBazaar.com(“PolicyBazaar”) and India’s leading lending marketplace, PaisaBazaar.com (“PaisaBazaar”), has floated another farm `docprime' for foraying into the healthcare tech and service space.As part of its plans to capture the out of pocket healthcare market in India estimated at nearly $100+bn, the new venture  will provide free online and over phone medical consultations, to begin with. It aims to provide 1 million free medical consultations by March 2019 and reach the scale of 5 million by March 2020.
							  Speaking on the latest venture, Yashish Dahiya, Co-founder &amp; CEO, PolicyBazaar Group of Companies said: "We will be building a team of certified and quality medical professionals to give free online consultations to customers. This shall be supported by a robust offline network. AI will play a key role in helping us build this in scale and efficiency. Our vision is to change customer behavior in the healthcare space by making the consumer shift to online medical consultation from offline by building an easy to use, convenient and trustworthy solution. We believe that healthcare space has huge potential to disrupt, and can follow the same growth trajectory as the digital insurance space which initially faced a similar kind of consumer inertia that this space faces."
                India has one of the lowest ratios for a doctor per 1,000 people amongst the developing countries. Having a physical interaction with a medical practitioner is not only a time-consuming process but also an expensive one, especially in the private sector. Even though government hospitals and state-run health centers offer consultations either free of cost or at subsidized pricing, it's not easy to get an access to these services.</p>
							<div className="media-icons-div">
								<a href="http://www.asiainsurancepost.com/health/policybazaars-promoter-offer-free-online-medical-consultations" target="_blank"><img src="/assets/img/media/asinsurance-blwh.png" onmouseover="this.src='/assets/img/media/asinsurance-color.png'" onmouseout="this.src='/assets/img/media/asinsurance-blwh.png'" /></a>
							</div>
						</div>
					</div>
					<div className="col-lg-3 col-12">
						<div className="media-sticky-div">
							<div className="twitter-feed">
								
						<a class="twitter-timeline" href="https://twitter.com/DocPrimeIndia?ref_src=twsrc%5Etfw">Tweets by docprimeIndia</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
							</div>
							<div className="facebook-feed">
								<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FDocPrimeIndia&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId" width={340} height={500} style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowTransparency="true" allow="encrypted-media" />
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-3 d-lg-none">
						<div className="media-sticky-div">
							<div className="media-contact-div">
								<div className="media-contact-label-div">
									<p className="media-contact-label">Contact Us</p>
								</div>
								<div className="media-contact-items-div">
									<div className="media-contact-item">
										<div className="media-contact-subitem">
											<img src="/assets/img/media/email-icon.svg" style={{verticalAlign: 'middle'}} className="media-contact-icon" />
										</div>
										<div className="media-contact-subitem">
											<p className="media-contact-text">media@docprime.com</p>
										</div>
									</div>
									<div className="media-contact-item media-location-item">
										<div className="media-contact-subitem media-location-subitem">
											<img src="/assets/img/media/media-loc.svg" className="media-contact-icon" />
										</div>
										<div className="media-contact-subitem">
											<p className="media-contact-text">Plot no</p>
											<p className="media-contact-text">119, Sector 44</p>
											<p className="media-contact-text">Gurugram - 122001</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Media
