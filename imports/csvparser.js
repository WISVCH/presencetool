export const CSVParser = {
	makeRegObject: function(name, code){
		return {
			name: name,
			code: code
		}
	},
	parseCSVRegistries: function(string){
		const lines = string.split("\n");
		const tuples = lines.map((line) => {
			return line.split(",")
		});
		return tuples.map((tuple) => {
			return this.makeRegObject(tuple[0], tuple[1]);
		});
	}
};