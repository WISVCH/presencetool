import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Event } from '../../data_structures/event.js';
import { Events } from '../../collections/events.js';

import { RegistrationsManager } from '../../modules/registrationsmanager'

import "./index.html";

Template.newEvent.events({
	"submit #newEventForm": function(e){
		//Don't redirect
		e.preventDefault();		

		const target = e.target;
		const eventTitle = target.etitle.value;

		const eventid = Events.insert(new Event(eventTitle));
		
		const CSVData = RegistrationsManager.stubCSVData();
		const err = RegistrationsManager.insertRegObjectsFromCSV(eventid, CSVData);

		if(err){
			console.log(err);
			Events.remove({_id: eventid});
			return;
		}

		Router.go('event', {_id: eventid});
	}
});