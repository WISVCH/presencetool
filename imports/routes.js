import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

import './templates/login';
import './templates/event_overview';
import './templates/new_event';
import './templates/events_overview';
import './templates/live_tool';
import './templates/main';

import { Events } from './collections/events.js';

Meteor.subscribe('events');

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/', function() {
	this.redirect('events');
});

Router.route('/login', function() {
	this.render('login');
});

Router.route('/events', function() {
	this.render('eventsOverview');
},
{
	name: 'events'
});

Router.route('/event/new', function() {
	this.render('newEvent');
},
{
	name: 'event.new'
})

Router.route('/event/:_id', function() {
	this.render('eventOverview', {
		data: function(){
			return Events.findOne({_id : this.params._id});
		}
	});
},
{
	name: 'event'
});

Router.route('/event/:_id/livetool', function() {
	this.render('liveTool', {
		data: function(){
			return Events.findOne({_id : this.params._id})
		}
	});
},
{
	name: 'event.livetool'
});