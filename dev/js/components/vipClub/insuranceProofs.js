import React from 'react'
const queryString = require('query-string');
const Compress = require('compress.js')
import SnackBar from 'node-snackbar'
import Loader from '../commons/Loader'
class InsuranceProofs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null,
            zoomImageUrl: null,
            zoomImage: false,
            openPdf: false,
            openPdfUrl: null,
            isLoading:false
        }
    }

    pickFile(member_id, e) { // to select file
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

    finishCrop(dataUrl, member_id, file) { // cropping the image
        let file_blob_data
        if (dataUrl) {
            file_blob_data = this.dataURItoBlob(dataUrl)
        }
        let mem_data = {}
        let existingData
        let img_tag = "proof_file"
        this.setState({
            dataUrl: null,isLoading:true
        }, () => {
            let form_data = new FormData()
            if (file) {
                form_data.append(img_tag, file, "imageFilename.pdf")
            } else {
                form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            }
            this.props.uploadVipProof(form_data, member_id, 'image', (data, err) => { // store selected proof to database
                if (data) {
                    let dataId = data.id
                    mem_data.id = this.props.member_id;
                    mem_data.is_primary_user = this.props.is_primary_user;
                    mem_data.img_path_ids=[]
                    if(this.props.members_proofs.length > 0){
                        Object.entries(this.props.members_proofs).map(function([key, value]) {
                            if(value.id == member_id){
                                mem_data.img_path_ids = value.img_path_ids
                                mem_data.img_path_ids.push({id: dataId, image:data.data.proof_file, val:dataId})
                            }else{
                                mem_data.img_path_ids = []
                                mem_data.img_path_ids.push({id: dataId, image:data.data.proof_file,val:dataId})
                            }
                        })

                    }else{
                        mem_data.img_path_ids.push({id: dataId, image:data.data.proof_file, val:dataId})
                    }
                    this.setState({isLoading:false})
                    this.props.storeVipMemberProofs(mem_data) // to store member proof ids to the user store
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
    
    removeImage(img){
        let Uploaded_image_data = []
        Uploaded_image_data = this.props.members_proofs.filter((x => x.id == this.props.member_id))
        Uploaded_image_data[0].img_path_ids.map((data,i)=>{
                data.member_id=this.props.member_id
                if(data.image == img){
                    this.props.removeVipMemberProof(data) // to remove cancelled uploaded image
                }
            })
    }

    render() {
        let Uploaded_image_data = []
        let img_url = []
        let pdf_url = []
        if (this.props.members_proofs && this.props.members_proofs.length > 0) {
            Uploaded_image_data = this.props.members_proofs.filter((x => x.id == this.props.member_id))
            if(Uploaded_image_data.length > 0){
                Uploaded_image_data[0].img_path_ids.map((data, i) =>{
                    if(data.image.includes('pdf')){
                        pdf_url.push(data.image)
                    }else{
                        img_url.push(data.image)
                    }
                })
            }
        }
        let show_upload = true
        if((img_url && img_url.length > 0) || (pdf_url && pdf_url.length > 0)){
            show_upload = false
        }
        return <div className="insurance-proofs-cont" style={{margin: '10px -10px 0px -10px'}}>
            {
            /*    this.props.endorsementError.indexOf(this.props.member_id) != -1 && img_url.length==0?
                <span className="ins-prf-error-msg">*Please upload the required documents</span>
                :''*/
            }
            <div className="upload-addbtn-cont" id={`member_${this.props.member_id}_upload`}>
                <div className="ins-upld-cont">
                    <div className="ins-sb-frst-img">
                        <img src={ASSETS_BASE_URL + "/img/ins-warning.svg"} />
                    </div>
                    <div className="ins-upload-text">
                        <p className="ins-upload-para-text">Upload any governement ID proof</p>
                        <p className="ins-upload-sub-text">Aadhar card, Passport, Driving License, Voter ID Card</p>
                        <p className="ins-file-tyle">File type: jpg, jpeg, png, pdf </p>
                    </div>
                </div>
                {
                    show_upload?
                    <span className="ins-proof-upload-btn" onClick={() => {
                        document.getElementById('imageFilePicker_' + this.props.member_id + '_front').click()
                        document.getElementById('imageFilePicker_' + this.props.member_id + '_front').value = ""
                    }}><img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"}/> Upload
                        <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_front`} onChange={this.pickFile.bind(this, this.props.member_id)} accept="image/x-png,image/jpeg,image/jpg,.pdf" />
                        </span>
                : ''}
            </div>
            {
            this.state.isLoading && show_upload?
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
            :''
            }
            {
                Uploaded_image_data && Uploaded_image_data.length > 0 && !show_upload?
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
                            pdf_url && pdf_url.length>0 ?
                                pdf_url.map((data, i) =>{
                                    return <div className="ins-prf-img-grd" key={i}>
                                    <img className="img-fluid ins-up-img-ic" src={ASSETS_BASE_URL + "/img/pdf.jpg"}/>
                                    <img className="ins-prf-cls" onClick={this.removeImage.bind(this, data)} src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
                                    </div>
                                })
                                : ''
                        }
                        {
                            this.state.isLoading?
                            <div className="ins-prf-img-grd">
                                <div className="loader-for-chat-div mt-0">
                                    <div className='loader-for-chat mb-0' style={{width:'50px'}}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                            :''
                        }
                        {
                            ((img_url && img_url.length) || (pdf_url && pdf_url.length)) >= 5?''
                            :<span className="ins-prf-addMore" onClick={() => {
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
        </div>

    }
}
export default InsuranceProofs