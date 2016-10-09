import { Router } from 'meteor/iron:router';

import './templates/login';
import './templates/event_overview';
import './templates/events_overview';
import './templates/live_tool';

Router.route('/', function() {
	//Logic for showing login screen or events overview
});

Router.route('/login', function() {
	this.render('login');
});

Router.route('/events', function() {
	this.render('eventsOverview');
});

Router.route('/event/:_id', function() {
	this.render('eventOverview', {
		data: this.params._id
	});
});

Router.route('/event/:_id/livetool', function() {
	this.render('liveTool');
});