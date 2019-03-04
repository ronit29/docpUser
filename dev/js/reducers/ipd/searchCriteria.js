import { TOGGLE_IPD } from '../../constants/types';

const DEFAULT_FILTER_STATE = {

}

const defaultState = {
	selectedIpd: [],
	selectedCriterias: []

}

export default function ( state=defaultState, action) {

	switch(action.type) {

		case TOGGLE_IPD: {
			let newState = {
				...state,
				selectedCriterias: [].concat(state.selectedCriterias)
			}
			if(action.forceAdd) {
				newState.selectedCriterias.push({...action.payload})
			}else{
				let found = false 
				newState.selectedCriterias = newState.selectedCriterias.filter((ipd)=>{
					if(ipd.id == action.payload.id){
						found = true
						return false
					}
					return true
				})

				if(!found){
					newState.selectedCriterias.push(action.payload)
				}
				
			}

			return newState
		}	
	}
	return state
}