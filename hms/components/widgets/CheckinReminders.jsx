CheckinReminders = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
      // We can use propTypes to indicate it is required
      user: React.PropTypes.object.isRequired,
      active: React.PropTypes.bool
  },

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call("checkIn", this.props.user._id);
  },

  render() {
    return (
        <form id="checkinReminders" className="ui form" key={this.props.user._id} onSubmit={this.handleSubmit}>
          <div className="ui inverted dimmer active" ref="dimmer"></div>
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
  },
  componentDidMount() {
    var $dimmerNode = $(this.refs.dimmer.getDOMNode());
    $dimmerNode.dimmer({
      closable: false
    });
    if (!this.props.active) {
      $dimmerNode.dimmer('show');
    } else {
      $dimmerNode.dimmer('hide');
    }
  },
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      var $dimmerNode = $(this.refs.dimmer.getDOMNode());
      if (!this.props.active) {
        $dimmerNode.dimmer('show');
      } else {
        $dimmerNode.dimmer('hide');
      }
    }
  }

});
