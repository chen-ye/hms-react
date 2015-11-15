/* global React */
/* global _ */
MissingDetailsForm = React.createClass({

  propTypes: {
      user: React.PropTypes.object.isRequired,
      missingData: React.PropTypes.object.isRequired,
      currentMissing: React.PropTypes.array.isRequired,
      initialMissing: React.PropTypes.array.isRequired,
      onSubmit: React.PropTypes.func,
      onNewUser: React.PropTypes.func
  },

  componentDidMount() {
    if (!!this._form) {
      var $formNode = $(this._form);
      $formNode.find(".ui.dropdown").dropdown();
      if (!!this.props.onNewUser) {
        this.props.onNewUser();
      }
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (!!this._form) {
      var $formNode = $(this._form);
      $formNode.find(".ui.dropdown").dropdown();
      if ((this.props.user._id !== prevProps.user._id) && !!this.props.onNewUser) {
        this.props.onNewUser();
      }
    }
  },

  _handleSubmit(event) {
    event.preventDefault();
    if (!!onSubmit) {
      onSubmit();
    }
  },

  render() {
    // console.log("render");
    var self = this;
    const phonePattern = '(111) 111-1111';
    return (
      <form
        id="missingDetailsForm"
        className="ui form"
        onSubmit={this._handleSubmit}
        ref={ (form) => this._form = form }
        key={this.props.user._id}>
          <div className="action">
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
                    Meteor.users.update(this.props.user._id, modifier, {});
                  }}
                  mask={phonePattern}
                  />
              </div>
            </div>
          }
          </div>
      </form>
    );
  }
});
