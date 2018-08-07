import React from 'react';

import Loader from '../../Loader'
import Lightbox from '../../../../helpers/lightbox';

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
        this.props.getAppointmentReports(this.state.id, this.state.type, (err, data) => {
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
                                this.state.reports.map((report, i) => {
                                    return <img src={report.name} key={i} className="imageReports" onClick={this.toggleLightBox.bind(this, true, i)} />
                                })
                            }
                            {
                                this.state.lightboxIsOpen ? <Lightbox
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
