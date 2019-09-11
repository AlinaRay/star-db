import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import {PeoplePage, StarshipsPage, PlanetsPage} from '../pages';
import {SwapiServiceProvider} from "../sw-service-context";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
    };

    onServiceChange = () => {
        this.setState(({swapiService})=> {
            const Service = swapiService instanceof SwapiService
                ? DummySwapiService
                : SwapiService;
            return {
                swapiService: new Service(),
            }
        })
    };

    render() {

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                <div className="stardb-app">
                    <Header onServiceChange={this.onServiceChange}/>
                    <RandomPlanet/>
                    <PeoplePage />
                    <PlanetsPage/>
                    <StarshipsPage/>
                </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )

    }
};
