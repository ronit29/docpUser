import { GET_INSURANCE, SELECT_INSURANCE_PLAN, APPEND_USER_PROFILES,SELF_DATA,INSURANCE_PAY,SELECT_PROFILE, INSURE_MEMBER_LIST, UPDATE_MEMBER_LIST,INSURED_PROFILE, SAVE_CURRENT_INSURED_MEMBERS, RESET_CURRENT_INSURED_MEMBERS, RESET_INSURED_PLANS, CLEAR_INSURANCE, RESET_INSURED_DATA, ENDORSED_MEMBER_LIST, SAVE_MEMBER_PROOFS} from '../../constants/types';

const defaultState = {
insurnaceData: {},
selected_plan:{},
self_data_values:{},
create_payment_resp:{},
members_data_value:{},
insured_member_list:{},
member_list_updated:{},
get_insured_profile:{},
endorsed_member_data:{},
LOAD_INSURANCE: false,
currentSelectedInsuredMembersId: [],
members_proofs:[]
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
        case GET_INSURANCE: {
            let newState = { ...state }
            if(Object.keys(action.payload).length > 0){
                newState.insurnaceData = action.payload
                if(action.payload.certificate){
                    newState.LOAD_INSURANCE = false
                }else{
                    if(action.payload.insurance[0].plans && action.payload.insurance[0].plans.length >0){
                        if(Object.keys(newState.selected_plan).length == 0){
                            newState.selected_plan = action.payload.insurance[0].plans.filter((x => x.is_selected))
                            if(newState.selected_plan.length){
                                newState.selected_plan = newState.selected_plan[0]
                            }
                            // newState.selected_plan[0].plan_name = action.payload.insurance[0].name
                            // newState.selected_plan[0].logo = action.payload.insurance[0].logo
                            // newState.selected_plan[0].insurer_document = action.payload.insurance[0].insurer_document
                            // newState.selected_plan[0].insurer = action.payload.insurance[0].id
                            // newState.selected_plan[0].stateData = action.payload.state
                        }
                        newState.LOAD_INSURANCE = true
                    }
                }
            }else{
                newState.insurnaceData = action.payload
            }
            return newState
        }
        case SELECT_INSURANCE_PLAN :{
            let newState = { ...state,
                select_plan: { ...state.select_plan }
            }
            newState.selected_plan = action.payload.selected_plan
            return newState
        }
        case APPEND_USER_PROFILES: {
            let newState = {
                ...state,
                profiles: { ...state.profiles }
            }
            if (action.payload && action.payload.length == 0) {
                action.payload.push(DUMMY_PROFILE)
            } else {
                if (newState.profiles[DUMMY_PROFILE.id]) {
                    delete newState.profiles[DUMMY_PROFILE.id]
                    newState.selectedProfile = null
                }
            }

            newState.profiles = action.payload.reduce((profileMap, profile) => {
                if (profile.is_default_user) {
                    if (!newState.selectedProfile) {
                        newState.selectedProfile = profile.id
                        newState.primaryMobile = profile.phone_number
                        newState.userName = profile.name
                    }
                    newState.defaultProfile = profile.id
                }
                profileMap[profile.id] = profile
                return profileMap
            }, newState.profiles)

            if (!newState.selectedProfile && action.payload.length) {
                newState.selectedProfile = action.payload[0].id
            }

            if (!newState.defaultProfile && action.payload.length) {
                newState.defaultProfile = action.payload[0].id
            }

            return newState
        }
        case SELF_DATA :{
            let newState = { ...state,
                self_data_values: { ...state.self_data_values }
            }
            return action.self_data_values.reduce((selfData, selfProfile) => {
                if (newState.self_data_values[selfProfile.id]) {
                    newState.self_data_values[selfProfile.id] = Object.assign({}, selfData[selfProfile.id], selfProfile)
                } else {
                    newState.self_data_values[selfProfile.id] = { ...selfProfile }
                }
                return newState
            }, newState)
        }
        case INSURANCE_PAY :{
            let newState = { ...state,
                create_payment_resp: { ...state.create_payment_resp }
            }
            newState.create_payment_resp = action.payload
            return newState            
        }
        case SELECT_PROFILE :{
            let newState = { ...state,
                self_data_values: { ...state.self_data_values },
                currentSelectedInsuredMembersId: [].concat(state.currentSelectedInsuredMembersId)
            }         
            newState.self_data_values[action.payload.newProfileid] = {} 
            newState.self_data_values[action.payload.newProfileid] = action.payload.newProfile
            newState.currentSelectedInsuredMembersId.map((val,key) => {
                if(parseInt(key) == parseInt(action.payload.param_id)){
                    newState.currentSelectedInsuredMembersId[key][action.payload.param_id] = action.payload.newProfileid
                    
                }    
            })
            
            return newState 
        }
        case INSURE_MEMBER_LIST :{
           let newState = { ...state,
                insured_member_list: { ...state.insured_member_list }
            }
            newState.insured_member_list = action.payload
            return newState
        }
        case UPDATE_MEMBER_LIST :{
            let newState = { ...state,
                member_list_updated: { ...state.member_list_updated }
            }
            newState.member_list_updated = action.payload
            return newState
        }
        case INSURED_PROFILE :{
            let newState = { ...state,
                get_insured_profile: { ...state.get_insured_profile }
            }
            newState.get_insured_profile = action.payload
            return newState
        }
        case SAVE_CURRENT_INSURED_MEMBERS: {
            let newState ={
                ...state
            }
            newState.currentSelectedInsuredMembersId = action.payload
            return newState
        }
        case RESET_CURRENT_INSURED_MEMBERS: {
            let newState = {
                ...state
            }
            let currentSelectedMembers = {}
            let currentSelectedProfiles = []
            newState.currentSelectedInsuredMembersId.map((val,key) => {
                currentSelectedProfiles.push(val[key])
            })
            Object.values(newState.self_data_values).map((member, key) => {
                if(currentSelectedProfiles.indexOf(member.id) != -1){
                    currentSelectedMembers[member.id] = {}
                    currentSelectedMembers[member.id] = member
                }
            })
            newState.self_data_values = currentSelectedMembers
            return newState
        }
        case RESET_INSURED_PLANS :{
            let newState = {
                ...state
            }
            newState.currentSelectedInsuredMembersId = []
            return newState
        }
        case CLEAR_INSURANCE :{
             let newState = {
                ...state
            }
            newState.self_data_values={}
            newState.selected_plan={}
            newState.currentSelectedInsuredMembersId = []
            return newState   
        }
        case RESET_INSURED_DATA :{
             let newState = { ...state }
            let user_selected_plan = newState.insurnaceData.insurance[0].plans.filter((x => x.id == action.payload.selected_plan_id))
            let members = {}
            newState.selected_plan = user_selected_plan[0]
            newState.currentSelectedInsuredMembersId = action.payload.currentSelectedInsuredMembersId
            action.payload.members.map((result, i) => {
                members[result.id] = { ...result }
            })
            newState.self_data_values = members
            return newState   
        }
        case ENDORSED_MEMBER_LIST :{
            let newState = { ...state }
            newState.endorsed_member_data.members = action.payload.members
            return newState
        }
        case SAVE_MEMBER_PROOFS:{
            let newState = {
                ...state,
                members_proofs: [].concat(state.members_proofs)
            }
            let ids
            if(newState.members_proofs.length > 0){

                let found = []
                newState.members_proofs = newState.members_proofs.filter((data)=> {

                    if(data.id == action.payload.id) {
                        found.push(data)
                        return false
                    }
                    return true
                })

                if(found) {
                    let data = Object.assign({}, found[0], action.payload)    
                    newState.members_proofs.push(data)
                }else{
                    newState.members_proofs.push(action.payload)
                }
            }else{
                newState.members_proofs.push(action.payload)
            }            
            return newState
            
        }
    }
    return state
}