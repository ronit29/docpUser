import React from 'react';

class Careers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {

		return (
			<div>
				<div className="laptop-img-div absolute-images">
					<img src="/assets/img/career/laptop.png" />
				</div>
				<div className="pages-img-div absolute-images">
					<img src="/assets/img/career/pages.png" />
				</div>
				<div className="container careers-container">
					<div className="row">
						<div className="col-12 col-md-6 hiring-col">
							<div className="hiring-heading-div">
								<img src="/assets/img/career/hiring.png" className="hiring-img" />
								<h1 className="hiring-heading">We Are Hiring !</h1>
							</div>
							<div className="hiring-desc-div">
								<h3 className="hiring-desc">We are hiring for multiple positions, It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
							</div>
							<img src="/assets/img/career/arrow.svg" className="careers-arrow-img absolute-images" />
						</div>
						<div className="col-12 col-md-6 hiring-col">
							<div className="hiring-form-div">
								<form>
									<div className="form-group">
										<select className="form-control" required>
											<option value>Select Function</option>
											<option value="product">Product</option>
											<option value="tech">Technology</option>
											<option value="sales">Sales</option>
											<option value="content">Content</option>
											<option value="marketing">Marketing</option>
											<option value="qc">QC</option>
											<option value="support">Service &amp; Support</option>
											<option value="doctors">Doctors</option>
										</select>
									</div>
									<div className="form-group">
										<input type="text" id="name" className="form-control" placeholder="Your Name" required />
									</div>
									<div className="form-group">
										<input type="number" id="mobile" className="form-control" min={7000000000} max={9999999999} placeholder="Mobile Number" required />
									</div>
									<div className="form-group">
										<input type="email" id="email" className="form-control" placeholder="Email" required />
									</div>
									<div className="upload-resume-div">
										<label className="resume-label" htmlFor="upload-resume">Upload Resume</label>
										<div className="careers-upload-btn" onclick="$('.resume-label').click();">
											<img src="/assets/img/career/upload.svg" className="upload-icon" />
											<p className="careers-upload-text">Upload</p>
										</div>
										<div className="careers-input-file"><input type="file" name="resume" id="upload-resume" required /></div>
									</div>
									<div className="careers-submit-btn-div">
										<button type="submit" className="btn btn-primary careers-send-btn">Submit</button>
									</div>
								</form>
							</div>
							<div className="coffee-img-div absolute-images">
								<img src="/assets/img/career/coffee.png" className="coffee-img" />
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid absolute-images">
					<div className="row career-img-row">
						<div className="bag-img career-img-div">
							<img src="/assets/img/career/bag.png" className="career-img" />
						</div>
						<div className="specs-img career-img-div">
							<img src="/assets/img/career/specs.png" className="career-img" />
						</div>
						<div className="pen-img career-img-div">
							<img src="/assets/img/career/pen.png" className="career-img" />
						</div>
						<div className="cv-img career-img-div">
							<img src="/assets/img/career/cv.png" className="career-img" />
						</div>
						<div className="exam-img career-img-div">
							<img src="/assets/img/career/exam.png" className="career-img" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Careers
