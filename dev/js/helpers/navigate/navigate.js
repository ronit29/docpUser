const NAVIGATE = {
    navigateTo : (where) => {
        window.location.href = where
    },

    refreshAppointmentState : (props) => {
        let noAppointmentFound = props.upcoming.length == 0 && props.previous.length == 0
        
        if(props.history.action === 'PUSH' || noAppointmentFound){
            return true
        }
        
        return false
    }
}

export default NAVIGATE