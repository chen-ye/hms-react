// App component - represents the whole app
DebugView = React.createClass({
  render() {
    return (
      <div className="ui one column grid container">
        <Helmet title="Debug | HMS" />
        <div className="ui column">
          <header className="ui basic segment">
            <h1>HMS Debug</h1>
            <AccountsUIWrapper/>
            <RegistrationForm/>

          </header>
          <Checkin/>
          <UserList/>
          <div className="ui container" id="debugTools">
            <div className="ui basic segment">
              <button className="ui button" onClick={() => {
                Meteor.call("resetAllHackerStatus");
              }}>
                Reset All Hacker Statuses
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }
});
