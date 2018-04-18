import React from 'react';

import Chip from 'material-ui/Chip';

class CriteriaSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete(id, handler) {
        if (handler == 'toggleDiagnosisCriteria') {
            this.props[handler]({ id })
        } else {
            this.props[handler](id)
        }
    }

    static contextTypes = {
        router: () => null
    }

    render() {

        let locationPill = ""
        let pills = []
        let tests = []
        let criterias = []

        if (this.props.commonlySearchedTests) {
            tests = this.props.commonlySearchedTests.filter((pill) => {
                return this.props.selectedTests[pill.id]
            }).map((pill) => {
                pill.ts = this.props.selectedTests[pill.id]
                pill.type = 'toggleTest'
                return pill
            })
        }

        if (this.props.selectedDiagnosisCriteria) {
            criterias = Object.keys(this.props.selectedDiagnosisCriteria).map((criteria) => {
                let pill = this.props.selectedDiagnosisCriteria[criteria]
                pill.type = 'toggleDiagnosisCriteria'
                return pill
            })
        }

        if (this.props.selectedLocation) {
            locationPill = <Chip
                label={this.props.selectedLocation.name}
                className={"pillselected location"}
            />
        }

        pills = [...tests, ...criterias]
        pills = pills.sort((a, b) => {
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
                    this.context.router.history.push('/dx/criteriasearch')
                }} placeholder={this.props.heading || "Search for tests, labs, packages ..etc"} />
                {locationPill}
                {pills}
            </div>
        );
    }
}


export default CriteriaSelector
