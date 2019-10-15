<div className="profile-body-wrap" style={{ background: "" }}>
                    {/* <ProfileHeader /> */}
                    <HelmetTags tagsData={{
                        canonicalUrl: `${CONFIG.API_BASE_URL}${this.props.location.pathname}`,
                        title: `${'Docprime Vip' || ''}`,
                        // description: `${this.props.data.description || ''}`
                    }} noIndex={false} />
                    <div className={`vipHeaderBar ${this.state.toggleTabType ? 'hed-curv-rmove' : ''}`} ref="vipHeaderBar">
                        {
                            this.props.isSalesAgent && this.props.isAgent ? '' :
                                this.props.source == 'doctorlisting' || this.props.source == 'bookingpage'
                                    ? <div className="vipBackIco" onClick={() => this.props.history.go(-1)}>
                                        <img src={ASSETS_BASE_URL + "/img/careleft-arrow.svg"} />
                                    </div>
                                    : <div className="vipBackIco" onClick={() => this.props.history.push('/')}>
                                        <img src={ASSETS_BASE_URL + "/img/vip-home.svg"} />
                                    </div>
                        }
                        <div className={`vip-logo-cont ${this.state.toggleTabType ? 'header-scroll-change' : ''}`} ref="">
                            <img className="vipLogiImg" src={ASSETS_BASE_URL + "/img/docgold.png"} />
                            <p className="scrl-cont-dat">Exclusive discounts on Doctor and </p>
                            <h1 className="scrl-cont-dat">Lab Appointments</h1>
                            {/*<p>{`${this.state.selected_plan_data.tenure} year upto ${this.state.selected_plan_data.total_allowed_members} members`}</p>*/}
                        </div>
                    </div>
                    {
                        this.state.showPopup ?
                            <VipLoginPopup {...this.props} selected_plan={this.state.selected_plan_data} hideLoginPopup={this.hideLoginPopup.bind(this)} isLead={this.state.isLead} closeLeadPopup={this.closeLeadPopup.bind(this)} /> : ''
                    }
</div>