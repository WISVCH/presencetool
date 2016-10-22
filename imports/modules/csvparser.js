export const CSVParser = {
	makeRegObject: function(name, code){
		return {
			name: name,
			code: code
		}
	},
	parseCSVRegistries: function(csv){
		const lines = csv.split("\n");
		const tuples = lines.map((line) => {
			return line.split(",")
		});
		return tuples.map((tuple) => {
			return this.makeRegObject(tuple[0], tuple[1]);
		});
	}
};