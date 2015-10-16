MissingDetailsForm = React.createClass({

  propTypes: {
      // This component gets the task to display through a React prop.
      // We can use propTypes to indicate it is required
      user: React.PropTypes.object.isRequired,
      requiredDetails: React.PropTypes.object.isRequired,
      onMissingChange: React.PropTypes.func
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
    event.preventDefault();
    this.setState(this.calculateInitialState(this.props.user, this.props.requiredDetails));
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.user._id !== this.props.user._id) {
      this.setState(this.calculateInitialState(nextProps.user, nextProps.requiredDetails));
      if (!!this.props.onRefreshState) {
        this.props.onRefreshState(this.state);
      }
    }
  },

  render() {
    var self = this;
    return (
        this.state.initialNumMissing > 0 && !this.props.user.hackerStatus.checked_in &&
        <form id="missingDetailsForm" className="ui form" onSubmit={this.handleSubmit} ref="form" key={this.props.user._id} onChange={this.refreshMarginalState}>
          {
            this.state.currentNumMissing !== 0 &&
            <h3 className="ui header">Ask for required missing information:</h3>
          }
          {
            this.state.initialMissing.profile.phone &&
            <div className="two fields">
              <div className="field">
                <label>Cell Number</label>
                <input
                  type="tel"
                  placeholder="+1(123)456-7890"
                  name="phone" ref={ (ref) => {
                    if (!!ref) {
                      $(ref.getDOMNode()).inputmask("phone", {
                        url:"/jquery.inputmask/phone-codes/phone-codes.js",
                        greedy: false,
                        showMaskOnHover: false,
                        oncomplete(){
                          Meteor.users.update(self.props.user._id, {
                            $set: {
                              "profile.phone": ref.getDOMNode().value
                            }
                          });
                        }
                    });
                    }
                  }}
                  value={this.props.user.profile.phone}
                  onChange={(event) => {
                    Meteor.users.update(this.props.user._id, {
                      $set: {
                        "profile.phone": event.target.value
                      }
                    });
                  }}
                  />
              </div>
            </div>
          }
        </form>
    );
  },
  componentDidMount() {

    if(this.state.initialNumMissing > 0) {
      var formNode = this.refs.form.getDOMNode();
      $(formNode).find(".ui.dropdown").dropdown();
    }
    if(!!this.props.onMissingChange) {
      this.props.onMissingChange(this.state.initialNumMissing, this.state.currentNumMissing);
    }
  },
  componentDidUpdate( prevProps, prevState ) {
    if(this.state.initialNumMissing > 0) {
      var formNode = this.refs.form.getDOMNode();
      $(formNode).find(".ui.dropdown").dropdown();
    }
    if(this.state.currentNumMissing !== prevState.currentNumMissing || this.state.initialNumMissing !== prevState.initialNumMissing) {
      if(!!this.props.onMissingChange) {
        this.props.onMissingChange(this.state.initialNumMissing, this.state.currentNumMissing);
      }
    }
  }

});
