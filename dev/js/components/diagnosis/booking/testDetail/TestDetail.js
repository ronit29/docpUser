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
                        <div className="widget filter-popup scroll-y ht-500 info-popup" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}>
                            <div className="widget-header text-center">
                                <h4 className="widget-title text-md fw-700">Test Information</h4>
                                <span className="close"><img src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} className="img-fluid" /></span>
                            </div>

                            {
                                this.props.lab_test.map((test, i) => {
                                    return <div className="widget-content" key={i}>
                                        <h3 className="text-lg fw-700 mrb-10">{test.test.name}</h3>

                                        <h4 className="fw-700 text-md mrb-10">Description</h4>
                                        <p className="text-sm">{test.test.why}</p>

                                    </div>
                                })
                            }

                        </div>
                    </div> : ""
                }

            </div>
        );
    }
}


export default TestDetail
