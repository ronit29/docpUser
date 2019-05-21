import React from 'react';
import SnackBar from 'node-snackbar'

class CancelPopUp extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            showCommentReasons: this.props.showCommentReasons,
            selectedCancelReasonId: '',
            cancelText: '',
            cancelStatus: ''
        }
    }

    submitClicked(e){

        let otherReason = this.props.comments.filter(x=>x.id == this.state.selectedCancelReasonId)
        
        if(!this.state.selectedCancelReasonId){
            e.stopPropagation()
            setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Please select valid reason" })
                }, 200)
            return

        }else if( otherReason.length && otherReason[0].is_comment_needed && !this.state.cancelText){
            e.stopPropagation()
            setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Please enter comment" })
                }, 200)
            return
        }else{

            if(otherReason.length && otherReason[0].is_comment_needed){
                otherReason = this.state.cancelText
            }else{
                otherReason = ''
            }

            let cancelData = {
                cancelText: otherReason,
                cancelId: this.state.selectedCancelReasonId,
                cancelStatus: this.state.cancelStatus
            }
            this.props.cancelAppointment(cancelData)
        }
       
    }

    handleInputHandler(e){
        e.stopPropagation()
        this.setState({cancelText: e.target.value})
    }

    render(){
        let otherType = this.props.comments.filter(x=>x.id == this.state.selectedCancelReasonId)
        if(otherType.length && otherType[0].is_comment_needed){
            otherType = true
        }else{
            otherType = false
        }


        return(
            <div>
                {
                    this.state.showCommentReasons?
                    <div className="cancelPopupContainerOverlay" onClick={(e)=>this.props.toggle(e)}>
                        <div className="cancelPopupContainer">
                            <div className="cancel-Heading">
                                <h4>Reason for Cancellation</h4>
                                <button className="cn-btn-head"><img style={{ width: 10 }} src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} className="img-fluid" onClick={(e)=>this.props.toggle(e)}/></button>
                            </div>
                            <div className="cancel-wid-radio">
                                {
                                    this.props.comments.map((reasons, key)=> {
                                        return <div key={reasons.id} className="dtl-radio" onClick={(e)=>{e.stopPropagation()
                                            this.setState({selectedCancelReasonId: reasons.id}) }}>
                                                <label className="container-radio">
                                                    <h3 className="fw-500" style={{ display: 'inline', fontSize: 'inherit' }} >{reasons.name}</h3>
                                                    <input type="radio" name="radio" checked={this.state.selectedCancelReasonId == reasons.id}/>
                                                    <span className="doc-checkmark"></span>
                                                </label>
                                            </div>
                                    })
                                } 
                            </div>
                            {
                                otherType?
                                <div className="cancelationReson">
                                    <textarea placeholder="Write reason for cancellation" onChange ={this.handleInputHandler.bind(this)} onClick={(e)=>{e.stopPropagation()}} value={this.state.cancelText}></textarea>
                                </div>
                                :''
                            }
                            <div className="cancelationBtn">
                                <button onClick= {this.submitClicked.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </div>
                    :<div className="cancelPopupContainerOverlay" onClick={(e)=>this.props.toggle(e)}>
                        <div className="cancelPopupContainer">
                            <div className="cancel-Heading">
                                <h4>Cancel Appointment</h4>
                                <button className="cn-btn-head"><img style={{width: 10}} src={ASSETS_BASE_URL + "/img/customer-icons/close-black.svg"} className="img-fluid" onClick={(e)=>this.props.toggle(e)}/></button>
                            </div>
                            <div className="cnct-select-cont">
                                <ul>
                                    <li>
                                        <button onClick={(e) => {e.stopPropagation() 
                                            this.setState({showCommentReasons: true, cancelStatus: 0}) }}>Cancel and Rebook</button>
                                    </li>
                                    <li>
                                        <button onClick={(e) => {e.stopPropagation()
                                            this.setState({showCommentReasons: true, cancelStatus: 1}) }} >Cancel and Refund</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }

            </div>
            )
    }
}
export default CancelPopUp