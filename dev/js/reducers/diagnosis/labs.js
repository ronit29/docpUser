import { APPEND_LABS } from '../../constants/types';

const defaultState = {

}

export default function (state = defaultState, action) {

    switch (action.type) {
        case APPEND_LABS: {
            let newState = { ...state }
            if(action.payload.removeTests && action.payload.labTest && action.payload.labTest.tests && action.payload.labTest.lab){

                newState[action.payload.labTest.lab.id] = {...action.payload.labTest}
                newState[action.payload.labTest.lab.id].tests = newState[action.payload.labTest.lab.id].tests.filter((test)=>{
                    if(test.test.id==action.payload.test_id){
                        return false
                    }
                    return true
                })

                return newState 
            }else {
                return action.payload.reduce((lapMap, lab) => {
                    lapMap[lab.lab.id] = lapMap[lab.lab.id] || {}
                    lapMap[lab.lab.id] = { ...lapMap[lab.lab.id], ...lab }
                    return lapMap
                }, newState)
            }
        }

    }
    return state
}