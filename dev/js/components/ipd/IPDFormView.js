import React from 'react'
import LeftBar from '../commons/LeftBar'
import RightBar from '../commons/RightBar'
import ProfileHeader from '../commons/DesktopProfileHeader'
import Footer from '../commons/Home/footer'
import SnackBar from 'node-snackbar'
import ThankyouPoup from './ipdThankYouScreen.js'
const queryString = require('query-string')

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

    componentWillReceiveProps(nextProps){
    	if(nextProps.defaultProfile && !this.state.name && nextProps.profiles && nextProps.profiles[nextProps.defaultProfile]){
    		let userData = nextProps.profiles[nextProps.defaultProfile]
    		this.setState({name: userData.name|| '', phone_number: userData.phone_number+''||'', email: userData.email ||'', gender: userData.gender || '', age: userData.age ||'',  })
    	}
    }

    submitClicked() {
        let self = this
        let validateError = []
        if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
            validateError.push('name')
        }


        if (this.state.phone_number.match(/^[56789]{1}[0-9]{9}$/)) {

        } else {
       		validateError.push('phone_number')
        }

        if(this.state.email ==''){

            validateError.push('email')
        }

        if (this.state.gender == '') {
           
            validateError.push('gender')
        }

        if(!this.state.email.match(/\S+@\S+\.\S+/)) 
        {
            validateError.push('email')
        }

        if (this.state.age == '') {
          
            validateError.push('age')
        }

        if(validateError.length){

        	this.setState({validateError: validateError})
        }else{

        	const parsed = queryString.parse(this.props.location.search)


        	this.setState({validateError: validateError})
        	let formData = {
        		...this.state,
        		ipd_procedure: this.props.match.params.id
        	}

        	if(parsed.hospital_id){
        		formData.hospital = parsed.hospital_id
        	}

        	this.props.submitIPDForm(formData, (error, response)=>{
        		if(!error && response){
        			this.setState({submitFormSuccess: true})	
        		}else{
        			setTimeout(() => {
	                SnackBar.show({ pos: 'bottom-center', text: "Please try after some time" })
	            }, 500)	
        		}
        	})
        }
        

    }

	render(){
		let { ipd_info } = this.props
		return(
			<div className="profile-body-wrap">
                <ProfileHeader />
                <section className="container parent-section book-appointment-section breadcrumb-mrgn">

	                <div className="row main-row parent-section-row">
	                    <LeftBar />
	                    {
	                    	this.props.IPD_INFO_LOADED?
			                <div className="col-12 col-md-7 col-lg-7 center-column">
		                    	<div className ="ipd-section ipd-form-view">
		                    		<h4 className="section-heading pt-0">{`Get Cost Estimate of ${ipd_info.about.name}`}</h4>
		                    		<div className="lead-form">
		                    			<p>Please provide your details below and our Medical Experts will contact you shortly</p>
		                    			 {/*<ul class="med-help">
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Find the right Doctor and Hospital </li>
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Comparing Surgery/Procedure cost</li>
			                    			 <li><img src={ASSETS_BASE_URL + "/images/tick.png"} alt="" />Managing Hospital Process</li>
		                    			 </ul>*/}
		                    		</div>
					                  <div className="info-popup">
					                     {/*<div className="pop-head">{ipd_info.about.name}</div>*/}
					                     <div className="form-group fm-grp mt-0">
					                        <div className="lbl-txt">Name:</div>
					                        <div className="input-form"><input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('name')>-1?'error-on':''}`}  name = "name" value={this.state.name} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('name')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp">
					                        <div className="lbl-txt">Mobile No:</div>
					                        <div className="input-form"><input type="number" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('phone_number')>-1?'error-on':''}`} name = "phone_number" value={this.state.phone_number} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('phone_number')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp emailForm">
					                        <div className="lbl-txt">Email Id:</div>
					                        <div className="input-form"><input type="text" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('email')>-1?'error-on':''}`} name = "email" value={this.state.email} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('email')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                        
					                     </div>
					                     <div className="form-group fm-grp mrg-mb0">
					                        <div className="lbl-txt gender-label">Gender:</div>
					                        <div className="input-form dis-flx">
					                           <div className="dtl-radio">
					                              <label className="container-radio">Male
					                              <input type="radio" name="gender" value="on" checked={this.state.gender=='m'} onChange={()=>this.setState({gender:'m'})}/>
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
					                        	<span className="error-msg gender-error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                     <div className="form-group fm-grp mrg-mt0">
					                        <div className="lbl-txt">Age:</div>
					                        <div className="input-form"><input type="number" autoComplete="none" className={`form-control ${this.state.validateError.indexOf('age')>-1?'error-on':''}`} name = "age" value={this.state.age} onChange={this.inputHandler.bind(this)}/></div>
					                        {
					                        	this.state.validateError.indexOf('age')>-1?
					                        	<span className="error-msg">Required</span>
					                        	:''	
					                        }
					                     </div>
					                  </div>
					                  <div className="btn-search-div btn-apply-div btn-sbmt btncallback">
					                     <a href="javascript:void(0);" className="btn-search" onClick={this.submitClicked.bind(this)}>Request Call Back</a>
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
	        </div>

			)
	}
}

export default IPDFormView