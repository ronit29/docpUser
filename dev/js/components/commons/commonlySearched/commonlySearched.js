import React from 'react';

class CommonlySearched extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        let pills = this.props.data.map((pill) => {
            let selected = !!this.props.selected[pill.id]
            return <span
                        className={selected ? "pill selected" : "pill"}
                        key={pill.id}
                        onClick={() => {
                            return this.props.togglePill(pill.id)
                        }}
                    >
                        {pill.name}
                    </span>

        })

        return (
            <div className="commonlySearched">
                <span className="heading">{this.props.heading}</span>
                <div className="pills">
                    {pills}
                </div>
            </div>
        );
    }
}


export default CommonlySearched
