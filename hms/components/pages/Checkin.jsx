/* global React */
/* global _ */
Checkin = React.createClass({

  /* global ReactMeteorData */
  /* global Keybinding */
  mixins: [ReactMeteorData, Keybinding],

  keybindingsPlatformAgnostic: true,
  keybindingsIgnoreTextAreas: false,
  keybindings: {
    '⌃⇧F': 'FOCUSFIND'
  },

  keybinding(event, action) {
    switch(action) {
      case 'FOCUSFIND':
        this._focusFind();
        break;
      default:
        break;
    }
  },

  componentWillMount() {
    var self = this;
    this._focusFind = function() {
      if (!!self.refs.hackerSelect) {
        self.refs.hackerSelect.focus();
      }
    };
  },

  // Loads items from the Users collection
  getMeteorData() {
    return {
      users: Meteor.users
        .find({
          "hackerStatus.checked_in": false
        })
        .fetch(),
      selectedUser: !!this.state.selectedUserID ? Meteor.users.findOne(this.state.selectedUserID) : undefined
    };
  },

  getInitialState() {
    return {
      selectedUserID: undefined,
      missingData: undefined,
      initialMissing: [],
      currentMissing: []
    };
  },

  _getRequiredDetails(user) {
    var requiredDetails = {
      "phone": {
        stringPath: "profile.phone",
        accessor: function(user) {return user.profile.phone;}
      }
    };
    if (user.profile.year === "hs") {
      requiredDetails.parentalConsent = {
        stringPath: "hackerStatus.phone",
        accessor: function(user) {return user.hackerStatus.phone;}
      };
    }
    return requiredDetails;
  },

  _checkMissing(missingData, user) {
    console.log(user);
    missingArray = [];
    _.each(missingData, function(value, key) {
      if(!value.accessor(user)) {
        value.missing = true;
        missingArray.push(key);
      }
    });
    return missingArray;
  },

  _calculateNewState(user) {
    var missingData = this._getRequiredDetails(user);
    var missing = this._checkMissing(missingData, user);
    return {
      missingData: missingData,
      initialMissing: missing,
      currentMissing: missing
    };
  },

  _calculateUpdatedState(user) {
    var missing = this._checkMissing(this.state.missingData, user);
    return {
      currentMissing: missing
    };
  },

  render() {
    var springParams = [415,28];
    const self = this;
    const validRoles = ["rep", "volunteer", "hacker"];
    var   groups = [{
            groupId: "hacker",
            title: "Hackers"
        }, {
            groupId: "volunteer",
            title: "Volunteers"
        }, {
            groupId: "rep",
            title: "Representatives"
        }];

    return (
      <div className="ui container" id="checkin">
        <div className="ui basic segment">
          <ReactSelectize.SimpleSelect
              ref = "hackerSelect"
              className = "massive basic relative-dropdown sliding"
              groups = {groups}
              groupsAsColumns = {true}
              springParams = {springParams}
              options = {this.data.users.map((user) => {
                var userValidRoles = _.intersection(validRoles, user.roles);
                return {
                    groupId: (userValidRoles.length > 0) ? userValidRoles[0] : "",
                    label: user.profile.name,
                    value: user._id
                };
              })}
              onValueChange = {(selection, callback) => {
                self.setState({selectedUserID: (!!selection ? selection.value : undefined)}, callback);
              }

              }
              placeholder = "Search for hackers, volunteers, or reps"
          />
          <div className="ui mini keycombo labels">
            <div className="ui label">
              Ctrl
            </div>
            <div className="ui label">
              Shift
            </div>
            <div className="ui label">
              F
            </div>
          </div>
          {!!this.data.selectedUser &&
            <HackerStatus className="massive superimposed" hackerStatus={this.data.selectedUser.hackerStatus}/>
          }
        </div>
        <CheckinDetails user={this.data.selectedUser} onCheckin={this._focusFind}/>
      </div>
    );
  }

});
