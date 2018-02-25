import React, { Component } from 'react';
import { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

const INITIAL_STATE = {
    email: '',
    password: '',
    cardHidden: true,
    error: null
};

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const { email, password } = this.state;
        const { history } = this.props;

        auth.doSignInWithEmailAndPassword(email, password).then(authUser => {
            this.setState(() => ({ ...INITIAL_STATE }));
        });
        event.preventDefault();
    }

    componentDidMount() {
        setTimeout(
            function() {
                this.setState({ cardHidden: false });
            }.bind(this),
            700
        );
    }
    render() {
        const { email, password } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>Su correo</ControlLabel>
                                            <FormControl
                                                name="email"
                                                value={email}
                                                placeholder="Su correo"
                                                onChange={this.handleInputChange}
                                                type="email"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>Clave</ControlLabel>
                                            <FormControl
                                                name="password"
                                                value={password}
                                                placeholder="Clave"
                                                onChange={this.handleInputChange}
                                                type="password"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button bsStyle="info" fill wd disabled={isInvalid}>
                                        Entrar
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withRouter(LoginPage);

export { LoginPage };
