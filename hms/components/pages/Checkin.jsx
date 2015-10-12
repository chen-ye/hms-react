Checkin = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Users collection
  getMeteorData() {
    console.log(this.state.selectedUserID);
    return {
      users: Meteor.users
        .find({})
        .fetch(),
      selectedUser: Meteor.users.findOne(this.state.selectedUserID)
    };
  },

  getInitialState() {
    return {
      selectedUserID: undefined
    };
  },

  render() {
    var self = this;
    var groups = [{
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
      <div className="ui container">
        <div className="ui basic segment">
          <ReactSelectize.SimpleSelect
              className = "massive basic relative-dropdown"
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
                self.setState({selectedUserID: selection.value}, callback);
              }

              }
              placeholder = "Search for hackers, volunteers, or reps"
          />
        {
          () => {
            if (!!self.data.selectedUser) {
              return  <div>
                        {this.data.selectedUser.profile.name}
                      </div>;
            }
          }
        }

        </div>
      </div>
    );
  }

});
