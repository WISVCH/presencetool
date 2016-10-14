import { Accounts } from 'meteor/accounts-base';

export const Settings = {
	correctColor: "green",
	wrongColor: "red",
	feedbackColorTimeSeconds: 0, //0 equals infinity
	adminUserName: "houthakker",
	adminPass: "willem"
}
	 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});