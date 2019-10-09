import React from 'react'
import GTM from '../../helpers/gtm.js'

class IpdQnA extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      treatment: [],
      getAns: true
    }
  }

  componentDidMount(){
    this.setState({getAns: false})
  }

  toggleTreatment(id){
    let treatment = this.state.treatment
    let found = false
    treatment = this.state.treatment.filter((ipd) => {
      if(ipd == id){
        found = true
        return false
      }
      return true
    })
    
    if(!found){
      treatment.push(id)
    }
    this.setState({treatment: treatment})
  }

	render(){

    let { hospital_data } = this.props
		
    return(
			<div className="hs-card">
       <div className="card-head"><h2 className="dsply-ipd-hdng">Frequently Asked Questions in {hospital_data.name}</h2></div>   
       <div className="card-body clearfix">
         <ul className="hs-accordian"> 
            {
              hospital_data.question_answers.map((treatment, i)=> {
              return <li key={i}>
                   <h3 className="accordian-head fw-500" onClick={this.toggleTreatment.bind(this, treatment.id)}>{`${treatment.name}`}
                      {
                        this.state.treatment.indexOf(treatment.id)>-1?
                        <img className="" src={ASSETS_BASE_URL+"/images/up-arrow.png"} />
                        :<img className="" src={ASSETS_BASE_URL+"/images/down-arrow.png"} /> 
                      }
                   </h3>
                   {
                      this.state.treatment.indexOf(treatment.id)>-1 || this.state.getAns?
                      <p className="accordian-dtl"  style={{textAlign:'justify', fontSize:'14px'}} dangerouslySetInnerHTML={{ __html: treatment.answer}}>
        
                     </p>
                     :''   
                   }
                   
                 </li>
              })
            }
         </ul>
       </div>   
     </div>
			)
	}
}

export default IpdQnA