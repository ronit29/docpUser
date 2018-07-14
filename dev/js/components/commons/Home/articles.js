import React from "react";
import { Motion, spring, presets } from "react-motion";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollLeft: 0
        };
    }

    slideLeft() {
        this.slide("left");
    }

    slideRight() {
        this.slide("right");
    }

    slide(direction) {
        let containerWidth = this.refs.container.offsetWidth;
        let currentScroll = this.refs.container.scrollLeft;
        let scrollLeft =
            direction == "left"
                ? currentScroll + containerWidth
                : currentScroll - containerWidth;

        let scrollWidth = this.refs.container.getElementsByClassName(
            "select-item-list"
        )[0].scrollWidth;

        scrollLeft = Math.max(0, scrollLeft);
        scrollLeft = Math.min(scrollLeft, scrollWidth - containerWidth);

        this.setState({ scrollLeft: scrollLeft });
    }

    getAnimation() {
        let scrollLeft = this.state.scrollLeft;
        let animation = (
            <Motion ref="motion" style={{ scrollLeft: spring(scrollLeft) }}>
                {({ scrollLeft }) => (
                    <Scroller
                        element={this.refs.container}
                        scrollLeft={scrollLeft}
                    />
                )}
            </Motion>
        );
        return animation;
    }

    render() {
        return (
            <div className="horizontal-widget">
                <div className="view-all-div">
                    <a href="javascript:;">
                        {/* <p className="view-all-text">View All</p> */}
                    </a>
                </div>
                <div
                    className="scroll-arrow-div-rt"
                    onClick={() => {
                        this.slideLeft();
                    }}
                >
                    <img
                        src="/assets/img/customer-icons/right-arrow.svg"
                        className="scroll-arrow"
                    />
                </div>
                <div
                    className="scroll-arrow-div-lt"
                    onClick={() => {
                        this.slideRight();
                    }}
                >
                    <img
                        src="/assets/img/customer-icons/right-arrow.svg"
                        className="scroll-arrow"
                    />
                </div>
                <div className="hr-widget-head-div">
                    <p className="hr-widget-head">{this.props.title}</p>
                </div>
                <div ref="container" className="select-item-div">
                    {this.props.children}
                </div>
                {this.getAnimation()}
            </div>
        );
    }
}

class Scroller extends React.Component {
    render() {
        if (this.props.element)
            this.props.element.scrollLeft = this.props.scrollLeft;
        return null;
    }
}

export default Article
