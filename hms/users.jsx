Meteor.users.allow({
  update(userId, doc, fieldNames, modifier) {
    if (Roles.userIsInRole(userId, [
      'admin', 'organizer'
    ])) {
      return true;
    }
    var volunteerAllowedFields = ['hackerStatus', 'profile'];
    if (Roles.userIsInRole(userId, ['volunteer']) && (_.difference(fieldNames, volunteerAllowedFields).length === 0)) {
      return true;
    }
    return false;
  }
});
