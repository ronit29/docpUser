import React from 'react';
import { connect } from 'react-redux';


class CategoryPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openFilter: false,
            priceRange: [0, 20000],
            distanceRange: [0, 15],
            sort_on: null,
            shortURL: "",
            dropdown_visible: false,
            showLocationPopup: false,
            overlayVisible: false,
            showPopupContainer: true,
            sortText: 'Relevance',
            openCategory: false,
            selectedCatIds:[],
            selectedAllCatIdsIntial:[],
            selectedCatIdsLeng:'',
            is_applied:true,
            selectAllcategory:[]
        }
    }
    componentDidMount(){
        let selectedCategoryIds = this.state.selectedCatIds
        let selectAllcategoryIds = this.state.selectAllcategory
        this.props.packagesList.categories.map((categories, i) => {
            if(categories.is_selected){
            selectedCategoryIds.push(categories.id)
            }
            selectAllcategoryIds.push(categories.id)
            this.setState({selectedAllCatIdsIntial:selectedCategoryIds,selectedCatIdsLeng:selectedCategoryIds.length, selectAllcategory:selectAllcategoryIds})
        })
        this.props.initialSelectedCategory(selectedCategoryIds)
    }
    applyAllCategory(){
        let selectedCategoryIds = this.state.selectAllcategory
        if(this.props.packagesList.categories_count == this.state.selectedCatIdsLeng){
            selectedCategoryIds = []
        }else{
            selectedCategoryIds = this.state.selectAllcategory
        }
        this.setState({selectedCatIds: selectedCategoryIds,selectedCatIdsLeng:selectedCategoryIds.length})
    }
    toggleTest(category){
        let selectedCategoryIds = this.state.selectedCatIds
        if(category){
            if(selectedCategoryIds.indexOf(category)>-1){
                selectedCategoryIds = selectedCategoryIds.filter(x=>x!=category) 
            }else{
                selectedCategoryIds.push(category)    
            }
        }
        this.setState({selectedCatIds: selectedCategoryIds,selectedCatIdsLeng:selectedCategoryIds.length})
    }
    applyCategories(){
        let categoryState = this.state.selectedCatIds
        this.props.applyCategories(categoryState)
    }
    render() {
        let isSelected = []
        let unSelected = []
        let isSelectedCat=[]
        let unSelectedCat=[]
        if(this.props.packagesList.categories && this.props.packagesList.categories.length>0){
            this.props.packagesList.categories.map((categories, i) => {
                if(categories.is_selected){
                    isSelected.push(categories)
                }else{
                    unSelected.push(categories)
                }
            })
            if(isSelected.length>0){
                {
                isSelected.map((categories, i) => {
                    isSelectedCat.push(<li  className="pr-0" key={i}>
                            <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                {categories.name}
                                <input type="checkbox" checked={this.state.selectedCatIds.indexOf(categories.id) > -1} onChange={this.toggleTest.bind(this, categories.id)} />
                                <span className="checkmark" />
                            </label>
                        </li>)
                    })
                }
            }
            if(unSelected.length>0){
                {
                unSelected.map((categories, i) => {
                    unSelectedCat.push(<li  className="pr-0" key={i}>
                            <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                {categories.name}
                                <input type="checkbox" checked={this.state.selectedCatIds.indexOf(categories.id) > -1} onChange={this.toggleTest.bind(this, categories.id)} />
                                <span className="checkmark" />
                            </label>
                        </li>)
                    })
                }
            }
        }

        return (<div>
            <div className="cancel-overlay cancel-overlay-zindex"></div>
            <div className="widget cancel-appointment-div cancel-popup">    
                <div className="pop-top-heading mb-0 pb-10">
                        Select Categories   
                        <span className="float-right" style={{cursor: 'pointer', marginRight: '10px'}} onClick={this.props.closeCategory.bind(this)}><img src={ASSETS_BASE_URL + "/img/customer-icons/rt-close.svg"} style={{ width: 14 }} /></span>                    
                </div>
                <div className="terms-condition-div pt-0">
                 <div className="">
                    <div className="ins-form-radio insradio-on-popup">
                        <ul className="list all-test-list mrt-10">
                        <li>
                            <label className="ck-bx" style={{ fontWeight: 400, fontSize: 14 }}>
                                Select All
                                <input type="checkbox" checked={this.props.packagesList.categories_count == this.state.selectedCatIdsLeng} onChange={this.applyAllCategory.bind(this)} />
                                <span className="checkmark" />
                            </label>
                        </li>
                        {isSelectedCat}
                        {unSelectedCat}
                        </ul>
                    </div>
                </div>
                </div>
                <div className="procedures-btn-pop">
                    <button onClick={this.applyCategories.bind(this)}>Apply</button>
                </div>
            </div>
        </div>
        );
    }
}


export default CategoryPopup