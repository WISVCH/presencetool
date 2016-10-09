import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import { Router } from 'meteor/iron:router';

import './index.html';

Template.eventOverview.onCreated(function() {
	Meteor.subscribe('events');
});

Template.eventOverview.events({
	'click #liveToolBTN': function(){
		Router.go('event.livetool', {_id: this._id});
	}
})