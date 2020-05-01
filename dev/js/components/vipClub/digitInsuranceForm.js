import React from 'react'

class DigitInsuranceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            name: '',
            last_name:'',
            middle_name:'',
            dob: '',
            email: '',
            phone_number:this.props.user_phone_number,
            pincode:'',
            address:'',
            nominee_name:'',
            nominee_relation:'',
            gender: '',
            id: '',
            profile:'',
            userProfiles:{},
            profile_id:null,
            profile_flag:true
        }
    }

    componentWillReceiveProps(props) {
        let self = this
        if (props.USER && props.USER.profiles && Object.keys(props.USER.profiles).length > 0 && this.state.profile_flag ) {
            let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
            if (Object.keys(props.digit_self_details).length > 0) { // retrieve already member details from user store
                let profile
                if (!isDummyUser) {
                    profile = Object.assign({}, props.digit_self_details[props.member_id])
                } else {
                    profile = Object.assign({}, props.digit_self_details[props.member_id])
                }                
                if(profile && Object.keys(profile).length){
                    console.log(profile)
                    this.setState({id:profile.id,profile_flag:false},()=>{
                        this.getUserDetails(profile) // fill user details in form    
                    })
                }
            }else if (props.USER && props.USER.profiles && Object.keys(props.USER.profiles).length > 0  && props.USER.profiles[props.USER.defaultProfile]) {
                let profile
                let exitsting_user_profile
                 // retrieve already member details from user profiles
                profile = Object.assign({}, props.USER.profiles[props.USER.defaultProfile])
                if (profile && Object.keys(profile).length) {
                    if(profile.isDummyUser){
                        profile.id = 0
                        this.setState({id:0,profile_flag:false},()=>{
                            console.log(profile)
                            this.getUserDetails(profile)// fill user details in form    
                        })
                    }else{
                        this.setState({id:profile.id,profile_flag:false},()=>{
                            console.log(profile)
                            this.getUserDetails(profile)    // fill user details in form
                        })
                    }
                }
            }
        }
    }
    getUserDetails(profile) {
        let empty_state ={}
        console.log(profile)
        if(profile.is_tobe_dummy_user){
            this.setState({...empty_state,name:''},()=>{
                this.handleSubmit()
            })
        }
        if(Object.keys(profile).length > 0){
            if(profile.id){
                this.setState({profile_id:profile.id?profile.id:''})
            }
            if(profile.profile){
                this.setState({profile_id:profile.profile?profile.profile:''})
            }
            if(profile.gender == 'm'){
                this.setState({gender:profile.gender?profile.gender:'',title: 'mr.'})
            }else if(profile.gender == 'f'){
                this.setState({gender:profile.gender?profile.gender:'',title: 'miss'})
            }

            if(profile.name == 'User' || profile.name == 'user'){
                this.setState({ name:''})
            }else if(profile.name){
                this.setState({ name:profile.name?profile.name:''})
            }
            if(profile.email){
                this.setState({email:profile.email})
            }
            this.setState({
                dob: profile.dob ? profile.dob :''
            },()=>{
                this.handleSubmit()
            })
        }
    }

    handleRelation(event) {
        this.setState({'nominee_relation':event.target.value},()=>{
            this.handleSubmit()
        })
    }

    handleChange(field, event) {
        this.setState({
            [event.target.getAttribute('data-param')]: event.target.value
        })
    }

    handleTitle(field, event) {
        let title_value = event.target.value
        if (title_value == 'mr.') {
            this.setState({ gender: 'm' })
        } else if (title_value == 'miss' || title_value == 'mrs.') {
            this.setState({ gender: 'f' })
        }
        this.setState({ title: event.target.value }, () => {
            var self_data = this.state
            self_data.is_change = true
            this.props.saveUserDetails('self_data', self_data) // to save entered data in store
        })
    }

    handleEmail() {
        let formIsValid = true;
        if (this.state.email != '') {
            let validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            validEmail = validEmail.test(this.state.email);
            if (validEmail) {
                this.handleSubmit();
            } else {
                SnackBar.show({ pos: 'bottom-center', text: "Please Enter valid Email" });
            }
        }
    }

    handleSubmit() {
    let profile = Object.assign({}, this.props.USER.profiles[this.props.USER.defaultProfile])
    if (!profile.isDummyUser && this.props.member_id > 0) {
        this.setState({ profile_id: 0 })
    } else {
        this.setState({ profile_id: null, id:profile.id })
    }
    var self_data = this.state
    this.props.saveUserDetails('self_data', self_data)
    }

    render() {
        console.log(this.props)
        return (

                    <div className="widget mrb-10 digit-input-container">
                            <div className="widget-content">
                                <div className="ins-sub-forms">
                                    {/* <hr className="ins-internal-hr" /> */}
                                    <div className="sub-form-input-data">
                                        <div>
                                            <p className="sub-form-hed">Details</p>
                                        </div>
                                        <div className="sub-form-hed-click" >
                                            Add More <img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className='label-names-buttons btn-active ' name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')}>Mr.</button>
                                        <button className='label-names-buttons' name="title" value='miss.' data-param='title' onClick={this.handleTitle.bind(this, 'miss.')}>Ms.</button>
                                        <button className='label-names-buttons' value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
                                    </div>
                                    <div className="row no-gutters">

                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-right">
                                                <input type="text" id="name1" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='name' value={this.state.name}
                                                onChange={this.handleChange.bind(this, 'name')} 
                                                onBlur={this.handleSubmit.bind(this)} />
                                                <label className="form-control-placeholder" htmlFor="name1">First Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-right ">
                                                <input type="text" id="middle_name" className="form-control ins-form-control" required autoComplete="off" name="middle_name" value={this.state.middle_name} data-param='middle_name' 
                                                    onChange={this.handleChange.bind(this, 'middle_name')} 
                                                    onBlur={this.handleSubmit.bind(this)} />
                                                <label className="form-control-placeholder" htmlFor="middle_name">Middle Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="ins-form-group inp-margin-left">
                                                <input type="text" id="last_name" className="form-control ins-form-control" required autoComplete="off" name="last_name" data-param='last_name' value={this.state.last_name}
                                                onChange={this.handleChange.bind(this, 'last_name')} 
                                                onBlur={this.handleSubmit.bind(this)} 
                                                />
                                                <label className="form-control-placeholder" htmlFor="last_name">Last Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="date" id="isn-date" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="dob" data-param='dob' value={this.state.dob} 
                                                onChange={this.handleChange.bind(this, 'dob')} 
                                                onBlur={this.handleSubmit.bind(this)} 
                                                />
                                                <label className="form-control-placeholder datePickerLabel" htmlFor="ins-date">Date of birth</label>
                                                <img src={ASSETS_BASE_URL + "/img/calendar-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" className='form-control ins-form-control' required id="mil"
                                                onChange={this.handleEmail.bind(this, 'email')} value={this.state.email}
                                                 />
                                                <label className='form-control-placeholder ' htmlFor="mil">Email</label>
                                                <img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="number" id="mbl" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="phone_number" data-param='phone_number' value=''
                                                onChange={this.handleChange.bind(this, 'phone_number')} value={this.state.phone_number}
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="mbl">Mobile</label>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/call.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="number" id="pin" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="pincode" data-param='pincode' value={this.state.pincode}
                                                onChange={this.handleChange.bind(this, 'pincode')} 
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="pin">Pin Code</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" id="adr" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="address" data-param='address' value={this.state.address}
                                                onChange={this.handleChange.bind(this, 'address')} 
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="adr">Address</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group inp-margin-right ">
                                                <input type="text" id="nomName" className="form-control ins-form-control" required autoComplete="off" name="name" data-param='nominee_name'
                                                onChange={this.handleChange.bind(this, 'nominee_name')} 
                                                value={this.state.nominee_name}
                                                onBlur={this.handleSubmit.bind(this)} />
                                                <label className="form-control-placeholder" htmlFor="nomName">Nominee Name</label>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <select className="ins-select-drop" id="relation_dropdown" onClick={this.handleRelation.bind(this)}>
                                                    <option data-param="relation" disabled selected hidden>Nominee Relation</option>
                                                    <option data-param="relation" value="spouse">SPOUSE</option>
                                                    <option data-param="relation" value="son">SON</option>
                                                    <option data-param="relation" value="daughter">DAUGHTER</option>
                                                </select>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }

export default DigitInsuranceForm;