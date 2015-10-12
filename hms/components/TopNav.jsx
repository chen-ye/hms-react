TopNav = React.createClass({

  render() {
    return (
        <nav className="ui borderless main menu" ref="nav">
          <div className="ui container">
            <a href="/dashboard" className="header item">
              <img className="logo" src="/img/hms_logomark.svg" alt="HMS"/>
            </a>
            <a href="/" className="item">Web</a>
            <div className="ui dropdown item">
              <a className="base" href="/dashboard/event">Event</a>
              <i className="dropdown icon"></i>
              <div className="menu">
                <a href="/dashboard/event/comms" className="item">Comms</a>
                <a href="/dashboard/event/checkin" className="item">Check-in</a>
                <a href="/dashboard/event/schedule" className="item">Schedule</a>
                <a href="/dashboard/event/checkin" className="item">Mentorship</a>
                <a href="/dashboard/event/checkin" className="item">Judging</a>
              </div>
            </div>
            <div className="ui dropdown item">
              <a className="base" href="/dashboard/people">People</a>
              <i className="dropdown icon"></i>
              <div className="menu">
                <a href="/dashboard/people/registrants" className="item">Registrants</a>
                <a href="/dashboard/people/volunteers" className="item">Volunteers</a>
                <a href="/dashboard/people/mentors" className="item">Mentors</a>
                <a href="/dashboard/people/organizers" className="item">Organizers</a>
              </div>
            </div>
            <a href="/dashboard/metrics" className="item">Metrics</a>

            <a href="#" className="ui right floated dropdown item">
              {Meteor.user().profile.name}
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">Link Item</div>
                <div className="item">Link Item</div>
                <div className="divider"></div>
                <div className="header">Header Item</div>
                <div className="item">
                  <i className="dropdown icon"></i>
                  Sub Menu
                  <div className="menu">
                    <div className="item">Link Item</div>
                    <div className="item">Link Item</div>
                  </div>
                </div>
                <div className="item">Link Item</div>
              </div>
            </a>
          </div>
        </nav>
    );
  },
  componentDidMount: function() {
    var navNode = this.refs.nav.getDOMNode();
    // fix main menu to page on passing
    $(navNode).visibility({
      type: 'fixed'
    });
    // show dropdown on hover
    $(navNode).find('.ui.dropdown').dropdown({
      on: 'hover'
    });
  }


});
