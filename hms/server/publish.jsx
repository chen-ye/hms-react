// server
Meteor.publish("loggedInData", function () {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId },
                                 { fields: { 'emails': 1 } });
    } else {
        this.ready();
    }
});

Meteor.publish(null, function () {
    return Meteor.users.find({}); //, { fields: { 'roles': 1 } }
})