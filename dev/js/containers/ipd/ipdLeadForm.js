import React from 'react'
import { connect } from 'react-redux'
import { submitIPDForm } from '../../actions/index.js'
import SnackBar from 'node-snackbar'
import GTM from '../../helpers/gtm.js'

class IpdLeadForm extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			phone_number:'',
			showForm: true,
			showThankyou: false
		}
	}

	inputHandler(e) {
        e.stopPropagation()
        if (e.target.name == 'phone_number') {
            e.target.value.length <= 10
                ? e.target.value.length == 10
                    ? this.setState({
                        [e.target.name]: e.target.value
                    })
                    : this.setState({
                        [e.target.name]: e.target.value
                    })
                : ''
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

    }

    submitLeadForm() {
    	if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
            setTimeout(() => {
                if (!this.state.name) {
                    SnackBar.show({ pos: 'bottom-center', text: "Please enter patient's name." })
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Name should only contain alphabets." })
                }
            }, 500)
            return
        }

        if (this.state.phone_number.match(/^[56789]{1}[0-9]{9}$/)) {
        	let formData = {
        		...this.state
        	}
        	this.props.submitIPDForm(formData, this.props.selectedLocation, (error, response) => {
				if (!error && response) {
					let gtmData = {
						'Category': 'ConsumerApp', 'Action': 'IpdLeadGenerationSuccess', 'CustomerID': GTM.getUserId() || '', 'leadid': response.id || '', 'event': 'ipd-lead-generation-success', selectedId: '', 'hospitalId': '', 'from': 'leadForm'
					}
					GTM.sendEvent({ data: gtmData })
					this.setState({showForm: false, showThankyou: true})
				} else {
					setTimeout(() => {
						SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
					}, 500)
					this.props.submitLeadFormGeneration()
				}
			})
        }else {
        	SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Mobile No" })
        }
    }

	render(){

		return(
			<div className="search-el-popup-overlay" onClick={(e)=>{
				e.preventDefault()
				e.stopPropagation()
				this.props.submitLeadFormGeneration(true)} }>
				<div className="search-el-popup ipd-pop-width">
					<div className="widget p-2">
						{
							this.state.showForm?
							<div className="p-relative">
								<span className="ipd-pop-cls" onClick={(e)=> {
									e.stopPropagation()
									e.preventDefault()
									this.props.submitLeadFormGeneration(true)} }><img src={ASSETS_BASE_URL + "/img/icons/close.png"} /></span>
								<p className="ipd-needHelp">Need Help?</p>
								<p className="srch-el-ipd-cont">Please provide the details below and our medical expert will contact you soon</p>
								<div className="ipd-inp-section" onClick={(e)=>{e.stopPropagation()
										e.preventDefault()}}>
									<input type="text" value={this.state.name} name='name' placeholder="Name"  onChange={this.inputHandler.bind(this)}/>
									<input type="Number" value={this.state.phone_number} name='phone_number' placeholder="Mobile Number"  onChange={this.inputHandler.bind(this)}/>
									<button className="ipd-inp-sbmt" onClick={(e)=>{
										e.stopPropagation()
										e.preventDefault()
										this.submitLeadForm()
									}}>Submit</button>
								</div>
							</div>
							:''
						}

						{
							this.state.showThankyou?
							<div className="p-relative">
								<span className="ipd-pop-cls" onClick={(e)=> {
									e.stopPropagation()
									e.preventDefault()
									this.props.submitLeadFormGeneration(true)} }><img src={ASSETS_BASE_URL + "/img/icons/close.png"} /></span>
								<p className="ipd-needHelp">Submitted</p>
								<p className="srch-el-ipd-cont">Your Request has been received our medical expert will call you shortly</p>
								<div className="ipd-inp-done">
									<button className="ipd-inp-sbmt" onClick={(e)=>{
										e.stopPropagation()
										e.preventDefault()
										this.props.submitLeadFormGeneration(true)
									}}>Submit</button>
								</div>
							</div>
							:''
						}
					</div>

				</div>
			</div>
			)
	}
}

const mapStateToProps = (state, passedProps) => {

	const {
        selectedLocation
    } = state.SEARCH_CRITERIA_OPD

	return {
		selectedLocation
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		submitIPDForm: (formData, selectedLocation, cb) => dispatch(submitIPDForm(formData, selectedLocation, cb))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdLeadForm)