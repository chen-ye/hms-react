/* global React */
/* global ReactMeteorData */
UserList = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      users: Meteor.users
        .find({})
        .fetch()
    };
  },

  renderUsers() {
    // Get tasks from this.data.tasks
    return this.data
      .users
      .map((user) => {
        return <UserCard key={user._id} user={user}/>;
      });
  },

  render() {
    return (
      <div className="ui basic segment">
        <h1>All Users</h1>
        <div className="ui cards">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
});
