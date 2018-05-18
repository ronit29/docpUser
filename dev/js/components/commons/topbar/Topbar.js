import React from 'react';
import { withRouter } from 'react-router-dom'


class TopBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    goBack() {
        this.props.history.go(-1)
    }

    render() {

        let headerTheme = `skin-primary fixed horizontal top`
        let arrowPath = `/assets/img/icons/back.png`
        let { theme, hideBackIcon } = this.props

        if (theme == 'white') {
            headerTheme = `skin-white fixed horizontal top bottom-line`
            arrowPath = `/assets/img/icons/back-arrow.png`
        }

        return (
            
            <header className={headerTheme}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2">
                            {
                                hideBackIcon ? "" : <div className="back-icon">
                                    <a onClick={this.goBack.bind(this)}>
                                        <img src={arrowPath} className="img-fluid" />
                                    </a>
                                </div>
                            }
                        </div>

                        {this.props.children}

                    </div>
                </div>
            </header>
        );
    }
}



export default withRouter(TopBar)
