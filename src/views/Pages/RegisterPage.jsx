import React, { Component } from 'react';
import { auth } from '../../firebase';
import { Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid, Row, Col, Media, FormControl, FormGroup } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';

const INITIAL_STATE = {
  first: '',
  last: '',
  email: '',
  country: '',
  city: '',
  password: '',
  passwordConfirm: '',
  error: null,
  fireRedirect: false
};

class RegisterPage extends Component {
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

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.setState({ fireRedirect: true });
      })
      .catch(error => {
        this.setState('error', error);
        console.log(error);
      });

    event.preventDefault();
  }

  render() {
    const { first, last, email, country, city, password, passwordConfirm, error } = this.state;
    const isInvalid = password !== passwordConfirm || password === '' || email === '';
    const { fireRedirect } = this.state;
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>DoctorHouse</h2>
              <h4>Cree su cuenta gratis</h4>
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
                <Media.Heading>Free Account</Media.Heading>
                Here you can write a feature description for your dashboard, let the users know what is the value that
                you give them.
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
            <form onSubmit={this.handleSubmit}>
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <FormControl
                        name="first"
                        value={first}
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Nombre"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="last"
                        value={last}
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="Apellido"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleInputChange}
                        placeholder="Correo"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="country"
                        type="text"
                        value={country}
                        onChange={this.handleInputChange}
                        placeholder="Pais"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="city"
                        type="text"
                        value={city}
                        onChange={this.handleInputChange}
                        placeholder="Ciudad"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleInputChange}
                        placeholder="Clave"
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormControl
                        name="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={this.handleInputChange}
                        placeholder="Corfirme su clave"
                      />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill neutral type="submit" disabled={isInvalid}>
                    Inscribirse
                    {error && <p>{error.message}</p>}
                  </Button>
                }
              />
            </form>
            {fireRedirect && <Redirect to={'/'} />}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={'/pages/register-page'}>Sign Up</Link>
  </p>
);

export default withRouter(RegisterPage);

export { RegisterPage, SignUpLink };
