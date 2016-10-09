import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';

import { Event } from '../imports/data_structures/event.js';
import { Registration } from '../imports/data_structures/registration.js';

var stubData = function(){
	//Creating stubbed data
	Events.remove({});

	e1 = new Event("Lunchlecture with 1 attendee");
	//e1.addRegistration(new Registration("Beer van der Drift", 6007));

	e2 = new Event("Lunchlecture with 2 attendents");
	//e2.addRegistration(new Registration("Marjolein Bouwmeester", 6001));
	//e2.addRegistration(new Registration("Beer van der Drift", 6007));

	e3 = new Event("Lunchlecture with no attendents");

	Events.insert(e1);
	Events.insert(e2);
	Events.insert(e3);
};

Meteor.startup(stubData);