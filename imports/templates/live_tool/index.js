import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Events } from '../../collections/events.js';

import { Router } from 'meteor/iron:router';

import './index.html';

function checkCode(context, code) {
	console.log(context);

	var relatedRegs = context.registrations.filter(function(reg){
		return reg.ucode == code;
	});

	if(relatedRegs.length == 1 && relatedRegs[0].ucode == code){
		var relatedReg = relatedRegs[0];

		if(relatedReg.present == 0){
			console.log("Entry for " + relatedReg.name);
		}
	}else{
		console.log("reg not found");
	}
}

Template.liveTool.onCreated(function() {
	Meteor.subscribe('events');
});

Template.liveTool.events({
	'click #backToEventBTN': function(){
		Router.go('event', {_id: this._id});
	},
	'input #regCodeInput': function(rci){
		var inputVal = rci.target.value;
		var codeLength = inputVal.length;

		if(codeLength == 4){
			checkCode(this, inputVal);
			rci.target.value = "";
		}
	}
});