import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes.js'
import TopBar from './containers/topBar.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {

    }

    render() {

        return (
            <div>
                <TopBar />
                <Routes />
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
