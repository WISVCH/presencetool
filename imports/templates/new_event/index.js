import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Event } from '../../data_structures/event.js';
import { Events } from '../../collections/events.js';

import { RegistrationsManager } from '../../modules/registrationsmanager'

import "./index.html";

var currentEventID = "";

var showMessage = function(text){
	console.log(text);
}

var readCSV = function(file, callback){
	var fr = new FileReader();

	fr.onerror = function(e){
		showMessage("An error occured: " + fr.error);
	}

	fr.onload = function(e){
		callback(fr.result);
	}

	fr.readAsText(file)
}

var csvReadHandler = function(CSVData, err){
	if(err){
		showMessage(err);
		return;
	}

	const importError = RegistrationsManager.insertRegObjectsFromCSV(currentEventID, CSVData);

	if(importError){
		showMessage(importError);
		Events.remove({_id: currentEventID});
		return;
	}

	Router.go('event', {_id: currentEventID});
};

Template.newEvent.events({
	"submit #newEventForm": function(e){
		//Don't redirect
		e.preventDefault();		

		const form = e.target;
		const eventTitle = form.etitle.value;

		currentEventID = Events.insert(new Event(eventTitle));
		
		if(form.csvinput.files.length>0){
			readCSV(form.csvinput.files[0], csvReadHandler);
		}else{
			Router.go('event', {_id: currentEventID});
		}
	}
});