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

        } else if(this.props.type == 'procedures_category'){
            let data = {
                'Category': 'ConsumerApp', 'Action': 'CommonProcedureCategoriesSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-procedure-category-selected', 'selected': row.name || '', 'selectedId': row.id || ''
            }
            GTM.sendEvent({ data: data })

        }
        this.props.toggle((this.props.type || row.type), row)
    }

    render() {

        let rows = this.props.data.map((row, i) => {
            if (this.props.type == 'lab') {
                return <li key={i}>
                    <span
                        className="ct-img lab-img"
                        onClick={() => {

                        }}
                    >
                        <img src={ASSETS_BASE_URL + "/img/customer-icons/lab1.png"} className="img-fluid" />
                    </span>
                    <p className="lab-name">SLR Dignostics</p>
                </li>
            } else if (this.props.selectedPills) {
                return <li key={i} className="selected-content-list-item">
                    <p className="fw-500">{row.name}</p>
                    <img src={ASSETS_BASE_URL + "/img/icons/close-circle.png"} onClick={() => {
                        return this.props.toggle((this.props.type || row.type), row)
                    }} />
                </li>
            } else {
                let selected = false
                this.props.selected.map((curr) => {
                    if (curr.id == row.id) {
                        selected = true
                    }
                })
                return <li key={i}>
                    <a
                        className={selected ? "v-btn v-btn-primary tag-sm outline selected" : "v-btn v-btn-primary tag-sm outline"}
                        onClick={this.toggle.bind(this, row)}
                    >
                        {row.name}
                    </a>
                </li>
            }
        })

        let divClass = `panel-content`
        let ulClass = `inline-list`

        if (this.props.type == 'lab') {
            divClass = `panel-content total-labs`
            ulClass = `inline-list lab-items`
        }

        if (this.props.selectedPills) {
            divClass = ""
            ulClass = "selected-content-list"
        }

        return (

            <div className="widget-panel">
                <h4 className="panel-title mrb-0">{this.props.heading}</h4>
                <div className={divClass}>
                    <ul className={ulClass}>
                        {rows}
                    </ul>
                </div>
            </div>
        );
    }
}


export default CommonlySearched
