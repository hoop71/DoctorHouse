import React, { Component, Fragment } from 'react';
import { AppContext } from '../../containers/App/App';
// import Dropzone from 'react-dropzone';
// import { Button } from 'react-bootstrap';

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  fileSelectedHandler(event) {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  fileUploadHandler() {
    const file = this.state.selectedFile;
    const databaseLocation = this.state.databaseRef;
    const storageLocation = this.state.storageRef;
    storageLocation
      .child('users/')
      .child(`${this.props.userID}/`)
      .child('profile_picture')
      .put(file)
      .then(snapshot => {
        databaseLocation.set(snapshot.downloadURL);
        this.setState({
          photoURL: snapshot.downloadURL
        });
        console.log(snapshot);
        console.log('Uploaded a blob or file!');
      });
    console.log(file.name);
    console.log(file.type);
    console.log(this.state.selectedFile);
  }

  componentDidMount() {
    console.log('UF', this.state.userRef);
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Fragment>
            <div className="card card-user">
              <div className="image">
                <img src={this.props.bgImage} alt="..." />
              </div>
              <div className="content">
                <div className="author">
                  <img className="avatar border-gray" src={this.props.avatar} alt="..." />
                  <div>
                    <input type="file" onChange={this.fileSelectedHandler} />
                    <button onClick={this.fileUploadHandler}>Update Photo</button>
                  </div>
                  <h4 className="title">
                    {context.state.first}
                    {context.state.last}
                    <br />
                    <small>{this.props.userName}</small>
                  </h4>
                </div>
                <p className="description text-center">{context.state.aboutMe}</p>
              </div>
              <hr />
              <div className="text-center">{this.props.socials}</div>
            </div>
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

export default UserCard;
