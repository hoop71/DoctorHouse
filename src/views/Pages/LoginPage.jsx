import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { auth } from '../../firebase';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

const INITIAL_STATE = {
  email: '',
  password: '',
  cardHidden: true,
  error: null
};

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin(event) {
    const { email, password } = this.state;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });
    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form onSubmit={this.userLogin}>
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <ControlLabel>Su correo</ControlLabel>
                      <FormControl
                        name="email"
                        value={email}
                        placeholder="Su correo"
                        onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                        type="email"
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Clave</ControlLabel>
                      <FormControl
                        name="password"
                        value={password}
                        placeholder="Clave"
                        onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                        type="password"
                      />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill disabled={isInvalid} type="submit">
                    Login
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(LoginPage);
