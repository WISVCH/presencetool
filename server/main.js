import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';

Meteor.startup(function(){
	//Creating stubbed data
	Events.remove({});

	Events.insert({title: "Lunchlecture 1"});
	Events.insert({title: "Lunchlecture 2"});
	Events.insert({title: "Lunchlecture 3"});
});