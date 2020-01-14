import React from 'react'
import InsurPopup from './insurancePopup.js'
import Calendar from 'rc-calendar'
import InsuranceProofs from './insuranceProofs.js'
const moment = require('moment')

class InsuranceOthers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			last_name: '',
			middle_name:'',
			gender: '',
			dob: '',
			id: '',
			relation: '',
			title: '',
			member_type:'',
			userProfiles: {},
			showPopup: false,
			setDefault: false,
			profile_id:null,
			only_adult:false,
			// select_profile_disable:false,
			// show_lname: this.props.no_lname,
			// show_lname_flag:this.props.no_lname,
			dateModal:false,
			no_lname:false,
    	    selectedDateSpan:new Date(),
    	    is_change:false,
    	    year:null,
    	    mnth:null,
    	    day:null
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		let profile
		if(this.props.is_endorsement){
			if(Object.keys(this.props.self_data_values).length>0 && this.props.user_data.length > 0){
				profile= Object.assign({}, this.props.self_data_values[this.props.user_data[0].id])
				let oldDate
				if(Object.keys(profile).length > 0 && profile.dob){
					oldDate= profile.dob.split('-')
				    	this.setState({year:oldDate[0],mnth:oldDate[2],day:oldDate[1]},()=>{
				    		this.populateDates(this.props.member_id,true)
				    })
				}
				this.setState({...profile},()=>{
	    				this.handleSubmit(true)
	    			})
			}else{
				let oldDate
				if(this.props.user_data && this.props.user_data.length > 0){
					if(this.props.user_data[0].relation == 'spouse'){
						this.setState({only_adult:true})
					}
					if(this.props.user_data && this.props.user_data[0].dob){
						oldDate= this.props.user_data[0].dob.split('-')
						this.setState({year:oldDate[0],mnth:oldDate[2],day:oldDate[1]},()=>{
				    		this.populateDates(this.props.member_id,true)
				    	})
					}
	    			this.setState({...this.props.user_data[0], name:this.props.user_data[0].first_name,member_type:this.props.member_type, profile_id:this.props.user_data[0].profile,is_change:false},()=>{
	    				this.handleSubmit(true)
	    				// this.populateDates(this.props.member_id,true)
	    			})
				}
			}
		}else{
			if(!this.state.year && !this.state.mnth && !this.state.mnth){
				this.populateDates(this.props.member_id,true)
			}
		}
	}

	componentWillReceiveProps(props) {
		let self = this
		let adult_title
		let adult_gender
		if(!props.is_endorsement){
			if(props.self_data_values[props.member_id]){
				let profile = Object.assign({}, this.props.self_data_values[this.props.member_id])
				let nextProfile = Object.assign({}, props.self_data_values[props.member_id])
				if (JSON.stringify(this.state) != JSON.stringify(nextProfile)) {
					this.setState({ ...nextProfile })
					if(!self.state.year && !self.state.mnth && !self.state.mnth){
					    self.populateDates(props.member_id,true)
					}
				}
			}else if(props.member_id && !this.state.setDefault){
				if(props.self_gender == 'm'){
					adult_title = 'mrs.'
					adult_gender = 'f'
				}else if(props.self_gender == 'f'){
					adult_title = 'mr.'
					adult_gender = 'm'
				}
				this.setState({id: props.member_id, setDefault:true}, () => {
					if(this.props.is_child_only){
						if(!self.state.year && !self.state.mnth && !self.state.mnth){
						    self.populateDates(self.props.member_id,true)
						}
						this.setState({member_type:this.props.member_type},() =>{
							self.handleSubmit()
						})
					}else{
					    self.populateDates(self.props.member_id,true)
						this.setState({member_type:this.props.member_type,relation:'spouse',title:adult_title,gender:adult_gender,only_adult:true},() =>{
							self.handleSubmit()
						})
					}					
				})
			}
		}
	}
	handleTitle(field, event) {
		let title_value = event.target.value
		if(this.props.is_child_only){
			if(title_value == 'mr.'){
  			this.setState({gender:'m',relation:'son'})	
	  		}else if(title_value == 'miss'){
	  			this.setState({gender:'f',relation:'daughter'})	
	  		}
		}else{
			if(title_value == 'mr.'){
  			this.setState({gender:'m'})	
	  		}else if(title_value == 'miss'){
	  			this.setState({gender:'f'})	
	  		}else if(title_value == 'mrs.'){
	  			this.setState({gender:'f'})
	  		}
		}
		this.setState({ title: event.target.value }, () => {
			var self_data = this.state
			self_data.is_change = true
			this.props.userData('self_data', self_data)
		})
	}
	handleChange(field, event) {
		this.setState({
			[event.target.getAttribute('data-param')]: event.target.value
		});
	}
	handleRelation(field,event) {
		let relation_value = event.target.value
		if(relation_value == 'son'){
			this.setState({title:'mast.',gender:'m'})	
  		}else if(relation_value == 'daughter'){
  			this.setState({title:'miss',gender:'f'})	
  		}
		this.setState({
			relation: event.target.value,is_change:true
		},() =>{
			this.handleSubmit(true,event)
		})
	}
	handleSubmit(is_endoresment) {
		var self_data = this.state
		if(self_data.name !== ''){
	    	if(self_data.name.length > 50){
				self_data.name = self_data.name.slice(0, 50)
			}	
	    }
	    if(self_data.middle_name !== ''){
	    	if(self_data.middle_name.length > 50){
				self_data.middle_name = self_data.middle_name.slice(0, 50)
			}	
	    }
	    if(self_data.last_name !== ''){
	    	if(self_data.last_name.length > 50){
				self_data.last_name = self_data.last_name.slice(0, 50)
			}	
	    }
	    if(!is_endoresment){
	    	self_data.is_change = true
	    }
		this.props.userData('self_data', self_data)
	}
	getTodayDate(){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear(); 

		if(mm<10) 
		{
		    mm='0'+mm;
		}
		if(dd<10) 
		{
		    dd='0'+dd;
		} 
		today = yyyy+'-'+dd+'-'+mm;
		return today
	}
	togglePopup(newProfileid, member_id, newProfile) {
		let oldDate
		let finalDate
		if(newProfileid !== ''){
			if(this.props.is_child_only){
				if(newProfile.gender == 'm'){
					this.setState({title:'mast.',relation:'son'})
				}else if(newProfile.gender == 'f'){
					this.setState({title:'miss',relation:'daughter'})
				}
			}else{
				if(newProfile.gender == 'm'){
					this.setState({title:'mr.',relation:'spouse'})
				}else if(newProfile.gender == 'f'){
					this.setState({title:'mrs.',relation:'spouse'})
				}
			}
			if(newProfile && newProfile.dob){
				oldDate= newProfile.dob.split('-')
				console.log(newProfile.dob)
				console.log(oldDate)
				this.setState({year:oldDate[0],mnth:oldDate[1],day:oldDate[2]},()=>{
	    			this.populateDates(newProfileid,false)
	    			finalDate = this.state.year + '-'+ this.state.mnth + '-'+this.state.day 
	    			this.setState({dob:finalDate})
	    		})
			}else{
				this.populateDates(newProfileid,false)
			}
	    	
			this.props.selectInsuranceProfile(newProfileid, member_id, newProfile, this.props.param_id) // select from profile option
			this.setState({
				showPopup: !this.state.showPopup,
				profile_id: newProfileid,
				id:newProfileid
			},() =>{
				this.handleSubmit(false);
			})
		}else{
			this.setState({showPopup: !this.state.showPopup})
		}
	}
	handleGender(field, event) {
		let gender_value = event.target.value
		if(this.props.is_child_only){
			if(gender_value == 'm'){
  			this.setState({title:'mast.',relation:'son'})	
	  		}else if(gender_value == 'f'){
	  			this.setState({title:'miss',relation:'daughter'})	
	  		}
		}else{
			if(gender_value == 'm'){
  			this.setState({title:'mr.'})	
	  		}else if(gender_value == 'f'){
	  			this.setState({title:'mrs.'})	
	  		}
		}
		this.setState({
			gender: event.target.value, is_change:true
		},() =>{
			this.handleSubmit(false,event)
		})
	}
	openDateModal() {
	        this.setState({ dateModal: !this.state.dateModal })
	}
	selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            var date = new Date(date)
		    let mnth = ("0" + (date.getMonth()+1)).slice(-2)
		    let day  = ("0" + date.getDate()).slice(-2);
		    let actual_date =  [ date.getFullYear(), mnth, day ].join("-");
            this.setState({ selectedDateSpan: actual_date, dateModal: false, currentDate: new Date(date).getDate(),dob: actual_date }, () => {
                 this.handleSubmit(false)
            })
        } else {
            this.setState({ dateModal: false })
        }
    }
    handleNameCharacters(field,event){
		if(field == 'name'){
			if(this.state.name.length == 50){
				event.preventDefault();
	        }
    	}else if(field == 'last_name'){
			if(this.state.last_name.length == 50){
				event.preventDefault();
	        }
    	}else if(field == 'middle_name'){
			if(this.state.middle_name.length == 50){
				event.preventDefault();
	        }
    	}

	}
	handleLastname(event){
		this.setState({no_lname:!this.state.no_lname},() =>{
			this.handleSubmit(false,event)
		})
	}

	hideSelectProfilePopup() {
        this.setState({
            showPopup: false
        });
    }

    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    populateDates(member_id,toCreateOptions){
    	let age_threshold 
    	if(this.props.selected_plan && this.props.selected_plan.adult_count){
    		if(this.props.is_child_only){
    			age_threshold = this.props.selected_plan.threshold[0].child_max_age
    		}else{
    			age_threshold = this.props.selected_plan.threshold[0].max_age
    		}
    	}
    	let default_months=['01','02','03','04','05','06','07','08','09','10','11','12']
    	let self =this
    	var daydropdown = document.getElementById('daydropdown_'+member_id),
          monthdropdown = document.getElementById('monthdropdown_'+member_id),
          yeardropdown = document.getElementById('yeardropdown_'+member_id);
          	
        var today = new Date(),
            day = today.getUTCDate(),
            month = today.getUTCMonth(),
            year= today.getUTCFullYear()-age_threshold,
            currentYear = today.getUTCFullYear(),
            daysInCurrMonth = this.daysInMonth(month, year);
		if(daydropdown && monthdropdown && yeardropdown){
			
			daydropdown.innerHTML = ''
			monthdropdown.innerHTML = ''
			yeardropdown.innerHTML = ''

			var opt_dd = document.createElement('option');
				opt_dd.value = 'DD'
	          	opt_dd.text = 'DD'
	          	opt_dd.hidden = true
	          	daydropdown.appendChild(opt_dd);
	        var opt_mm = document.createElement('option');
				opt_mm.value = 'MM'
	          	opt_mm.text = 'MM'
	          	opt_mm.hidden = true
	          	monthdropdown.appendChild(opt_mm);
	        var opt_yy = document.createElement('option');
				opt_yy.value = 'YYYY'
	          	opt_yy.text = 'YYYY'
	          	opt_yy.hidden = true
	          	yeardropdown.appendChild(opt_yy);

				// Day
		        for(var i = 1; i <= daysInCurrMonth; i++){
		          var opt = document.createElement('option');
		          if(i<=9){
		          	opt.value = '0' + i;
		          	opt.text = '0' + i;
		          }else{
		          	opt.value = i;
		          	opt.text = i;
		          }
		          daydropdown.appendChild(opt);
		        }

		        // Month
		        for(var i = 0; i < 12; i++){
		          var opt = document.createElement('option');
		          opt.value = default_months[i]
		          opt.text = default_months[i]
		          monthdropdown.appendChild(opt);
		        }

		        // Year
		        for(var i = 0; i <= age_threshold; i++){
		          var opt = document.createElement('option');
		          opt.value = i + year;
		          opt.text = i + year;
		          yeardropdown.appendChild(opt);
		        }

			// change handler for day
			daydropdown.onchange = function(){
				var NewSelecteddays = daydropdown.value;
				self.setState({day:NewSelecteddays},()=>{
				self.submitDob()
				})
			}

			// Change handler for months
			monthdropdown.onchange = function(){
				var newMonth = monthdropdown.value
				self.setState({mnth:newMonth},()=>{
				self.submitDob()
				})
			}

			// change handler for year
			yeardropdown.onchange = function(){
				var newYear = yeardropdown.value;
				self.setState({year:newYear},()=>{
				self.submitDob()
				})
			}
	    }
  	}

  	submitDob(){
	let self =  this
      if(self.state.day && self.state.mnth && self.state.year){
      	let finalDate = self.state.year + '-'+ self.state.mnth + '-'+self.state.day 
      	self.setState({
    		dob : finalDate
    	},()=>{
    		self.handleSubmit() 
    	})
      }
  	}

	render() {
		let show_createApi_keys_adult = []
		let show_createApi_keys_child = []
		let show_createApi_keys_child2 = []
		let Uploaded_image_data
		let commonMsgSpan = <span className="fill-error-span">{this.props.errorMessages['common_message']}</span>
		if(this.props.is_child_only){
			let show_createApi_keys = []
			if(Object.keys(this.props.createApiErrorsChild).length > 0){
			Object.entries(this.props.createApiErrorsChild).map(function([key, value]) {
				if(key!=0 && key!=1){
					Object.entries(value).map(function([field_name,field_value]) {
						if(key == 2){
							show_createApi_keys_child.push(field_name)
						}else if(key == 3){
							show_createApi_keys_child2.push(field_name)
						}
					})
				}
			})
			}
		}else{
			if(Object.keys(this.props.createApiErrors).length > 0){
				Object.entries(this.props.createApiErrors).map(function([key, value]) {
						show_createApi_keys_adult.push(key)
				})
			}
		}
		let ErrorNameId
		if(this.props.validatingNames.length>0){
			ErrorNameId = this.props.validatingNames[0].split('=')[1]
		}

		if(this.props.members_proofs && this.props.members_proofs.length > 0){
			Uploaded_image_data = this.props.members_proofs.filter((x=>x.id == this.props.member_id))
		}
		return (
			<div className="ins-sub-forms mrt-10" id={`member_${this.props.member_id}`}>
				<div className="sub-form-input-data" style={{marginBottom:10}} >
					<div>
						{this.props.is_endorsement?
							<p className="sub-form-hed">{this.props.is_child_only? `Child ${this.props.member_view_id}`:`Spouse`}</p>
							:<p className="sub-form-hed">{this.props.is_child_only? `Child ${this.props.member_view_id-1}`:`Spouse`}</p>
						}
					</div>
					<div>
					{
						this.props.show_selected_profiles.length>0?
						<div className="sub-form-hed-click" onClick={() => this.setState({
						showPopup: true, userProfiles: this.props.USER})}>
						Select from profile
						<img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
					</div>:''
					}
					{/*<label className="ck-bx" onChange={this.handleLastname.bind(this)} style={{'fontWeight': '400', 'fontSize': '14'}}>I dont have last name<input type="checkbox" checked={this.state.no_lname} value="on"/>
					<span className="checkmark"></span></label>*/}
					</div> 
				</div>
				<div className='widget' style={{padding:'10px'}} >
					<div className="col-12" style={{padding:0}}>
					{
						this.props.is_child_only?
						<div>
						{/* <button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Master</button>
						<button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss')} >Miss</button> */}
						</div>
						:<div>
						<button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')} >Mr.</button>
						<button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
						</div>
					}
					{
						!this.props.is_child_only && this.props.validateErrors.indexOf('title')> -1?<span className="fill-error-span" style={{marginTop:'-13px'}}>{this.props.errorMessages['common_message']}</span>:''
					}
					{
						this.props.validateOtherErrors.indexOf('title')> -1?
						<span className="fill-error-span" style={{marginTop:'-13px'}}>{this.props.errorMessages['sameGenderTitle']}</span>:''	
					}
					{	
						this.props.is_child_only?this.props.member_view_id == 2 && show_createApi_keys_child.indexOf('title')> -1?
						<span className="fill-error-span">{this.props.createApiErrorsChild[this.props.member_view_id].title[0]}</span>:this.props.member_view_id == 3 && show_createApi_keys_child2.indexOf('title')> -1?<span className="fill-error-span">{this.props.createApiErrorsChild[this.props.member_view_id].title[0]}</span>:''
						:show_createApi_keys_adult.indexOf('title')> -1?
						<span className="fill-error-span">{this.props.createApiErrors.title[0]}</span>:''	
					}
					</div>
					<div className="row no-gutters">
					{
						this.props.is_child_only?
						<div className="col-12">
								{/*<select className="ins-select-drop" id={`relation_dropdown_${this.props.member_id}`} onClick={this.handleRelation.bind(this)}>
									<option name={`relation_${this.props.member_id}`} data-param="relation" disabled selected hidden value="relation">RELATION</option>
									<option name={`relation_${this.props.member_id}`} data-param="relation" value="son">Son</option>
									<option name={`relation_${this.props.member_id}`} data-param="relation" value="daughter">Daughter</option>
								</select>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />*/}
							<div className="ins-form-radio">
								<div className="dtl-radio">
									<label className="container-radio">Son
										<input type="radio" name={`relation_${this.props.member_id}`} data-param='relation' value='son' checked={this.state.relation === 'son'} onChange={this.handleRelation.bind(this, 'son')} />
										<span className="doc-checkmark"></span>
									</label>
								</div>
								<div className="dtl-radio">
									<label className="container-radio">Daughter
										<input type="radio" data-param='relation' name={`relation_${this.props.member_id}`} value='daughter' checked={this.state.relation === 'daughter'} onChange={this.handleRelation.bind(this, 'daughter')} />
										<span className="doc-checkmark"></span>
									</label>
								</div>
							</div>
							{
								this.props.validateErrors.indexOf('relation')> -1?
								<span className="fill-error-span" style={{marginTop:'-13px'}}>{this.props.errorMessages['common_message']}</span>:''
							}
						</div>
						:''
					}
						{/* <div className="col-12">
							<div className="ins-form-group">
									<input type="text" id={`isn-pin_${this.props.member_id}`} className="form-control ins-form-control" required autoComplete="relation" name="relation" data-param='relation' value='Spouse' disabled="disabled" />
									
									<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
						</div> */}

						<div className="col-6">
							<div className="ins-form-group inp-margin-right ">
								<input type="text" style={{'textTransform': 'capitalize'}} id={`name_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('name')> -1|| ErrorNameId == this.props.member_id?'fill-error':''}`} required autoComplete="first_name" name="name" data-param='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onBlur={this.handleSubmit.bind(this,false)} onKeyPress={this.handleNameCharacters.bind(this,'name')}/>
								<label className="form-control-placeholder" htmlFor={`name_${this.props.member_id}`}><span className="labelDot"></span>First Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{	
								this.props.is_child_only?this.props.member_view_id == 2 && show_createApi_keys_child.indexOf('first_name')> -1?
									<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:this.props.member_view_id == 3 && show_createApi_keys_child2.indexOf('first_name')> -1?<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''
								:show_createApi_keys_adult.indexOf('first_name')> -1?
								<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
							}
							{
								this.props.validateErrors.indexOf('name')> -1?
								commonMsgSpan:''
							}
							{
								ErrorNameId == this.props.member_id?<span className="fill-error-span" style={{width:'320px'}}>{this.props.errorMessages['sameName']}</span>:''
							}
						</div>
						<div className="col-6">
							<div className="ins-form-group inp-margin-right ">
								<input type="text" style={{'textTransform': 'capitalize'}} id={`middle_name_${this.props.member_id}`} className="form-control ins-form-control" required autoComplete="middle_name" name="middle_name" value={this.state.no_lname?'':this.state.middle_name}  data-param='middle_name' onChange={this.handleChange.bind(this,'middle_name')} onBlur={this.handleSubmit.bind(this,false)} disabled={this.state.no_lname?'disabled':""} onKeyPress={this.handleNameCharacters.bind(this,'middle_name')} />
								<label className="form-control-placeholder" htmlFor={`middle_name_${this.props.member_id}`}>Middle Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{	
								this.props.is_child_only?this.props.member_view_id == 2 && show_createApi_keys_child.indexOf('middle_name')> -1?
									<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:this.props.member_view_id == 3 && show_createApi_keys_child2.indexOf('middle_name')> -1?<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''
								:show_createApi_keys_adult.indexOf('middle_name')> -1?
								<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
							}
						</div>
						<div className="col-6">
							<div className="ins-form-group ins-form-group inp-margin-right  ">
								<input type="text" style={{'textTransform': 'capitalize'}} id={`last_name_${this.props.member_id}`} className={`form-control ins-form-control ${this.props.validateErrors.indexOf('last_name')> -1?'fill-error':''}`} required autoComplete="last_name" name="last_name" data-param='last_name' value={this.state.no_lname?'':this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} onBlur={this.handleSubmit.bind(this,false)} disabled={this.state.no_lname?'disabled':""} onKeyPress={this.handleNameCharacters.bind(this,'last_name')} />
								<label className="form-control-placeholder" htmlFor={`last_name_${this.props.member_id}`}><span className="labelDot"></span>Last Name</label>
								<img src={ASSETS_BASE_URL + "/img/user-01.svg"} />
							</div>
							{	
								this.props.is_child_only?this.props.member_view_id == 2 && show_createApi_keys_child.indexOf('last_name')> -1?
									<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:this.props.member_view_id == 3 && show_createApi_keys_child2.indexOf('last_name')> -1?<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''
								:show_createApi_keys_adult.indexOf('last_name')> -1?
								<span className="fill-error-span">{this.props.errorMessages['max_character']}</span>:''	
							}
							{
								this.props.validateErrors.indexOf('last_name')> -1?
								commonMsgSpan:''
							}
						</div>
						<div className="col-12" style={{marginTop:'-10px'}} >
							<div className="member-dtls-chk">
								<label className="ck-bx fw-500" onChange={this.handleLastname.bind(this)} style={{fontSize: 12, paddingLeft:24, lineHeight:'16px'}}>I dont have a last name<input type="checkbox" checked={this.state.no_lname} value="on"/>
								<span className="checkmark small-checkmark"></span></label>
							</div>
						</div>
						<div className="col-12">
							<div className="ins-form-radio">
								{
									this.props.is_child_only?
									<div className="ins-form-radio">
										{/*<div className="dtl-radio">
											<label className="container-radio">Male
												<input type="radio" name={`gender_${this.props.member_id}`} data-param='gender' value='m' checked={this.state.gender === 'm'} onChange={this.handleGender.bind(this, 'm')} />
												<span className="doc-checkmark"></span>
											</label>
										</div>
										<div className="dtl-radio">
											<label className="container-radio">Female
												<input type="radio" data-param='gender' name={`gender_${this.props.member_id}`} value='f' checked={this.state.gender === 'f'} onChange={this.handleGender.bind(this, 'f')} />
												<span className="doc-checkmark"></span>
											</label>
										</div>*/}
									</div>	
									:<div className="ins-form-radio">
										<div className="dtl-radio">
											<label className="container-radio">Male
												<input type="radio" name={`gender_${this.props.member_id}`} data-param='gender' value='m' checked={this.state.gender === 'm'} onChange={this.handleGender.bind(this, 'm')} />
												<span className="doc-checkmark"></span>
											</label>
										</div>
										<div className="dtl-radio">
											<label className="container-radio">Female
												<input type="radio" data-param='gender' name={`gender_${this.props.member_id}`} value='f' checked={this.state.gender === 'f'} onChange={this.handleGender.bind(this, 'f')} />
												<span className="doc-checkmark"></span>
											</label>
										</div>
										<div className="dtl-radio">
												<label className="container-radio">Others
													<input type="radio" data-param='gender' name={`gender_${this.props.member_id}`} value='o' checked={this.state.gender === 'o'} onChange={this.handleGender.bind(this, 'o')} />
													<span className="doc-checkmark"></span>
												</label>
										</div>
									</div>
								}
							</div>
							{
								!this.props.is_child_only && this.props.validateErrors.indexOf('gender')> -1?
								commonMsgSpan:''
							}
							{
								this.props.validateOtherErrors.indexOf('gender')> -1?
								<span className="fill-error-span">{this.props.errorMessages['shouldGenderTitle']}</span>:''	
							}
						</div>
						<div className="col-12">
							<div className="ins-form-group mb-0">
								{/* <input type="button" onClick={this.openDateModal.bind(this)} id={`isn-date_${this.props.member_id}`} className={`form-control ins-form-control text-left ${this.props.validateErrors.indexOf('dob')> -1?'fill-error':''}`} required autoComplete="dob" name="dob" data-param='dob' value={this.state.dob?this.state.dob:'yyyy/mm/dd'}
								/> */}
								<label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">*Date of birth</label>
								<img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
								{/*
										this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
											<Calendar
												showWeekNumber={false}
												defaultValue={moment(this.state.selectedDateSpan)}
												disabledDate={(date) => {
													return date.diff(moment((new Date)), 'days')  > 0 || date.diff(moment((new Date)), 'days') > 40
												}}
												showToday ={false}
												onSelect={this.selectDateFromCalendar.bind(this)}
											/>
										</div></div> : ""
									*/}
								{/* <form action="" name="someform">
							      <select id={`daydropdown_${this.props.member_id}`} value={this.state.day}></select> 
							      <select id={`monthdropdown_${this.props.member_id}`} value={this.state.mnth}></select> 
							      <select id={`yeardropdown_${this.props.member_id}`} value={this.state.year}></select> 
							    </form> */}
								<div className="dob-select-div d-flex align-items-center">
									<div className="dob-select d-flex align-items-center">
										<select id={`daydropdown_${this.props.member_id}`} value={this.state.day}>
											<option hidden>DD</option>
										</select>
										<img className="dob-down-icon" style={{right : '4px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
									<div className="dob-select d-flex align-items-center">
										<select id={`monthdropdown_${this.props.member_id}`} value={this.state.mnth}>
											<option hidden>MM</option>
										</select>
										<img className="dob-down-icon" style={{right : '4px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
									<div className="dob-select d-flex align-items-center">
										<select id={`yeardropdown_${this.props.member_id}`} value={this.state.year}>
											<option hidden>YYYY</option>
										</select>
										<img className="dob-down-icon" style={{right : '3px'}} src="/assets/img/customer-icons/dropdown-arrow.svg"/>
									</div>
								</div>
							</div>
							{	
								this.props.is_child_only?this.props.member_view_id == 2 && show_createApi_keys_child.indexOf('dob')> -1?
									<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.createApiErrorsChild[this.props.member_view_id].dob[0]}</span>:this.props.member_view_id == 3 && show_createApi_keys_child2.indexOf('dob')> -1?<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.createApiErrorsChild[this.props.member_view_id].dob[0]}</span>:''
								:show_createApi_keys_adult.indexOf('dob')> -1?
								<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.createApiErrors.dob[0]}</span>:''	
							}
							{
								this.props.validateErrors.indexOf('dob')> -1?
								this.props.is_child_only?<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.errorMessages['child_age']}</span>:
								<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.errorMessages['adult_age']}</span>:''
							}
							{
								this.props.validateDobErrors.indexOf('dob')> -1?
								this.props.is_child_only?<span style={{marginTop: '0px'}} className="fill-error-span">{this.props.errorMessages['childAgeDiff']}</span>:'':''
							}
						</div>
					</div>
					{
					this.props.is_endorsement && this.state.is_change?
						<InsuranceProofs {...this.props}/>
					:''
					}
				</div>
				
				{this.state.showPopup ?
					<InsurPopup {...this.state.userProfiles} {...this.props} 
						currentSelectedInsuredMembersId={this.props.currentSelectedInsuredMembersId} 
						member_id={this.props.member_id} 
						closePopup={this.togglePopup.bind(this)} 
						isSelectprofile = {true} 
						self_data_values ={this.props.self_data_values[this.props.member_id]}
						hideSelectProfilePopup={this.hideSelectProfilePopup.bind(this)} 
						is_child_only = {this.props.is_child_only}
					/> : ''
				}
			</div>
		)
	}

}

export default InsuranceOthers