import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Registrations } from '../../collections/registrations.js';

import { Router } from 'meteor/iron:router';

import './index.html';

function checkCode(code) {
	var icode = parseInt(code);
	var relatedReg = Registrations.findOne({ucode: icode});

	if(!relatedReg){
		console.log("Registration not found");
		return;
	}

	if(!relatedReg.present){
		Registrations.update({_id: relatedReg._id}, {
			$set: {present: 1}
		});
		console.log("Presence of " + relatedReg.name + " has been registered!");
		return;
	}

	console.log("Presence of " + relatedReg.name + " has already been registered");
}

Template.liveTool.onCreated(function() {
	this.autorun(() => {
		Meteor.subscribe('registrations', this.data._id);
	});
});

Template.liveTool.events({
	'click #backToEventBTN': function(){
		Router.go('event', {_id: this._id});
	},
	'input #regCodeInput': function(rci){
		var inputVal = rci.target.value;
		var codeLength = inputVal.length;

		if(codeLength == 4){
			checkCode(inputVal);
			rci.target.value = "";
		}
	}
});