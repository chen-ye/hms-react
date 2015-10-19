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
    console.log("render");
    var self = this;
    var springParams = [415,28];
    const phonePattern = '(111) 111-1111';
    autofocusSet = false;
    return (
      <Transition
        measure={true}
        onlyChild={true}
        enter={{
          height: 'auto',
          opacity: 1
        }}
        leave={{
          height: 0,
          opacity: 0
        }}
        springParams={springParams}>
        {
          !!this.props.user && this.props.initialMissing.length > 0 && !this.props.user.hackerStatus.checked_in &&
          <div className="ui collapsible container">
            <form
              id="missingDetailsForm"
              className="ui form"
              onSubmit={this.handleSubmit}
              ref={ (form) => {
                if( !!form ) {
                  var $formNode = $(form.getDOMNode());
                  $formNode.find(".ui.dropdown").dropdown();
                  $formNode.find("input")[0].focus();
                  //console.log($formNode.find("input"));
                }
              }}
              key={this.props.user._id}>
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
                        autoFocus={true}
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
                        pattern={phonePattern}
                        ref={ (phone) => {
                          console.log(phone);
                        }}
                        />
                    </div>
                  </div>
                }
            </form>
        </div>
        }
      </Transition>
    );
  }
});
