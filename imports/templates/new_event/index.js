import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Event } from '../../data_structures/event.js';
import { Events } from '../../collections/events.js';

import { RegistrationsManager } from '../../modules/registrationsmanager'

import "../csv_reg_loader";
import "./index.html";

var currentEventID = "";
var currentCSVData = "";

var showMessage = function(text){
	console.log(text);
}

var csvReadHandler = function(CSVData){
	const importError = RegistrationsManager.insertRegObjectsFromCSV(currentEventID, CSVData);

	if(importError){
		showMessage(importError);
		Events.remove({_id: currentEventID});
		return;
	}

	Router.go('event', {_id: currentEventID});
};

Template.csvRegLoader.onLoad(function(CSVData){
	currentCSVData = CSVData;
});

Template.newEvent.events({
	"submit #newEventForm": function(e){
		//Don't redirect
		e.preventDefault();		

		const form = e.target;
		const eventTitle = form.etitle.value;

		currentEventID = Events.insert(new Event(eventTitle));
		
		if(currentCSVData){
			csvReadHandler(currentCSVData);
		}else{
			Router.go('event', {_id: currentEventID});
		}
	}
});