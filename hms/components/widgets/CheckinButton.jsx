CheckinButton = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
      // We can use propTypes to indicate it is required
      user: React.PropTypes.object.isRequired
  },

  handleSubmit(event) {
    event.preventDefault();
    Meteor.users.update(this.props.user._id, {
      $set: {
        "hackerStatus.checked_in": true
      }
    });
  },

  render() {
    return (
        <form id="checkinbutton" className="ui form" key={this.props.user._id} onSubmit={this.handleSubmit}>
          <button className="ui primary button" type="submit">Check In</button>
        </form>
    );
  }

});
