import React from 'react'
import ProfileHeader from '../DesktopProfileHeader';
import HelmetTags from '../HelmetTags';
import CONFIG from '../../../config/config';
import Footer from '../Home/footer';

class TestsListView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedChar: 0
        }
    }

    componentDidMount() {
        this.updateData(this.state.selectedChar)
    }

    getCharacter(index) {
        return String.fromCharCode(97 + index)
    }

    updateData(index) {
        let character = this.getCharacter(index)
        this.props.getIPDAlphabetically(character, this.props.selectedLocation)
    }

    alphabetClick(index) {
        this.setState({ selectedChar: index })
        this.updateData(index)
    }

    getAlphabets() {
        let alphabets = []
        for (let i = 0; i <= 25; i++) {
            alphabets.push(String.fromCharCode(65 + i))
        }
        return alphabets
    }

    render() {
        let alphabets = this.getAlphabets()
        let selectedAlphabet = this.getCharacter(this.state.selectedChar)
        let data = this.props
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <HelmetTags tagsData={{
                    title: 'Procedures Index | Details, Preparation, Procedure and Normal Range',
                    description: 'Procedures Index: Find detailed information about test preparation, procedure, normal ranges, duration and more.',
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
                                    <span className="fw-500 breadcrumb-title">Procedures</span>
                                </li>
                            </ul>
                            <div>
                                <h1 className="fw-500 sitemap-title">Procedure Index</h1>
                            </div>
                            <div className="d-flex align-items-center mrb-10 mrt-20 test-index-div">
                                {
                                    alphabets && alphabets.length ?
                                        alphabets.map((character, i) => {
                                            return <div key={i} className={i == this.state.selectedChar ? 'charSelected' : ''} onClick={() => this.alphabetClick(i)}>
                                                <span>{character}</span>
                                            </div>
                                        }) : ''
                                }
                            </div>
                            <div className="row sitemap-row">
                                {
                                    this.props.alphabeticalIpdTests && this.props.alphabeticalIpdTests.ipd_procedures && this.props.alphabeticalIpdTests.ipd_procedures.length && (selectedAlphabet == this.props.selectedIpdListAlphabet) ?
                                        this.props.alphabeticalIpdTests.ipd_procedures.map((test, index) => {
                                            return <div key={index} className="col-12 col-md-6 col-lg-4 tests-brdr-btm">
                                                <div className="anchor-data-style" onClick={() => this.props.history.push(`/${test.url?test.url:`ipdInfo?ipd_id=${test.id}`}`) }>
                                                    {
                                                        test.url ?
                                                            <div>
                                                                <a href={`/${test.url}`} onClick={(e) => {
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
                                        : !!!this.props.ipdIndexLoading ?
                                            <div className="col-12 fw-500 text-center mrt-20" style={{ fontSize: 18 }} >No record Found !!</div> : ''
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

export default TestsListView