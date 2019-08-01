import React from 'react'
import ProfileHeader from '../DesktopProfileHeader';
import HelmetTags from '../HelmetTags';
import CONFIG from '../../../config/config';
import Footer from '../Home/footer';
import Loader from '../Loader';
const queryString = require('query-string');

class HospitalInventoryView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        let parsed = ''
        if (this.props.location.search) {
            parsed = queryString.parse(this.props.location.search)
        }
        this.getHospitalInventoryList(parsed.city || 'Delhi')
    }

    getHospitalInventoryList(city) {
        this.props.getHospitalInventoryList(city)
    }

    render() {
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <HelmetTags tagsData={{
                    title: '',
                    description: '',
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
                                    <a href="/" onClick={(e) => {
                                        e.preventDefault()
                                        this.props.history.push('/hospitals')
                                    }}>
                                        <span className="fw-500 breadcrumb-title breadcrumb-colored-title">Hospitals in India</span>
                                    </a>
                                    <span className="breadcrumb-arrow">&gt;</span>
                                </li>
                                {
                                    this.props.hospitalLocalityList && this.props.hospitalLocalityList.name ?
                                        <li className="breadcrumb-list-item">
                                            <p className="fw-500 breadcrumb-title">{this.props.hospitalLocalityList.name}</p>
                                        </li> : ''
                                }
                            </ul>
                            {
                                this.props.hospitalLocalityList && this.props.hospitalLocalityList.name && this.props.hospitalLocalityList.url ?
                                    <div style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/${this.props.hospitalLocalityList.url}`)}>
                                        <h1 className="fw-500 sitemap-title">{this.props.hospitalLocalityList.name}</h1>
                                    </div> : ''
                            }
                            <div className="row sitemap-row">
                                {
                                    this.props.hospitalListLoading ?
                                        <Loader />
                                        :
                                        this.props.hospitalLocalityList && this.props.hospitalLocalityList.result && this.props.hospitalLocalityList.result.length ?
                                            this.props.hospitalLocalityList.result.map((locality, index) => {
                                                return <div key={index} className="col-12 col-md-6 tests-brdr-btm">
                                                    <div className="anchor-data-style" onClick={() => this.props.history.push(`/${locality.url ? locality.url : `/`}`)}>
                                                        {
                                                            locality.url ?
                                                                <div>
                                                                    <a href={`/${locality.url}`} onClick={(e) => {
                                                                        e.preventDefault()
                                                                    }}>{locality.name}</a>
                                                                    <span className="sitemap-right-arrow">
                                                                        <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                                                                    </span>
                                                                </div>
                                                                :
                                                                <span style={{ cursor: 'pointer' }} >{locality.name}</span>
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

export default HospitalInventoryView