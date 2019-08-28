import React, {Component} from 'react';

import './app.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default class App extends Component{

    state = {
        showRandomPlanet: true,
        hasError: false,
    };


    toggleRandomPlanet = () => {
      this.setState((prev)=> ({
          showRandomPlanet: !prev.showRandomPlanet,
      }))
    };
    componentDidCatch(error, errorInfo) {
        console.log(error, 'catched');
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;
        return (
            <div className="stardb-app">
                <Header />
                {randomPlanet}
                <div className="row mb-2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}
                    >
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>
               <PeoplePage />
            </div>
        )
    }
};
