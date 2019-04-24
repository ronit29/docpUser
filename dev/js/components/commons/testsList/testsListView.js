import React from 'react'
import ProfileHeader from '../DesktopProfileHeader/DesktopProfileHeader';
import HelmetTags from '../HelmetTags';
import CONFIG from '../../../config/config';

class TestsListView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedChar: 0
        }
    }

    componentDidMount() {
        this.props.getTestsAlphabetically('a')
    }

    alphabetClick(index) {
        this.props.getTestsAlphabetically(String.fromCharCode(97 + index))
        this.setState({ selectedChar: index })
    }

    render() {
        let alphabets = []
        for (let i = 0; i <= 25; i++) {
            alphabets.push(<div key={i} className={i == this.state.selectedChar ? 'charSelected' : ''} onClick={() => this.alphabetClick(i)}><span>{String.fromCharCode(65 + i)}</span></div>)
        }
        return (
            <div className="profile-body-wrap">
                <ProfileHeader {...this.props} />
                <HelmetTags tagsData={{
                    title: 'Tests Index | Details, Preparation, Procedure and Normal Range',
                    description: 'Tests Index: Find detailed information about test preparation, procedure, normal ranges, duration and more.',
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
                                    <span className="fw-500 breadcrumb-title">Tests</span>
                                </li>
                            </ul>
                            <div>
                                <h1 className="fw-500 sitemap-title">Tests Index</h1>
                            </div>
                            <div className="d-flex align-items-center mrb-10 mrt-20 test-index-div">
                                {alphabets}
                            </div>
                            <div className="row sitemap-row">
                                {
                                    this.props.alphabeticalTests && this.props.alphabeticalTests.tests && this.props.alphabeticalTests.tests.length && (String.fromCharCode(97 + this.state.selectedChar) == this.props.selectedAlphabet) ?
                                        this.props.alphabeticalTests.tests.map((test, index) => {
                                            return <div key={index} className="col-12 col-md-6 col-lg-4">
                                                <div className="anchor-data-style">
                                                    {
                                                        test.url ?
                                                            <div>
                                                                <a href={`/${test.url}`} onClick={(e) => {
                                                                    e.preventDefault()
                                                                    this.props.history.push(`/${test.url}`)
                                                                }}>{test.name}</a>
                                                                <span className="sitemap-right-arrow">
                                                                    <img src="/assets/img/customer-icons/arrow-forward-right.svg" />
                                                                </span>
                                                            </div>
                                                            :
                                                            <span style={{ cursor: 'auto' }} >{test.name}</span>
                                                    }
                                                </div>
                                            </div>
                                        }) : ''
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default TestsListView