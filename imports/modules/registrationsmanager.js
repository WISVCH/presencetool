import { CSVParser } from './csvparser.js';

import { Registration } from '../data_structures/registration.js';
import { Registrations } from '../collections/registrations.js';

export const RegistrationsManager = {
	/*
	==========================
	       Stubbed Data
	==========================
	*/

	stubCSVData: function(){
		return "Beer van der Drift,6007\nMarjolein Bouwmeester,6001\nMaikel Kerkhof,6002";
	},

	/*
	===========================
	      Validation Methods   
	===========================
	*/

	parseToArray: function(RegObjects){
		return RegObjects.map((obj) => obj.name).join(", ");
	},

	performValidInputCheck: function(RegObjects){
		//Empty sets are fine
		if(RegObjects.length == 0){
			return;
		}

		//Check for undefined codes
		const undefinedCodes = RegObjects.filter((obj) => { return !obj.code; });

		if(undefinedCodes.length != 0){
			return "There are " + undefinedCodes.length + " undefined codes: " + this.parseToArray(undefinedCodes);
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
			return "Not all codes are of equal length. The codes of " + this.parseToArray(otherCodeLengths) + " differ in length";
		}

		//Check if there are non-numeric codes
		const invalidCodes = RegObjects.filter((obj) => { return !isFinite(obj.code); });

		if(invalidCodes.length != 0){
			return "There are invalid codes at " + this.parseToArray(invalidCodes);
		}

		//Check if there are duplicate codes
		const codesOnly = RegObjects.map((obj) => { return obj.code; });
		const duplicateCodes = RegObjects.filter((obj) => { 
			return codesOnly.filter((code) => { 
				return code === obj.code; //Code efficiency YOLOOOo
			}).length > 1;
		});

		if(duplicateCodes.length != 0){
			return "Duplicate codes at " + this.parseToArray(duplicateCodes);
		}

		//Yeeaah, we're all fine!
		return;
	},
	insertRegObjectsFromCSV(eventid, CSVInput){
		const RegObjects = CSVParser.parseCSVRegistries(CSVInput);

		return this.insertRegObject(eventid, RegObjects);
	},
	insertRegObject: function(eventid, RegObjects){
		const err = this.performValidInputCheck(RegObjects);

		if(err){
			return err;
		}

		const registrations = RegObjects.map((obj) => {
			return new Registration(eventid, obj.name, obj.code);
		});

		registrations.forEach((reg) => {
			Registrations.insert(reg);
		})
	}
};