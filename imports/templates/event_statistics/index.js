import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Registrations } from '../../collections/registrations.js';

import './index.html';

Template.eventStatistics.helpers({
	nonPresCount: function(){
		//This helper depends on a subscription of a parent template
		return Registrations.find({present: 0}).count();
	},
	presCount: function(){
		//This helper depends on a subscription of a parent template
		return Registrations.find({present: 1}).count();
	}
});