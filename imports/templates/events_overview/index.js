import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import { Router } from 'meteor/iron:router';

import './index.html';

Template.eventsOverview.onCreated(function(){
	Meteor.subscribe('events');
});

Template.eventsOverview.helpers({
	events(){
		return Events.find({});
	}
});

Template.eventsOverview.events({
	"click .eventBTN": function(eb){
		Router.go('/event/' + eb.target.id);
	}
})