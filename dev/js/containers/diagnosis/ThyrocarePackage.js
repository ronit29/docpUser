import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import ThyrocarePackageView from '../../components/diagnosis/ThyrocarePackage/ThyrocarePackageView.js';

class ThyrocarePackage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <ThyrocarePackageView {...this.props} />
        );
    }
}

const mapStateToProps = (state, passedProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ThyrocarePackage);
