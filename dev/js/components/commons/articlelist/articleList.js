import React from 'react';

import LeftBar from '../../commons/LeftBar'
import RightBar from '../../commons/RightBar'
import ProfileHeader from '../../commons/DesktopProfileHeader'


class ArticleList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {

		return (
			<div className="profile-body-wrap">
				<ProfileHeader />
				<section className="container parent-section book-appointment-section">
					<div className="row main-row parent-section-row">
						<LeftBar />
						<div className="col-12 col-md-7 col-lg-7 center-column">
							<div className="container-fluid main-container">
								<div className="row main-row">
									<div className="col-12 art-searchbar-col">
										<input type="text" id="disease-search" className="art-searchbar" placeholder="Search any Disease" />
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<div className="widget disease-widget">
											<img src="img/customer-icons/malaria-img.png" className="disease-list-img" />
											<p className="common-disease-label fw-500">Common Diseases</p>
											<p className="disease-list-name fw-500">Malaria</p>
											<p className="disease-list-content fw-500">The genetic cause is unknown, but it is autosomal recessively inherited and the gene is located to chromosome 15q1,2</p>
											<p className="posted-text">Posted Today</p>
										</div>
									</div>
									<div className="col-12">
										<div className="widget disease-widget">
											<img src="img/customer-icons/malaria-img.png" className="disease-list-img" />
											<p className="common-disease-label fw-500">Common Diseases</p>
											<p className="disease-list-name fw-500">Malaria</p>
											<p className="disease-list-content fw-500">The genetic cause is unknown, but it is autosomal recessively inherited and the gene is located to chromosome 15q1,2</p>
											<p className="posted-text">Posted Today</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<RightBar />
					</div>
				</section>
			</div>
		);
	}
}


export default ArticleList
