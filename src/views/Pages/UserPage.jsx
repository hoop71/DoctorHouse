import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import UserCard from 'components/Card/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import avatar from 'assets/img/default-avatar.png';

class UserPage extends Component {
  render() {
    const { email, uid, displayName, first } = this.props;
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Mi Perfil"
                content={
                  <form>
                    <FormInputs
                      ncols={['col-md-6', 'col-md-6']}
                      proprieties={[
                        {
                          label: 'Nombre',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Nombre'
                        },
                        {
                          label: 'Apellido',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Apellido'
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Correo electronico',
                          type: 'email',
                          bsClass: 'form-control',
                          placeholder: 'Correo'
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={['col-md-12']}
                      proprieties={[
                        {
                          label: 'Dirección',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Dirección de casa'
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                      proprieties={[
                        {
                          label: 'Ciudad',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Cidudad'
                        },
                        {
                          label: 'Estado',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Estado'
                        },
                        {
                          label: 'Pais',
                          type: 'text',
                          bsClass: 'form-control',
                          placeholder: 'Paid'
                        }
                      ]}
                    />

                    <div className="row">
                      <div className="col-md-12">
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Sobre mi</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Cuéntanos acerca de tí"
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Edite su perfil
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name="Tania Andrew"
                email="tania123"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
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
      </div>
    );
  }
}

export default UserPage;
