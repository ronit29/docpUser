import React from 'react'
import GTM from '../../helpers/gtm.js'

class HospitalTreatmentView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      treatment: [],
      fromServer: true
    }
  }

  componentDidMount(){
    this.setState({fromServer: false})
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
      let gtmData = {
          'Category': 'ConsumerApp', 'Action': 'IpdTreatmentCategoryClickedDetailPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-treatment-category-clicked-detail-page', 'selectedId': id || ''
      }
      GTM.sendEvent({ data: gtmData })

      treatment.push(id)
    }
    this.setState({treatment: treatment})
  }

  goToIpdSearch(ipd, e){
      e.preventDefault()
      let gtmData = {
          'Category': 'ConsumerApp', 'Action': 'IpdTreatmentSelectedDetailPage', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'ipd-treatment-selected-detail-page', 'selectedId': ipd.id || ''
      }
      GTM.sendEvent({ data: gtmData })

      let selectedCriteria = {}
      selectedCriteria.type = 'ipd'
      selectedCriteria.id = ipd.id
      selectedCriteria.name = ''
      this.props.toggleIPDCriteria(selectedCriteria, true)
      if(ipd.url){
          this.props.history.push(`/${ipd.url}?showPopup=true`)
      }else {
        this.props.history.push(`/ipdInfo?ipd_id=${ipd.id}`)  
      }
      
  }

	render(){
    let { hospital_data } = this.props
		return(
			<div className="hs-card">
       <div className="card-head"><h2 className="dsply-ipd-hdng">Procedures in {hospital_data.name}</h2></div>   
       <div className="card-body clearfix">
         <ul className="hs-accordian"> 
            {
              hospital_data.ipd_procedure_categories.map((treatment, i)=> {
              return <li key={i}>
                   <h3 className="accordian-head" onClick={this.toggleTreatment.bind(this, treatment.id)}>{`${treatment.name} (${treatment.ipd_procedures.length})`}
                      {
                        this.state.treatment.indexOf(treatment.id)>-1?
                        <img className="" src={ASSETS_BASE_URL+"/images/up-arrow.png"} />
                        :<img className="" src={ASSETS_BASE_URL+"/images/down-arrow.png"} /> 
                      }
                   </h3>
                   {
                      this.state.treatment.indexOf(treatment.id)>-1 || this.state.fromServer?
                      <p className="accordian-dtl">
                        {
                          treatment.ipd_procedures.map((ipd, k)=> {
                            return <h4 key={ipd.id}><a  href={ipd.url?`/${ipd.url}`:`/ipdInfo?ipd_id=${ipd.id}`} onClick={this.goToIpdSearch.bind(this, ipd)} className="treat-anch">{ipd.name}</a></h4>
                          })
                        }
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

export default HospitalTreatmentView