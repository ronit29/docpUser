import React from 'react';

import Chip from 'material-ui/Chip';

class CriteriaSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete(id, handler) {
        if(handler == 'toggleCriteria'){
            this.props[handler]({id})
        } else{
            this.props[handler](id)
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let pills = []
        let conditions = []
        let specialities = []
        let criterias = []

        if (this.props.commonlySearchedConditions) {
            conditions = this.props.commonlySearchedConditions.filter((pill) => {
                return this.props.selectedConditions[pill.id]
            }).map((pill) => {
                pill.ts = this.props.selectedConditions[pill.id]
                pill.type = 'toggleCondition'
                return pill
            })
        }
        if (this.props.commonlySearchedSpecialities) {
            specialities = this.props.commonlySearchedSpecialities.filter((pill) => {
                return this.props.selectedSpecialities[pill.id]
            }).map((pill) => {
                pill.ts = this.props.selectedSpecialities[pill.id]
                pill.type = 'toggleSpeciality'
                return pill
            })
        }
        if(this.props.selectedCriteria){
            criterias = Object.keys(this.props.selectedCriteria).map((criteria) => {
                let pill = this.props.selectedCriteria[criteria]
                pill.type = 'toggleCriteria'
                return pill
            })
        }

        pills = [...conditions, ...specialities, ...criterias]
        pills = pills.sort((a,b) => {
            let dateA = new Date(a.ts).getTime()
            let dateB = new Date(b.ts).getTime()
            return dateA > dateB ? 1 : -1
        }).map((pill) => {
            return <Chip
                label={pill.name}
                className={"pillselected"}
                key={pill.type + pill.id}
                onDelete={this.handleDelete.bind(this, pill.id, pill.type)}
            />
        })

        return (
            <div className="criteriaSelector">
                <input onClick={() => {
                    this.context.router.history.push('/criteriasearch')
                }} placeholder={"Search for symptoms, Doctors, conditions ..etc"} />

                {pills}
            </div>
        );
    }
}


export default CriteriaSelector
