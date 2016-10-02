import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';

import { Event } from '../imports/data_structures/event.js';

Meteor.startup(function(){
	//Creating stubbed data
	Events.remove({});

	Events.insert(Event.create("Lunchlecture 1"));
	Events.insert(Event.create("Lunchlecture 2"));
	Events.insert(Event.create("Lunchlecture 3"));
});