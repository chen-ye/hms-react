MissingDetailsForm = React.createClass({

  propTypes: {
      user: React.PropTypes.object.isRequired,
      missingData: React.PropTypes.object.isRequired,
      currentMissing: React.PropTypes.array.isRequired,
      initialMissing: React.PropTypes.array.isRequired,
      onSubmit: React.PropTypes.function
  },

  handleSubmit(event) {
    event.preventDefault();
    if (!!onSubmit) {
      onSubmit();
    }
  },

  render() {
    var springParams = [415,28];
    var self = this;
    const phonePattern = '(111) 111-1111';
    return (
      <form
        id="missingDetailsForm"
        className="ui form"
        onSubmit={this.handleSubmit}
        ref={ (form) => {
          if( !!form ) {
            var $formNode = $(form.getDOMNode());
            $formNode.find(".ui.dropdown").dropdown();
            $formNode.find("input")[0].focus();
          }
        }}
        key={this.props.user._id}
        onChange={this.refreshMarginalState}>
          {
            this.props.currentMissing.length !== 0 &&
            <h3 className="ui header">Ask for required information:</h3>
          }
          {
            _.contains(this.props.initialMissing, "phone") &&
            <div className="two fields">
              <div className="field">
                <label>Cell Number</label>
                <MaskedInput
                  type="tel"
                  name="phone"
                  value={this.props.user.profile.phone}
                  onChange={(event) => {
                    var modifier = (event.target.value === "") ?
                    {
                      $unset: {
                        "profile.phone": ""
                      }
                    } :
                    {
                      $set: {
                        "profile.phone": event.target.value
                      }
                    };
                    Meteor.users.update(this.props.user._id, modifier, {}, function(error) {
                      self.refreshMarginalState();
                    });
                  }}
                  pattern={phonePattern}
                  />
              </div>
            </div>
          }
      </form>
    );
  }
});
