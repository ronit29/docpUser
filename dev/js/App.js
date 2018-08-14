import React from 'react';
import { connect } from 'react-redux';
import Routes from './routes.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CONFIG from './config'
const Raven = require('raven-js')
import ReactGA from 'react-ga';
ReactGA.initialize('UA-123886528-1');


const logPageView = () => {
    if (DOCPRIME_PRODUCTION) {
        ReactGA.set({ page: window.location.pathname })
        ReactGA.pageview(window.location.pathname)
    }
    return null;
};

require('../css/carousel.css')
require('../css/normalize.css')
require('../css/layout.css')
require('../css/custom.css')
require('../css/customer.css')
require('../css/responsive.css')
// require('../css/online-consultation.css')
require('../css/payment_screen.css')
require('../css/profile.css')
require('../css/transaction.css')
require('../css/error.css')
require('../css/more.css')
require('../css/static.css')

require('../css/slider.css')
require('../css/snackbar.css')
require('../css/cropper.css')
require('./helpers/lightbox/style.css')

import NotificationsBoot from './containers/commons/NotificationsBoot'

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
        // boot Raven(Sentry logger)
        if (CONFIG.RAVEN_DSN_KEY) {
            Raven.config(CONFIG.RAVEN_DSN_KEY).install()
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
            <div>
                <NotificationsBoot />
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <div>
                            <Route path="/" component={logPageView} />
                            <Routes />
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        );
    }
}


export default App
