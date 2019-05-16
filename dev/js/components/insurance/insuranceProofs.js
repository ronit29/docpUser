import React from 'react'
const queryString = require('query-string');
const Compress = require('compress.js')
import SnackBar from 'node-snackbar'

class InsuranceProofs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null,
            zoomImageUrl: null,
            zoomImage: false,
            openPdf: false,
            openPdfUrl: null
        }
    }

    pickFile(member_id, e) {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0]
            if (e.target.files[0] && e.target.files[0].name.includes('.pdf')) {
                this.finishCrop(null, member_id, file)
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
                        this.finishCrop(dataUrl, member_id, null)
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

    finishCrop(dataUrl, member_id, file) {
        let file_blob_data
        if (dataUrl) {
            file_blob_data = this.dataURItoBlob(dataUrl)
        }
        let mem_data = {}
        let existingData
        let img_tag = "document_image"
        this.setState({
            dataUrl: null,
        }, () => {
            let form_data = new FormData()
            if (file) {
                form_data.append(img_tag, file, "imageFilename.pdf")
            } else {
                form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            }
            this.props.uploadProof(form_data, member_id, 'image', (data, err) => {
                if (data) {
                    mem_data.id = data.data.member
                    mem_data.images = []
                    mem_data.img_ids = []
                    if (this.props.members_proofs.length > 0) {
                        Object.entries(this.props.members_proofs).map(function ([key, value]) {
                            if (value.id == member_id) {
                                mem_data.images = value.images
                                mem_data.img_ids = value.img_ids
                                mem_data.images.push(data.data.document_image)
                                mem_data.img_ids.push(data.id)
                            } else {
                                mem_data.images = []
                                mem_data.img_ids = []
                                mem_data.images.push(data.data.document_image)
                                mem_data.img_ids.push(data.id)
                            }
                        })

                    } else {
                        mem_data.images.push(data.data.document_image)
                        mem_data.img_ids.push(data.id)
                    }
                    this.props.storeMemberProofs(mem_data)
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

    zoomImage(img) {
        this.setState({ zoomImageUrl: img, zoomImage: true })
        if (document.body) {
            document.body.style.overflow = 'hidden'
        }
    }

    openPdf(pdf_url) {
        this.setState({ openPdfUrl: pdf_url, openPdf: true })
        if (document.body) {
            document.body.style.overflow = 'hidden'
        }
    }

    closeZoomImage() {
        this.setState({ zoomImage: false, zoomImageUrl: null, openPdfUrl: false, openPdf: null })
        if (document.body) {
            document.body.style.overflow = ''
        }
    }
    removeImage(img) {
        console.log(img)
    }

    render() {
        let Uploaded_image_data = []
        let img_url = []
        let pdf_url = []
        if (this.props.members_proofs && this.props.members_proofs.length > 0) {
            Uploaded_image_data = this.props.members_proofs.filter((x => x.id == this.props.member_id))
            if (Uploaded_image_data.length > 0) {
                Uploaded_image_data[0].images.map((data, i) => {
                    if (data.includes('pdf')) {
                        pdf_url.push(data)
                    } else {
                        img_url.push(data)
                    }
                })
            }
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
                {
                    Uploaded_image_data && Uploaded_image_data.length == 0 ?
                        <span className="ins-proof-upload-btn" onClick={() => {
                            document.getElementById('imageFilePicker_' + this.props.member_id + '_front').click()
                            document.getElementById('imageFilePicker_' + this.props.member_id + '_front').value = ""
                        }}><img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"} /> Upload
                        <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_front`} onChange={this.pickFile.bind(this, this.props.member_id)} accept="image/x-png,image/jpeg,image/jpg,.pdf" />
                        </span>
                        : ''}
            </div>
            {
                Uploaded_image_data && Uploaded_image_data.length > 0 ?
                    <div className="upload-img-section">
                        {
                            img_url && img_url.length > 0 ?
                                img_url.map((data, i) => {
                                    return <div key={i} className="ins-prf-img-grd">
                                        <img onClick={this.zoomImage.bind(this, data)} className="img-fluid ins-up-img-ic" src={data} />
                                        <img className="ins-prf-cls" onClick={this.removeImage.bind(this, data)} src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
                                    </div>
                                })
                                : ''
                        }
                        {
                            pdf_url && pdf_url.length > 0 ?
                                pdf_url.map((data, i) => {
                                    return <div key={i}><img onClick={this.openPdf.bind(this, data)} className="img-fluid ins-up-img-ic" src={data} /></div>
                                })
                                : ''
                        }
                        {
                            Uploaded_image_data[0].back_img ? ''
                                : <span className="ins-prf-addMore" onClick={() => {
                                    document.getElementById('imageFilePicker_' + this.props.member_id + '_back').click()
                                    document.getElementById('imageFilePicker_' + this.props.member_id + '_back').value = ""
                                }}>
                                    <img className="ins-addico" src={ASSETS_BASE_URL + "/img/ins-add-ico.svg"} />
                                    Add More
                                <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_back`} onChange={this.pickFile.bind(this, this.props.member_id)} accept="image/x-png,image/jpeg,image/jpg,.pdf" />
                                </span>
                        }
                    </div>
                    : ''
            }
            <p className="ins-file-tyle">File type: jpg, jpeg, png, pdf </p>
            {
                this.state.zoomImage && this.state.zoomImageUrl ?
                    <div className="search-el-popup-overlay" onClick={this.closeZoomImage.bind(this)}>
                        <div className="search-el-popup">
                            <div className="search-el-btn-container">
                                <img style={{ maxHeight: '200px' }} src={this.state.zoomImageUrl} />
                            </div>
                        </div>
                    </div>
                    : ''
            }

            {
                this.state.openPdf && this.state.openPdfUrl ?
                    <div className="search-el-popup-overlay" onClick={this.closeZoomImage.bind(this)}>
                        <div className="search-el-popup">
                            <div className="search-el-btn-container">
                                <iframe style={{ height: '65vh', width: '100%' }} src="http://www.tutorialspoint.com/javascript/javascript_tutorial.pdf"></iframe>
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </div>

    }
}
export default InsuranceProofs