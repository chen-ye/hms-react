if (Meteor.isClient) {
  // This code is executed on the client only

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    // React.render(<MainLayout />, document.getElementById("render-target"));
  });
}
