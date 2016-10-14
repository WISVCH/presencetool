import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';
import { Registrations } from '../imports/collections/registrations.js';

import { Event } from '../imports/data_structures/event.js';
import { Registration } from '../imports/data_structures/registration.js';

var stubData = function(){
	//Creating stubbed data
	Events.remove({});
	Registrations.remove({});

	e1 = new Event("Lunchlecture with 1 attendee");
	e1._id = Events.insert(e1);

	Registrations.insert(new Registration(e1, "Beer van der Drift", 6007));

	e2 = new Event("Lunchlecture with 2 attendents");
	e2._id = Events.insert(e2);

	Registrations.insert(new Registration(e2, "Marjolein Bouwmeester", 6001));
	Registrations.insert(new Registration(e2, "Maikel Kerkhof", 6002));

	e3 = new Event("Lunchlecture with no attendents");
	e3._id = Events.insert(e3);
};

Meteor.startup(stubData);

Meteor.methods({
	'resetPresenceOfEvent': function(eventid){
		Registrations.update({eid: eventid}, {
			$set: {present: 0}
		});
	},
	'removeRegistrationsOfEvent': function(eventid){
		Registrations.remove({eid: eventid});
	}
});