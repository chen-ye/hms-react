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

  getDefaultStyles() {

  },

  getStyles() {
    let configs = {};
    configs[this.props.user._id] = {
      height: spring()
    };
    return configs;
  },

  willEnter(key) {
    return {
      opacity: spring(0) // start at 0, gradually expand
      //text: this.state.blocks[key], // this is really just carried around so
      // that interpolated values can still access the text when the key is gone
      // from actual `styles`
    };
  },

  willLeave(key, style) {
    return {
      opacity: spring(0), // make opacity reach 0, after which we can kill the key
      text: style.text,
    };
  },

  render() {
    return (
      <Transition
        onlyChild={true}
        enter={{
          height: 'auto',
          opacity: 1
        }}
        leave={{
          height: 0,
          opacity: 0
        }}>
        {
          !this.props.user.hackerStatus.checked_in &&
          <form id="checkinReminders" className="ui form collapsible" key={this.props.user._id} onSubmit={this.handleSubmit}>
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
        $dimmerNode.dimmer('hide');
      } else {
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
        $dimmerNode.dimmer('hide');
      } else {
        $dimmerNode.dimmer('show');
      }
    }
  }

});
