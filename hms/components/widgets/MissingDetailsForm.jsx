MissingDetailsForm = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
      // We can use propTypes to indicate it is required
      user: React.PropTypes.object.isRequired,
      requiredDetails: React.PropTypes.object.isRequired
  },

  checkMissing(target, mask, missing) {
    numMissing = 0;
    for (var prop in mask) {
      if (!(prop in target) || target[prop]===undefined) {
        missing[prop] = true;
        numMissing++;
      } else if (_.isObject(mask[prop]) && _.isObject(target[prop])) {
        missing[prop] = {};
        numMissing += this.checkMissing(target[prop], mask[prop], missing[prop]);
      }
    }
    return numMissing;
  },

  calculateMarginalState(user, requiredDetails) {
    var missing = {};
    var numMissing = this.checkMissing(user, requiredDetails, missing);
    return {
      currentMissing: missing,
      currentNumMissing: numMissing
    };
  },

  calculateInitialState(user, requiredDetails) {
    var missing = {};
    var numMissing = this.checkMissing(user, requiredDetails, missing);
    return {
      currentMissing: missing,
      currentNumMissing: numMissing,
      initialMissing: missing,
      initialNumMissing: numMissing
    };
  },

  getInitialState() {
    return this.calculateInitialState(this.props.user, this.props.requiredDetails);
  },

  refreshMarginalState() {
    this.setState(this.calculateMarginalState(this.props.user, this.props.requiredDetails));
  },

  handleSubmit(event) {
    this.setState(this.calculateInitialState(this.props.user, this.props.requiredDetails));
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.user._id !== this.props.user._id) {
      this.setState(this.calculateInitialState(nextProps.user, nextProps.requiredDetails));
    }
  },

  render() {
    console.log("rerendering");
    return (
        this.state.initialNumMissing > 0 &&
        <form id="missingDetailsForm" className="ui form" onSubmit={this.handleSubmit} ref="form" key={this.props.user._id} onChange={this.refreshMarginalState}>

            <h3 className="ui header">Some required information is missing:</h3>
          {
            this.state.initialMissing.profile.phone &&
            <div className="two fields">
              <div className="field">
                <label>Cell Number</label>
                <input type="tel" placeholder="(123) 456-7890" name="phone" value={this.props.user.profile.phone} onChange={(event) => {
                    Meteor.users.update(this.props.user._id, {
                      $set: {
                        "profile.phone": event.target.value
                      }
                    });
                  }}/>
              </div>
            </div>
          }
          {
            this.state.currentNumMissing === 0 &&
            <button className="ui primary button" type="submit">Continue</button>
          }
        </form>
    );
  },
  componentDidMount() {
    if(this.state.initialNumMissing > 0) {
      var formNode = this.refs.form.getDOMNode();
      $(formNode).find(".ui.dropdown").dropdown();
    }
  },
  componentDidUpdate() {
    if(this.state.initialNumMissing > 0) {
      var formNode = this.refs.form.getDOMNode();
      $(formNode).find(".ui.dropdown").dropdown();
    }
  }

});
