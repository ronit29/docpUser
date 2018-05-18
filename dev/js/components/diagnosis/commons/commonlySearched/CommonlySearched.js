import React from 'react';

import Chip from 'material-ui/Chip';


class CommonlySearched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let rows = this.props.data.map((row) => {
            if (this.props.type == 'lab') {
                return <li key={row.id}>
                    <span
                        className="ct-img lab-img"
                        onClick={() => {

                        }}
                    >
                        <img src="/assets/img/customer-icons/lab1.png" className="img-fluid" />
                    </span>
                    <p className="lab-name">SLR Dignostics</p>
                </li>
            } else {
                let selected = false
                this.props.selected.map((curr) => {
                    if(curr.id == row.id){
                        selected = true
                    }
                })
                return <li key={row.id}>
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
