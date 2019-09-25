import React from 'react';
import { connect } from 'react-redux';

class ExpansionPanel extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			open: true
		}
	}

	toggleOpen() {
		this.setState({ open: !this.state.open })
	}

	render() {

		let { heading, contentList, image } = this.props

		let listId = heading.toLowerCase();

		return (
			<li className="expansion-panel-list-item" id={listId}>
				<div>
					<div className="title" onClick={this.toggleOpen.bind(this)} style={{ marginBottom: 0 }} >
						<img src={image} style={{ verticalAlign: '-2px', marginRight: 8, display: 'inline-block', width: '22px' }} />
						<h3 className="fw-500 text-md mrb-0" style={{ display: 'inline-block' }}>{heading}</h3>
						{
							this.state.open ? <img className="titlearrow-up" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} /> : <img className="titlearrow" src={ASSETS_BASE_URL + "/img/customer-icons/dropdown-arrow.svg"} />
						}
					</div>
					{
						this.state.open ? <div className="more-content">
							{
								this.props.qulification ? contentList.map((cont, i) => {
									return <div className="form-group expansion-label-div" key={i} style={{ marginTop: 10 }} >
										<div>
											<p className="fw-700 text-md text-light" style={{ display: 'inline-block', verticalAlign: 'middle' }}>{cont.qualification}
												{
													cont.specialization ?
														<span className="fw-700 text-md text-light" style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : ''
												}
												{cont.specialization}
												{
													cont.college ?
														<span className="fw-700 text-md text-light" style={{ verticalAlign: 'middle' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</span> : ''
												}
												{
													cont.passing_year ?
														<span>{`${cont.college} - ${cont.passing_year}`}</span> : ''
												}
											</p>
										</div>
									</div>
								}) : contentList.map((cont, i) => {
									return <div className="expansion-label-div" key={i}>
										{
											cont.heading ? <label className="fw-700 text-sm text-primary">{cont.heading}
												{/* <span>
                                            {i < contentList.length - 1 ? "|" : ""}
                                        </span> */}
											</label> : ""
										}

										<p className="fw-700 text-md text-light" style={{ lineHeight: '20px' }} >{cont.content}
											{/* <span>
                                                {i < contentList.length - 1 ? "|" : ""}
                                            </span> */}
										</p>
									</div>
								})
							}
						</div> : ""
					}
				</div>
			</li>
		);
	}
}


export default ExpansionPanel
