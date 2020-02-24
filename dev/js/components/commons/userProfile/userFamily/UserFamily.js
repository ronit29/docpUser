import React from 'react';
import InitialsPicture from '../../initialsPicture'
const queryString = require('query-string');

const GENDER = {
    "m": "Male",
    "f": "Female",
    "o": "Other"
}

class UserFamily extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    getAge(birthday) {
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    addProfile() { // to add new profile
        this.props.history.push('/addprofile?existing=true')
    }

    editProfile(id,fromWhere) { // to edit existing profile
        const parsed = queryString.parse(this.props.location.search)
        if (this.props.location.search.includes('pick=true')) {
            // pick paitent and go back, else go on to edit.
            this.props.selectProfile(id)
            let data = {}
            let selected_test_id = []
            let selectedDate = null
            if(parsed.is_insurance && parsed.is_insurance == 'true'){
                if(this.props.selectedCriterias && this.props.selectedCriterias.length > 0){
                    this.props.selectedCriterias.map((twp, i) => {
                        selected_test_id.push(twp.id)
                    })
                }
                data.start_date = selectedDate?selectedDate:this.props.selectedSlot && this.props.selectedSlot.date?this.props.selectedSlot.date:new Date()
                data.lab_test = selected_test_id
                data.lab = parsed.lab_id
                data.profile = id
                this.props.preBooking(data)
            }
            //Clear Tests if there is any gold profile
            // let selectedProfile = this.props.USER && this.props.USER.profiles && this.props.USER.profiles[id];
            // if(selectedProfile && (selectedProfile.is_vip_member || selectedProfile.is_vip_gold_member) && this.props.clearExtraTests){
            //     this.props.clearExtraTests();
            // }
            if(fromWhere){
                this.props.history.push(`/user/edit/${id}?add_to_gold=${fromWhere}&from_booking=true`)
            }else{
                this.props.history.go(-1)
            }
        } else {
            this.props.history.push(`/user/edit/${id}?add_to_gold=${fromWhere}`)
        }
    }

    addtoGold(id){
        this.editProfile(id,true)
    }

