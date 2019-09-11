import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemDetails, {Record} from "../item-details";
import ItemList from '../item-list';
import {SwapiServiceProvider} from "../swapi-service-context";
import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList,
} from '../sw-components';

export default class App extends Component {

    swapiService = new DummySwapiService();

    state = {
        showRandomPlanet: true,
    };


    toggleRandomPlanet = () => {
        this.setState((prev) => ({
            showRandomPlanet: !prev.showRandomPlanet,
        }))
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                <div className="stardb-app">
                    <Header/>
                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={5}/>
                    <StarshipDetails itemId={9}/>
                    <PersonList/>
                    <PlanetList/>
                    <StarshipList/>
                    {/*<Row left={personDetails} right={starshipDetails}/>*/}
                </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )

    }
};
