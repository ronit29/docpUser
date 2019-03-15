import React from 'react';
import { connect } from 'react-redux';


class CategoryPopup extends React.Component {
    constructor(props) {
        super(props)
    }
    
    
    render() {

        return (<div>
            <div className="cancel-overlay cancel-overlay-zindex" onClick={this.props.closeInfo.bind(this)}></div>
            <div className="widget cancel-appointment-div cancel-popup">    
                <div className="pop-top-heading mb-0 pb-10">
                        {this.props.infoData.name}
                        <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.props.closeInfo.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>                    
                </div>
                <div className="terms-condition-div pop-onscreen-scroll pt-0">
                 <div className="">
                    <div className="ins-form-radio insradio-on-popup">
                        <ul className="careListing mrt-10">
                            {this.props.infoData && this.props.infoData.included_tests.length > 0?
                                this.props.infoData.included_tests.map(function (tests,i) {
                                    return(<li key={i}>{tests.name} {tests.parameter_count>1?
                                            `(includes ${tests.parameter_count} tests)`
                                            :''}</li>)
                                })
                            :''}
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        );
    }
}


export default CategoryPopup