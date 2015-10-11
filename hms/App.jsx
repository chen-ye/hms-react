// App component - represents the whole app
App = React.createClass({
    render() {
        return (
      <div className="ui one column grid container">
        <div className="ui column">
          <header className="ui basic segment">
            <h1>HMS Debug</h1>
            <AccountsUIWrapper />
            <RegistrationForm />
          </header>
          <Checkin />
          <UserList />
        </div>
      </div>
    );
    }
});
