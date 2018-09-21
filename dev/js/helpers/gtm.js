import CONFIG from '../config'
import STORAGE from './storage/storage'
import { setGTMSession } from '../actions/commons/auth.js'




function getVisitorId(){
    let uid_string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    let visitor_id = createUUID(uid_string);
    return visitor_id;
      
}

function createUUID(uid_string){
    var dt = new Date().getTime();
    var uuid = uid_string.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function getVisitId(){
    let uid_string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxyyyxxxxxx'
    let visit_id = createUUID(uid_string);
    return visit_id;
}
    
const GTM = {
    sendEvent: ({ data }) => {
        try {
            /**
             * dataLayer is expected to be a global variable set by gtm - not to be used on server-side
             */

            if (dataLayer) {
                data.UAID=CONFIG.UAID
                data.Tracker=CONFIG.Tracker
                if(data.addToGA==undefined){
                    dataLayer.push(data)    
                }
                                
            }
            let visitor_info = STORAGE.getVisitorInfo()
            if(visitor_info){
                data.visitor_info = visitor_info
                setGTMSession(data);    
            }else{
                let visitor_id = getVisitorId();
                let visit_id = getVisitId();
                let visitor_info = {
                    visit_id:visit_id,
                    visitor_id:visitor_id
                }
                visitor_info = JSON.stringify(visitor_info)
                STORAGE.setVisitorId(visitor_info)
                data.visitor_info = STORAGE.getVisitorInfo() || ''
                setGTMSession(data)
            }
            
        } catch (e) {
            //
        }
    },

    getUserId:() => {
        let user_id = STORAGE.getUserId() || ''
        return user_id

    }
}

export default GTM