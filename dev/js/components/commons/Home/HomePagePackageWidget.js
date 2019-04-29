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
                    <span>View All</span>
                </div>
                <div className="pkgSliderContainer">
                    <div className="pkgcustCards">
                        <span style={{fontSize:'10px'}} className="ofr-ribbon home-ofr-ribbon">50% Off</span>
                        <img className="img-fluid" src="https://cdn.docprime.com/media/diagnostic/common_package_icons/thyro.png" />
                        <p className="pkgtstName">Aarogyam 1.7 Special</p>
                        <p className="newpkgInclude">88 tests included </p>
                        <button className="pkgOutBtn">
                            <p className="pkg-main-btn-prc">₹ 1299</p>
                            <p className="pkg-main-btn-prc-cut">₹ 1499</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePagePackageWidget