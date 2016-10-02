import { Template } from 'meteor/templating';

import './index.html';

Template.body.helpers({
	events: [
		{ title: "T.U.E.S.Day Lecture 1" },
		{ title: "Career College Event 2.3" },
		{ title: "Member's Lunch 4" }
	]
});