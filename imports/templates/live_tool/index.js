import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import './index.html';

Template.liveTool.onCreated(function() {
	Meteor.subscribe('events');
});

Template.liveTool.helpers({ });