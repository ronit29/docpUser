import React from 'react';
import Cropper from 'react-cropper';

class BasicDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null
        }
    }

    handleChange(key, e) {
        this.props.updateProfile(key, e.target.value)
    }

    pickFile(e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            this.getBase64(file, (dataUrl) => {
                this.setState({ dataUrl })
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
            dataUrl: null
        }, () => {
            document.getElementById('imageFilePicker').value = ""
            let form_data = new FormData()
            form_data.append("profile_image", file_blob_data, "imageFilename.jpeg")
            this.props.editUserProfileImage(form_data, this.props.profileData.id, (err, data) => {
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

    render() {

        let { name, email, gender, phone_number, profile_image, id } = this.props.profileData
        profile_image = profile_image ? profile_image.replace("http://qa.panaceatechno.com/", "http://localhost:8080/") : "/assets/img/icons/drIcon.jpg"

        return (
            <section className="myProfile profile-details">
                <div className="widget no-shadow no-radius">
                    <div className="widget-content">
                        <div className="profile-icon">
                            <img src={profile_image} className="img-fluid img-round" onClick={() => {
                                document.getElementById('imageFilePicker').click()
                                document.getElementById('imageFilePicker').value = ""
                            }} />
                            <span className="cam-icon">
                                <img src="/assets/img/icons/cam-md.png" className="img-fluid cam-icon-img" />
                                <input type="file" style={{ visibility: 'hidden' }} id="imageFilePicker" onChange={this.pickFile.bind(this)} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="widget no-shadow no-radius">
                    <div className="widget-content">
                        <form className="go-bottom">
                            <div className="labelWrap">
                                <input value={name} onChange={this.handleChange.bind(this, 'name')} id="fname" className="fc-input error-outline" name="fname" type="text" required />
                                <label htmlFor="fname">Name</label>
                            </div>
                            <div className="form-group input-group">
                                <label className="inline input-label">Gender</label>
                                <div className="choose-gender">
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "m"} value={'m'} onChange={this.handleChange.bind(this, 'gender')} />Male</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "f"} value={'f'} onChange={this.handleChange.bind(this, 'gender')} />Female</label>
                                    <label className="radio-inline"><input type="radio" name="optradio" checked={gender == "o"} value={'o'} onChange={this.handleChange.bind(this, 'gender')} />Other</label>
                                </div>
                            </div>
                            {/* <div className="labelWrap">
                                <input value={name} onChange={this.handleChange.bind(this, 'name')} id="age" name="lname" type="text" required />
                                <label htmlFor="age">Age</label>
                            </div> */}
                            <div className="labelWrap">
                                <input value={email} onChange={this.handleChange.bind(this, 'email')} id="email" name="lname" type="text" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="labelWrap">
                                <input value={phone_number || ""} onChange={this.handleChange.bind(this, 'phone_number')} id="number" name="lname" type="text" required />
                                <label htmlFor="number">Mobile Number</label>
                            </div>

                            <a href="javascript:;" style={{color: '#f78361'}} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                this.props.manageAddress()
                            }}>Manage My Address<span><img src="/assets/img/customer-icons/right-arrow.svg" className="list-arrow-rt" style={{marginLeft: 8, width: 7}}></img></span></a>
                        </form>
                    </div>
                </div>

                {
                    this.state.dataUrl ? <div>
                        <Cropper
                            ref='cropper'
                            src={this.state.dataUrl}
                            style={{ "height": "100%", "width": "100%", "maxWidth": "500px", "position": "fixed", "left": "50%", "top": "50%", "zIndex": "999999", "transform": "translate(-50%, -50%)" }}
                            aspectRatio={1 / 1}
                            cropBoxResizable={false}
                            viewMode={1}
                            dragMode={'move'}
                        />
                        <a style={{ zIndex: 9999999 }} href="#" onClick={this.finishCrop.bind(this)} className="fixed horizontal bottom v-btn v-btn-primary no-round btn-lg text-center sticky-btn">Update Profile Image</a>
                    </div> : ""
                }
            </section>
        );
    }
}


export default BasicDetails
