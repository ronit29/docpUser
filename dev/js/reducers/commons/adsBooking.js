import { GET_INSURANCE} from '../../constants/types';

const defaultState = {
insurnaceData: {},
}
const DUMMY_PROFILE = {
    gender: "m",
    id: 999999,
    is_default_user: true,
    name: "User",
    dob: new Date(),
    isDummyUser: true
}

export default function (state = defaultState, action) {

    switch (action.type) {
        // case GET_INSURANCE: {
        //     let newState = { ...state }
        //     if(action.payload.length > 0){
        //         newState.insurnaceData = action.payload
        //         newState.LOAD_INSURANCE = true
        //     }else{
        //         newState.insurnaceData = action.payload
        //     }
        //     return newState
        // }
        
    }
    return state
}