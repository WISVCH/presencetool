import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import './index.html';

Template.eventsOverview.onCreated(function(){
	Meteor.subscribe('events');
});

Template.eventsOverview.helpers({
	events(){
		return Events.find({});
	}
});