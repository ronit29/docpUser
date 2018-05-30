import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

require('../css/normalize.css')
require('../css/layout.css')
require('../css/custom.css')
require('../css/customer.css')
require('../css/responsive.css')
require('../css/more.css')
import 'rc-slider/assets/index.css';
import 'node-snackbar/dist/snackbar.min.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        // remove SSR css for material-ui
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#00b7b0'
                },
                secondary: {
                    main: '#00b7b0'
                },
            },
            status: {
                danger: 'orange',
            },
        })

        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}


export default App
