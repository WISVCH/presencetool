import { Meteor } from 'meteor/meteor';

import { Events } from '../imports/collections/events.js';
import { Registrations } from '../imports/collections/registrations.js';

import { Event } from '../imports/data_structures/event.js';
import { Registration } from '../imports/data_structures/registration.js';

import { Settings } from '../imports/settings.js';

import { Accounts } from 'meteor/accounts-base';

var initAccounts = function(){
	if(Meteor.users.find().count() == 0){
		Accounts.createUser({
			username: Settings.adminUserName,
			password: Settings.adminPass
		});

		if(Meteor.users.find().count() == 1){
			console.log("Succesfully created the account");
		}else{
			console.log("An error occured upon creating a user account!");
		}
	};

	Accounts.config({
	  forbidClientAccountCreation : true
	});
}

Meteor.startup(initAccounts);

Meteor.methods({
	'resetPresenceOfEvent': function(eventid){
		Registrations.update({eid: eventid}, {
			$set: {present: 0}
		});
	},
	'removeRegistrationsOfEvent': function(eventid){
		Registrations.remove({eid: eventid});
	}
});
 
