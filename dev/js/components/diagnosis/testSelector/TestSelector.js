import React from 'react';
import Loader from '../../commons/Loader'

class TestSelectorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLab: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.props.getLabById(this.state.selectedLab)
    }

    toggleTest(test) {
        this.props.toggleDiagnosisCriteria('test', test)
    }

    render() {
        
        let labData = this.props.LABS[this.state.selectedLab]
        let tests = []
        let selectedTests = []

        if (this.props.selectedCriterias && this.props.selectedCriterias.length) {
            selectedTests = this.props.selectedCriterias.filter(x => x.type == 'test').map(x => x.id)
        }
        
        if (labData && labData.tests && labData.tests.length) {
            tests = labData.tests.map((test, i) => {
                return <li key={i}>
                    <label className="ck-bx">
                        {test.test.name}
                        <input type="checkbox" checked={selectedTests.indexOf(test.test.id) > -1} onChange={this.toggleTest.bind(this, test.test)} />
                        <span className="checkmark" />
                    </label>
                    <span className="test-price text-md fw-500">{test.mrp}</span>
                </li>
            })
        }

        return (
            <div>

                {
                    labData ?

                        <div>
                            <header className="skin-white fixed horizontal top location-detect-header">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="select-location-row text-center">
                                                <span onClick={() => {
                                                    this.props.history.go(-1)
                                                }} className="ct-img ct-img-md close"><img src="/assets/img/customer-icons/close-black.svg" className="img-fluid" /></span>
                                                <h4 className="fw-700 text-md">All Test</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="search-row">
                                                <div className="adon-group location-detect-field">
                                                    <input type="text" className="form-control input-md search-input no-shadow" placeholder="Search Test" />
                                                    <span className="ct-img ct-img-sm map-marker-blue"><img src="/assets/img/customer-icons/search-icon.svg" className="img-fluid" /></span>
                                                </div>
                                                <div className="detect-my-locaiton">
                                                    <span className="ct-img ct-img-xs" />
                                                    {selectedTests.length} Selected Item
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            <section className="wrap all-test-screen ">
                                <div className="widget-panel">
                                    <div className="panel-content pd-0">
                                        <ul className="list all-test-list">
                                            {tests}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <button className="v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg" onClick={() => {
                                this.props.history.go(-1)
                            }}>Done</button>
                        </div> : <Loader />
                }

            </div>
        );
    }
}

export default TestSelectorView