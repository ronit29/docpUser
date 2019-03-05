import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import SnackBar from 'node-snackbar'
import ThankyouPoup from './ipdThankYouScreen.js'

class IPDFormView extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			name:'',
			phone_number: '',
			email:'',
			gender:'',
			age:'',
			validateError:[],
			submitFormSuccess:false
		}
	}

	inputHandler(e) {
        if (e.target.name == 'phone_number') {
            e.target.value.length > 10
                ?''
                :this.setState({
                    [e.target.name]: e.target.value
                })
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }

    }

    submitClicked() {
        let self = this
        let validateError = []
        if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
            /*setTimeout(() => {
                if (!this.state.name) {
                    SnackBar.show({ pos: 'bottom-center', text: "Please enter your's name." })
                } else {
                    SnackBar.show({ pos: 'bottom-center', text: "Name should only contain alphabets." })
                }
            }, 500)
            return*/
            validateError.push('name')
        }


        if (this.state.phone_number.match(/^[56789]{1}[0-9]{9}$/)) {

        } else {
            /*setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please provide a valid number (10 digits)" })
            }, 500)
       		return */
       		validateError.push('phone_number')
        }

        if(this.state.email ==''){
          /*  setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Your Email Id" })
            }, 500)
            return*/ 
            validateError.push('email')
        }

        if (this.state.gender == '') {
           /* setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Select The Gender" })
            }, 500)
            return*/
            validateError.push('gender')
        }

        if(!this.state.email.match(/\S+@\S+\.\S+/)) 
        {
            /*setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter Valid Email Id" })
            }, 500)
            return */
            validateError.push('email')
        }

        if (this.state.age == '') {
           /* setTimeout(() => {
                SnackBar.show({ pos: 'bottom-center', text: "Please Select The Gender" })
            }, 500)
            return*/
            validateError.push('age')
        }

        if(validateError.length){

        	this.setState({validateError: validateError})
        }else{
        	this.setState({validateError: validateError})
        	let formData = {
        		...this.state,
        		ipd_procedure: this.props.match.params.id,
        		hospital: this.props.match.params.hospitalId
        	}
        	this.props.submitIPDForm(formData, (error, response)=>{
        		if(!error && response){
        			this.setState({submitFormSuccess: true})	
        		}else{
        			setTimeout(() => {
	                SnackBar.show({ pos: 'bottom-center', text: "Please Try after some time" })
	            }, 500)	
        		}
        	})
        }
        

    }

	render(){
		let { ipd_info } = this.props
		return(
			<div className="profile-body-wrap">
                <ProfileHeader showSearch={true} />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    {
	                    	this.props.IPD_INFO_LOADED?
			                <div className="col-12 col-md-7 col-lg-7 center-column">
		                    	<div className ="ipd-section">
		                    		<h4 className="section-heading pt-0">Please provide your below details, Our Medical Expert will call you for the further process</h4>
					                  <div className="info-popup">
					                     <div className="pop-head">{ipd_info.about.name}</div>
					                     <div className="form-group fm-grp mt-0">
					                        <div className="lbl-txt">Name:</div>
					                        <div className="input-form"><input type="text" autoComplete="off" className={`form-control ${this.state.validateError.indexOf('name')>-1?'error-on':''}`}  name = "name" value={this.state.name} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('name')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp">
					                        <div className="lbl-txt">Mobile No:</div>
					                        <div className="input-form"><input type="number" autoComplete="off" className={`form-control ${this.state.validateError.indexOf('phone_number')>-1?'error-on':''}`} name = "phone_number" value={this.state.phone_number} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('phone_number')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp">
					                        <div className="lbl-txt">Email Id:</div>
					                        <div className="input-form"><input type="text" autoComplete="off" className={`form-control ${this.state.validateError.indexOf('email')>-1?'error-on':''}`} name = "email" value={this.state.email} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('email')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                        
					                     </div>
					                     <div className="form-group fm-grp mrg-mb0">
					                        <div className="lbl-txt gender-label">gender:</div>
					                        <div className="input-form dis-flx">
					                           <div className="dtl-radio">
					                              <label className="container-radio">Male
					                              <input type="radio" name="gender" value="on" checked={this.state.gender=='m'} onClick={()=>this.setState({gender:'m'})}/>
					                              <span className="doc-checkmark"></span>
					                              </label>
					                           </div>
					                           <div className="dtl-radio">
					                              <label className="container-radio">Female
					                              <input type="radio" name="gender" value="on" checked={this.state.gender=='f'} onClick={()=>this.setState({gender:'f'})}/>
					                              <span className="doc-checkmark"></span>
					                              </label>
					                           </div>
					                           <div className="dtl-radio">
					                              <label className="container-radio">Others
					                              <input type="radio" name="gender" value="on" checked={this.state.gender=='o'} onClick={()=>this.setState({gender:'o'})}/>
					                              <span className="doc-checkmark"></span>
					                              </label>
					                           </div>
					                        </div>
					                        {
					                        	this.state.validateError.indexOf('gender')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp mrg-mt0">
					                        <div className="lbl-txt">Age:</div>
					                        <div className="input-form"><input type="number" autoComplete="off" className={`form-control ${this.state.validateError.indexOf('age')>-1?'error-on':''}`} name = "age" value={this.state.age} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('age')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                  </div>
					                  <div className="btn-search-div btn-apply-div btn-sbmt">
					                     <a href="javascript:void(0);" className="btn-search" onClick={this.submitClicked.bind(this)}>Submit</a>
					                  </div>
					                  {
					                  	this.state.submitFormSuccess?
					                  	<ThankyouPoup {...this.props}/>
					                  	:''	
					                  }
					                  
		                    	</div>
		                    </div>
		                    :''
		                }
	                    <RightBar extraClass=" chat-float-btn-2"/>
	                </div>
	            </section>
	            <Footer />
	        </div>

			)
	}
}

export default IPDFormView