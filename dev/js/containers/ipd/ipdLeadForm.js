import React from 'react'
import { connect } from 'react-redux'
import { getIpdInfo } from '../../actions/index.js'
import SnackBar from 'node-snackbar'

class IpdLeadForm extends React.Component{

	constructor(props) {
		super(props)
		this.state = {
			name: '',
			mobileNo:''
		}
	}

	inputHandler(e) {
		e.preventDefault()
        e.stopPropagation()
        if (e.target.name == 'mobileNo') {
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

        if (this.state.mobileNo.match(/^[56789]{1}[0-9]{9}$/)) {
        	SnackBar.show({ pos: 'bottom-center', text: "Sucess Register" },()=>{
        		this.props.submitLeadFormGeneration()
        	})
        }else {
        	SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Mobile No" },()=>{
        		this.props.submitLeadFormGeneration()
        	})
        }
    }

	render(){

		return(
			<div className="search-el-popup-overlay" onClick={(e)=>{
				e.preventDefault()
				e.stopPropagation()
				this.props.submitLeadFormGeneration(true)} }>
				<div className="search-el-popup">
					<div className="widget">
						<div className="p-relative">
							<span className="ipd-pop-cls" onClick={(e)=> {
								e.preventDefault()
								e.stopPropagation()
								this.props.submitLeadFormGeneration(true)} }><img src={ASSETS_BASE_URL + "/img/icons/close.png"} /></span>
							<p className="ipd-needHelp">Need Help?</p>
							<p className="srch-el-ipd-cont">Please provide the details below and our medical expert will contact you soon</p>
							<div className="ipd-inp-section">
								<input type="text" value={this.state.name} name='name' placeholder="Name"  onChange={this.inputHandler.bind(this) }/>
								<input type="Number" value={this.state.mobileNo} name='mobileNo' placeholder="Mobile Number"  onChange={this.inputHandler.bind(this)}/>
								<button className="ipd-inp-sbmt" onClick={this.submitLeadForm.bind(this)}>Submit</button>
							</div>
							<div className="ipd-inp-done">
								<button className="ipd-inp-sbmt">Submit</button>
							</div>
						</div>
					</div>

				</div>
			</div>
			)
	}
}

const mapStateToProps = (state, passedProps) => {

	const {
		selectedCriterias
	} = state.SEARCH_CRITERIA_IPD

	return {
		selectedCriterias
	}
}

const mapDispatchToProps = (dispatch) => {

	return {
		getIpdInfo: (ipd_id) => dispatch(getIpdInfo(ipd_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(IpdLeadForm)