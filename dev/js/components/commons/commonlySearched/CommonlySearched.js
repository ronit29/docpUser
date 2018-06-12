import React from 'react';

import Chip from 'material-ui/Chip';


class CommonlySearched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
                        <img src="/assets/img/customer-icons/lab1.png" className="img-fluid" />
                    </span>
                    <p className="lab-name">SLR Dignostics</p>
                </li>
            } else if (this.props.selectedPills) {
                return <li key={i}>
                    <a
                        className={"v-btn v-btn-primary tag-sm outline selectedpill"}
                        
                    >
                        {row.name}
                        <span className="cross rounded" 
                            onClick={() => {
                            return this.props.toggle((this.props.type || row.type), row)
                        }}></span> 
                    </a>
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
                        onClick={() => {
                            return this.props.toggle((this.props.type || row.type), row)
                        }}
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

        return (

            <div className="widget-panel">
                <h4 className="panel-title">{this.props.heading}</h4>
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