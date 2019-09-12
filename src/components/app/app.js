import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import {PeoplePage, StarshipsPage,
    PlanetsPage, LoginPage, SecretPage} from '../pages';
import {SwapiServiceProvider} from "../sw-service-context";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false,
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService
                ? DummySwapiService
                : SwapiService;
            return {
                swapiService: new Service(),
            }
        })
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    render() {
    const {isLoggedIn} = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>
                            <Route path="/" render={()=> <h2>Welcome to StarDB</h2>}
                            exact/>
                            <Route path="/people/:id?" component={PeoplePage}/>
                            <Route path="/planets" component={PlanetsPage}/>
                            <Route path="/starships/" exact component={StarshipsPage}/>
                            <Route path="/starships/:id"
                                   render={({match, location, history}) => {
                                       const {id} = match.params;
                                       console.log(id);
                                       return <StarshipDetails itemId={id}/>
                                   }}
                            />
                            <Route path="/login" render={()=> (
                                <LoginPage
                                    isLoggedIn={isLoggedIn}
                                    onLogin={this.onLogin}
                                />
                            )}/>
                            <Route path="/secret" render={()=> (
                                <SecretPage
                                    isLoggedIn={isLoggedIn}
                                />
                            )}/>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )

    }
};
