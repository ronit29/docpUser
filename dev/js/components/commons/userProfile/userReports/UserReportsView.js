import React from 'react';

import Loader from '../../Loader'
// import Lightbox from '../../../../helpers/lightbox';
import Lightbox from 'react-image-lightbox';

class UserReportsView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            type: this.props.match.params.type,
            id: this.props.match.params.id,
            reports: [],
            lightboxIsOpen: false,
            imageIndex: 0
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        this.props.getAppointmentReports(this.state.id, this.state.type, (err, data) => { // get user reports
            if (!err) {
                this.setState({ reports: data, loading: false })
            } else {
                this.setState({ loading: false })
            }
        })
    }

    toggleLightBox(type = false, imageIndex = 0) {
        this.setState({ lightboxIsOpen: type, imageIndex: imageIndex })
    }

    checkExtension(report, i) {
        let extensionArr = report.name.split('.');
        let extension = extensionArr[extensionArr.length - 1];
        if (extension == 'pdf') {
            return <div onClick={this.downloadImage.bind(this, report.name)} className="pdf-report-div" key={i}><img src={ASSETS_BASE_URL + "/img/customer-icons/pdf-icon.svg"} /></div>
        }
        else if (extension == 'txt') {
            return <div onClick={this.downloadImage.bind(this, report.name)} className="pdf-report-div" key={i}><img src={ASSETS_BASE_URL + "/img/customer-icons/text-icon.svg"} /></div>
        }
        else {
            return <img src={report.name} key={i} className="imageReports" onClick={this.toggleLightBox.bind(this, true, i)} />
        }
    }

    downloadImage(src) {
        if (window) {
            window.open(src, '_blank')
        }
    }

    render() {
        let images = []
        let { lightboxIsOpen, imageIndex } = this.state
        if (this.state.reports && this.state.reports.length) {
            images = this.state.reports.map((im) => {
                return im.name
            })
        }

        return (
            <div className="widget-content">
                {
                    !this.state.loading ? (
                        <div>

                            {
                                this.state.reports.length == 0 ? <div className="text-center pd-20">
                                    <img src={ASSETS_BASE_URL + "/img/customer-icons/no-address.png"} />
                                    <p className="fw-500 text-lg mrt-20">No Files Uploaded !!</p>
                                </div> : ""
                            }

                            {
                                this.state.reports.map((report, i) => {
                                    return this.checkExtension(report, i);
                                })
                            }
                            {
                                this.state.lightboxIsOpen ? <Lightbox
                                    toolbarButtons={[<p className="dwnloadbtnpres" onClick={this.downloadImage.bind(this, images[imageIndex])}>DOWNLOAD</p>]}
                                    mainSrc={images[imageIndex]}
                                    nextSrc={images[(imageIndex + 1) % images.length]}
                                    prevSrc={images[(imageIndex + images.length - 1) % images.length]}
                                    onCloseRequest={() => this.setState({ lightboxIsOpen: false })}
                                    onMovePrevRequest={() =>
                                        this.setState({
                                            imageIndex: (imageIndex + images.length - 1) % images.length,
                                        })
                                    }
                                    onMoveNextRequest={() =>
                                        this.setState({
                                            imageIndex: (imageIndex + 1) % images.length,
                                        })
                                    }
                                /> : ""
                            }

                        </div>

                    ) : <Loader />
                }
            </div>
        );
    }
}


export default UserReportsView
