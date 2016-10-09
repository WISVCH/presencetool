import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import './index.html';

Template.login.onCreated(function() {
	Meteor.subscribe('events');
});

Template.login.helpers({ });