import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col, Media, FormControl, FormGroup } from 'react-bootstrap';
import { auth, database } from '../../firebase/';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  first: '',
  last: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  alert: null,
  show: false
};

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.userRegister = this.userRegister.bind(this);
  }

  userRegister(event) {
    const { first, last, email, passwordOne } = this.state;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        // Create a user in your own accessible Firebase Database too
        database
          .doCreateUser(authUser.uid, first, last, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const { first, last, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || first === '' || last === '' || email === '';
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <div className="header-text">
                <h2>Doctor House</h2>
                <h4>Soluciona cada problema de tu inmueble en un click</h4>
                <hr />
              </div>
            </Col>
            <Col md={4} mdOffset={2}>
              <Media>
                <Media.Left>
                  <div className="icon">
                    <i className="pe-7s-user" />
                  </div>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>Cuenta gratis</Media.Heading>
                  Cotizaciones rápidas de los mejores contratistas locales.
                </Media.Body>
              </Media>
              <Media>
                <Media.Left>
                  <div className="icon">
                    <i className="pe-7s-graph1" />
                  </div>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>Awesome Performances</Media.Heading>
                  Here you can write a feature description for your dashboard, let the users know what is the value that
                  you give them.
                </Media.Body>
              </Media>
              <Media>
                <Media.Left>
                  <div className="icon">
                    <i className="pe-7s-headphones" />
                  </div>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>Global Support</Media.Heading>
                  Here you can write a feature description for your dashboard, let the users know what is the value that
                  you give them.
                </Media.Body>
              </Media>
            </Col>
            <Col md={4}>
              <form onSubmit={this.userRegister}>
                <Card
                  plain
                  content={
                    <div>
                      <FormGroup>
                        <FormControl
                          value={first}
                          onChange={event => this.setState(updateByPropertyName('first', event.target.value))}
                          type="text"
                          placeholder="Nombre"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          value={last}
                          onChange={event => this.setState(updateByPropertyName('last', event.target.value))}
                          type="text"
                          placeholder="Apellido"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          value={email}
                          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                          type="text"
                          placeholder="Correo"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          value={passwordOne}
                          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                          type="password"
                          placeholder="Clave"
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormControl
                          value={passwordTwo}
                          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                          type="password"
                          placeholder="Confirme su clave"
                        />
                      </FormGroup>
                    </div>
                  }
                  ftTextCenter
                  legend={
                    <Button wd fill disabled={isInvalid} type="submit">
                      Inscríbete
                    </Button>
                  }
                />
                {error && <p>{error.message}</p>}
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(RegisterPage);
