import React from 'react';
import SnackBar from 'node-snackbar'

class CancelPopUp extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            showCommentReasons: false,
            selectedCancelReasonId: '',
            cancelText: '',
            cancelStatus: ''
        }
    }

    submitClicked(e){
        if( (this.state.selectedCancelReasonId == 4 && !this.state.cancelText) || (!this.state.selectedCancelReasonId) ){
            e.stopPropagation()
            setTimeout(() => {
                    SnackBar.show({ pos: 'bottom-center', text: "Please select the reason for cancellation to help you serve better" })
                }, 200)
            return
        }else{
            let cancelData = {
                cancelText: this.state.selectedCancelReasonId==4?this.state.cancelText:'',
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

        return(
            <div>
                {
                    this.state.showCommentReasons?
                    <div className="cancelPopupContainerOverlay" onClick={(e)=>this.props.toggle(e)}>
                        <div className="cancelPopupContainer">
                            <div className="cancel-Heading">
                                <h4>Cancel Appointment</h4>
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
                                this.state.selectedCancelReasonId == 4?
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