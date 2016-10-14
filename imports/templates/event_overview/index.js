import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Router } from 'meteor/iron:router';
import { Registrations } from '../../collections/registrations.js';

import './index.html';
import './registration.html';
import '../event_statistics';

Template.eventOverview.onCreated(function() {
	this.autorun(() => {
		Meteor.subscribe('registrations', this.data._id);
	});
});

Template.eventOverview.events({
	'click #liveToolBTN': function(){
		Router.go('event.livetool', {_id: this._id});
	},
	'click #backToEventsBTN': function(){
		Router.go('events');
	},
	'click #resetPresenceBTN': function(){
		Meteor.call('resetPresenceOfEvent', this._id);
	},
	'click #emptyRegistrationsBTN': function(){
		Meteor.call('removeRegistrationsOfEvent', this._id);	
	}
});

Template.eventOverview.helpers({
	registrations: function(){
		return Registrations.find({});
	}
});