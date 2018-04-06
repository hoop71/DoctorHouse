import React, { Component } from 'react';
import ViewProfile from 'views/Components/ViewProfile';
import EditProfile from 'views/Components/EditProfile';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  toggleEditMode() {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited
    });
  }

  render() {
    const { isBeingEdited } = this.state;
    return (
      <div>
        {isBeingEdited ? (
          <EditProfile isBeingEdited={isBeingEdited} toggleEditMode={this.toggleEditMode} />
        ) : (
          <ViewProfile isBeingEdited={isBeingEdited} toggleEditMode={this.toggleEditMode} />
        )}
      </div>
    );
  }
}

export default UserPage;
