import React from 'react';

import BasicDetails from './basic'
import MedialDetails from './medical'
import Loader from '../../Loader'

class EditProfile extends React.Component {
    constructor(props) {
        super(props)
        let { profiles } = this.props.USER
        this.state = {
            selectedTab: 0,
            profileData: { ...profiles[this.props.match.params.id] },
            loading: false,
            openCrop: false,
            errors: {

            }
        }
    }

    toggleOpenCrop() {
        this.setState({ openCrop: !this.state.openCrop })
    }

    manageAddress() {
        this.props.history.push('/user/address')
    }

    getComp() {
        if (this.state.loading) {
            return <Loader />
        }

        switch (this.state.selectedTab) {
            case 0: {
                return <BasicDetails {...this.props} manageAddress={this.manageAddress.bind(this)} profileData={this.state.profileData} updateProfile={this.updateProfile.bind(this)} proceedUpdate={this.proceedUpdate.bind(this)} errors={this.state.errors} toggleOpenCrop={this.toggleOpenCrop.bind(this)} />
            }
            case 1: {
                return <MedialDetails />
            }
        }
    }

    updateProfile(key, value) {
        this.state.profileData[key] = value
        this.setState({ profileData: this.state.profileData })
    }

    proceedUpdate(e) {
        e.stopPropagation()
        e.preventDefault()

        let errors = {}
        let vals = ['email', 'phone_number']
        vals.map((field) => {
            let validated = true
            switch (field) {
                case "phone_number": {
                    if (!this.state.profileData[field]) {
                        validated = true
                        errors[field] = !validated
                        return
                    } else {
                        validated = this.state.profileData[field].toString().match(/^[56789]{1}[0-9]{9}$/)
                        errors[field] = !validated
                    }
                    break
                }
                case "email": {
                    if (!this.state.profileData[field]) {
                        validated = false
                        errors[field] = !validated
                        return
                    } else {
                        validated = this.state.profileData[field].match(/\S+@\S+\.\S+/)
                        errors[field] = !validated
                    }
                    break
                }
                default: {
                    validated = true
                    errors[field] = !validated
                    break
                }
            }
        })

        this.setState({ errors }, () => {
            let validated = true
            for (let key in this.state.errors) {
                if (this.state.errors[key]) {
                    validated = false
                }
            }
            if (validated) {
                this.setState({ loading: true })
                this.props.editUserProfile(this.state.profileData, this.state.profileData.id, (err, data) => {
                    this.setState({ loading: false })
                    this.props.history.go(-1)
                })
            }
        })

    }

    render() {

        return (
            <div>

                {/* <header className="skin-white fixed horizontal top bdr-1 bottom light sticky-header" style={{ zIndex: 8 }}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-2">
                                <ul className="inline-list">
                                    <li onClick={() => {
                                        this.props.history.go(-1)
                                    }}><span className="icon icon-sm text-middle back-icon-white"><img src={ASSETS_BASE_URL + "/img/customer-icons/back-icon.png"} className="img-fluid" /></span></li>
                                </ul>
                            </div>
                            <div className="col-8">
                                <div className="header-title fw-700 capitalize text-center">Edit Profile</div>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                    </div>
                </header> */}

                {/* <section className="consumer-profile-update sticky-header-3" style={{ zIndex: 8 }}>
                    <div className="nav-tab">
                        <ul className="inline-list tab-items">
                            <li style={{ marginLeft: 0, marginRight: 0 }} onClick={() => {
                                this.setState({ selectedTab: 0 })
                            }} className={this.state.selectedTab === 0 ? "active" : ""}><a className="link-text text-xs uppercase">Basic Profile</a></li>
                            <li style={{marginLeft: 0, marginRight: 0}} onClick={() => {
                                this.setState({ selectedTab: 1 })
                            }} className={this.state.selectedTab === 1 ? "active" : ""}><a className="link-text text-xs uppercase">Medical</a></li>
                        </ul>
                    </div>
                </section> */}

                {this.getComp()}
                {
                    this.state.openCrop ? "" : <button onClick={this.proceedUpdate.bind(this)} className="fixed p-3 horizontal bottom v-btn v-btn-primary no-round btn-lg text-center static-btn">Update Profile</button>
                }

            </div>
        );
    }
}


export default EditProfile
