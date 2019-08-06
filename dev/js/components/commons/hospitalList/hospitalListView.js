import React from 'react'
import ProfileHeader from '../DesktopProfileHeader';
import HelmetTags from '../HelmetTags';
import CONFIG from '../../../config/config';
import Footer from '../Home/footer';
import Loader from '../Loader'

class HospitalListView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 1
        }
    }

    componentDidMount() {
        this.getHospitalList()
    }

    getHospitalList() {
        this.props.getHospitalList(this.props.selectedLocation, this.state.page)
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <HelmetTags tagsData={{
                    title: 'List of Hospitals in India | Indian Hospitals | Best Hospitals in India',
                    description: 'List of Hospitals in India: Get state wise list of hospitals and other required information like location, doctors list, price and facility available at the hospital.',
                    canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.match.url}`
                }} />
                <section className="container dp-container-div">
                    <div className="row main-row parent-section-row">
                        <div className="col-12">
                            <ul className="mrb-10 mrt-20 breadcrumb-list" style={{ wordBreak: 'break-word' }}>
                                <li className="breadcrumb-list-item">
                                    <a href="/" onClick={(e) => {
                                        e.preventDefault()
                                        this.props.history.push('/')
                                    }}>
                                        <span className="fw-500 breadcrumb-title breadcrumb-colored-title">Home</span>
                                    </a>
                                    <span className="breadcrumb-arrow">&gt;</span>
                                </li>
                                <li className="breadcrumb-list-item">
                                    <p className="fw-500 breadcrumb-title">Hospitals in India</p>
                                </li>
                            </ul>
                            <div>
                                <h1 className="fw-500 sitemap-title">Hospitals in India</h1>
                            </div>
                            <div className="row sitemap-row">
                                {
                                    this.props.hospitalIndexLoading ?
                                        <Loader />
                                        : this.props.selectedHospitalList && this.props.selectedHospitalList.length ?
                                            this.props.selectedHospitalList.map((test, index) => {
                                                return <div key={index} className="col-12 col-md-6 col-lg-4 tests-brdr-btm">
                                                    <div className="anchor-data-style" onClick={() => this.props.history.push(`/hospitals/inventory?city=${test.name ? test.name : `Delhi`}`)}>
                                                        {
                                                            test.name ?
                                                                <div>
                                                                    <a href={`/hospitals/inventory?city=${test.name ? test.name : ``}`} onClick={(e) => {
                                                                        e.preventDefault()
                                                                    }}>{test.name}</a>
                                                                    <span className="sitemap-right-arrow">
                                                                        <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                                                                    </span>
                                                                </div>
                                                                :
                                                                <span style={{ cursor: 'pointer' }} >{test.name}</span>
                                                        }
                                                    </div>
                                                </div>
                                            })
                                            : <div className="col-12 fw-500 text-center mrt-20" style={{ fontSize: 18 }} >No record Found !!</div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default HospitalListView