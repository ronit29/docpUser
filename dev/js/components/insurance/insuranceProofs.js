import React from 'react'
const queryString = require('query-string');
const Compress = require('compress.js')

class InsuranceProofs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null
        }
    }

    pickFile(member_id, img_type, e) {
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
                    // this.props.toggleOpenCrop()
                    this.finishCrop(dataUrl, member_id, img_type)
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

    finishCrop(dataUrl, member_id, img_type) {
        console.log(this.props.members_proofs)
        let file_blob_data = this.dataURItoBlob(dataUrl)
        let mem_data = {}
        let existingData
        let img_tag = "document_image"
        // if(img_type=='back'){
        //     img_tag = "document_second_image"
        // }
        this.setState({
            dataUrl: null,
        }, () => {

            let form_data = new FormData()
            form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            this.props.uploadProof(form_data, member_id, img_type, (data, err) => {
                if (data) {
                    mem_data.id = data.data.member
                    mem_data.img_id = data.id
                    mem_data.img_type = img_type
                    if(this.props.members_proofs.length > 0){
                        existingData =this.props.members_proofs.filter((x=>x.id == member_id))
                        if(existingData.length > 0){
                            if(img_type== 'front'){
                                mem_data.front_img = data.data.document_image  
                                mem_data.back_img = existingData[0].back_img
                            }
                            if (img_type == 'back') {
                                mem_data.front_img = existingData[0].front_img
                                mem_data.back_img = data.data.document_image
                            }
                        }else{
                            if(img_type== 'front'){
                                mem_data.front_img = data.data.document_image  
                                mem_data.back_img = null
                            }
                            if (img_type == 'back') {
                                mem_data.front_img = null
                                mem_data.back_img = data.data.document_image
                            }
                        }
                    }else{
                        if(img_type == 'front'){
                            mem_data.front_img = data.data.document_image  
                            mem_data.back_img = null
                        }
                        if (img_type == 'back') {
                            mem_data.front_img = null
                            mem_data.back_img = data.data.document_image
                        }
                    }
                    this.props.storeMemberProofs(mem_data)
                }
                // this.setState({ loading: false })
                // this.props.history.go(-1)
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
        let Uploaded_image_data
        if (this.props.members_proofs && this.props.members_proofs.length > 0) {
            Uploaded_image_data = this.props.members_proofs.filter((x => x.id == this.props.member_id))
        }
        return <div className="insurance-proofs-cont">
            <div className="upload-addbtn-cont" id={`member_${this.props.member_id}_upload`}>
                <div className="ins-upld-cont">
                    <div className="ins-sb-frst-img">
                        <img src={ASSETS_BASE_URL + "/img/ins-warning.svg"} />
                    </div>
                    <div className="ins-upload-text">
                        <p className="ins-upload-para-text">Upload any governement ID proof</p>
                        <p className="ins-upload-sub-text">Aadhar card, Passport, Driving License, Voter ID Card</p>
                    </div>
                </div>
                <span className="ins-proof-upload-btn" onClick={() => {
                    document.getElementById('imageFilePicker_' + this.props.member_id + '_front').click()
                    document.getElementById('imageFilePicker_' + this.props.member_id + '_front').value = ""
                }}><img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"}/> Upload
                    <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_front`} onChange={this.pickFile.bind(this, this.props.member_id, 'front')} />
                </span>
            </div>
            {
                Uploaded_image_data && Uploaded_image_data.length > 0 ?
                    <div className="upload-img-section">
                        <img className="img-fluid ins-up-img-ic" src={Uploaded_image_data[0].front_img} style={{  }} />
                        {
                            Uploaded_image_data[0].back_img ?
                                <img className="img-fluid ins-up-img-ic" src={Uploaded_image_data[0].back_img} style={{  }} /> : ''
                        }
                        <span className="ins-prf-addMore" onClick={() => {
                            document.getElementById('imageFilePicker_' + this.props.member_id + '_back').click()
                            document.getElementById('imageFilePicker_' + this.props.member_id + '_back').value = ""
                        }}>
                            <img className="ins-addico" src={ASSETS_BASE_URL + "/img/ins-add-ico.svg"} />
                            Add More
                    <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_back`} onChange={this.pickFile.bind(this, this.props.member_id, 'back')} />
                        </span>
                    </div>
                    : ''
            }
        </div>

    }
}
export default InsuranceProofs