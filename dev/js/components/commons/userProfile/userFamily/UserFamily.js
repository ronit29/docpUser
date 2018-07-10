import React from 'react';

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

    addProfile(){
        this.props.history.push('/addprofile?existing=true')
    }

    editProfile(id){
        if(this.props.location.search.includes('pick=true')){
            // pick paitent and go back, else go on to edit.
            this.props.selectProfile(id)
            this.props.history.go(-1)
        }
        this.props.history.push(`/user/edit/${id}`)
    }


    render() {

        let { profiles, selectedProfile } = this.props.USER

        return (
            <div className="widget-content">
                <ul className="list family-list">
                    {
                        Object.keys(profiles).map((id, key) => {
                            return <li key={key} onClick={this.editProfile.bind(this,id)}>
                                <a>
                                    <span className="icon icon-lg member-icon">
                                        <img src={profiles[id].profile_image} className="img-fluid img-round" />
                                    </span>
                                    <div className="member-details">
                                        <h4 className="title app-title">{profiles[id].name}</h4>
                                        <ul className="list">
                                            <li className="fw-500 text-sm"><span className="ct-img ct-img-xs"><img src="/assets/img/customer-icons/man.svg" className="img-fluid" /></span>{GENDER[profiles[id].gender]}, {this.getAge(profiles[id].dob)}</li>
                                            <li className="fw-500 text-sm">{profiles[id].is_default_user ? "Self/Primary" : "Family Member"}</li>
                                        </ul>
                                    </div>
                                    <span className="ct-img ct-img-sm arrow-forward-right"><img src="/assets/img/customer-icons/arrow-forward-right.svg" /></span>
                                </a>
                            </li>
                        })
                    }
                </ul>
                <button onClick={this.addProfile.bind(this)} className="v-btn v-btn-primary btn-lg add-more-members-btn">+</button>
            </div>
        );
    }
}


export default UserFamily
