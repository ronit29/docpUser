import React from 'react'
import SnackBar from 'node-snackbar'

class DigitInsuranceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title:'mr.',
            name: '',
            last_name:'',
            middle_name:'',
            dob: '',
            email: '',
            phone_number:this.props.user_phone_number,
            pincode:'',
            address:'',
            nominee_name:'',
            nominee_relation:'father',
            gender: 'm',
            id: '',
            profile:'',
            userProfiles:{},
            profile_id:null,
            profile_flag:true
        }
    }

    componentDidMount() {
        let profile
        let isDummyUser
        let loginUserId

        if (this.props.USER && this.props.USER.profiles && Object.keys(this.props.USER.profiles).length > 0) {
            isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
            loginUserId = this.props.USER.profiles[this.props.USER.defaultProfile].id
            if(this.props.digit_self_details[loginUserId]){

                if (!isDummyUser) {
                    profile = Object.assign({}, this.props.digit_self_details[loginUserId])
                } else {
                    profile = Object.assign({}, this.props.digit_self_details[loginUserId])
                }
                if(Object.keys(profile).length > 0){
                    isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
                    if(profile.isDummyUser){
                        profile.id = 0
                        this.setState({id:0},()=>{
                            this.getUserDetails(profile) // fill user details in form
                        })
                    }else{
                        this.setState({id:profile.id},()=>{
                            this.getUserDetails(profile) // fill user details in form
                        })
                    }
                }
            }
        }
    }

    componentWillReceiveProps(props) {
        let self = this
        let loginUserId
        if (props.USER && props.USER.profiles && Object.keys(props.USER.profiles).length > 0 && this.state.profile_flag ) {
            let isDummyUser = props.USER.profiles[props.USER.defaultProfile].isDummyUser
            loginUserId = props.USER.defaultProfile
            if (Object.keys(props.digit_self_details).length > 0) { // retrieve already member details from user store
                let profile
                if (!isDummyUser) {
                    profile = Object.assign({}, props.digit_self_details[loginUserId])
                } else {
                    profile = Object.assign({}, props.digit_self_details[loginUserId])
                }            
                console.log(profile);    
                if(profile && Object.keys(profile).length){
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
                            this.getUserDetails(profile)// fill user details in form    
                        })
                    }else{
                        this.setState({id:profile.id,profile_flag:false},()=>{
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
                let profName = profile.name;
                let splitName = profName.split(' ');
                if(typeof splitName[0] != 'undefined') {
                    this.setState({ name:splitName[0]?splitName[0]:''})
                }
                if(splitName.length >2){
                    if(typeof splitName[1] != 'undefined') {
                        this.setState({ middle_name:splitName[1]?splitName[1]:''})
                    }
                    if(typeof splitName[2] != 'undefined') {
                        this.setState({ last_name:splitName[2]?splitName[2]:''})
                    }
                }
                else{
                    if(typeof splitName[1] != 'undefined') {
                        this.setState({ last_name:splitName[1]?splitName[1]:''})
                    }
                }
            }
            if(profile.email){
                this.setState({email:profile.email})
            }
            if(profile.phone_number){
                this.setState({phone_number:profile.phone_number})
            }
            if(profile.pincode){
                this.setState({pincode:profile.pincode})
            }
            if(profile.address){
                this.setState({address:profile.address})
            }
            if(profile.nominee_name){
                this.setState({nominee_name:profile.nominee_name})
            }
            if(profile.nominee_relation){
                this.setState({nominee_relation:profile.nominee_relation})
            }
            
            this.setState({
                dob: profile.dob ? profile.dob :''
            },()=>{
                this.handleSubmit()
            })
        }
    }

    handleRelation(event) {
        this.setState({
            nominee_relation: event.target.value
        },() =>{
            this.handleSubmit(event)
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
            this.setState({ gender: 'm',title:title_value })
        } else if (title_value == 'miss' || title_value == 'mrs.') {
            this.setState({ gender: 'f',title:title_value })
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
        this.setState({ profile_id: 0, id:0 })
    } else {
        this.setState({ profile_id: null, id:profile.isDummyUser?0:profile.id })
    }
    var self_data = this.state
    this.props.saveUserDetails('self_data', self_data)
    }

    render() {
        let isDummyUser
        let profile_id = 0
        if (this.props.USER.profiles && Object.keys(this.props.USER.profiles).length && this.props.USER.profiles[this.props.USER.defaultProfile]) {
            isDummyUser = this.props.USER.profiles[this.props.USER.defaultProfile].isDummyUser
            profile_id =  isDummyUser?0:this.props.USER.profiles[this.props.USER.defaultProfile].id
        }
        let errors = []
        if(this.props.validateErrors && Object.keys(this.props.validateErrors).length){
           errors = this.props.validateErrors[profile_id]
        }
        let commonMsgSpan = <span className="fill-error-span">*This is a mandatory field</span>
        return (

                    <div className="widget mrb-10 digit-input-container" id={isDummyUser ? 'member_0' : `member_${profile_id}`}>
                            <div className="widget-content">
                                <div className="ins-sub-forms">
                                    {/* <hr className="ins-internal-hr" /> */}
                                    <div className="sub-form-input-data">
                                        <div>
                                            <p className="sub-form-hed">Details</p>
                                        </div>
                                        {/* <div className="sub-form-hed-click" >
                                            Add More <img src={ASSETS_BASE_URL + "/img/rgt-arw.svg"} />
                                        </div> */}
                                    </div>
                                    <div className="col-12">
                                        <button className={`label-names-buttons ${this.state.title == 'mr.' ? 'btn-active' : ''}`} name="title" value='mr.' data-param='title' onClick={this.handleTitle.bind(this, 'mr.')}>Mr.</button>
                                        <button className={`label-names-buttons ${this.state.title == 'miss' ? 'btn-active' : ''}`} name="title" value='miss' data-param='title' onClick={this.handleTitle.bind(this, 'miss.')}>Ms.</button>
                                        <button className={`label-names-buttons ${this.state.title == 'mrs.' ? 'btn-active' : ''}`} value='mrs.' name="title" data-param='title' onClick={this.handleTitle.bind(this, 'mrs.')} >Mrs.</button>
                                    </div>
                                    {
                                        errors && errors.length && errors.indexOf('title') > -1 ?
                                            commonMsgSpan : ''
                                    }
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
                                        {
                                            errors && errors.length && errors.indexOf('name') > -1 ?
                                                commonMsgSpan : ''
                                        }
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
                                        {
                                            errors && errors.length && errors.indexOf('last_name') > -1 ?
                                                commonMsgSpan : ''
                                        }
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
                                        {
                                            errors && errors.length && errors.indexOf('dob') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" className='form-control ins-form-control' required id="mil" 
                                                onBlur={this.handleEmail.bind(this)} data-param="email" onChange={this.handleChange.bind(this,'email')} value={this.state.email} name="email"
                                                 />
                                                <label className='form-control-placeholder ' htmlFor="mil">Email</label>
                                                <img src={ASSETS_BASE_URL + "/img/mail-01.svg"} />
                                            </div>
                                        </div>
                                        {
                                            errors && errors.length && errors.indexOf('email') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="number" id="mbl" max="9999999999" min="1000000000" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="phone_number" data-param='phone_number' value=''
                                                onChange={this.handleChange.bind(this, 'phone_number')} value={this.state.phone_number}
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="mbl">Mobile</label>
                                                <img src={ASSETS_BASE_URL + "/img/customer-icons/call.svg"} />
                                            </div>
                                        </div>
                                        {
                                            errors && errors.length && errors.indexOf('phone_number') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="number" id="pin" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="pincode" data-param='pincode' value={this.state.pincode}
                                                onChange={this.handleChange.bind(this, 'pincode')} 
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="pin">Pin Code</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        {
                                            errors && errors.length && errors.indexOf('pincode') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <input type="text" id="adr" className="form-control ins-form-control ins-date-picker-style" required autoComplete="off" name="address" data-param='address' value={this.state.address}
                                                onChange={this.handleChange.bind(this, 'address')} 
                                                onBlur={this.handleSubmit.bind(this)}  />
                                                <label className="form-control-placeholder" htmlFor="adr">Address</label>
                                                <img src={ASSETS_BASE_URL + "/img/location-01.svg"} />
                                            </div>
                                        </div>
                                        {
                                            errors && errors.length && errors.indexOf('address') > -1 ?
                                                commonMsgSpan : ''
                                        }
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
                                        {
                                            errors && errors.length && errors.indexOf('nominee_name') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                        <div className="col-12">
                                            <div className="ins-form-group">
                                                <select className="ins-select-drop" name="nominee_relation" id="relation_dropdown" onChange={this.handleRelation.bind(this)} value={this.state.nominee_relation}>
                                                    <option data-param="relation" selected disabled >Nominee Relation</option>
                                                    <option data-param="relation" value="FATHER">FATHER</option>
                                                    <option data-param="relation" value="MOTHER">MOTHER</option>
                                                    <option data-param="relation" value="BROTHER">BROTHER</option>
                                                    <option data-param="relation" value="SISTER">SISTER</option>
                                                </select>
                                                <img src={ASSETS_BASE_URL + "/img/nw-usr.svg"} />
                                            </div>
                                        </div>
                                        {
                                            errors && errors.length && errors.indexOf('nominee_relation') > -1 ?
                                                commonMsgSpan : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }

export default DigitInsuranceForm;