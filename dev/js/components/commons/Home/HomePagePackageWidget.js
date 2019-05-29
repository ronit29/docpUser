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



    scroll(type) {
        var elmnt = document.getElementById("pkgSlider")
        let outerDivWidth = document.getElementsByClassName("pkgSliderContainer")[0].offsetWidth
        let childDivWidth = document.getElementsByClassName('pkgCardsList')[0].offsetWidth
        let cardCount = document.getElementsByClassName('pkgCardsList')[0].childElementCount
        let cardWidth = Math.ceil(childDivWidth / cardCount)

        let leftScroll = document.getElementById("pkgSlider").scrollLeft
        let scrollVal = Math.floor(outerDivWidth / cardWidth) * cardWidth
        let cardEnd = cardCount * cardWidth

        if (type == 'right') {
            elmnt.scroll({ left: leftScroll + scrollVal, behavior: 'smooth' })
            if (cardEnd <= leftScroll + scrollVal + outerDivWidth) {
                document.getElementById('leftArrow').classList.add("d-none")
            }
            document.getElementById('RightArrow').classList.remove("d-none")
        } else {
            elmnt.scroll({ left: leftScroll - scrollVal, behavior: 'smooth' })
            if (leftScroll - scrollVal <= 0) {
                document.getElementById('RightArrow').classList.add("d-none")
            }
            document.getElementById('leftArrow').classList.remove("d-none")
        }
    }

    render() {
        return (
            <div className="pakg-slider-container">
                <div className="pkgSliderHeading">
                    <h5>Book Health Packages</h5>
                    <span onClick={this.navigateTo.bind(this, this.props.navTo)}>View All</span>
                </div>
                <div className="pkgSliderContainer" id="pkgSlider">
                    <div className='pkgCardsList d-inline-block'>
                        {
                            this.props.list.map((listItem, i) => {
                                return <div className="pkgcustCards" key={i} onClick={this.props.searchFunc.bind(this, listItem)}>
                                    {/*<span style={{fontSize:'10px'}} className="ofr-ribbon home-ofr-ribbon">{this.props.discount} Off</span>*/}
                                    <div className="pkgcardImgCont">
                                        <img className="img-fluid" src={listItem.icon} />
                                    </div>
                                    {/* <p className="pkgtstName">{listItem.name} </p>
                                <p className="newpkgInclude">{listItem.no_of_tests} tests included </p> */}
                                    <p className="pkgtstName">{listItem.name} {listItem.no_of_tests > 0 ?
                                        `(${listItem.no_of_tests} tests)` : ''}</p>
                                    {listItem.mrp && listItem.discounted_price ?
                                        <div className="pkg-card-price-offr">
                                            <div className="pkg-prc-ct">
                                                <p>₹ {listItem.discounted_price} <span className="pkg-ofr-cut-prc">₹ {listItem.mrp}</span></p>
                                            </div>
                                            <span className="pkg-hlth-offer">{parseInt(((listItem.mrp - listItem.discounted_price) / listItem.mrp) * 100)}% OFF</span>
                                        </div>
                                        : ''}
                                </div>
                            })
                        }
                    </div>
                </div>
                <div className="pkglftRhtbtncont">
                    <div className="pkg-btnlft d-none" id="RightArrow" onClick={this.scroll.bind(this, 'left')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                    <div className="pkg-btnrgt" id="leftArrow" onClick={this.scroll.bind(this, 'right')}><img src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /></div>
                </div>
                <div className="pakg-slider-container mt-20">
                    <div className="pkgSliderHeading">
                        <h5>Top Hospitals</h5>
                        <span>View All</span>
                    </div>
                    <div className="pkgSliderContainer">
                        <div className='pkgCardsList d-inline-block sub-wd-cards'>
                            <div className="pkgcustCards">
                                <div className="pkgcardImgCont">
                                    <img className="img-fluid" src="https://qacdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare.png" />
                                </div>
                                <p className="pkgtstName">
                                    CK Birla Hospital for Women
                            </p>
                            </div>

                            <div className="pkgcustCards">
                                <div className="pkgcardImgCont">
                                    <img className="img-fluid" src="https://qacdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare.png" />
                                </div>
                                <p className="pkgtstName">
                                    Nanavati Hopitsal
                            </p>
                            </div>
                            <div className="pkgcustCards">
                                <div className="pkgcardImgCont">
                                    <img className="img-fluid" src="https://qacdn.docprime.com/media/diagnostic/common_package_icons/Thyrocare.png" />
                                </div>
                                <p className="pkgtstName">
                                    Nanavati Hopitsal
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePagePackageWidget