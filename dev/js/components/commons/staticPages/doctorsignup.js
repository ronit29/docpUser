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
			member_type: "",
			cityDropdownVisible: false,
			city_name:""
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

	setCity = (cityName,cityId) => {
		this.setState({
			city: cityName,
			city_name:cityId,
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
				city_name:""
			});
			SnackBar.show({ pos: 'bottom-center', text: "Sign Up was successful." });
		});
	}

	render() {
		return (
			<div className="container about-container dsp-container">
				<div className="row">
					<div className="col-12 text-center">
						<p className="fw-500 about-heading">Sign Up</p>
					</div>
					<div className="col-12 dsp-main-info-div">
						<div className="dsp-phone-img-div">
							<img src="https://cdn.docprime.com/static/web/images/phone_doc.c1fe8649711f.png" className="dsp-phone-img" />
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
							<div className="dsp-signup-div mrt-20">
								<p className="dsp-signup-label">SignUp as</p>
							</div>
							<form onSubmit={(e) => this.onSubmitData(e)} autoComplete="off" autoCorrect="off" spellCheck="off">
								<div className="form-group">
									<select name="member_type" className="form-control" value={this.state.member_type} required id="dsp-select-profession" onChange={(event) => this.changeHandler(event, 'member_type')}>
										<option value="">Select</option>
										<option value={1}>Doctor</option>
										<option value={2}>Diagnostic Center</option>
										<option value={3}>Hospital/Clinic</option>
									</select>
								</div>
								<div className="form-group">
									<input type="text" name="name" placeholder="Name" maxLength={255} className="form-control" required id="dsp-name" value={this.state.name} onChange={(event) => this.changeHandler(event, 'name')} />
								</div>
								<div className="form-group dsp-city-mobile-div">
									<div className="dsp-mobile-div">
										<input type="number" name="mobile" max={9999999999} id="dsp-mobile" placeholder="Mobile Number" className="form-control" required min={7000000000} value={this.state.mobile} onChange={(event) => this.changeHandler(event, 'mobile')} />
									</div>
									<div className="dsp-city-div">
										<input type="text" name="city_name" placeholder="City" maxLength={255} className="form-control" required id="dsp-city" value={this.state.city} onChange={(event) => this.changeHandler(event, 'city')} />
										{
											this.state.cityDropdownVisible ?
												<div className="dsp-city-dropdown">
													<ul className="dsp-city-list">
														{
															this.props.citiesName.map(city => {
																return <li onClick={() => this.setCity(city.name,city.value)} className="dsp-city-list-item" key={city.value}>{city.name}</li>
															})
														}
													</ul>
												</div> : ""
										}
									</div>
								</div>
								<div className="form-group">
									<input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" value={this.state.email} className="form-control" required maxLength={254} id="dsp-email" onChange={(event) => this.changeHandler(event, 'email')} />
								</div>
								<button type="submit" className="btn btn-primary dsp-send-btn">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Doctorsignup