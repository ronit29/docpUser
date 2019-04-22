import React from 'react';
import SnackBar from 'node-snackbar'
import HelmetTags from '../HelmetTags'

class Careers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			resume: null,
			name: "",
			mobile: "",
			email: "",
			profile_type: ""
		}
	}

	changeHandler = (event, key) => {
		this.setState({
			[key]: event.target.value
		});
	}

	filePicker = (e) => {
		this.setState({
			'resume': e.target.files[0]
		});
	}

	onSubmitProfile(e) {
		e.preventDefault()
		let form_data = new FormData()
		form_data.append("resume", this.state.resume, "resume.pdf")
		form_data.append('name', this.state.name)
		form_data.append('mobile', this.state.mobile)
		form_data.append('email', this.state.email)
		form_data.append('profile_type', this.state.profile_type)
		this.props.submitCareerProfile(form_data, (error, res) => {
			this.setState({
				resume: null,
				name: "",
				mobile: "",
				email: "",
				profile_type: ""
			});
			SnackBar.show({ pos: 'bottom-center', text: "Your job application submitted successfully." });
		});
	}

	render() {
		return (
			<div>
				<HelmetTags tagsData={{
					title: ('Career at docprime'),
					description: ("Fine career opportunity at docprime, India's one stop health care solution.")
				}} />
				<div className="laptop-img-div absolute-images">
					<img src={ASSETS_BASE_URL + "/img/career/laptop.png"}/>
				</div>
				<div className="pages-img-div absolute-images">
					<img src={ASSETS_BASE_URL + "/img/career/pages.png"} />
				</div>
				<div className="container careers-container">
					<div className="row">
						<div className="col-12 col-md-6 hiring-col">
							<div className="hiring-heading-div">
								<img src={ASSETS_BASE_URL + "/img/career/hiring.png"} className="hiring-img" />
								<h1 className="hiring-heading">We Are Hiring !</h1>
							</div>
							<div className="hiring-desc-div">
								<h3 className="hiring-desc">We are hiring for multiple positions.</h3>
							</div>
							<img src={ASSETS_BASE_URL + "/img/career/arrow.svg"} className="careers-arrow-img absolute-images" />
						</div>
						<div className="col-12 col-md-6 hiring-col">
							<div className="hiring-form-div">
								<form onSubmit={(e) => this.onSubmitProfile(e)} >
									<div className="form-group">
										<select className="form-control" value={this.state.profile_type} onChange={(event) => this.changeHandler(event, 'profile_type')} required>
											<option value="">Select Function</option>
											<option value="1">Product</option>
											<option value="2">Technology</option>
											<option value="3">Sales</option>
											<option value="4">Content</option>
											<option value="5">Marketing</option>
											<option value="6">QC</option>
											<option value="7">Service &amp; Support</option>
											<option value="8">Doctors</option>
										</select>
									</div>
									<div className="form-group">
										<input type="text" id="name" className="form-control" placeholder="Your Name" value={this.state.name} onChange={(event) => this.changeHandler(event, 'name')} required />
									</div>
									<div className="form-group">
										<input type="number" id="mobile" className="form-control" min={5000000000} max={9999999999} placeholder="Mobile Number" value={this.state.mobile} onChange={(event) => this.changeHandler(event, 'mobile')} required />
									</div>
									<div className="form-group">
										<input type="email" id="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(event) => this.changeHandler(event, 'email')} required />
									</div>
									<div className="upload-resume-div">
										<label className="resume-label" htmlFor="upload-resume">Upload Resume</label>
										<div className="careers-upload-btn">
											<img src={ASSETS_BASE_URL + "/img/career/upload.svg"} className="upload-icon" />
											<p className="careers-upload-text">Upload</p>
										</div>
										<div className="careers-input-file"><input type="file" name="resume" id="upload-resume" onChange={(e) => this.filePicker(e)} required /></div>
									</div>
									<div className="careers-submit-btn-div">
										<button type="submit" className="btn btn-primary careers-send-btn">Submit</button>
									</div>
								</form>
							</div>
							<div className="coffee-img-div absolute-images">
								<img src={ASSETS_BASE_URL + "/img/career/coffee.png"} className="coffee-img" />
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid absolute-images">
					<div className="row career-img-row">
						<div className="bag-img career-img-div">
							<img src={ASSETS_BASE_URL + "/img/career/bag.png"} className="career-img" />
						</div>
						<div className="specs-img career-img-div">
							<img src={ASSETS_BASE_URL + "/img/career/specs.png"} className="career-img" />
						</div>
						<div className="pen-img career-img-div">
							<img src={ASSETS_BASE_URL + "/img/career/pen.png"} className="career-img" />
						</div>
						<div className="cv-img career-img-div">
							<img src={ASSETS_BASE_URL + "/img/career/cv.png"} className="career-img" />
						</div>
						<div className="exam-img career-img-div">
							<img src={ASSETS_BASE_URL + "/img/career/exam.png"} className="career-img" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default Careers
