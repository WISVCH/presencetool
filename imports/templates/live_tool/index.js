import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import { Router } from 'meteor/iron:router';

import './index.html';

Template.liveTool.onCreated(function() {
	Meteor.subscribe('events');
});

Template.liveTool.events({
	'click #backToEventBTN': function(){
		Router.go('event', {_id: this._id});
	}
});