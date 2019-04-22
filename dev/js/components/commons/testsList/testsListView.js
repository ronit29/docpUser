import React from 'react'
import ProfileHeader from '../DesktopProfileHeader/DesktopProfileHeader';

class TestsListView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <section className="container dp-container-div">
                    <div className="row main-row parent-section-row">
                        <div className="col-12">
                            <div className="fw-500 sitemap-title">All Specialities</div>
                            <div className="row sitemap-row">
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="anchor-data-style">
                                        <a href="/speciality-inventory/275">Oral &amp; MaxilloFacial Surgeon</a>
                                        <span className="sitemap-right-arrow">
                                            <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="anchor-data-style">
                                        <a href="/speciality-inventory/332">Homeopathic Specialist</a>
                                        <span className="sitemap-right-arrow">
                                            <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default TestsListView