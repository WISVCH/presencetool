import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Registrations } from '../../collections/registrations.js';

import { Router } from 'meteor/iron:router';

import { Settings } from '../../settings.js';

import './index.html';
import '../event_statistics';

function checkCode(code) {
	var icode = parseInt(code);
	var relatedReg = Registrations.findOne({ucode: icode});

	if(!relatedReg){
		return {
			succes: false,
			registration: relatedReg,
			reason: "No registration with code " + code + " found"
		};
	}

	if(!relatedReg.present){
		return {
			succes: true,
			registration: relatedReg,
			reason: ""
		};
	}else{
		return {
			succes: false,
			registration: relatedReg,
			reason: relatedReg.name + " has already been registered as present."
		};
	}
}

function setBackgroundTint(color, seconds){
	$('html').css("background-color", color);

	if(seconds != 0){
		setTimeout(() => {
			$('html').css("background-color","");
		}, seconds * 1000);
	}
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
			result = checkCode(inputVal);

			if(result.succes){
				Registrations.update({_id: result.registration._id}, {
					$set: {present: 1}
				});
				$("#outputSpan").text(result.registration.name);
				setBackgroundTint(Settings.correctColor, Settings.feedbackColorTimeSeconds);
			}else{
				$("#outputSpan").text(result.reason);
				setBackgroundTint(Settings.wrongColor, Settings.feedbackColorTimeSeconds);
			}
			
			rci.target.value = "";
		}
	}
});