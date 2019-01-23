import React from 'react';
import ProfileHeader from '../commons/DesktopProfileHeader/DesktopProfileHeader';

class HealthPackageAdvisorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0)
        }
    }

    render() {

        return (
            <div className="profile-body-wrap">
                <div className="d-none d-md-block">
                    <ProfileHeader {...this.props} />
                </div>
                <section className="container parent-section book-appointment-section mp0">
                    <div className="row main-row parent-section-row">
                        <div className="col-12 col-md-7 col-lg-7 pt-0">
                            <div className="sticky-header fixed top hpa-header">
                                <div className="d-flex">
                                    <img src={ASSETS_BASE_URL + '/img/icons/back-arrow.png'} />
                                    <h1 className="fw-500">Health Package Advisor</h1>
                                </div>
                            </div>
                            <div className="widget mb-10 mrt-10 hpa-widget">
                                <div className="search-top-container">
                                    <div class="serch-nw-inputs">
                                        <input class="new-srch-inp" autocomplete="off" placeholder="Location" value="Delhi" />
                                        <img class="srch-inp-img" src="/assets/img/new-loc-ico.svg" />
                                        <button class="srch-inp-btn-img">Auto Detect <img src="/assets/img/loc-track.svg" /></button>
                                    </div>
                                    <div className="hpa-flex mrb-20">
                                        <div className="hpa-flex hpa-age">
                                            <label className="fw-500">Age :</label>
                                            <select>
                                                <option>0-20</option>
                                                <option>21-40</option>
                                                <option>41-60</option>
                                            </select>
                                        </div>
                                        <div className="hpa-flex hpa-gender">
                                            <label className="fw-500">Gender :</label>
                                            <div className="d-flex">
                                                <div className="dtl-radio">
                                                    <label className="container-radio mb-0 hpa-container-radio" style={{ marginRight: 16 }}>M<input type="radio" name="radio" />
                                                        <span className="doc-checkmark hpa-radio"></span>
                                                    </label>
                                                </div>
                                                <div className="dtl-radio">
                                                    <label className="container-radio mb-0 hpa-container-radio">F<input type="radio" name="radio" />
                                                        <span className="doc-checkmark hpa-radio"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hpa-flex">
                                        <div className="hpa-flex">
                                            <label className="fw-500">Package Type :</label>
                                            <div className="d-flex">
                                                <div className="dtl-radio">
                                                    <label className="container-radio mb-0 hpa-container-radio" style={{ marginRight: 8 }}>Screening<input type="radio" name="radio2" />
                                                        <img class="hpa-info-icon" src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
                                                        <span className="doc-checkmark hpa-radio"></span>
                                                    </label>
                                                </div>
                                                <div className="dtl-radio">
                                                    <label className="container-radio mb-0 hpa-container-radio">Physical<input type="radio" name="radio2" />
                                                        <img class="hpa-info-icon" src={ASSETS_BASE_URL + "/img/icons/info.svg"} />
                                                        <span className="doc-checkmark hpa-radio"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hpa-heading mrt-10 mrb-10">
                                <p className="fw-500">Select Categories</p>
                            </div>
                            <div className="widget mb-10 mrt-10">
                                <div className="search-top-container">
                                    <div className="d-flex justify-content-between" style={{ alignItems: 'center' }} >
                                        <label class="ck-bx fw-500" style={{ fontSize: 14, flex: 1, paddingLeft: 24 }}>Heart
                                            <input type="checkbox" value="on" /><span class="checkmark hpa-checkmark"></span>
                                        </label>
                                        <label class="ck-bx fw-400 text-right" style={{ fontSize: 14, flex: 1, paddingLeft: 24 }}>Select subset
                                            <input type="checkbox" value="on" /><span class="checkmark hpa-checkmark" style={{ left: 'unset', right: 98 }}></span>
                                        </label>
                                    </div>
                                    <div className="mrt-10">
                                        <ul className="list hpa-list">
                                            <li>
                                                <div style={{ display: 'block', position: 'relative' }}>
                                                    <label class="ck-bx fw-500" style={{ fontSize: 14, flex: 1, paddingLeft: 24 }}>Lipid Profile (8)
                                                    <input type="checkbox" value="on" /><span class="checkmark hpa-checkmark"></span>
                                                    </label>
                                                    <img src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} />
                                                </div>
                                                <div className="mrt-10" style={{ display: 'block' }}>
                                                    <p>CBC stands for ‘complete blood count’. As the name suggests, it is a measure of the count of all composites of the blood, namely white blood cell count, red blood cell count, and platelets.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="hpa-heading mrt-10 mrb-10">
                                <p className="fw-500">Top Selling Health Packages</p>
                            </div>
                            <div class="widget mrb-10">
                                <div class="search-top-container">
                                    <ul className="list hpa-list-2">
                                        <li>
                                            <p>Dengue NS1 antigen detection</p>
                                            <img src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} style={{ width: 15 }} />
                                        </li>
                                        <li>
                                            <p>Dengue NS1 antigen detection</p>
                                            <img src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} style={{ width: 15 }} />
                                        </li>
                                        <li>
                                            <p>Dengue NS1 antigen detection</p>
                                            <img src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} style={{ width: 15 }} />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HealthPackageAdvisorView