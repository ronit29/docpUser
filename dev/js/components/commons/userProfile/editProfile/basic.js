import React from 'react';
import Cropper from 'react-cropper';
const Compress = require('compress.js')
import SnackBar from 'node-snackbar'
import Loader from '../../Loader'
import Calendar from 'rc-calendar';
const moment = require('moment');
import VerifyEmail from '../../../insurance/verifyEmail.js'
import NewDateSelector from '../../newDateSelector.js'

class BasicDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null,
            loading: false,
            formattedDate:'',
            is_default_user: this.props.profileData.is_default_user
        }
    }

    handleChange(key, e) {
        this.props.updateProfile(key, e.target.value)
    }

    handleGender(val){
        this.props.updateProfile('gender',val)
    }

    pickFile(e) {
        if (e.target.files && e.target.files[0]) {
            const compress = new Compress()
            let file = e.target.files[0]
            compress.compress([file], {
                quality: 1,
                maxWidth: 1000,
                maxHeight: 1000,
            }).then((results) => {
                const img1 = results[0]
                const base64str = img1.data
                const imgExt = img1.ext
                const file = Compress.convertBase64ToFile(base64str, imgExt)
                this.getBase64(file, (dataUrl) => {
                    this.props.toggleOpenCrop()
                    this.setState({ dataUrl })
                })
            }).catch((e) => {
                SnackBar.show({ pos: 'bottom-center', text: "Error uploading image." });
            })

        }
    }

    getBase64(file, cb) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            cb(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }

    finishCrop(e) {
        e.stopPropagation()
        e.preventDefault()
        let file_blob_data = this.dataURItoBlob(this.refs.cropper.getCroppedCanvas().toDataURL())
        this.setState({
            dataUrl: null,
            loading: true
        }, () => {
            this.props.toggleOpenCrop()
            // document.getElementById('imageFilePicker').value = ""
            let form_data = new FormData()
            form_data.append("profile_image", file_blob_data, "imageFilename.jpeg")
            this.props.editUserProfileImage(form_data, this.props.profileData.id, (err, data) => {
                this.setState({ loading: false })
                this.props.history.go(-1)
            })
        })
    }

    dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
    }

    handleEnterPress(e){ 
        if(e.key === 'Enter'){
            this.props.proceedUpdate(e);
        }
    }

    openCalendar(){
        this.setState({dateModal:true})
    }

    selectDateFromCalendar(date) {
        if (date) {
            date = date.toDate()
            let formattedDate = this.getFormattedDate(date)
            date = new Date(date).toISOString().split('T')[0]
            this.setState({formattedDate:formattedDate, dateModal: false})
            this.props.updateProfile('dob', formattedDate)
        } else {
            this.setState({ dateModal: false })
        }
    }

    getFormattedDate(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1; 
        var yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        return today
    }

    handleDefaultUser(value){
        this.setState({'is_default_user':value})
        this.props.updateProfile('is_default_user', value)
    }

    render() {
        let { name, email, gender, phone_number, profile_image, id, dob} = this.props.profileData
        profile_image = profile_image || (ASSETS_BASE_URL + "/img/customer-icons/user.png")
        return (
            <section className={`myProfile profile-details mrb-15 ${this.props.is_profile_editable?'':'click-disable'}`}>
                {
                    this.state.loading ? "" : <div className="widget no-shadow no-radius">
                        <div className="widget-content">
                            <div className="profile-icon">
                                <img src={profile_image} style={{ width: '100%', cursor: 'pointer' }} className="img-fluid img-round" onClick={() => {
                                    document.getElementById('imageFilePicker').click()
                                    document.getElementById('imageFilePicker').value = ""
                                }} />
                                <span className="cam-icon">
                                    <img src={ASSETS_BASE_URL + "/img/icons/cam-md.png"} className="img-fluid cam-icon-img" onClick={() => {
                                        document.getElementById('imageFilePicker').click()
                                        document.getElementById('imageFilePicker').value = ""
                                    }} />
                                    <input type="file" style={{ display: 'none' }} id="imageFilePicker" onChange={this.pickFile.bind(this)} />
                                </span>
                            </div>
                        </div>
                    </div>
                }


                {
                    this.state.loading ? <Loader /> : <div className="widget no-shadow no-radius">
                        <div className="widget-content">
                            <form className="go-bottom">
                                <div className="d-flex mb-3">
                                    <p className={`label-names-buttons ${gender == 'm'?'btn-active':''}`} name="gender" checked={gender == 'm'} onClick={this.handleGender.bind(this,"m")}>Male</p>
                                    <p className={`label-names-buttons ${gender == 'f'?'btn-active':''}`} name="gender" checked={gender == 'f'} onClick={this.handleGender.bind(this,'f')}>Female</p>
                                </div>
                                <div className="labelWrap">
                                    <input value={name} onChange={this.handleChange.bind(this, 'name')} id="fname" className="fc-input" name="fname" type="text" required onKeyPress={this.handleEnterPress.bind(this)} />
                                    <label htmlFor="fname">Name</label>
                                </div>
                                {/*<div className="labelWrap">
                                    <input id="dob" name="dob" type="text" value={this.state.formattedDate == ''?dob:this.state.formattedDate} onClick={this.openCalendar.bind(this)} required ref="dob" onKeyPress={this.handleEnterPress.bind(this)} onFocus={this.openCalendar.bind(this)}/>
                                    <label htmlFor="dob">Date of Birth</label>
                                </div>*/}
                                {   
                                    this.state.dateModal ? <div className="calendar-overlay"><div className="date-picker-modal">
                                        <Calendar
                                            showWeekNumber={false}
                                            defaultValue={moment(dob == null?new Date():dob)}
                                            disabledDate={(date) => {
                                                return date.diff(moment((new Date)), 'days') > -1
                                            }}
                                            showToday
                                            onSelect={this.selectDateFromCalendar.bind(this)}
                                        />
                                    </div></div> : ""
                                }
                                <NewDateSelector {...this.props} getNewDate={this.props.updateProfile.bind(this)} old_dob={dob}/>
                                {/* <div className="labelWrap">
                                <input value={name} onChange={this.handleChange.bind(this, 'name')} id="age" name="lname" type="text" required />
                                <label htmlFor="age">Age</label>
                            </div> */}
                                {/*<div className="labelWrap">
                                    <input value={email} onChange={this.handleChange.bind(this, 'email')} id="email" name="lname" type="text" className={this.props.errors['email'] ? 'errorColorBorder' : ""} required onKeyPress={this.handleEnterPress.bind(this)} />
                                    <label htmlFor="email">Email</label>
                                </div>*/}
                                {this.props.default_profile && Object.keys(this.props.default_profile).length && this.props.default_profile.is_default_user && this.props.default_profile.id == this.props.profileData.id?
                                    <VerifyEmail {...this.props} member_id={this.props.profileData} email={email} validateErrors = {[]}/>
                                :''}

                                {this.props.default_profile && Object.keys(this.props.default_profile).length && this.props.default_profile.is_default_user && this.props.default_profile.id == this.props.profileData.id ?<div className="labelWrap">
                                    <input value={phone_number || ""} onChange={this.handleChange.bind(this, 'phone_number')} id="number" name="lname" type="text" className={this.props.errors['phone_number'] ? 'errorColorBorder' : ""} required onKeyPress={this.handleEnterPress.bind(this)} />
                                    <label htmlFor="number">Mobile Number</label>
                                </div>:''}

                                {/* <a href="javascript:;" style={{ color: '#f78361' }} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.manageAddress()
                            }}>Manage My Address<span><img src={ASSETS_BASE_URL + "/img/customer-icons/right-arrow.svg"} className="list-arrow-rt" style={{ marginLeft: 8, width: 7 }}></img></span></a> */}
                            </form>
                            {
                            this.props.gold_user_profile && Object.keys(this.props.gold_user_profile).length && this.props.gold_user_profile.vip_data && Object.keys(this.props.gold_user_profile.vip_data).length && this.props.gold_user_profile.vip_data.total_members_allowed > 0 && !this.props.profileData.is_vip_gold_member && this.props.gold_user_profile.vip_data.is_member_allowed?
                            <div className="defaultProfile">
                                <label className="ck-bx add-member-chkbx"> 
                                    <span>
                                        Add this member to Docprime
                                        <img className="ml-2" width="35" src="https://cdn.docprime.com/cp/assets/img/gold-lg.png"  alt="gold"/>
                                    </span><br/>
                                    <span className="profile-warning-text">Once added to gold, you cannont edit or remove the member</span>
                                    <input type="checkbox" onClick={this.props.addToGold.bind(this, !this.props.add_to_gold)} checked={
                                    this.props.add_to_gold}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            :''
                            }
                            {
                            this.props.show_default_checkBox?
                            <div className="defaultProfile">
                                <label className="ck-bx add-member-chkbx">Make Primary Profile
                                    <input type="checkbox" onClick={this.handleDefaultUser.bind(this, !this.state.is_default_user)} checked={
                                    this.state.is_default_user}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            :''
                            }
                            {
                                this.props.is_profile_editable?''
                                :<span>*Details of the profiles which are covered under insurance cannot be updated</span>
                            }
                        </div>
                    </div>
                }


                {
                    this.state.dataUrl ? <div>
                        <Cropper
                            ref='cropper'
                            src={this.state.dataUrl}
                            style={{ "height": "100%", "width": "100%", "maxWidth": "600px", "position": "fixed", "left": "50%", "top": "50%", "zIndex": "999999", "transform": "translate(-50%, -50%)" }}
                            aspectRatio={1 / 1}
                            cropBoxResizable={false}
                            viewMode={2}
                            dragMode={'move'}
                            modal={true}
                            guides={true}
                            background={false}
                        />
                        <a style={{ zIndex: 9999999 }} href="#" onClick={this.finishCrop.bind(this)} className="fixed horizontal bottom v-btn v-btn-primary no-round btn-lg text-center update-profile-img-btn">Update Profile Image</a>
                    </div> : ""
                }
            </section>
        );
    }
}


export default BasicDetails
