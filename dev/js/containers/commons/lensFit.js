import React from 'react';
import { connect } from 'react-redux';

import { } from '../../actions/index.js'

import LensFitView from '../../components/commons/lensFit/lensfit.js'

class Lensfit extends React.Component {
    constructor(props) {
        super(props)
    }

    

    componentDidMount() {

    }

    

    render() {

        return (
            <LensFitView {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Lensfit);
