import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <div className="horizontal-widget">
                <div className="view-all-div">
                    {/* <a href="javascript:;"><p className="view-all-text">View All</p></a> */}
                </div>
                <div className="scroll-arrow-div-rt">
                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                </div>
                <div className="scroll-arrow-div-lt">
                    <img src="/assets/img/customer-icons/right-arrow.svg" className="scroll-arrow" />
                </div>
                <div className="hr-widget-head-div">
                    <p className="hr-widget-head">{this.props.title}</p>
                </div>
                <div className="select-item-div">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default Article
