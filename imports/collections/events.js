import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
	Meteor.publish('events', function() {
		return Events.find();
	});
}

Events.allow({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Events.deny({
	insert() { return false; },
	update() { return false; },
	remove() { return false; },
});