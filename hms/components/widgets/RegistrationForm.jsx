RegistrationForm = React.createClass({
  getInitialState() {
    return {
      newUserData:{}
    };
  },
  handleSubmit(event) {
    event.preventDefault();
    data = this.state.newUserData;

    Accounts.createUser({
      email: data.email,
      password: data.password,
      profile: {
        name: data.name,
        school: data.school,
        year: data.year,
        majors: data.majors,
        phone: data.phone,
        dietary_restrictions: data.dietary_restrictions,
        teammates: data.teammates,
        hardware_hack: data.hardware_hack,
        first_hackathon: data.first_hackathon,
        resume: data.resume,
        links: data.links
      }
    });
  },
  inputHandler: function(event) {
    this.state.newUserData[event.target.name] = event.target.value;
  },
  renderField(id, field, options) {
    settings = {
      label: "",
      fieldClass: ""
    };
    $.extend(defaults, options);
    return (
      <div className={"field" + settings.fieldClass}>
        <label>{settings.label}</label>
        {settings.field}
      </div>
    );
  },
  renderTextInput(id, options) {
    settings = {
      type: "text",
      placeholder: ""
    };
    $.extend(defaults, options);
    return this.renderField(id, ( < input type = {
      settings.type
    }
    placeholder = {
      settings.placeholder
    }
    ref = {
      id
    } />), settings);
  },
  render() {
    return (
      <form className="registrationForm ui form" onSubmit={this.handleSubmit} ref="form" onChange={this.inputHandler}>
        <div className="two fields">
          <div className="field">
            <label>Name</label>
            <input type="text" placeholder="Josiah Carberry" name="name"/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="jcarb@beige.edu" name="email"/>
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Password" name="password"/>
        </div>
        <div className="doubling fields">
          <div className="five wide field">
            <label>School</label>
            <input type="text" placeholder="Beige University" name="school"/>
          </div>
          <div className="three wide field">
            <label>Year</label>
            <div className="ui fluid search selection dropdown">
              <input type="hidden" name="year"/>
              <div className="default text">Select Year</div>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="header">
                  Undergraduate
                </div>
                <div className="divider"></div>
                <div className="item" data-value="ug_firstyear">
                  First Year
                </div>
                <div className="item" data-value="ug_secondyear">
                  Second Year
                </div>
                <div className="item" data-value="ug_thirdyear">
                  Third Year
                </div>
                <div className="item" data-value="ug_fourthyear">
                  Fourth Year
                </div>
                <div className="header">
                  Other
                </div>
                <div className="divider"></div>
                <div className="item" data-value="g">
                  Grad School
                </div>
                <div className="item" data-value="hs">
                  High School
                </div>
              </div>
            </div>
          </div>
          <div className="three wide field">
            <label>T-Shirt Type</label>
            <div className="ui fluid buttons">
              <button className="ui button" type='button'>Men's</button>
              <button className="ui button" type='button'>Women's</button>
            </div>
          </div>
          <div className="five wide field">
            <label>T-Shirt Size</label>
            <div className="ui fluid buttons">
              <button className="ui button" type='button'>XS</button>
              <button className="ui button" type='button'>S</button>
              <button className="ui button" type='button'>M</button>
              <button className="ui button" type='button'>L</button>
              <button className="ui button" type='button'>XL</button>
              <button className="ui button" type='button'>XXL</button>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Major(s)</label>
          <div className="ui fluid search selection dropdown">
            <input type="hidden" name="majors"/>
            <i className="dropdown icon"></i>
            <div className="default text">Select Majors</div>
            <div className="menu">
              <div className="item" data-value="computer_science">
                <i className="code icon"></i>Computer Science</div>
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Cell Number (Optional)</label>
            <input type="tel" placeholder="(123) 456-7890" name="phone"/>
          </div>
          <div className="field">
            <label>Dietary Restrictions?</label>
            <input type="text" placeholder="" name="dietary_restrictions"/>
          </div>
        </div>
        <button className="ui primary button" type="submit">Submit</button>
      </form>
    );
  },
  componentDidMount: function() {
    var formNode = this.refs.form.getDOMNode();
    $(formNode).find(".ui.dropdown").dropdown();
  }

});
