import { Mongo } from 'meteor/mongo';

export const Registrations = new Mongo.Collection('registrations');

if (Meteor.isServer) {
	Meteor.publish('registrations', function(eventid) {
		return Registrations.find({eid: eventid});
	});
}

Registrations.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Registrations.deny({
	insert() { return false; },
	update() { return false; },
	remove() { return false; },
});