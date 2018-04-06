import React from 'react';
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import UserCard from 'components/Card/UserCard.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import avatar from 'assets/img/default-avatar.png';

function ViewProfile(props) {
  console.log(props);
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
                        value: `${props.first}`,
                        disabled: true
                      },
                      {
                        label: 'Apellido',
                        type: 'text',
                        bsClass: 'form-control',
                        value: `${props.last}`,
                        disabled: true
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
                        value: `${props.email}`,
                        disabled: true
                      }
                    ]}
                    readOnly="readOnly"
                  />
                  <FormInputs
                    ncols={['col-md-12']}
                    proprieties={[
                      {
                        label: 'Dirección',
                        type: 'text',
                        bsClass: 'form-control',
                        value: `${props.address}`,
                        disabled: true
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
                        value: `${props.city}`,
                        disabled: true
                      },
                      {
                        label: 'Estado',
                        type: 'text',
                        bsClass: 'form-control',
                        value: `${props.state}`,
                        disabled: true
                      },
                      {
                        label: 'Pais',
                        type: 'text',
                        bsClass: 'form-control',
                        value: `${props.country}`,
                        disabled: true
                      }
                    ]}
                  />

                  <div className="row">
                    <div className="col-md-12">
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Sobre mi</ControlLabel>
                        <FormControl
                          readOnly
                          rows="5"
                          componentClass="textarea"
                          bsClass="form-control"
                          value={`${props.aboutMe}`}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <Button bsStyle="info" pullRight fill onClick={props.toggleEditMode}>
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
              isBeingEdited={props.isBeingEdited}
              name={`${props.first} ${' '} ${props.last}`}
              description={<span>{props.aboutMe}</span>}
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

export default ViewProfile;
