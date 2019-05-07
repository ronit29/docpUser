import React from 'react'

class BreadcrumbView extends React.Component {

	render(){

		return(
			<section>
                {
                	this.props.breadcrumb && this.props.breadcrumb.length ?
                    <section className="">
                        <ul className="mrb-10 breadcrumb-list breadcrumb-list-ul" style={{ 'wordBreak': 'breakWord', marginTop:'0px', marginBottom:'10px' }}>
                            {
                                this.props.breadcrumb.map((data, key) => {
                                    return <li className="breadcrumb-list-item" key={key}>
                                        {
                                            key == this.props.breadcrumb.length - 1 ?
                                                <span>{data.title}</span>
                                                : <a href={data.url} title={data.link_title || data.title} onClick={(e) => {
                                                    e.preventDefault();
                                                    this.props.history.push((key == 0 || key == this.props.breadcrumb.length - 1) ? data.url : `/${data.url}`)
                                                }}>
                                                    {
                                                        key == 0 || key == this.props.breadcrumb.length - 1
                                                            ? <span className="fw-500 breadcrumb-title breadcrumb-colored-title">{data.title}</span>
                                                            : <span className="fw-500 breadcrumb-title breadcrumb-colored-title d-inline-blck">{data.title}</span>
                                                    }
                                                </a>
                                        }
                                        {
                                            key != this.props.breadcrumb.length - 1 ?
                                                <span className="breadcrumb-arrow">&gt;</span>
                                                : ''
                                        }
                                    </li>
                                })
                            }
                        </ul>
                    </section>
                    : ''
                }
            </section>
			)
	}
}

export default BreadcrumbView