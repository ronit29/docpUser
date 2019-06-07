import React from 'react'
const queryString = require('query-string');
const Compress = require('compress.js')
import SnackBar from 'node-snackbar'
import Loader from '../../commons/Loader'
class UploadPrescription extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null,
            zoomImageUrl: null,
            zoomImage: false,
            openPdf: false,
            openPdfUrl: null,
            isLoading: false
        }
    }

    pickFile(e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            if (e.target.files[0] && e.target.files[0].name.includes('.pdf')) {
                this.finishCrop(null, file)
            } else {
                const compress = new Compress()
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
                        this.finishCrop(dataUrl, null)
                        this.setState({ dataUrl })
                    })
                }).catch((e) => {
                    SnackBar.show({ pos: 'bottom-center', text: "Error uploading image." });
                })
            }
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

    finishCrop(dataUrl, file) {
        let file_blob_data
        if (dataUrl) {
            file_blob_data = this.dataURItoBlob(dataUrl)
        }
        let mem_data = {}
        let existingData
        let img_tag = "prescription_file"
        this.setState({
            dataUrl: null, isLoading: true
        }, () => {
            let form_data = new FormData()
            if (file) {
                form_data.append(img_tag, file, "imageFilename.pdf")
            } else {
                form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            }
            this.props.uploadPrescription(form_data, (data, err) => {
                if (data) {
                    mem_data.id = data.data.user
                    mem_data.img_path_ids = []
                    if (this.props.user_prescriptions.length > 0) {
                        Object.entries(this.props.user_prescriptions).map(function ([key, value]) {
                            // console.log(value)
                            mem_data.img_path_ids = value.img_path_ids
                            mem_data.img_path_ids.push({ id: data.id, image: data.data.prescription_file })
                            // if(value.id == member_id){
                            // mem_data.img_path_ids = value.img_path_ids
                            // mem_data.img_path_ids.push({id: data.id, image:data.data.prescription_file})
                            // }else{
                            //     mem_data.img_path_ids = []
                            //     mem_data.img_path_ids.push({id: data.id, image:data.data.prescription_file})
                            // }
                        })

                    } else {
                        mem_data.img_path_ids.push({ id: data.id, image: data.data.prescription_file })
                    }
                    this.setState({ isLoading: false })
                    this.props.savePrescription(mem_data)
                }
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

    removeImage(img) {
        this.props.user_prescriptions[0].img_path_ids.map((data, i) => {
            if (data.image == img) {
                this.props.removePrescription(img)
            }
        })
    }

    render() {
        let Uploaded_image_data = []
        let img_url = []
        let pdf_url = []
        if (this.props.user_prescriptions && this.props.user_prescriptions.length > 0) {
            this.props.user_prescriptions[0].img_path_ids.map((data, i) => {
                if (data.image.includes('pdf')) {
                    pdf_url.push(data.image)
                } else {
                    img_url.push(data.image)
                }
            })
        }
        let show_upload = true
        if (img_url.length > 0 || pdf_url.length > 0) {
            show_upload = false
        }
        return <div className="widget mrb-15">
            <div className="widget-content white-upld-div">
                <div className="insurance-proofs-cont">
                    {
                        /*    this.props.endorsementError.indexOf(this.props.member_id) != -1 && img_url.length==0?
                            <span className="ins-prf-error-msg">*Please upload the required documents</span>
                            :''*/
                    }
                    <div className="upload-addbtn-cont">
                        <div className="ins-upld-cont">
                            <div className="ins-sb-frst-img">
                                <img src={ASSETS_BASE_URL + "/img/vectorupl.png"} />
                            </div>
                            <div className="ins-upload-text">
                                <p className="ins-upload-para-text">Upload prescription</p>
                                {/* <p className="ins-upload-sub-text">Aadhar card, Passport, Driving License, Voter ID Card</p> */}
                                <p className="ins-file-tyle">File type: jpg, jpeg, png, pdf </p>
                            </div>
                        </div>
                        {
                            show_upload ?
                                <span className="ins-proof-upload-btn" onClick={() => {
                                    document.getElementById('imageFilePicker').click()
                                    document.getElementById('imageFilePicker').value = ""
                                }}><img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"} /> Upload
                        <input type="file" style={{ display: 'none' }} id="imageFilePicker" onChange={this.pickFile.bind(this)} accept="image/x-png,image/jpeg,image/jpg,.pdf" />
                                </span>
                                : ''}
                    </div>
                    {
                        this.state.isLoading && show_upload ?
                            <div className="ins-prf-img-grd d-block">
                                <div className="loader-for-chat-div mt-0">
                                    <div className='loader-for-chat mb-0'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        !show_upload ?
                            <div className="upload-img-section">
                                {
                                    img_url && img_url.length > 0 ?
                                        img_url.map((data, i) => {
                                            return <div key={i} className="ins-prf-img-grd">
                                                <img className="img-fluid ins-up-img-ic" src={data} />
                                                <img className="ins-prf-cls" onClick={this.removeImage.bind(this, data)} src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
                                            </div>
                                        })
                                        : ''
                                }
                                {
                                    pdf_url && pdf_url.length > 0 ?
                                        pdf_url.map((data, i) => {
                                            return <div className="ins-prf-img-grd" key={i}>
                                                <img className="img-fluid ins-up-img-ic" src={ASSETS_BASE_URL + "/img/pdf.jpg"} />
                                                <img className="ins-prf-cls" onClick={this.removeImage.bind(this, data)} src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
                                            </div>
                                        })
                                        : ''
                                }
                                {
                                    this.state.isLoading ?
                                        <div className="ins-prf-img-grd">
                                            <div className="loader-for-chat-div mt-0">
                                                <div className='loader-for-chat mb-0' style={{ width: '50px' }}>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                        : ''
                                }
                                {
                                    ((img_url && img_url.length) || (pdf_url && pdf_url.length)) >= 5 ? ''
                                        : <span className="ins-prf-addMore" onClick={() => {
                                            document.getElementById('imageFilePicker_back').click()
                                            document.getElementById('imageFilePicker_back').value = ""
                                        }}>
                                            <img className="ins-addico" src={ASSETS_BASE_URL + "/img/ins-add-ico.svg"} />
                                            Add More
                                <input type="file" style={{ display: 'none' }} id={'imageFilePicker_back'} onChange={this.pickFile.bind(this)} accept="image/x-png,image/jpeg,image/jpg,.pdf" />
                                        </span>
                                }
                            </div>
                            : ''
                    }
                </div>
            </div>
        </div>

    }
}
export default UploadPrescription