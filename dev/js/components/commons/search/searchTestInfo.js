import React from 'react'
import ProfileHeader from '../DesktopProfileHeader'
import ChatPanel from '../ChatPanel'

class SearchTestView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        if(this.props.selectedCriterias.length >0){
            let test_id=[]
            {Object.entries(this.props.selectedCriterias).map(function([key, value]) {
                test_id.push(value.id)
            })}
            this.props.searchTestData(test_id)
        }
    }   
    render(){ 
    console.log(this.props.searchTestInfoData)
        if(this.props.searchTestInfoData.length >0){
            return(
                <div>
                <div className="fade-enter-done">
                <div className="profile-body-wrap">     
                <section className="container parent-section book-appointment-section">
                <ProfileHeader /> 
                <section>
                   <h1>Test Information</h1>
                {Object.entries(this.props.searchTestInfoData).map(function([key, value]) {
                    return <div id={value.id}>
                            <h1>{value.preparations}</h1>
                            <p>{value.about_test}</p>
                            <p dangerouslySetInnerHTML={{ __html: value.why_get_tested }}></p>
                            {Object.entries(value.test_may_include).map(function([k,test_include]) {
                                return <p>{test_include}</p>
                            })}
                            <p>{value.preparations}</p>
                            <p>{value.faqs}</p>
                        </div>
                })}       
                </section>
                <ChatPanel />      
                </section>          
                </div>
                </div>
                
                </div>
                )
        }else{
            return(<div>
                
            </div>)
        }       
    }
}
export default SearchTestView