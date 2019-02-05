import React from 'react';
import ProfileHeader from '../../commons/DesktopProfileHeader'
import LocationElements from '../../../containers/commons/locationElements'
import InfoPopup from './healthPackageInfoPopup.js'

class HealthPackageAdvisorView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            testInfoIds: [],
            selectedTestIds: [],
            selectCatIDs: [],
            packageType: '',
            gender: '',
            age: '',
            min_age: '',
            max_age: '',
            searchCities: [],
            showInfo: false,
            showInfoText: ''
        }
    }

    componentDidMount() {
        this.setState({ ...this.props.filterCriteriaPackages }, () => {
            this.setState({ selectedTestIds: this.props.filterCriteriaPackages.test_ids !== '' ? this.props.filterCriteriaPackages.test_ids : [] })
            if (this.state.max_age == 20) {
                this.setState({ age: 1 })
            } else if (this.state.min_age == 20) {
                this.setState({ age: 2 })
            } else if (this.state.max_age == 20) {
                this.setState({ age: 3 })
            }
        })
        if (window) {
            window.scrollTo(0, 0)
        }
    }
    searchLab(test, isPackage = false, event) {
        test.type = 'test'
        this.props.toggleDiagnosisCriteria('test', test, true)
        setTimeout(() => {
            this.props.history.push('/lab/searchresults')
        }, 100)
    }
    toggleInfo(test_id) {
        let test_ids = [].concat(this.state.testInfoIds)
        let self = this
        let found = false
        test_ids = test_ids.filter((x) => {
            if (x == test_id) {
                found = true
                return false
            }
            return true
        })
        if (!found) {
            test_ids.push(test_id)
        }
        self.setState({ testInfoIds: test_ids })
    }
    selectCategory(cat_id, isSubset) {
        let ids = this.state.selectCatIDs.filter(x => parseInt(x.cat_id) == parseInt(cat_id))
        let selected_catIds = [].concat(this.state.selectCatIDs)
        if (ids.length) {
            if (ids[0].isSubset != isSubset) {
                selected_catIds = this.state.selectCatIDs.filter(x => parseInt(x.cat_id) != parseInt(cat_id))
                selected_catIds.push({ cat_id: cat_id, isSubset: !ids[0].isSubset, subSetTest: [] })
            } else {
                if (ids[0].cat_id == cat_id) {
                    selected_catIds = selected_catIds.filter(x => parseInt(x.cat_id) != parseInt(cat_id))
                }
            }
        } else {
            selected_catIds.push({ cat_id: cat_id, isSubset: isSubset, subSetTest: [] })
        }
        this.setState({ selectCatIDs: selected_catIds })
    }
    selectTest(test_id, package_id) {
        let test_ids = [].concat(this.state.selectedTestIds)
        let self = this
        let found = false

        test_ids = test_ids.filter((x) => {
            if (x == test_id) {
                found = true
                return false
            }
            return true
        })

        if (!found) {
            test_ids.push(test_id)
        }

        let package_ids = []
        let selectedIds = []
        let finalIds = []
        if (this.state.selectCatIDs.length > 0) {
            selectedIds = this.state.selectCatIDs.filter(x => parseInt(x.cat_id) == parseInt(package_id))
            package_ids = this.state.selectCatIDs.filter(x => parseInt(x.cat_id) != parseInt(package_id))
            if (selectedIds.length > 0) {
                Object.entries(selectedIds).map(function ([key, value]) {
                    if (value.isSubset) {
                        let found = false
                        value.subSetTest = value.subSetTest.filter((x) => {
                            if (x == test_id) {
                                found = true
                                return false
                            }
                            return true
                        })
                        if (!found) {
                            value.subSetTest.push(test_id)
                        }
                        // value.subSetTest.push(test_id)
                    }
                })
            }
            finalIds = [...package_ids, ...selectedIds]
        }
        self.setState({ selectedTestIds: test_ids, selectCatIDs: finalIds })
    }
    selectAge(event) {
        var event = document.getElementById("selectage")
        if (event.options[event.selectedIndex].value == 1) {
            this.setState({ age: event.options[event.selectedIndex].value, min_age: 0, max_age: 20 })
        } else if (event.options[event.selectedIndex].value == 2) {
            this.setState({ age: event.options[event.selectedIndex].value, min_age: 20, max_age: 50 })
        } else if (event.options[event.selectedIndex].value == 3) {
            this.setState({ age: event.options[event.selectedIndex].value, min_age: 0, max_age: 50 })
        }
    }
    selectPackage(packageName) {
        this.setState({ packageType: packageName })
    }
    selectGender(genderVal) {
        this.setState({ gender: genderVal })
    }
    showPackage() {
        let cat_ids = []
        let test_ids = []
        if (this.state.selectCatIDs.length > 0) {
            Object.entries(this.state.selectCatIDs).map(function ([key, value]) {
                if (!value.isSubset) {
                    cat_ids.push(value.cat_id)
                } else {
                    if (value.subSetTest.length > 0) {
                        Object.entries(value.subSetTest).map(function ([k, val]) {
                            test_ids.push(val)
                        })
                    }

                }
            })
        }
        let newCategoryState = {}
        let filterstate = { ...this.props.filterCriteriaPackages }
        newCategoryState['catIds'] = cat_ids
        newCategoryState['selectCatIDs'] = this.state.selectCatIDs
        newCategoryState['test_ids'] = test_ids
        newCategoryState['distanceRange'] = [0, 15]
        newCategoryState['priceRange'] = [0, 20000]
        newCategoryState['sort_on'] = null
        newCategoryState['max_age'] = this.state.max_age
        newCategoryState['min_age'] = this.state.min_age
        newCategoryState['gender'] = this.state.gender
        newCategoryState['packageType'] = this.state.packageType
        this.props.mergeLABState({ filterCriteriaPackages: newCategoryState })
        setTimeout(() => {
            this.props.history.push('/searchpackages')
        }, 100)
    }
    getCityListLayout(searchResults = []) {
        if (searchResults.length) {
            this.setState({ searchCities: searchResults })
        } else {
            this.setState({ searchCities: [], searchValue: '' })
        }
    }
    selectLocation(city) {
        this.child.selectLocation((city), () => {
            this.setState({ searchCities: [] })
        })
    }
    showInfo(infoId, event) {
        this.setState({ showInfoText: infoId, showInfo: true })
        event.stopPropagation()
    }
    closeInfo() {
        this.setState({ showInfo: false })
    }
    goBack() {
        this.props.history.push('/')
    }
    render() {
        let self = this
        return (
            <div className="profile-body-wrap" style={{ paddingBottom: 54 }} >
                <div className="d-none d-md-block">
                    <ProfileHeader />
                </div>
                <section className="container parent-section book-appointment-section mp0">
                    <div className="row main-row parent-section-row">
                        <div className="col-12 col-md-7 col-lg-7 pt-0">
                            <div className="widget mb-10 mrng-top-20">
                                <div className="d-flex advisorContainer">
                                    <img src={ASSETS_BASE_URL + '/img/icons/back-arrow.png'} onClick={this.goBack.bind(this)} />
                                    <h1 className="fw-500">Health Package Advisor</h1>
                                </div>
                                <div className="search-top-container">
                                    <div className="serch-nw-inputs">
                                        <LocationElements {...this.props} onRef={ref => (this.child = ref)} getCityListLayout={this.getCityListLayout.bind(this)} resultType='search' fromCriteria={true} commonSearchPage={true} />
                                    </div>
                                    {
                                        this.state.searchCities.length == 0 ?
                                            <div>
                                                <div className="hpa-flex mrb-20">
                                                    <div className="hpa-flex hpa-age">
                                                        <label className="fw-500">Age :</label>
                                                        <select id="selectage" value={this.state.age} onChange={this.selectAge.bind(this)}>
                                                            <option id={0} value={0}>Select</option>
                                                            <option id={1} value={1}> 0-20</option>
                                                            <option id={2} value={2}> 21-50</option>
                                                            <option id={3} value={3}> >50</option>
                                                        </select>
                                                    </div>
                                                    <div className="hpa-flex hpa-gender">
                                                        <label className="fw-500">Gender :</label>
                                                        <div className="d-flex">
                                                            <div className="dtl-radio">
                                                                <label className="container-radio mb-0 hpa-container-radio" style={{ marginRight: 16 }} onChange={this.selectGender.bind(this, 1)}>M
                                                                <input type="radio" name="radio" checked={this.state.gender == 1 ? true : false} />
                                                                    <span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
                                                                </label>
                                                            </div>
                                                            <div className="dtl-radio">
                                                                <label className="container-radio mb-0 hpa-container-radio" onChange={this.selectGender.bind(this, 2)}>F
                                                                <input type="radio" name="radio" checked={this.state.gender == 2 ? true : false} />
                                                                    <span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hpa-flex">
                                                    <div className="hpa-flex">
                                                        <label className="fw-500">Package Type :</label>
                                                        <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                                                            {this.props.recommended_package.filters && this.props.recommended_package.filters.length > 0 ?
                                                                Object.entries(this.props.recommended_package.filters).map(function ([key, filter]) {
                                                                    return <div className="dtl-radio d-flex align-items-center dtl-margin-lg" key={key}>
                                                                        <label className="container-radio mb-0 hpa-container-radio" style={{ marginRight: 0 }} onChange={self.selectPackage.bind(self, filter.id)}>{filter.name}
                                                                            <input type="radio" name={`radio2_${filter.id}`} checked={self.state.packageType == filter.id ? true : false} style={{ left: 0 }} />
                                                                            <span className="doc-checkmark hpa-radio hpa-radio-gender"></span>
                                                                        </label>
                                                                        {
                                                                            filter.information != '' ? <img className="hpa-info-icon" src={ASSETS_BASE_URL + "/img/icons/info.svg"} onClick={self.showInfo.bind(self, filter.id)} /> : ''
                                                                        }
                                                                    </div>
                                                                })

                                                                : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                    {
                                        this.state.searchCities.length > 0 ?
                                            <section>
                                                <div className="widget mb-10">
                                                    <div className="common-search-container">
                                                        <p className="srch-heading">Location Search</p>
                                                        <div className="common-listing-cont">
                                                            <ul>
                                                                {
                                                                    this.state.searchCities.map((result, i) => {
                                                                        return <li key={i} onClick={this.selectLocation.bind(this, result)}>
                                                                            <p className="" >{result.description}</p>
                                                                        </li>
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section> : ''
                                    }
                                </div>
                            </div>
                            {Object.keys(this.props.recommended_package).length > 0 && this.state.searchCities.length == 0 ?
                                <div>
                                    <div className="hpa-heading mrt-10 mrb-10">
                                        <p className="fw-500">Select Categories</p>
                                    </div>
                                    {Object.entries(this.props.recommended_package.result).map(function ([key, rPackages]) {
                                        return <div className="widget mb-10 mrt-10" key={key}>
                                            <div className="search-top-container">
                                                <div className="d-flex justify-content-between" style={{ alignItems: 'center' }} >
                                                    <label className="ck-bx" onChange={self.selectCategory.bind(self, rPackages.id, false)}>{rPackages.name}
                                                        {/*<input type="radio" name={`radio_${rPackages.id}`} checked={self.state.selectCatIDs.filter(x => x.cat_id == rPackages.id && !x.isSubset).length ? true : false} />
                                                        <span className="doc-checkmark hpa-radio" style={{ top: 4 }} ></span>*/}
                                                        <input type="checkbox" value="on" checked={self.state.selectCatIDs.filter(x => x.cat_id == rPackages.id && !x.isSubset).length ? true : false} />
                                                        <span className="checkmark hpa-checkmark"></span>
                                                    </label>
                                                    <label className="ck-bx" style={{ fontSize: 12 }} onChange={self.selectCategory.bind(self, rPackages.id, true)}>Select Test
                                                        {/*<input type="radio" name={`radio_${rPackages.id}`} checked={self.state.selectCatIDs.filter(x => x.cat_id == rPackages.id && x.isSubset).length ? true : false} />
                                                        <span className="doc-checkmark hpa-radio" style={{ top: 0 }}></span>*/}
                                                        <input type="checkbox" value="on" checked={self.state.selectCatIDs.filter(x => x.cat_id == rPackages.id && x.isSubset).length ? true : false} />
                                                        <span className="checkmark hpa-checkmark"></span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <ul className="list hpa-list">
                                                        {
                                                            Object.entries(rPackages.tests).map(function ([k, test]) {
                                                                return <li key={k}>
                                                                    <div style={{ display: 'block', position: 'relative' }}>
                                                                        {
                                                                            self.state.selectCatIDs.filter(x => x.cat_id == rPackages.id && x.isSubset).length ?
                                                                                <label className="ck-bx fw-400" style={{ fontSize: 14, flex: 1, paddingLeft: 24 }} onChange={self.selectTest.bind(self, test.id, rPackages.id)}>{test.name} {test.num_of_parameters != 0 ? '(' + test.num_of_parameters + ')' : ''}
                                                                                    <input type="checkbox" value="on" checked={self.state.selectedTestIds.indexOf(test.id) > -1 ? true : false} />
                                                                                    <span className="checkmark hpa-checkmark"></span>
                                                                                </label>
                                                                                : <p className="fw-400" style={{ paddingLeft: 24, lineHeight: '20px' }}>{test.name} {test.num_of_parameters != 0 ? '(' + test.num_of_parameters + ')' : ''}</p>
                                                                        }
                                                                        {
                                                                            test.parameters.length > 0 ? <img src={ASSETS_BASE_URL + '/img/customer-icons/dropdown-arrow.svg'} onClick={self.toggleInfo.bind(self, test.id)} /> : ''
                                                                        }
                                                                    </div>
                                                                    {
                                                                        self.state.testInfoIds.indexOf(test.id) > -1 ?
                                                                            <div className="mrt-10" style={{ display: 'block', paddingLeft: 30 }}>
                                                                                {Object.entries(test.parameters).map(function ([param_k, paramter]) {
                                                                                    return <p key={param_k} style={{ marginBottom: 4 }} >{paramter}</p>
                                                                                })}
                                                                            </div> : ''
                                                                    }
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div> : ''
                            }
                            {
                                this.props.common_package.length > 0 && this.state.searchCities.length == 0 ?
                                    <div>
                                        <div className="hpa-heading mrt-10 mrb-10">
                                            <p className="fw-500">Top Selling Health Packages</p>
                                        </div>
                                        <div className="widget mrb-10">
                                            <div className="search-top-container">
                                                <ul className="list hpa-list-2">
                                                    {Object.entries(this.props.common_package).map(function ([key, value]) {
                                                        return <li key={key} id={value.id} onClick={self.searchLab.bind(self, value)}>
                                                            <p>{value.name}</p>
                                                            <img src={ASSETS_BASE_URL + "/img/redirect-arrow.svg"} style={{ width: 15 }} />
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div> : ""
                            }
                            <button className="p-3 v-btn v-btn-primary btn-lg fixed horizontal bottom no-round text-lg sticky-btn" onClick={this.showPackage.bind(this)}>Show Packages</button>
                        </div>
                    </div>
                </section>
                {
                    this.state.showInfo ?
                        <InfoPopup closeInfo={this.closeInfo.bind(this)} infoTextId={this.state.showInfoText} package_information={this.props.recommended_package.filters.length > 0 ? this.props.recommended_package.filters : ''} /> : ''
                }
            </div>
        )
    }
}

export default HealthPackageAdvisorView