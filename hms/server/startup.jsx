/* global Random */
/* global Roles */
/* global _ */

/*
 * On startup, initialize the users found in the adminSetup.json file in /private/config.
 */


Meteor.startup(function () {
  //Make sure that the database is empty.
  if (!Meteor.users.findOne()) {
    var users = JSON.parse(Assets.getText('config/adminSetup.json'));

    _.each(users, function (user) {
      var id;
      var tempPassword = Random.secret(10);

      //TODO: Unsafe - this is just a stopgap!
      console.log(user.email, tempPassword);

      id = Accounts.createUser({
        email: user.email,
        password: tempPassword,
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        for (var i=0; i < user.roles.length; i++) {
          Roles.addUsersToRoles(id, user.roles[i]);
        }
      }
    });
  }
});
