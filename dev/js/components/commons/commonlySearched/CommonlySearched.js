import React from 'react'
import GTM from '../../../helpers/gtm.js'

class CommonlySearched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTestType: {}
        }
    }

    toggle(row) {
        if (document.getElementById('search_results_view') && document.getElementById('search_bar')) {
            document.getElementById('search_results_view').scrollIntoView()
        }
        if (this.props.type == 'condition') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonConditionSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-condition-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'speciality') {

            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'test' || this.props.type == 'package') {

            if (this.props.type == 'package') {
                let data = {
                    'Category': 'ConsumerApp', 'Action': 'PackageSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'package-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
                }
                GTM.sendEvent({ data: data })
            }

            else {
                /*let data = {
                'Category': 'ConsumerApp', 'Action': 'TestSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
            }
            GTM.sendEvent({ data: data })*/
            }

            row = Object.assign({}, row)
            row.type = 'test'
            this.props.toggle((this.props.type || row.type), row)
            return

        }

        // else if (this.props.type == 'package') {

        //     let data = {
        //         'Category': 'ConsumerApp', 'Action': 'PackageSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'package-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
        //     }
        //     GTM.sendEvent({ data: data })

        //     row = Object.assign({}, row)
        //     row.type = 'package'
        //     this.props.toggle((this.props.type || row.type), row)
        //     return
        // }

        else if (this.props.type == 'procedures_category') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonProcedureCategoriesSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedure-category-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        } else if (this.props.type == 'procedures') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonProceduresSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedures-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
            }
            GTM.sendEvent({ data: data })

        }else if (this.props.type == 'ipd') {
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonIPDSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-ipd-selected', 'selected': row.name || '', 'selectedId': row.id || '', 'searched': '', 'searchString': ''
            }
            GTM.sendEvent({ data: data })            
        }
        this.props.toggle((this.props.type || row.type), row)
    }
    testInfo(test_id, url, e) {
        let lat = 28.644800
        let long = 77.216721
        if (this.props.dataState && this.props.dataState.selectedLocation) {
            lat = this.props.dataState.selectedLocation.geometry.location.lat
            long = this.props.dataState.selectedLocation.geometry.location.lng

            if (typeof lat === 'function') lat = lat()
            if (typeof long === 'function') long = long()
        }
        let selected_test_ids = []
        this.props.data.map((row, i) => {
            selected_test_ids.push(row.id)
        })
        e.stopPropagation()
        if (url && url != '') {
            this.props.history.push('/' + url + '?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long + '&from=search')
        } else {
            this.props.history.push('/search/testinfo?test_ids=' + test_id + '&selected_test_ids=' + selected_test_ids + '&lat=' + lat + '&long=' + long + '&from=search')
        }

        let data = {
            'Category': 'ConsumerApp', 'Action': 'testInfoClick', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'test-info-click', 'pageSource': 'common-search-result-page'
        }
        GTM.sendEvent({ data: data })
    }

    render() {

        let test_info = ''
        let rows = this.props.data.map((row, i) => {
            if (this.props.selectedPills) {
                {/*if (this.props.selectedSearchType == 'lab') {
                    if (Object.keys(row).length > 0 && row.show_details) {
                        test_info = <span className="srch-heading" style={{ float: 'right', cursor: 'pointer', color: '#e58950' }} onClick={this.testInfo.bind(this)}></span>
                    }
                }*/}
                return <li key={i}>
                    <p>{row.name}
                        {row.show_details ?
                            <span style={{ marginLeft: '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, row.id, row.url)}>
                                <img src={ASSETS_BASE_URL + '/img/icons/Info.svg'} />
                            </span>
                            : ''
                        }
                    </p>
                    <img style={{ width: '15px' }} onClick={() => this.props.toggle((this.props.type || row.type), row)} src={ASSETS_BASE_URL + "/img/sl-close.svg"} />
                </li>
            } else {
                let selected = false
                this.props.selected.map((curr) => {
                    if (curr.id == row.id) {
                        selected = true
                    }
                })
                return <li key={i} onClick={this.toggle.bind(this, row)}>
                    <p className={selected ? "click-active" : ""}>{row.name} {row.show_details ?
                            <span style={{ marginLeft: '5px', marginTop: '1px', display: 'inline-block' }} onClick={this.testInfo.bind(this, row.id, row.url)}>
                                <img src={ASSETS_BASE_URL + '/img/icons/Info.svg'} />
                            </span>
                            : ''
                        } </p>
                    {
                        selected ? "" : <img style={{ width: '15px' }} src={ASSETS_BASE_URL + "/img/shape-srch.svg"} />
                    }
                </li>
            }
        })
        return (
            <div className="widget mb-10">
                <div className="common-search-container">
                    <p className="srch-heading">{this.props.heading} 
                        {this.props.isPackage?
                        <span style={{float:'right',color:`var(--text--primary--color)`,cursor:'pointer'}} onClick={()=> this.props.history.push('/searchpackages')}>View all</span>
                        :''
                        }
                    </p>

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
