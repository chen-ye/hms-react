Meteor.methods({
  /**
   * mark a user as checked in
   *
   * @method updateUser
   * @param {String} targetUserId _id of user to check in
   */
  checkIn(targetUserId) {
    const loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer', 'volunteer'
    ])) {
      Meteor.users
        .update(targetUserId, {
          $set: {
            "hackerStatus.checked_in": true
          }
        });
    } else {
      throw new Meteor.Error(403, "Not authorized to check users in");
    }
  },
  /**
   * update a user other than yourself
   *
   * @method updateUser
   * @param {String} targetUserId _id of user to update
   * @param {Mongo Modifier} modifier How to update the user
   */
  updateUser(targetUserId, modifier) {
    const loggedInUser = Meteor.user();

    const userRoles = Roles.getRolesForUser(loggedInUser);

    const userIsAdmin = _.indexOf(userRoles, 'admin') !== -1;
    const userIsOrganizer = _.indexOf(userRoles, 'organizer') !== -1;
    const userIsVolunteer = _.indexOf(userRoles, 'volunteer') !== -1;

    const targetRoles = Roles.getRolesForUser(targetUserId);

    const targetIsAdmin = _.indexOf(targetRoles, 'admin') !== -1;
    const targetIsOrganizer = _.indexOf(targetRoles, 'organizer') !== -1;
    const targetIsVolunteer = _.indexOf(targetRoles, 'volunteer') !== -1;

    const adminCanEdit = true;
    const organizerCanEdit = !targetIsAdmin && !targetIsOrganizer;
    // Modify this if you don't want your volunteers to get full write access to non-organizer data
    const volunteerCanEdit = !targetIsAdmin && !targetIsOrganizer && !targetIsVolunteer;

    if (userIsAdmin && adminCanEdit || userIsOrganizer && organizerCanEdit || userIsVolunteer && volunteerCanEdit) {
      Meteor.users
        .update(targetUserId, modifier);
    } else {
      throw new Meteor.Error(403, "Not authorized to update this user");
    }
  },
  setUserHacker(targetUserId, userIsHacker) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer', 'volunteer'
    ])) {
      if (userIsHacker) {
        Roles.addUsersToRoles(targetUserId, 'hacker');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'hacker');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set hackers");
    }
  },
  setUserMentor(targetUserId, userIsMentor) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer', 'volunteer'
    ])) {
      if (userIsMentor) {
        Roles.addUsersToRoles(targetUserId, 'mentor');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'mentor');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set mentors");
    }
  },
  setUserSponsor(targetUserId, userIsSponsor) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer'
    ])) {
      if (userIsSponsor) {
        Roles.addUsersToRoles(targetUserId, 'sponsor');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'sponsor');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set sponsors");
    }
  },
  setUserJudge(targetUserId, userIsJudge) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer'
    ])) {
      if (userIsJudge) {
        Roles.addUsersToRoles(targetUserId, 'judge');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'judge');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set judges");
    }
  },
  setUserVolunteer(targetUserId, userIsVolunteer) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer'
    ])) {
      if (userIsVolunteer) {
        Roles.addUsersToRoles(targetUserId, 'volunteer');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'volunteer');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set volunteers");
    }
  },
  setUserOrganizer(targetUserId, userIsOrganizer) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin', 'organizer'
    ])) {
      if (userIsOrganizer) {
        Roles.addUsersToRoles(targetUserId, 'organizer');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'organizer');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set organizers");
    }
  },
  setUserAdmin(targetUserId, userIsAdmin) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, [
      'admin'
    ])) {
      if (userIsAdmin) {
        Roles.addUsersToRoles(targetUserId, 'admin');
      } else {
        Roles.removeUsersFromRoles(targetUserId, 'admin');
      }
    } else {
      throw new Meteor.Error(403, "Not authorized to set admins");
    }
  },
  addUsersToRoles(targetUserId, roles) {
    const loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
      Roles.addUsersToRoles(targetUserId, roles);
    } else {
      throw new Meteor.Error(403, "Not authorized to add arbitrary roles");
    }
  }
});
