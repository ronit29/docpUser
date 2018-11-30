import React from 'react';

class BannerCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    render() {

        var src = ["/img/banners/banner_carousel.png", "/img/banners/banner_carousel.png", "/img/banners/banner_carousel.png"];

        return (
            <div className="banner-carousel-div mrt-20">
                <img src={ASSETS_BASE_URL + src[this.state.index]} />
                <div className="carousel-indicators mrt-10">
                    {
                        src.map((src, i) => {
                            return <span key={i} onClick={() => this.setState({ index: i })} className={this.state.index == i ? "indicator-selected" : ''}></span>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BannerCarousel