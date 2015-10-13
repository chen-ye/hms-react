Meteor.methods({
    /**
     * update a user's permissions
     *
     * @param {Object} targetUserId Id of user to update
     * @param {Array} roles User's new permissions
     * @param {String} group Company to update permissions for
     */
    updateRoles: function (targetUserId, roles, group) {
        var loggedInUser = Meteor.user();

        if (!loggedInUser ||
            !Roles.userIsInRole(loggedInUser,
                                ['admin'], group)) {
            throw new Meteor.Error(403, "Access denied");
        }

        Roles.setUserRoles(targetUserId, roles, group);
    }
});
