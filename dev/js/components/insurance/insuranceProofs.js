import React from 'react'
const queryString = require('query-string');
const Compress = require('compress.js')

class InsuranceProofs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUrl: null,
            zoomImageUrl:null,
            zoomImage:false
        }
    }

    pickFile(member_id, img_type, e) {
        if (e.target.files && e.target.files[0]) {
            if(e.target.files[0] && e.target.files[0].name.includes('.pdf')){
                console.log('pdf')
            }else{
                console.log('img')
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
        let file_blob_data = this.dataURItoBlob(dataUrl)
        let mem_data = {}
        let existingData
        let img_tag = "document_image"
        this.setState({
            dataUrl: null,
        }, () => {
            let form_data = new FormData()
            form_data.append(img_tag, file_blob_data, "imageFilename.jpeg")
            this.props.uploadProof(form_data, member_id, img_type, (data, err) => {
                if (data) {
                    mem_data.id = data.data.member
                    mem_data.images = []
                    mem_data.img_ids = []
                    if(this.props.members_proofs.length > 0){
                        Object.entries(this.props.members_proofs).map(function([key, value]) {
                            if(value.id == member_id){
                                mem_data.images = value.images
                                mem_data.img_ids = value.img_ids
                                mem_data.images.push(data.data.document_image)
                                mem_data.img_ids.push(data.id)
                            }else{
                                mem_data.images=[]
                                mem_data.img_ids = []
                                mem_data.images.push(data.data.document_image)        
                                mem_data.img_ids.push(data.id)
                            }
                        })

                    }else{
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

    zoomImage(img){
        this.setState({zoomImageUrl:img,zoomImage:true})
        if(document.body){
            document.body.style.overflow='hidden'
        }
    }

    closeZoomImage(){
        this.setState({zoomImage:false,zoomImageUrl:null})
        if(document.body){
            document.body.style.overflow=''
        }
    }

    render() {
        let Uploaded_image_data = []
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
                {
                    Uploaded_image_data && Uploaded_image_data.length == 0?
                    <span className="ins-proof-upload-btn" onClick={() => {
                        document.getElementById('imageFilePicker_' + this.props.member_id + '_front').click()
                        document.getElementById('imageFilePicker_' + this.props.member_id + '_front').value = ""
                    }}><img src={ASSETS_BASE_URL + "/img/ins-up-ico.svg"}/> Upload
                        <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_front`} onChange={this.pickFile.bind(this, this.props.member_id, 'front')} />
                    </span>
                :''}
            </div>
            {
                Uploaded_image_data && Uploaded_image_data.length > 0 ?
                    <div className="upload-img-section">
                        {
                            Uploaded_image_data[0].images && Uploaded_image_data[0].images.length>0 ?
                                Uploaded_image_data[0].images.map((data, i) =>{
                                    return <img key={i} onClick={this.zoomImage.bind(this,data)} className="img-fluid ins-up-img-ic" src={data}  />
                                })
                            : ''
                        }
                        {
                            Uploaded_image_data[0].back_img?''
                            :<span className="ins-prf-addMore" onClick={() => {
                                document.getElementById('imageFilePicker_' + this.props.member_id + '_back').click()
                                document.getElementById('imageFilePicker_' + this.props.member_id + '_back').value = ""
                            }}>
                                <img className="ins-addico" src={ASSETS_BASE_URL + "/img/ins-add-ico.svg"} />
                                Add More
                                <input type="file" style={{ display: 'none' }} id={`imageFilePicker_${this.props.member_id}_back`} onChange={this.pickFile.bind(this, this.props.member_id, 'back')}/>
                            </span>
                        }
                    </div>
                    : ''
            }
            {
                this.state.zoomImage && this.state.zoomImageUrl?
                <div className="search-el-popup-overlay" onClick={this.closeZoomImage.bind(this)}>
                        <div className="search-el-popup">
                            <div className="search-el-btn-container">
                                 <img style={{maxHeight:'200px'}}src={this.state.zoomImageUrl}/>
                            </div>
                        </div>
                </div>
                :''
            }
        </div>

    }
}
export default InsuranceProofs