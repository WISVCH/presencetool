import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';

import { Event } from '../imports/data_structures/event.js';

Meteor.startup(function(){
	//Creating stubbed data
	Events.remove({});

	e1 = new Event("Lunchlecture 1");
	e2 = new Event("Lunchlecture 2");
	e3 = new Event("Lunchlecture 3");

	Events.insert(e1);
	Events.insert(e2);
	Events.insert(e3);
});