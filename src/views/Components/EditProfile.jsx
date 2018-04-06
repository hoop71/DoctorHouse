import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
// import FileInput from 'react-file-input';
import { database } from '../../firebase/firebase';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import UserCard from 'components/Card/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import { AppContext } from '../../containers/App/App';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.userRef = null;
    this.state = {
      ...this.props
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  updateProfile(e) {
    this.props.toggleEditMode();
    const userRef = database.child('users/').child(`${this.state.userID}`);
    userRef.update({
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      state: this.state.state,
      aboutMe: this.state.aboutMe
    });
  }

  render() {
    const { isBeingEdited } = this.props;
    return (
      <div className="main-content">
        <AppContext.Consumer>
          {context => (
            <Grid fluid>
              <Row>
                <Col md={8}>
                  <Card
                    title="Editar Perfil"
                    content={
                      <form>
                        <FormInputs
                          handler={this.handleChange}
                          ncols={['col-md-6', 'col-md-6']}
                          proprieties={[
                            {
                              name: 'first',
                              label: 'Nombre',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.first}`
                            },
                            {
                              name: 'last',
                              label: 'Apellido',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.last}`
                            }
                          ]}
                        />

                        <FormInputs
                          handler={this.handleChange}
                          ncols={['col-md-12']}
                          proprieties={[
                            {
                              name: 'email',
                              label: 'Correo electronico',
                              type: 'email',
                              bsClass: 'form-control',
                              value: `${context.state.email}`
                            }
                          ]}
                        />

                        <FormInputs
                          handler={this.handleChange}
                          ncols={['col-md-12']}
                          proprieties={[
                            {
                              name: 'address',
                              label: 'Dirección',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.address}`
                            }
                          ]}
                        />
                        <FormInputs
                          handler={this.handleChange}
                          ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                          proprieties={[
                            {
                              name: 'city',
                              label: 'Ciudad',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.city}`
                            },
                            {
                              name: 'state',
                              label: 'Estado',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.state}`
                            },
                            {
                              name: 'country',
                              label: 'Pais',
                              type: 'text',
                              bsClass: 'form-control',
                              value: `${context.state.country}`
                            }
                          ]}
                        />

                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Sobre mi</ControlLabel>
                              <FormControl
                                onChange={this.handleChange}
                                name="aboutMe"
                                rows="5"
                                componentClass="textarea"
                                bsClass="form-control"
                                value={`${context.state.aboutMe}`}
                              />
                            </FormGroup>
                          </div>
                        </div>

                        <Button bsStyle="warning" pullRight fill onClick={this.updateProfile}>
                          Update Yo Shit
                        </Button>

                        <div className="clearfix" />
                      </form>
                    }
                  />
                </Col>
                <Col md={4}>
                  <UserCard
                    bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                    avatar={context.state.photoURL}
                    isBeingEdited={isBeingEdited}
                    userID={context.state.userID}
                    name={`${context.state.first}`}
                    email="tania123"
                    description={context.state.aboutMe}
                    socials={
                      <div>
                        <Button simple>
                          <i className="fa fa-facebook-square" />
                        </Button>
                        <Button simple>
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button simple>
                          <i className="fa fa-google-plus-square" />
                        </Button>
                      </div>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default EditProfile;
