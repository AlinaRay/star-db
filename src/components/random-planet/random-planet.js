import React, {Component} from 'react';
import SwapiService from  '../../services/swapi-service';
import Spinner from '../spinner';
import './random-planet.css';
import PlanetDetails from "../planet-details";
import ErrorIndicator from "../error-indicator";

class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
    };

    componentDidMount() {
        console.log('component did mount');
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5500);
    }
    componentWillUnmount() {
        console.log('unmount');
        clearInterval(this.interval);
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
        });
    };
    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };
    updatePlanet = () => {
        const id = Math.floor(Math.random()*25) + 3;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        const { planet , loading, error } = this.state;
        console.log('render');
        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ?  <Spinner /> : null;
        const content = hasData ? <PlanetView planet={planet} /> : null;
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
};

const PlanetView = ({planet}) => {
    const {id, name, population, rotationPeriod, diameter} = planet;
    return (
        <React.Fragment>
            <img className="planet-image"
                 alt=""
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
            />
            <div>
                <h4>Planet {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};

export default RandomPlanet;