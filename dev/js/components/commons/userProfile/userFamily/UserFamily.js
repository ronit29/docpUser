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

    editProfile(id) { // to edit existing profile
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
            this.props.history.go(-1)
        } else {
            this.props.history.push(`/user/edit/${id}`)
        }
    }


    render() {

        let { profiles, selectedProfile } = this.props.USER

        return (
            <div className="widget-content pl-0 pr-0">
                <ul className="list family-list dp-user-list">
                    {
                        Object.keys(profiles).filter(x => !profiles[x].isDummyUser).map((id, key) => {
                            return <li key={key} onClick={this.editProfile.bind(this, id)}>
                                <a>
                                    <span className="icon icon-lg member-icon">
                                        <InitialsPicture name={profiles[id].name} has_image={profiles[id].profile_image} className="initialsPicture-family">
                                            <img style={{ width: '60px', height: '60px' }} src={profiles[id].profile_image} className="img-fluid img-round" />
                                        </InitialsPicture>
                                    </span>
                                    <div className="member-details">
                                        <h4 className="title app-title" style={{ paddingRight: 95, wordBreak: 'break-word', textTransform: 'capitalize' }} >{profiles[id].name}</h4>
                                        <ul className="list">

                                            <li className="fw-500 text-sm" style={{ marginBottom: 5 }} >
                                                {
                                                    profiles[id].gender == 'o' ? "" :
                                                        <span className="ct-img ct-img-xs">
                                                            {
                                                                profiles[id].gender == 'm' ?
                                                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/man.svg"} className="img-fluid" /> : <img src={ASSETS_BASE_URL + "/img/customer-icons/female.svg"} style={{ width: 14, height: 16 }} className="img-fluid" />
                                                            }
                                                        </span>
                                                }
                                                {GENDER[profiles[id].gender]}</li>

                                            {
                                                profiles[id].dob ?
                                                    <li className="fw-500 text-sm">{profiles[id].dob}</li>
                                                    : ''
                                            }

                                            <li className="fw-500 text-sm">{profiles[id].is_default_user ? "Self/Primary" : "Family Member"}</li>

                                        </ul>
                                        {
                                            profiles[id].is_insured && 
                                            <div className="ins-covrd-txt">
                                                <p>Covered<br />Under Insurance</p>
                                            </div>
                                        }
                                    </div>
                                    <span className="ct-img ct-img-sm arrow-forward-right"><img src={ASSETS_BASE_URL + "/img/customer-icons/arrow-forward-right.svg"} /></span>
                                </a>
                            </li>
                        })
                    }
                </ul>
                {
                    Object.keys(profiles).filter(x => !profiles[x].isDummyUser).length == 0 ?
                        <div className="text-center pd-20">
                            <img src={ASSETS_BASE_URL + "/img/customer-icons/no-family.png"} />
                            <p className="fw-500 text-lg mrt-20">No Family Member Added !!</p>
                        </div> : ""
                }
                <button onClick={this.addProfile.bind(this)} className="v-btn v-btn-primary btn-lg add-more-members-btn">+</button>
            </div>
        );
    }
}


export default UserFamily
