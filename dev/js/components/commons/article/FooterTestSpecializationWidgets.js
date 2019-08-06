import React from 'react'
import GTM from '../../../helpers/gtm'

class FooterWidgetView extends React.Component {

	selectDoctorSpecialization(data) {
		let criteria = {}
		criteria.id = data[1] || ''
		criteria.name = data[0] || ''
		criteria.type = 'speciality'
		this.props.cloneCommonSelectedCriterias(criteria)

		let doctor_name = '', hospital_name = '', hospital_id = ''
		let state = {
			filterCriteria: {
				...this.props.OPD_STATE.filterCriteria,
				doctor_name, hospital_name, hospital_id
			},
			nextFilterCriteria: {
				...this.props.OPD_STATE.filterCriteria,
				doctor_name, hospital_name, hospital_id
			}
		}

		let gtmData = {
			'Category': 'ConsumerApp', 'Action': 'CommonSpecializationsSelected', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'common-specializations-selected', 'selected': criteria.name || '', 'selectedId': criteria.id || '', 'searched': '', 'searchString': '', 'from': 'footerWidget'
		}
		GTM.sendEvent({ data: gtmData })


		this.props.mergeOPDState(state, true)

		this.props.history.push({
			pathname: '/opd/searchresults',
			state: { search_back: true }
		})
	}

	selectTest(data) {
		let criteria = {}
		criteria.id = data[1] || ''
		criteria.name = data[0] || ''
		criteria.type = 'test'
		criteria.url = ''
		criteria.test_type = ''
		this.props.toggleDiagnosisCriteria('test', criteria, true)
		setTimeout(() => {
			this.showLabs()
		}, 100)
	}

	showLabs() {
		let lab_name = ''
		this.props.mergeLABState({
			filterCriteria: {
				...this.props.LAB_STATE.filterCriteria,
				lab_name
			},
			nextFilterCriteria: {
				...this.props.LAB_STATE.filterCriteria,
				lab_name
			},
			currentSearchedCriterias: this.props.LAB_STATE.selectedCriterias,
			nextSelectedCriterias: this.props.LAB_STATE.selectedCriterias
		}, true)

		let selectedTestIds = this.props.LAB_STATE.selectedCriterias.map(test => test.id)
		let selectedTestsName = this.props.LAB_STATE.selectedCriterias.map(test => test.name)
		let data = {
			'Category': 'ConsumerApp', 'Action': 'ShowLabClicked', 'CustomerID': GTM.getUserId() || '', 'leadid': 0, 'event': 'show-lab-clicked', 'SelectedTestIds': selectedTestIds.join(',') || '', 'SelectedTestName': selectedTestsName.join(','), 'TestCount': selectedTestIds.length || 0, 'from': 'footerWidget'
		}
		GTM.sendEvent({ data: data })

		this.props.history.push({
			pathname: '/lab/searchresults',
			state: { search_back: true }
		})
	}

	openSearchMore() {
		let which = 'opd'
		if (this.props.footerWidget && this.props.footerWidget.widget_type == 'LabTest') {
			which = 'lab'
		}
		this.props.selectSearchType(which)
		this.props.history.push('/search')
	}

	render() {

		let { footerWidget } = this.props
		return (
			<React.Fragment>
				{
					footerWidget && footerWidget.widget_type ?
						<div className="doc-wdgt-med-container">
							{
								footerWidget.widget_type == 'LabTest' ?
									<div className="doc-wdgt-book-doc">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
										<h3 className="doc-wdgt-hdng">{`${footerWidget.title} @`}<span>{footerWidget.discount}</span></h3>
										<div className="doc-wdgt-chips">
											{
												Object.entries(footerWidget.test).map((data, key) => {
													return <span key={key} onClick={this.selectTest.bind(this, data)}>{data[0]}</span>
												})
											}
											<span className="src-spn-chps" onClick={this.openSearchMore.bind(this)}><img className="srh-img-chps" src={ASSETS_BASE_URL + '/img/shape-srch.svg'} />Search more</span>
										</div>
									</div>
									: ''
							}

							{
								footerWidget.widget_type == 'DoctorAppointment' ?
									<div className="doc-wdgt-book-doc">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />
										<h3 className="doc-wdgt-hdng">{`${footerWidget.title} @`}<span>{footerWidget.discount}</span></h3>
										<div className="doc-wdgt-chips">
											{
												Object.entries(footerWidget.specializations).map((data, key) => {
													return <span key={key} onClick={this.selectDoctorSpecialization.bind(this, data)}>{data[0]}</span>
												})
											}
											<span className="src-spn-chps" onClick={this.openSearchMore.bind(this)}><img className="srh-img-chps" src={ASSETS_BASE_URL + '/img/shape-srch.svg'} />Search more</span>
										</div>
									</div>
									: ''
							}

							{/* third banner */}
							{
								footerWidget.widget_type == 'HealthPackage' ?
									<div className="doc-wdgt-bodychk-cont">
										<img className="docClosBtn" src="https://cdn.docprime.com/cp/assets/img/icons/close.png" />

										<div className="row">
											<div className="col-7">
												<h3 className="wdgt-bodychk-heding">{footerWidget.title_first}</h3>
												<p className="bodychk-prc">@ <span className="bdy-pr">₹499</span> <span className="bdy-only">only</span> </p>
												<p className="bdychk-dtls">{footerWidget.title_last}</p>
											</div>
											<div className="col-5">
												<img className="bdychk-img img-fluid" src={ASSETS_BASE_URL + '/img/doc-wd.png'} />
											</div>
										</div>
									</div>
									: ''
							}
						</div>
						: ''
				}
			</React.Fragment>
		)
	}
}

export default FooterWidgetView;