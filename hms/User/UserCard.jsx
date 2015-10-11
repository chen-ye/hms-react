// Task component - represents a single todo item
UserCard = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        user: React.PropTypes.object.isRequired
    },
    render() {
        console.log(this.props.user)
        return (
      <div className="ui card">
        <div className="content">
          <div className="header">{this.props.user.profile.name}</div>
          <div className="meta">
            <span className="date">{this.props.user.roles.map((role) => {
                return <span key={role}>{role}</span>
              })}</span>
          </div>
          <div className="description">
              
          </div>
        </div>
    </div>
    );
    }
});
