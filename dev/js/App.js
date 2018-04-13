import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes.js'
import TopBar from './containers/TopBar.js'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillMount() {

    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main : '#00b7b0'
                },
                secondary: {
                    main : '#00b7b0'
                },
            },
            status: {
                danger: 'orange',
            },
        })

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <TopBar />
                    <Routes />
                </MuiThemeProvider>
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
