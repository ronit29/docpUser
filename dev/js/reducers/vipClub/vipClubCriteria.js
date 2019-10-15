import { GET_VIP_LIST, SELECT_VIP_CLUB_PLAN, USER_SELF_DETAILS, SAVE_CURRENT_VIP_MEMBERS, SELECT_VIP_USER_PROFILE, RESET_VIP_CLUB, VIP_CLUB_DASHBOARD_DATA , SAVE_VIP_MEMBER_PROOFS, DELETE_VIP_MEMBER_PROOF, SHOW_VIP_MEMBERS_FORM
} from '../../constants/types';

const defaultState = {
members_proofs:[],
LOAD_VIP_CLUB:false,
vipClubList:[],
selected_vip_plan:{},
vipClubMemberDetails:{},
currentSelectedVipMembersId:[],
LOAD_VIP_CLUB_DASHBOARD:false,
vip_club_db_data:{},
showVipDetailsView:false,
savedMemberData:[]
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

        case GET_VIP_LIST :{
            let newState = { ...state }
            if(action.payload.certificate){
                newState.vipClubList = action.payload
                newState.LOAD_VIP_CLUB = false
            }else if(Object.keys(action.payload).length > 0 && action.payload.plus_data && action.payload.plus_data.length){
                newState.vipClubList = action.payload.plus_data[0]
                if(action.is_vip_gold){
                    if(action.payload.plus_data[0].gold_plans && action.payload.plus_data[0].gold_plans.length >0){
                        if(Object.keys(newState.selected_vip_plan).length == 0){
                            newState.selected_vip_plan = action.payload.plus_data[0].gold_plans.filter((x => x.is_selected))[0]
                            if(Object.keys(newState.selected_vip_plan).length){
                                newState.selected_vip_plan.isForceUpdate = true
                                newState.selected_vip_plan = newState.selected_vip_plan
                            }
                        }else{
                            if(newState.selected_vip_plan && Object.keys(newState.selected_vip_plan).length > 0 && !newState.selected_vip_plan.isForceUpdate){
                                newState.selected_vip_plan = newState.selected_vip_plan
                            }
                        }
                        newState.LOAD_VIP_CLUB = true
                    }
                }else{
                    if(action.payload.plus_data[0].plans && action.payload.plus_data[0].plans.length >0){
                        if(Object.keys(newState.selected_vip_plan).length == 0){
                            newState.selected_vip_plan = action.payload.plus_data[0].plans.filter((x => x.is_selected))[0]
                            if(Object.keys(newState.selected_vip_plan).length){
                                newState.selected_vip_plan.isForceUpdate = true
                                newState.selected_vip_plan = newState.selected_vip_plan
                            }
                        }else{
                            if(newState.selected_vip_plan && Object.keys(newState.selected_vip_plan).length > 0 && !newState.selected_vip_plan.isForceUpdate){
                                newState.selected_vip_plan = newState.selected_vip_plan
                            }
                        }
                        newState.LOAD_VIP_CLUB = true
                    }
                }
            }
            return newState
        }

        case SELECT_VIP_CLUB_PLAN:{
            let newState = { ...state,
                selected_vip_plan: { ...state.selected_vip_plan }
            }
            newState.selected_vip_plan = action.payload.selected_vip_plan
            return newState
        }

        case USER_SELF_DETAILS:{
            let newState = { ...state,
                vipClubMemberDetails: { ...state.vipClubMemberDetails }
            }
            return action.vipClubMemberDetails.reduce((selfData, selfProfile) => {
                if (newState.vipClubMemberDetails[selfProfile.id]) {
                    newState.vipClubMemberDetails[selfProfile.id] = Object.assign({}, selfData[selfProfile.id], selfProfile)
                } else {
                    newState.vipClubMemberDetails[selfProfile.id] = { ...selfProfile }
                }
                return newState
            }, newState)
        }

        case SELECT_VIP_USER_PROFILE :{
            let newState = { ...state,
                vipClubMemberDetails: { ...state.vipClubMemberDetails },
                currentSelectedVipMembersId: [].concat(state.currentSelectedVipMembersId)
            }         
            newState.vipClubMemberDetails[action.payload.newProfileid] = {} 
            newState.vipClubMemberDetails[action.payload.newProfileid] = action.payload.newProfile
            newState.currentSelectedVipMembersId.map((val,key) => {
                if(parseInt(key) == parseInt(action.payload.param_id)){
                    newState.currentSelectedVipMembersId[key][action.payload.param_id] = action.payload.newProfileid
                    
                }    
            })
            
            return newState 
        }

        case SAVE_CURRENT_VIP_MEMBERS: {
            let newState ={
                ...state,
                currentSelectedVipMembersId:[]
            }
            newState.currentSelectedVipMembersId = newState.currentSelectedVipMembersId.concat(action.payload)
            return newState
        }

        case RESET_VIP_CLUB:{

            let newState = {
                ...state
            }
            newState.currentSelectedVipMembersId=[]
            newState.selected_vip_plan={}
            newState.vipClubMemberDetails={}
            newState.members_proofs = []
            newState.vipClubList=[]
            newState.LOAD_VIP_CLUB_DASHBOARD=false
            newState.showVipDetailsView=false
            newState.savedMemberData=[]
            return newState   
        }

        case VIP_CLUB_DASHBOARD_DATA:{

            let newState = {
                ...state
            }
            newState.vip_club_db_data = action.payload
            newState.LOAD_VIP_CLUB_DASHBOARD = true

            return newState
        }
        case SAVE_VIP_MEMBER_PROOFS:{
            let newState = {
                ...state,
                members_proofs: [].concat(state.members_proofs)
            }
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

        case DELETE_VIP_MEMBER_PROOF:{
           let newState = {
                ...state
            } 
            
            let currentSelectedMember = null
            newState.members_proofs = newState.members_proofs.filter((member) => {

                if(member.id == action.payload.member_id) {
                    currentSelectedMember = member
                    return false
                }
                return true
            })

            if(currentSelectedMember){
                let currentProofs = currentSelectedMember.img_path_ids.filter(x=>x.id !== action.payload.id) 
                currentSelectedMember.img_path_ids = currentProofs
            }

            newState.members_proofs.push({...currentSelectedMember})
            return newState
        }

        case SHOW_VIP_MEMBERS_FORM:{
            let newState = {
                ...state
            } 
            if(action.payload.data && Object.keys(action.payload.data).length > 0 && action.payload.data.members && action.payload.data.members.length > 0){
                    newState.currentSelectedVipMembersId=[]
                    
                    // newState.vipClubMemberDetails={}
                    newState.members_proofs = []
                    if(action.payload.data && action.payload.data.is_agent && Object.keys(newState.selected_vip_plan).length == 0){
                        newState.selected_vip_plan={}
                        newState.selected_vip_plan=action.payload.data.plan
                    }
                    newState.savedMemberData = action.payload.data.members
            }
            newState.showVipDetailsView=true
            return newState 
        }
    }
    return state
}