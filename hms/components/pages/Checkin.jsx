Checkin = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Users collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      users: Meteor.users
        .find({})
        .fetch()
    };
  },

  render() {
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
        <ReactSelectize.SimpleSelect
            groups = {groups}
            groupsAsColumns = {true}
            options = {this.data.users.map((user) => {
                return {
                    groupId: user.roles[0],
                    label: user.profile.name,
                    value: user._id
                };
            })}
            placeholder = "Search for a hacker, volunteer, or reps"
        />
      </div>
    );
  }

});
