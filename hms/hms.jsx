if (Meteor.isClient) {
  // This code is executed on the client only

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<MainLayout />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
    Accounts.onCreateUser(function (options, user) {
        // Semantics for adding things to users after the user document has been inserted
        var userId = user._id = Random.id();
        var handle = Meteor.users.find({ _id: userId }, { fields: { _id: 1 } }).observe({
            added: function () {
                Roles.addUsersToRoles(userId, ['hacker']);
                handle.stop();
                handle = null;
            }
        });

        // In case the document is never inserted
        Meteor.setTimeout(function () {
            if (handle) {
                handle.stop();
            }
        }, 30000);

        if (options.profile)
            user.profile = options.profile;
        return user;
    });
}
