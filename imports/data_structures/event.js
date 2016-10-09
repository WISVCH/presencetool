export class Event {
	constructor(title){
		this.title = title;
		this.registrations = [];
	}

	addRegistration(registration){
		this.registrations.push(registration);
	}
};