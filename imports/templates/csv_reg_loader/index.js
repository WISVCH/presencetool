import { Template } from 'meteor/templating';

import "./index.html";

var onLoadListeners = [];

const triggerOnLoad = function(CSVData){
	onLoadListeners.forEach((lis) => {
		lis(CSVData);
	});
}

var showMessage = function(msg){
	$(".outputSpan").text(msg);
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
};

var csvReadHandler = function(CSVData, err){
	if(err){
		showMessage(err);
		return;
	}else{
		triggerOnLoad(CSVData);
	}
};

Template.csvRegLoader.onLoad = function(callback){
	onLoadListeners.push(callback);
}

Template.csvRegLoader.events({
	"change #csvFileLoader": function(e){
		if(e.target.files.length == 0){
			return;
		}

		readCSV(e.target.files[0], csvReadHandler);
	}
});