    render() {

        let { profiles, selectedProfile } = this.props.USER

        let gold_profile = []
        let normal_profile = []
        let insurance_profile = []
        let gold_user_profile = {}
        if(this.props.USER && this.props.USER.profiles){
            if(Object.keys(this.props.USER.profiles).length > 0){
               Object.entries(this.props.USER.profiles).map(function([key, value]) {
                    if(value.is_vip_gold_member){
                        gold_user_profile = value
                    }
                })
            }
        }

        {Object.keys(profiles).filter(x => !profiles[x].isDummyUser).map((id, key) => {
            if(profiles[id].is_vip_gold_member){
                gold_profile.push(<li key={key} onClick={this.editProfile.bind(this,id,false)}>
                <a>
                    <span className="icon icon-lg member-icon">
                        <InitialsPicture name={profiles[id].name} has_image={profiles[id].profile_image} className="initialsPicture-family">
                            <img style={{ width: '45px', height: '45px' }} src={profiles[id].profile_image} className="img-fluid img-round" />
                        </InitialsPicture>
                    </span>
                    <div className="member-details">
                        <h4 className="title app-title" style={{ paddingRight: 95, wordBreak: 'break-word', textTransform: 'capitalize' }} >{profiles[id].name}</h4>
                        <ul className="list">

                            {/* <li className="fw-500 text-sm" style={{ marginBottom: 5 }} >
                                {
                                    profiles[id].gender == 'o' ? "" :
                                        <span className="ct-img ct-img-xs">
                                            {
                                                profiles[id].gender == 'm' ?
                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/man.svg"} className="img-fluid" /> : <img src={ASSETS_BASE_URL + "/img/customer-icons/female.svg"} style={{ width: 14, height: 16 }} className="img-fluid" />
                                            }
                                        </span>
                                }
                                {GENDER[profiles[id].gender]}
                            </li>

                            {
                                profiles[id].dob ?
                                    <li className="fw-500 text-sm">{profiles[id].dob}</li>
                                    : ''
                            }

                            <li className="fw-500 text-sm">{profiles[id].is_default_user ? "Self/Primary" : "Family Member"}</li> */}
                            
                            <li className="fw-500 text-sm" style={{ marginBottom: 5 }} >
                              {
                                profiles[id].dob ?<span className="fw-500 text-sm">{profiles[id].dob}</span>: ''
                              }
                              {
                                  profiles[id].dob && profiles[id].gender? <span className="pipe-sign"> | </span> :''
                              }
                              {
                                profiles[id].gender? ` ${GENDER[profiles[id].gender]}`:''
                              }
                            </li>
                            {profiles[id].is_default_user?
                            <li className="fw-500 text-sm">
                                {
                                    profiles[id].phone_number? `${profiles[id].phone_number}`:''
                                }
                                {
                                  profiles[id].phone_number && profiles[id].email? <span className="pipe-sign"> | </span> :''
                                }
                                {
                                    profiles[id].email? `${profiles[id].email}`:''
                                }
                             </li>
                            :''}

                        </ul>
                        {
                            profiles[id].is_vip_gold_member && 
                            <div className="gold-covrd-txt">
                                <p><img className="ml-2" width="35" src="https://cdn.docprime.com/cp/assets/img/gold-lg.png"  alt="gold"/></p>
                            </div>
                        }
                    </div>
                    {/*<span className="ct-img ct-img-sm arrow-forward-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>*/}
                </a>
            </li>)
            }else if(profiles[id].is_insured){  
                insurance_profile.push(<li key={key} onClick={this.editProfile.bind(this, id,false)}>
                <a>
                    <span className="icon icon-lg member-icon">
                        <InitialsPicture name={profiles[id].name} has_image={profiles[id].profile_image} className="initialsPicture-family">
                            <img style={{ width: '45px', height: '45px' }} src={profiles[id].profile_image} className="img-fluid img-round" />
                        </InitialsPicture>
                    </span>
                    <div className="member-details">
                        <h4 className="title app-title" style={{ paddingRight: 95, wordBreak: 'break-word', textTransform: 'capitalize' }} >{profiles[id].name}</h4>
                        <ul className="list">

                            <li className="fw-500 text-sm" style={{ marginBottom: 5 }} >
                              {
                                profiles[id].dob ?<span className="fw-500 text-sm">{profiles[id].dob}</span>: ''
                              }
                              {
                                  profiles[id].dob && profiles[id].gender? <span className="pipe-sign"> | </span> :''
                              }
                              {
                                profiles[id].gender? `${GENDER[profiles[id].gender]}`:''
                              }
                            </li>
                            {profiles[id].is_default_user?
                            <li className="fw-500 text-sm">
                                {
                                    profiles[id].phone_number? `${profiles[id].phone_number}`:''
                                }
                                {
                                  profiles[id].phone_number && profiles[id].email? <span className="pipe-sign"> | </span> :''
                                }
                                {
                                    profiles[id].email? `${profiles[id].email}`:''
                                }
                             </li>
                             :''}

                        </ul>
                        {
                            profiles[id].is_insured && 
                            <div className="ins-covrd-txt">
                                <p>Covered<br />Under Insurance</p>
                            </div>
                        }
                    </div>
                    {/*<span className="ct-img ct-img-sm arrow-forward-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>*/}
                </a>
            </li>)
            }else{
                normal_profile.push(<li key={key} onClick={this.editProfile.bind(this, id,false)}>
                <a>
                    <span className="icon icon-lg member-icon">
                        <InitialsPicture name={profiles[id].name} has_image={profiles[id].profile_image} className="initialsPicture-family">
                            <img style={{ width: '45px', height: '45px' }} src={profiles[id].profile_image} className="img-fluid img-round" />
                        </InitialsPicture>
                    </span>
                    <div className="member-details">
                        <h4 className="title app-title" style={{ paddingRight: 95, wordBreak: 'break-word', textTransform: 'capitalize' }} >{profiles[id].name}</h4>
                        <ul className="list">
                            <li className="fw-500 text-sm" style={{ marginBottom: 5 }} >
                              {
                                profiles[id].dob ?<span className="fw-500 text-sm">{profiles[id].dob}</span>: ''
                              }
                              {
                                  profiles[id].dob && profiles[id].gender? <span className="pipe-sign"> | </span> :''
                              }
                              {
                                profiles[id].gender? `${GENDER[profiles[id].gender]}`:''
                              }
                            </li>
                            {profiles[id].is_default_user?
                            <li className="fw-500 text-sm">
                                {
                                    profiles[id].phone_number? `${profiles[id].phone_number}`:''
                                }
                                {
                                  profiles[id].phone_number && profiles[id].email? <span className="pipe-sign"> | </span> :''
                                }
                                {
                                    profiles[id].email? `${profiles[id].email}`:''
                                }
                             </li>
                             :''}
                        </ul>
                        {
                            gold_user_profile && Object.keys(gold_user_profile).length && gold_user_profile.vip_data && Object.keys(gold_user_profile.vip_data).length && gold_user_profile.vip_data.total_members_allowed > 0 &&  gold_user_profile.vip_data.is_member_allowed? 
                            <button onClick={(e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                this.addtoGold(id)}} className="gold-covrd-btn">
                                + Add to Gold 
                            </button>
                            :''
                        }
                    </div>
                    {/*<span className="ct-img ct-img-sm arrow-forward-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>*/}
                </a>
            </li>)
            }
        })}

        return (
            <div className="widget mt-20">
               {profiles && Object.keys(profiles).length?<h4 className="fw-500 user-heading">Select Member</h4>:''}
                <div className="widget-content pl-0 pr-0">
                <ul className="list family-list dp-user-list box-shadow-none">
                
                    {gold_profile}
                    {insurance_profile}
                    {normal_profile}
                </ul>
                {
                    Object.keys(profiles).filter(x => !profiles[x].isDummyUser).length == 0 ?
                        <div className="text-center pd-20">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/no-family.png"} />
                            <p className="fw-500 text-lg mrt-20">No Family Member Added !!</p>
                        </div> : ""
                }
                <div className="fixed sticky-btn p-0 v-btn  btn-lg horizontal bottom no-round text-lg buttons-addcart-container mrng-top-20">
                    <button onClick={this.addProfile.bind(this)} className="v-btn-primary book-btn-mrgn-adjust ">Add New Member</button>
                </div>
            </div>
           </div>
        );
    }
}


export default UserFamily
