Checkin = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Users collection
  getMeteorData() {
    return {
      users: Meteor.users
        .find({})
        .fetch(),
      selectedUser: (!!this.state.selectedUserID ? Meteor.users.findOne(this.state.selectedUserID) : undefined)
    };
  },

  getInitialState() {
    return {
      selectedUserID: undefined
    };
  },

  render() {
    var self = this,
        selectedUser = this.data.selectedUser,
        groups = [{
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
                className = "massive basic relative-dropdown sliding"
                groups = {groups}
                groupsAsColumns = {true}
                options = {this.data.users.map((user) => {
                    return {
                        groupId: user.roles[0],
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
          <MissingDetailsForm user={this.data.selectedUser} requiredDetails={requiredDetails}/>
          <CheckinReminders user={this.data.selectedUser}/>
        </div>
      }
      </div>
    );
  }

});
