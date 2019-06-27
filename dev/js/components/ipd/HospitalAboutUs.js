import React from 'react'

let doctorData = false
class HospitalAboutUsView extends React.Component {
     constructor(props){
          super(props)
          this.state = {
               readMore: doctorData
          }
     }

     componentDidMount() {
        this.setState({readMore: true})
        // this.renderAbout(this.props)
    }

	render(){
		let { hospital_data } = this.props
          let aboutText = ''
          if(hospital_data.new_about && hospital_data.new_about.length>150) {
               if (this.state.readMore) {
                    aboutText = hospital_data.new_about.slice(0, 150) + "..."
               }else {
                    aboutText = hospital_data.new_about
               }
          }else {
               aboutText = hospital_data.new_about
          }

		return(
			<div className="hs-card">
               <div className="card-head"><h2 className="dsply-ipd-hdng">About {hospital_data.name}</h2></div> 

               {
                    !this.state.readMore?
                    <div className="card-body clearfix custom-li-style" style={{}} dangerouslySetInnerHTML={{ __html: aboutText }}>
                    </div>
                    :<div className="card-body clearfix custom-li-style" style={{}} dangerouslySetInnerHTML={{ __html: aboutText }}>
                    </div>
               }
               <a className="fw-700 text-primary" style={{ cursor: 'pointer' }} onClick={() => {
                        this.setState({ readMore: !this.state.readMore })
                    }}>{this.state.readMore?'Show More':'Show Less'}<span style={{ fontSize: 11, display: 'inline-block', verticalAlign: 'middle' }}>&#9650;</span></a>

             </div>
			)
	}
}

export default HospitalAboutUsView