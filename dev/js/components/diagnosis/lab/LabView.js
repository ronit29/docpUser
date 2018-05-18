import React from 'react';

import LabDetails from '../commons/labDetails/index.js'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: null
        }
    }

    componentDidMount() {
        let labId = this.props.match.params.id

        if (labId) {
            this.setState({ selectedLab: labId })
            this.props.getLabById(labId)
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        return (
            <div className="appointmentSlot">

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>

                            <header className="skin-primary fixed horizontal top profile-book-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="header-title fw-700 capitalize text-white">ICON</div>
                                        </div>
                                        <div className="col-4">
                                        </div>
                                        <div className="col-4">
                                            <ul className="inline-list float-right user-notification-action">
                                                <li><span className="icon icon-md text-middle"><img src="/assets/img/customer-icons/user.svg" className="img-fluid" /></span></li>
                                                <li><span className="icon icon-md text-middle notification-icon"><img src="/assets/img/customer-icons/notification.svg" className="img-fluid" /> <span className="notification-alert" /></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div className="skin-primary empty-header ">
                            </div>

                            <LabDetails {...this.props} data={this.props.LABS[this.state.selectedLab]} />

                            <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg"><span className="text-xs selected-option">(2 Selected) </span>Book
                            </button>
                        </div> : ""
                }

            </div>
        );
    }
}

export default LabView
