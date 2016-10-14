export class Registration {
	constructor(event, name, ucode){
		this.eid = event._id;
		this.name = name;
		this.ucode = ucode;
		this.present = 0;
	}
};