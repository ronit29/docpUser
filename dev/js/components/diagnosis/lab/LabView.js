import React from 'react';

import LabDetails from '../commons/labDetails/index.js'
import Loader from '../../commons/Loader'

class LabView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id
        }
    }

    bookLab() {
        this.props.history.push(`/lab/${this.state.selectedLab}/book`)
    }

    render() {

        return (
            <div>
                <header className="skin-primary fixed horizontal top profile-book-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-4">
                                <div className="header-title fw-700 capitalize text-white">
                                    <ul className="inline-list top-nav alpha-bx text-white"
                                        onClick={() => {
                                            this.props.history.go(-1)
                                        }}
                                    >
                                        <li>
                                            <span className="ct-img ct-img-sm arrow-img">
                                                <img src="/assets/img/customer-icons/left-arrow.svg" className="img-fluid" />
                                            </span>
                                        </li>
                                        <li><div className="screen-title">Results</div></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <ul className="inline-list float-right user-notification-action">
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>

                {
                    this.props.LABS[this.state.selectedLab] ?
                        <div>
                            <div className="skin-primary empty-header ">
                            </div>

                            <LabDetails {...this.props} data={this.props.LABS[this.state.selectedLab]} />

                            <button onClick={this.bookLab.bind(this)} className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round btn-lg text-lg"><span className="text-xs selected-option">({this.props.selectedCriterias.length} Selected) </span>Book
                            </button>

                        </div> : <Loader />
                }

            </div>
        );
    }
}

export default LabView
