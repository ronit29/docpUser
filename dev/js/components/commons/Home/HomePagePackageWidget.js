import React from 'react';

class HomePagePackageWidget extends React.Component {
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

        if (this.props.type) {
            this.props.selectSearchType(this.props.type)
        }
        this.props.history.push(where)
    }

    render() {
        return (
            <div className="pakg-slider-container">
                <div className="pkgSliderHeading">
                    <h5>Book Health Packages</h5>
                    <span onClick={this.navigateTo.bind(this, this.props.navTo)}>View All</span>
                </div>
                <div className="pkgSliderContainer">
                    {
                        this.props.list.map((listItem, i) => {
                            return <div className="pkgcustCards" key={i} onClick={this.props.searchFunc.bind(this, listItem)}>
                                {/*<span style={{fontSize:'10px'}} className="ofr-ribbon home-ofr-ribbon">{this.props.discount} Off</span>*/}
                                <div className="pkgcardImgCont">
                                    <img className="img-fluid" src={listItem.icon} />
                                </div>
                                <p className="pkgtstName">{listItem.name}</p>
                                <p className="newpkgInclude">{listItem.no_of_tests} tests included </p>
                                <p className="nwpkgofrpera" style={{ color: 'green' }}>{parseInt(((listItem.mrp - listItem.agreed_price) / listItem.mrp) * 100)}% Off</p>
                                <button className="pkgOutBtn">
                                    {/* <p className="pkg-main-btn-prc">₹ {listItem.agreed_price}</p>
                                    <p className="pkg-main-btn-prc-cut">₹ {listItem.mrp}</p> */}
                                    <p className="pkg-main-btn-prc">₹ 9900</p>
                                    <p className="pkg-main-btn-prc-cut">₹ 8899</p>
                                </button>
                            </div>
                        })
                    }
                </div>
                <div className="pkglftRhtbtncont">
                        <div className="pkg-btnlft"><img src={ASSETS_BASE_URL +"/img/customer-icons/dropdown-arrow.svg"} /></div>
                        <div className="pkg-btnrgt"><img src={ASSETS_BASE_URL +"/img/customer-icons/dropdown-arrow.svg"} /></div>
                    </div>
            </div>
        )
    }
}

export default HomePagePackageWidget