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
            let selected = !!this.props.selected[row.id]
            return <span
                className={selected ? "testRow selected" : "testRow"}
                key={row.id}
                onClick={() => {
                    return this.props.toggleRow(row.id)
                }}
            >
                <p className="head">{row.name}</p>
                <p className="sub">{row.name}</p>
            </span>

        })

        return (
            <div className="commonlySearched">
                <span className="heading">{this.props.heading}</span>
                <div className="rows">
                    {rows}
                </div>
            </div>
        );
    }
}


export default CommonlySearched
