CheckinReminders = React.createClass({

  propTypes: {
      user: React.PropTypes.object.isRequired,
      active: React.PropTypes.bool,
      onCheckin: React.PropTypes.func
  },

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call("checkInUser", this.props.user._id);
    if(!!this.props.onCheckin) {
      this.props.onCheckin(this.props.user);
    }
  },

  render() {
    var springParams = [415,28];
    var self = this;

    return (
      <form id="checkinReminders" className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui inverted dimmer" ref={(dimmer) => {
            if (!!dimmer) {
              var $dimmerNode = $(dimmer.getDOMNode());
              $dimmerNode.dimmer({
                closable: false
              });
              $dimmerNode.dimmer(self.props.active ? 'hide' : 'show');
            }
          }}></div>
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

        <button className="ui primary big button" type="submit">Check In</button>

      </form>
    );
  }

});
