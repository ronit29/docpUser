import React from 'react';
import SnackBar from 'node-snackbar'

class Doctorsignup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			mobile: "",
			email: "",
			city: "",
			member_type: this.props.member_type ? this.props.member_type : '',
			cityDropdownVisible: false,
			city_name: "",
			utm_params: props.utm_tags || {},
			source: 'Consumer',
			showSuccessBox: false
		}
	}

	componentWillReceiveProps(props) {
		if (this.state.utm_params != props.utm_tags) {
			this.setState({ utm_params: props.utm_tags })
		}
	}

	componentDidMount() {
		this.setState({ showSuccessBox: false });

		if (window) {
			(function (window, document) {

				var loader = function () {

					var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];

					script.src = "https://www.bajajfinserv.in/sites/bajaj/pstp/js/DocPrimeexternalwidget.js";

					tag.parentNode.insertBefore(script, tag);

				};

				window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);

			})(window, document);
		}
	}

	changeHandler = (event, key) => {
		this.setState({
			[key]: event.target.value
		});

		if (key === 'city') {
			if (event.target.value === "") {
				this.setState({ cityDropdownVisible: false });
			}
			else {
				this.setState({ cityDropdownVisible: true });
				this.props.getCities(event.target.value);
			}
		}
	}

	setCity = (cityName, cityId) => {
		this.setState({
			city: cityName,
			city_name: cityId,
			cityDropdownVisible: false
		});
	}

	onSubmitData(e) {
		e.preventDefault();
		this.props.signupDoctor(this.state, (error, res) => {
			this.setState({
				name: "",
				mobile: "",
				email: "",
				city: "",
				member_type: "",
				city_name: "",
				showSuccessBox: true
			});
			SnackBar.show({ pos: 'bottom-center', text: "Sign Up was successful." });
		});
	}

	render() {
		return (
			<React.Fragment>
				<div id="myWidget"></div>
				<div className="sub-header d-none d-lg-block"></div>
				<div className="container about-container">
					<div className="row">
						{
							this.state.showSuccessBox ?
								<div className="col-12">
									<div className="submit-alert alert-success" role="alert">
										<strong>Thank you </strong>for choosing <a href="/" onClick={(e) => {
											e.preventDefault();
											this.props.history.push('/')
										}}>docprime.com</a>. Our team will get in touch with you shortly.
									</div>
								</div> : ''
						}
						<div className="col-12 dsp-main-info-div">
							<div className="dsp-phone-img-div">
								{/*<img src="https://cdn.docprime.com/static/web/images/phone_doc.c1fe8649711f.png" className="dsp-phone-img" />*/}
								<img src={ASSETS_BASE_URL + "/img/doc-signup.png"} style={{ width: 320 }} className="dsp-phone-img" />
							</div>
							<div className="dsp-img-info-div">
								<div className="dsp-logo-div">
									<img src="https://cdn.docprime.com/static/web/images/logo.9ea116657a60.png" className="dsp-logo" style={{ width: 160 }} />
								</div>
								{/* <div className="coming-soon-div">
								<p className="coming-soon-text">COMING SOON</p>
							</div> */}
								<div className="dsp-detail-text-div mrt-20">
									<p className="dsp-detail-text">Become our partner &amp; help us serve millions of patients across India</p>
								</div>
								<form className="doc-lab-sgnup-cont" onSubmit={(e) => this.onSubmitData(e)} autoComplete="off" autoCorrect="off" spellCheck="off">
									{/* <div className="dsp-signup-div mrt-20">
									<p className="dsp-signup-label">SignUp as</p>
								</div> */}
									<div className="form-group">
										<label>SignUp as</label>
										<select name="member_type" className="form-control" value={this.state.member_type} required id="dsp-select-profession" onChange={(event) => this.changeHandler(event, 'member_type')}>
											<option value="">Select</option>
											<option value={1}>Doctor</option>
											<option value={2}>Diagnostic Center</option>
											<option value={3}>Hospital/Clinic</option>
										</select>
									</div>
									<div className="form-group">
										<label>Name</label>
										<input type="text" name="name" maxLength={255} className="form-control" required id="dsp-name" value={this.state.name} onChange={(event) => this.changeHandler(event, 'name')} />
									</div>
									<div className="form-group">
										<label>Mobile No:</label>
										<input type="number" name="mobile" max={9999999999} id="dsp-mobile" className="form-control" required min={5000000000} value={this.state.mobile} onChange={(event) => this.changeHandler(event, 'mobile')} />
									</div>
									<div className="form-group">

										<label>City:</label>
										<div className="cty-rltv">
											<input type="text" name="city_name" maxLength={255} className="form-control" required id="dsp-city" value={this.state.city} onChange={(event) => this.changeHandler(event, 'city')} />
											{
												this.state.cityDropdownVisible ?
													<div className="dsp-city-dropdown">
														<ul className="dsp-city-list">
															{
																this.props.citiesName.map(city => {
																	return <li onClick={() => this.setCity(city.name, city.value)} className="dsp-city-list-item" key={city.value}>{city.name}</li>
																})
															}
														</ul>
													</div> : ""
											}
										</div>
									</div>
									<div className="form-group">
										<label>Email:</label>
										<input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" value={this.state.email} className="form-control" required maxLength={254} id="dsp-email" onChange={(event) => this.changeHandler(event, 'email')} />
									</div>
									<button type="submit" className="btn btn-primary dsp-send-btn">Submit</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Doctorsignup