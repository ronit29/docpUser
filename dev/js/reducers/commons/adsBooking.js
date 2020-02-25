import { ADS_BOOKING} from '../../constants/types';

const defaultState = {
insurnaceData: {},
}
const DUMMY_PROFILE = {
    gender: "m",
    id: 999999,
    is_default_user: true,
    name: "User",
    dob: null,
    isDummyUser: true,
    email:null
}

export default function (state = defaultState, action) {

    switch (action.type) {
        case ADS_BOOKING: {
            let newState = { ...state }
            console.log(action.payload)
        //     if(action.payload.length > 0){
        //         newState.insurnaceData = action.payload
        //         newState.LOAD_INSURANCE = true
        //     }else{
        //         newState.insurnaceData = action.payload
        //     }
        //     return newState
        }
        
    }
    return state
}