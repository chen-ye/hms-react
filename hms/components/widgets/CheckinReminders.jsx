CheckinReminders = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
      // We can use propTypes to indicate it is required
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

    return (
      <Transition
        measure={true}
        onlyChild={true}
        enter={{
          height: 'auto',
          opacity: 1
        }}
        leave={{
          height: 0,
          opacity: 0
        }}
        springParams={springParams}>
        {
          !!this.props.user && !this.props.user.hackerStatus.checked_in &&
          <div className="ui collapsible container">
            <form id="checkinReminders" className="ui form" onSubmit={this.handleSubmit}>
              <div className="ui inverted dimmer" ref="dimmer"></div>
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
          </div>
        }
      </Transition>
    );
  },
  componentDidMount() {
    if(!!this.refs.dimmer) {
      var $dimmerNode = $(this.refs.dimmer.getDOMNode());
      $dimmerNode.dimmer({
        closable: false
      });
      if (this.props.active) {
        console.log("hiding dimmer");
        $dimmerNode.dimmer('hide');
      } else {
        console.log("showing dimmer");
        $dimmerNode.dimmer('show');
      }
    }

  },
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && !!this.refs.dimmer) {
      var $dimmerNode = $(this.refs.dimmer.getDOMNode());
      $dimmerNode.dimmer({
        closable: false
      });
      if (this.props.active) {
        console.log("hiding dimmer");
        $dimmerNode.dimmer('hide');
      } else {
        console.log("showing dimmer");
        $dimmerNode.dimmer('show');
      }
    }
  }

});
