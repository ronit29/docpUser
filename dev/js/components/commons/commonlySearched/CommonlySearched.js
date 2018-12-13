import React from 'react'
import GTM from '../../../helpers/gtm.js'

class CommonlySearched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    toggle(row) {
        if (this.props.type == 'condition') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonConditionSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-condition-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'speciality') {

            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'test') {

            let data = {
                'Category': 'ConsumerApp', 'Action': 'TestSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'procedures_category') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonProcedureCategoriesSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedure-category-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        }
        this.props.toggle((this.props.type || row.type), row)
    }
    testInfo(){
        let test_ids = []
        this.props.data.map((row, i) => {
            test_ids.push(row.id)
        })
        this.props.history.push('/search/testinfo?test_ids='+test_ids+'&from=search')
    }
    render() {
        let test_info
        let rows = this.props.data.map((row, i) => {
            if (this.props.selectedPills) {
                if(this.props.selectedSearchType == 'lab'){
                    if(Object.keys(row).length > 0 && row.show_details){
                      test_info = <span className="srch-heading" style={{float:'right', cursor:'pointer', color:'#e58950'}} onClick={this.testInfo.bind(this)}> Test Info</span>
                    }else{
                        test_info = ''
                    }
                }
                return <li key={i}>
                    <p>{row.name}</p>
                    <img style={{ width: '15px' }} onClick={() => {
                        return this.props.toggle((this.props.type || row.type), row)
                    }} src={ASSETS_BASE_URL + "/img/sl-close.svg"} />
                </li>
            } else {
                let selected = false
                this.props.selected.map((curr) => {
                    if (curr.id == row.id) {
                        selected = true
                    }
                })
                return <li key={i}>
                    <p className={selected ? "click-active" : ""} onClick={this.toggle.bind(this, row)}>{row.name} </p>
                    {
                        selected ? "" : <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} />
                    }
                </li>
            }
        })

        return (
            <div className="widget mb-10">
                <div className="common-search-container">
                    <p className="srch-heading">{this.props.heading} {test_info}</p>
                    
                    <div className="common-listing-cont">
                        <ul>
                            {rows}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


export default CommonlySearched
