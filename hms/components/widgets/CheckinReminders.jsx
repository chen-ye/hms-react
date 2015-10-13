CheckinReminders = React.createClass({

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
        <form id="checkinReminders" className="ui form" key={this.props.user._id} onSubmit={this.handleSubmit}>
          <h3 className="ui header">Give t-shirt and swag bag:</h3>

          <div className="field">
            <label>T-Shirt:</label>
            <div className="ui large label">
              {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_type : "Unknown Type"}
            </div>
            <div className="ui large label">
              {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_size : "Unknown Size"}
            </div>
          </div>

          <h3 className="ui header">Remind this hacker that travel reciepts are due on 1.2.2016</h3>

          <button className="ui primary button" type="submit">Check In</button>

        </form>
    );
  }

});
