import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../collections/events.js';

import './index.html';

Template.body.onCreated(function(){
	Meteor.subscribe('events');
});

Template.body.helpers({
	events(){
		return Events.find({});
	}
});