import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from "../error-indicator";

import './person-details.css';
import Spinner from "../spinner";

class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        const {personId} = this.props;
        if (!personId) {
            return;
        }
        this.setState({loading: true});
        this.swapiService
            .getPerson(personId)
            .then(this.onPersonLoaded)
            .catch(this.onError);
    };
    onPersonLoaded = (person) => {
        this.setState({
            person,
            loading: false,
        });
    };
    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    };
    render() {

        if (!this.state.person) {
            return <span>Select a person from a list</span>
        }
        const {id} = this.state.person;

        const spinner = this.state.loading ?  <Spinner /> : null;
        const errorMessage = this.state.error ? <ErrorIndicator /> : null;
        const hasData = !(this.state.loading || this.state.error);
        const content = hasData ? <PersonView item={this.state.person}
                                            imageId={id}/> : null;
        return (
            <div className="person-details card">
                {spinner}
                {content}
                {errorMessage}
            </div>
        );
    }
};

const PersonView = ({item, imageId}) => {
        const { name, gender, birthYear, eyeColor} = item;
        return (
            <React.Fragment>
                    <img className="person-image"
                         src={`https://starwars-visualguide.com/assets/img/characters/${imageId}.jpg`}
                         alt="image"
                    />
                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Gender</span>
                                <span>{gender}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Birth Year</span>
                                <span>{birthYear}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Eye color</span>
                                <span>{eyeColor}</span>
                            </li>
                        </ul>

                    </div>
            </React.Fragment>
        )
};

export default PersonDetails;