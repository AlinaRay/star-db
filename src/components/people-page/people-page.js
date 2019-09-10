import React, {Component} from 'react';

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from '../row';
import ErrorBoundry from '../error-boundry';

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id,
        })
    };

    render() {
        const itemsList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
            >
                {(item) => (
                    `${item.name} (${item.birthYear})`)}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails
                    personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
                <Row left={itemsList} right={personDetails}/>
    );
    }
};

