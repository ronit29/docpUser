import React from 'react'
import {connect} from 'react-redux'

import { } from '../../actions/index.js'
// import VipClubView from '../../components/vipClub/vipClubView.js'
// import Loader from '../../components/commons/Loader'
import ProfileHeader from '../../components/commons/DesktopProfileHeader'
import STORAGE from '../../helpers/storage'
const queryString = require('query-string');

class VipClubStaticView extends React.Component{

    constructor(props) {
        super(props)
        this.state={
        }
    }

    componentDidMount() {
        
        if (STORAGE.checkAuth()) {
            // this.props.getUserProfile()
        }
        if (window) {
            window.scrollTo(0, 0)
        }
    }
    render(){
        return(
                <div>
                <ProfileHeader />
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return{

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}



export default connect(mapStateToProps , mapDispatchToProps)(VipClubStaticView)