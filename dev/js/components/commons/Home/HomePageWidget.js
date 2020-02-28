import React from 'react';

class HomePageWidget extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    navigateTo = (where, e) =>{
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        if (this.props.type) {
            this.props.selectSearchType(this.props.type)
        }
        this.props.historyObj.push(where)
    }

    render() {

        return (
            <React.Fragment>
                <div className="card cstm-card mb-3">
                    <a className="anchor-link" id={`${this.props.type}`}></a>
                    <div className="card-header" style={{ justifyContent: 'normal' }}>
                        {
                            this.props.type === 'opd' ?
                                <h1>{this.props.heading}</h1>
                                : this.props.searchType && this.props.searchType === 'packages' ?
                                    <a style={{ cursor: 'pointer' }} title="Full Body Checkup Packages" href="/full-body-checkup-health-packages"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.navigateTo(this.props.linkTo)
                                        }}
                                    >
                                        <h2 className="home-widget-heading">{this.props.heading}</h2>
                                    </a>
                                    : <h2>{this.props.heading}</h2>
                        }
                        <span className="ofr-ribbon home-ofr-ribbon">Upto {this.props.discount} Off</span>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2 d-flex">
                            {
                                this.props.list.slice(0,9).map((listItem, i) => {
                                    return <div className="col-4 home-card-col search-icon-col md-list-hide" key={i} onClick={()=>this.props.searchFunc(listItem)}>
                                        <div className="grid-img-cnt">
                                            {
                                                listItem.url ?
                                                    <a href={`/${listItem.url}`} onClick={(e) => e.preventDefault()}>
                                                        <img className="img-fluid" src={listItem.svg_icon?listItem.svg_icon:listItem.icon}/>
                                                        <span>{listItem.name}</span>
                                                    </a>
                                                    :
                                                    <a href="javascript:void(0);">
                                                        <img className="img-fluid" src={listItem.svg_icon?listItem.svg_icon:listItem.icon}/>
                                                        <span>{listItem.name}</span>
                                                    </a>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            {
                                this.props.searchType ?
                                    <div className="col-4 home-card-col search-icon-col" key={`search${this.props.searchType}`}>
                                        <div className="grid-img-cnt">
                                            <a href="javascript:void(0);" onClick={()=>this.navigateTo(this.props.navTo)}>
                                                <img className="img-fluid" src={ASSETS_BASE_URL + "/images/vall.png"} />
                                                <span>Search more <br/> {this.props.searchType}</span>
                                            </a>
                                        </div>
                                    </div> : ''
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePageWidget