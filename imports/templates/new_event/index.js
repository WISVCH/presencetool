import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import { Event } from '../../data_structures/event.js';
import { Events } from '../../collections/events.js';

import { Registration } from '../../data_structures/registration.js';
import { Registrations } from '../../collections/registrations.js';

import { CSVParser } from '../../csvparser.js';

import "./index.html";

/*
==========================
       Stubbed Data
==========================
*/

var stubData = function(){
	return "Beer van der Drift,6007\nMarjolein Bouwmeester,6001\nMaikel Kerkhof,6002";
}

/*
===========================
      Validation Methods   
===========================
*/

var parseToArray = function(RegObjects){
	return RegObjects.map((obj) => obj.name).join(", ");
}

var performValidInputCheck = function(RegObjects){
	//Empty sets are fine
	if(RegObjects.length == 0){
		return;
	}

	//Check for undefined codes
	const undefinedCodes = RegObjects.filter((obj) => { return !obj.code; });

	if(undefinedCodes.length != 0){
		return "There are " + undefinedCodes.length + " undefined codes: " + parseToArray(undefinedCodes);
	}

	//Check for undefined names
	const undefinedNames = RegObjects.filter((obj) => { return !obj.name; });

	if(undefinedNames.length != 0){
		return "There are " + undefinedNames.length + " undefined names. Corresponding codes are: " + undefinedNames.map((obj) => obj.code).join(", ");
	}

	//Check if all codes are same lengths
	const codeLength = RegObjects[0].code.length;
	const otherCodeLengths = RegObjects.filter((obj) => { return obj.code.length != codeLength; });

	if(otherCodeLengths.length != 0){
		return "Not all codes are of equal length. The codes of " + parseToArray(otherCodeLengths) + " differ in length";
	}

	//Check if there are non-numeric codes
	const invalidCodes = RegObjects.filter((obj) => { return !isFinite(obj.code); });

	if(invalidCodes.length != 0){
		return "There are invalid codes at " + parseToArray(invalidCodes);
	}

	//Check if there are duplicate codes
	const codesOnly = RegObjects.map((obj) => { return obj.code; });
	const duplicateCodes = RegObjects.filter((obj) => { 
		return codesOnly.filter((code) => { 
			return code === obj.code; //Code efficiency YOLOOOo
		}).length > 1;
	});

	if(duplicateCodes.length != 0){
		return "Duplicate codes at " + parseToArray(duplicateCodes);
	}

	//Yeeaah, we're all fine!
	return;
}

Template.newEvent.events({
	"submit #newEventForm": function(e){
		//Don't redirect
		e.preventDefault();

		const CSVInput = stubData();
		const RegObjects = CSVParser.parseCSVRegistries(CSVInput);

		const err = performValidInputCheck(RegObjects);

		if(err){
			console.log(err);
			return;
		}

		const target = e.target;
		const eventTitle = target.etitle.value;

		const eventid = Events.insert(new Event(eventTitle));

		const registrations = RegObjects.map((obj) => {
			return new Registration(eventid, obj.name, obj.code);
		});

		console.log(registrations);

		registrations.forEach((reg) => {
			Registrations.insert(reg);
		})
		
		Router.go('event', {_id: eventid});
	}
});