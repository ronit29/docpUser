import React from 'react'

class HospitalTreatmentView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      treatment: []
    }
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

  goToIpdSearch(id){
      let selectedCriteria = {}
      selectedCriteria.type = 'ipd'
      selectedCriteria.id = id
      selectedCriteria.name = ''
      this.props.toggleIPDCriteria(selectedCriteria, true)
      this.props.history.push(`/ipdInfo?ipd_id=${id}`)
  }

	render(){
    let { hospital_data } = this.props
		return(
			<div className="hs-card">
       <div className="card-head">Treatments</div>   
       <div className="card-body clearfix">
         <ul className="hs-accordian"> 
            {
              hospital_data.ipd_procedure_categories.map((treatment, i)=> {
              return <li key={i}>
                   <div className="accordian-head" onClick={this.toggleTreatment.bind(this, treatment.id)}>{`${treatment.name} (${treatment.ipd_procedures.length})`}
                      {
                        this.state.treatment.indexOf(treatment.id)>-1?
                        <img className="" src={ASSETS_BASE_URL+"/images/up-arrow.png"} />
                        :<img className="" src={ASSETS_BASE_URL+"/images/down-arrow.png"} /> 
                      }
                   </div>
                   {
                      this.state.treatment.indexOf(treatment.id)>-1?
                      <p className="accordian-dtl">
                        {
                          treatment.ipd_procedures.map((ipd, k)=> {
                            return <a key={k} href="javascript:void(0);" onClick={this.goToIpdSearch.bind(this, ipd.id)} className="treat-anch">{ipd.name}</a>
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