import React from 'react';

class HomePageWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    navigateTo(where, e) {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.props.history.push(where)
    }

    render() {
        return (
            <div className="card cstm-card mb-3">
                <div className="card-header" style={{ justifyContent: 'normal' }}>
                    <h2>{this.props.heading}</h2>
                    <span className="ofr-ribbon home-ofr-ribbon">Upto {this.props.discount} Off</span>
                </div>
                <div className="card-body">
                    <div className="row mb-2">

                        {
                            this.props.list.map((listItem, i) => {
                                return <div className="col-4" key={i} onClick={this.props.searchFunc.bind(this, listItem)}>
                                    <div className="grid-img-cnt brdr-btm">
                                        <a href="javascript:void(0);">
                                            <img className="img-fluid" src={listItem.icon} />
                                            <span>{listItem.name}</span>
                                        </a>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageWidget