Checkin = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Users collection
  getMeteorData() {
    return {
      users: Meteor.users
        .find({
          "hackerStatus.checked_in": false
        })
        .fetch(),
      selectedUser: (!!this.state.selectedUserID ? Meteor.users.findOne(this.state.selectedUserID) : undefined)
    };
  },

  getInitialState() {
    return {
      selectedUserID: undefined,
      missing: false
    };
  },

  render() {
    const self = this;
    const selectedUser = this.data.selectedUser;
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
        }],
        requiredDetails = {
            profile: {
              phone: true
            }
        };
    if (!!selectedUser) {
      if (selectedUser.profile.year === "hs") {
        requiredDetails.hackerStatus = {
          parentalConsent: true
        };
      }
    }

    return (
      <div className="ui container" id="checkin">
        <div className="ui basic segment">
          <div>
            <ReactSelectize.SimpleSelect
                ref = "hackerSelect"
                className = "massive basic relative-dropdown sliding"
                groups = {groups}
                groupsAsColumns = {true}
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
          {!!selectedUser &&
            <HackerStatus className="massive superimposed" hackerStatus={this.data.selectedUser.hackerStatus}/>
          }
        </div>
      </div>
      {!!selectedUser &&
        <div className="ui basic segment">
          <MissingDetailsForm
            user={this.data.selectedUser}
            requiredDetails={requiredDetails}
            onMissingChange={(initialMissing, currentMissing) => {
              self.setState({missing: (currentMissing === 0 ? false : true)});
            }}
            />
          <CheckinReminders
            user={this.data.selectedUser}
            active={!this.state.missing}
            onCheckin={() => {
              self.refs.hackerSelect.focus();
            }}
            />
        </div>
      }
      </div>
    );
  }

});
