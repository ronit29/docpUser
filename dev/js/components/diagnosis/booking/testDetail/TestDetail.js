import React from 'react';

class TestDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                {
                    this.props.show ? <div className="overlay black" onClick={(e) => {
                        this.props.toggle()
                    }}>
                        <div className="widget  scroll-y ht-500" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>
                            <div className="widget-header text-center">
                                <h4 className="widget-title text-md fw-700">Test Information</h4>
                                <span className="close"><img src="/assets/img/customer-icons/close-black.svg" className="/assets/img-fluid" /></span>
                            </div>
                            <div className="widget-content">
                                <h3 className="text-lg fw-700 mrb-10">T3 T4 TSV <img src="/assets/img/customer-icons/polygon.svg" className="/assets/img-fluid" /></h3>
                                <h4 className="fw-700 text-md mrb-10">About</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                            <div className="widget-content">
                                <h4 className="fw-700 text-md mrb-10">Prepration</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                            </div>
                            <div className="widget-content">
                                <h4 className="fw-700 text-md mrb-10">Procedure</h4>
                                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                            </div>
                            <div className="widget-content">
                                <h3 className="text-lg fw-700 mrb-10 bdr-1 bottom light">CBC Test <img src="/assets/img/customer-icons/polygon-up.svg" className="/assets/img-fluid" /></h3>
                            </div>
                        </div>
                    </div> : ""
                }

            </div>
        );
    }
}


export default TestDetail
