// Task component - represents a single todo item
HackerStatus = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        hackerStatus: React.PropTypes.object.isRequired
    },
    render() {
      var status, statusStyles = {
        "project_submitted": {
          innerColor: "blue",
          outerColor: "blue",
          textColor: "white",
          basic: false,
          text: "Submitted"
        },
        "checked_in": {
          innerColor: "white",
          outerColor: "blue",
          textColor: "blue",
          basic: true,
          text: "Checked In"
        },
        "rsvped": {
          innerColor: "teal",
          outerColor: "teal",
          textColor: "white",
          basic: false,
          text: "RSVPed"
        },
        "accepted": {
          innerColor: "white",
          outerColor: "teal",
          textColor: "teal",
          basic: true,
          text: "Accepted"
        },
        "waitlisted": {
          innerColor: "white",
          outerColor: "orange",
          textColor: "orange",
          basic: true,
          text: "Waitlisted"
        },
        pending: {
          innerColor: "grey",
          outerColor: "grey",
          textColor: "white",
          basic: false,
          text: "Pending"
        }
      };
      if (this.props.hackerStatus.project_submitted === true) {
        status = "project_submitted";
      } else if (this.props.hackerStatus.checked_in === true) {
        status = "checked_in";
      } else {
        status = this.props.hackerStatus.accept_status;
      }

      var statusStyle = statusStyles[status];
      var className = "ui label allcaps " + statusStyle.outerColor + (statusStyle.basic ? " basic " : " ") + (!!this.props.className ? this.props.className : "");

      return (
        <div className={className}>
          {statusStyle.text}
        </div>
      );
    }
});
