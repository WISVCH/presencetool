import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import './index.html';

Template.eventOverview.onCreated(function() {
	Meteor.subscribe('events');
});

Template.eventOverview.helpers({
	events(){
		return Events.find({});
	}
});