import React from 'react';
import { connect } from 'react-redux';
import GTM from '../../../../helpers/gtm.js'

class LabTests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {checkedTests: []}
    }

    openTests() {
        let data = {
        'Category':'ConsumerApp','Action':'UserSelectingAddRemoveLabTests','CustomerID':GTM.getUserId()||'','leadid':0,'event':'user-selecting-add-remove-lab-tests'}
        GTM.sendEvent({ data: data })
    
       //this.props.getLabById(this.props.data.lab.id, this.state.checkedTests)
        this.props.history.push(`/lab/${this.props.data.lab.id}/tests`)
    }

    toggleTest(test_to_toggle) {

        let tests = this.state.checkedTests
        if(tests.indexOf(test_to_toggle.test.id) >-1){
            tests.splice(tests.indexOf(test_to_toggle.test.id),1)
        }else{
            tests.push(test_to_toggle.test.id)
        }
        //this.props.checkedTestData(tests)
        this.setState({checkedTests:tests})

        let test = Object.assign({}, test_to_toggle.test)
        test.mrp = test_to_toggle.mrp
        test.deal_price = test_to_toggle.deal_price
        test.extra_test = true
        test.lab_id = this.props.data.lab.id

        this.props.toggleDiagnosisCriteria('test', test)
        this.props.getLabById(this.props.data.lab.id, tests)
    }

    componentDidMount(){
        if(this.props.data.tests && this.props.data.tests.length){
            let tests = []
            this.props.data.tests.map((test, i) => {
                tests.push(test.test_id)
            }); 
            this.setState({checkedTests:tests})
        }
    }

    componentWillReceiveProps(props){
        if(props.data.tests && props.data.tests.length && props.lab_test_data[this.props.selectedLab].length){
            let tests = []
            props.data.tests.map((test, i) => {
                tests.push(test.test_id)
            }); 
            this.setState({checkedTests:tests})
        }
    }

    render() {
        let tests = []
        let selectedTestIds = []
        let defaultTests = []
        let testCount = 1
        if (this.props.data.tests && this.props.data.tests.length) {
    
            tests = this.props.data.tests.map((test, i) => {
                testCount++
                //selectedTestIds.push(test.test_id)
                return <li className="clearfix" key={i}>
                <label className="ck-bx">
                    <input type="checkbox" checked={true/*this.state.checkedTests.indexOf(test.test_id)>-1?true:false*/} onChange={this.toggleTest.bind(this, test)} />
                    <span className="checkmark" />
                </label>

                <span className="test-price"><span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span>&#8377; {test.deal_price}</span><span className="test-name-item lb-tst-cstm-pdng">{test.test.name}</span></li>
            })
        }
        if(this.props.data.tests && this.props.data.tests.length < 4){

            if(this.props.defaultTest && this.props.defaultTest.length){

                defaultTests =  this.props.defaultTest.map((test, i) => {
                    
                    if(testCount >4) {
                        return ''
                    }
                    
                        
                        if(this.state.checkedTests.indexOf(test.id) > -1){
                            return ''
                        }
                        testCount++
                        return <li className="clearfix" key={i}>
                            <label className="ck-bx">
                                <input type="checkbox" checked={false/*this.state.checkedTests.indexOf(test.id)>-1?true:false*/} onChange={this.toggleTest.bind(this, test)} />
                                <span className="checkmark" />
                            </label>

                            <span className="test-price"><span className="test-mrp">&#8377; {test.mrp.split('.')[0]}</span>&#8377; {test.deal_price}</span><span className="test-name-item lb-tst-cstm-pdng">{test.name}</span></li>
                    
                })                    
            }
        }

        return (
            <div className="widget-content pb-details pb-test">
                <h4 className="wc-title text-md fw-700">Tests</h4>
                <ul className="list pb-list pb-test-list">
                    {tests}
                    {defaultTests}
                </ul>
                <div className="pb-view text-right">
                    <a href="javascript:;" className="link-text text-md fw-700" onClick={this.openTests.bind(this)}>View Tests</a>
                </div>
            </div>
        );
    }
}


export default LabTests
