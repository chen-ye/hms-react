CheckinDetails = React.createClass({
  propTypes: {
      user: React.PropTypes.object,
      onCheckin: React.PropTypes.function
  },

  getInitialState() {
    console.log("getInitialState");
    return {
      missingData: undefined,
      initialMissing: [],
      currentMissing: []
    };
  },

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (!!nextProps.user) {
      if ( !this.props.user || (nextProps.user._id !== this.props.user._id)) {
        this.setState(this._calculateNewState(nextProps.user));
      } else {
        this.setState(this._calculateUpdatedState(nextProps.user));
      }
    }
  },

  _getRequiredDetails(user) {
    console.log("_getRequiredDetails", user);
    var requiredDetails = {
      "phone": {
        stringPath: "profile.phone",
        accessor: function(user) {return user.profile.phone;}
      }
    };
    if (user.profile.year === "hs") {
      requiredDetails.parentalConsent = {
        stringPath: "hackerStatus.phone",
        accessor: function(user) {return user.hackerStatus.phone;}
      };
    }
    return requiredDetails;
  },

  _checkMissing(missingData, user) {
    console.log("_checkMissing", missingData, user);
    missingArray = [];
    _.each(missingData, function(value, key) {
      if(!value.accessor(user)) {
        value.missing = true;
        missingArray.push(key);
      }
    });
    return missingArray;
  },

  _calculateNewState(user) {
    console.log("_calculateNewState", user);
    var missingData = this._getRequiredDetails(user);
    var missing = this._checkMissing(missingData, user);
    return {
      missingData: missingData,
      initialMissing: missing,
      currentMissing: missing
    };
  },

  _calculateUpdatedState(user) {
    console.log("_calculateUpdatedState", user);
    var missing = this._checkMissing(this.state.missingData, user);
    return {
      currentMissing: missing
    };
  },

  render() {
    console.log("render details");
    var springParams = [415,28];
    const self = this;

    return (
      <div className="ui basic segment">
        <MissingDetailsForm
          user={this.props.user}
          missingData={this.state.missingData}
          initialMissing={this.state.initialMissing}
          currentMissing={this.state.currentMissing}
          onSubmit={() => {
            self.setState(self._calculateNewState(self.data.selecselectedUser));
          }}
          />
        <CheckinReminders
          user={this.props.user}
          active={this.state.currentMissing.length === 0}
          onCheckin={this.props.onCheckin}
          />
      </div>
    );
  }
});
