/* global React */
/* global Roles */
/* global Keybinding */
/* global _ */

CheckinReminders = React.createClass({

  propTypes: {
      user: React.PropTypes.object.isRequired,
      active: React.PropTypes.bool,
      onCheckin: React.PropTypes.func
  },

  mixins: [Keybinding],

  keybindingsPlatformAgnostic: true,
  keybindingsIgnoreTextAreas: false,
  keybindings: {
    '⌃⇧↩': 'CHECKIN'
  },

  keybinding(event, action) {
    switch(action) {
      case 'CHECKIN':
        this._handleCheckin();
        break;
      default:
        break;
    }
  },

  _handleCheckin(event) {
    if(!!event) {
      event.preventDefault();
    }
    if (this.props.active) {
      Meteor.call("checkInUser", this.props.user._id);
      if(!!this.props.onCheckin) {
        this.props.onCheckin(this.props.user);
      }
    }
  },

  render() {
    var self = this;
    var springParams = [415,28];
    return (
      <form id="checkinReminders" className="ui form" onSubmit={this._handleCheckin}>
        <div className="ui inverted dimmer" ref={(dimmer) => {
            if (!!dimmer) {
              var $dimmerNode = $(dimmer);
              $dimmerNode.dimmer({
                closable: false
              });
              $dimmerNode.dimmer(self.props.active ? 'hide' : 'show');
            }
          }}></div>
          {
            Roles.userIsInRole(this.props.user, ['hacker']) &&
            <div className="action">
              <h3 className="ui header">Give participant t-shirt and swag bag:</h3>
              <div className="field">
                <label>T-Shirt:</label>
                <div className="ui large label">
                  {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_type : "Unknown Type"}
                </div>
                <div className="ui large label">
                  {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_size : "Unknown Size"}
                </div>
              </div>
            </div>
          }

          {
            Roles.userIsInRole(this.props.user, ['volunteer']) &&
            <div className="action">
              <h3 className="ui header">Give volunteer t-shirt:</h3>
              <div className="field">
                <label>T-Shirt:</label>
                <div className="ui large label">
                  {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_type : "Unknown Type"}
                </div>
                <div className="ui large label">
                  {!!this.props.user.profile.shirt_type ? this.props.user.profile.shirt_size : "Unknown Size"}
                </div>
              </div>
            </div>
          }

          {
            Roles.userIsInRole(this.props.user, ['hacker']) &&
            <div className="action">
              <h3 className="ui header">Remind this hacker that travel receipts are due on 1.2.2016.</h3>
            </div>
          }


          <div className="action">
            <div className="field">
              <button className={"ui primary big button " + (this.props.active ? "" : "disabled")} type="submit">Check In</button>
              <span> or press </span>
              <span className="ui mini keycombo labels">
                <div className="ui label">
                  Ctrl
                </div>
                <div className="ui label">
                  Shift
                </div>
                <div className="ui label">
                  Enter
                </div>
              </span>
            </div>
          </div>



        </form>
    );
  }

});
