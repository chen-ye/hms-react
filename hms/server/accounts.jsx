Accounts
  .onCreateUser(function(options, user) {
    // Semantics for adding things to users after the user document has been inserted
    var userId = user._id = Random.id();
    var handle = Meteor.users
      .find({
        _id: userId
      }, {
        fields: {
          _id: 1
        }
      })
      .observe({
        added: function() {
          Roles.addUsersToRoles(userId, ['hacker']);
          handle.stop();
          handle = null;
        }
      });

    // In case the document is never inserted
    Meteor
      .setTimeout(function() {
        if (handle) {
          handle.stop();
        }
      }, 30000);

    if (options.profile) {
      user.profile = options.profile;
    } else {
      user.profile = {};
    }

    user.hackerStatus = {
      accept_status: "pending",
      checked_in: false,
      project_submitted: false
    };

    return user;
  });
