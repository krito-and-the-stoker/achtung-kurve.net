


export default class Recorder{

	constructor(props){
		this.active = false;

		this.width = props.width;
		this.height = props.height;
		this.players = props.players;
		this.steps = [];
		this.filename = props.filename;
	}

	record(lines, time){
		if(this.active){		
			var newLines = [];
			lines.forEach((line) => {
				newLines.push({
					from: line.from,
					to: line.to,
					playerId: line.player.id
				});
			});

			this.steps.push({
				lines: newLines,
				time: time
			});
		}
	}

	export(){
		if(this.active){		
			var data = JSON.stringify(this);
		    var a = document.createElement("a");
		    document.body.appendChild(a);
		    a.style = "display: none";

	        var blob = new Blob([data], {type: "octet/stream"});
	        var url = window.URL.createObjectURL(blob);
	        a.href = url;
	        a.download = this.filename;
	        a.click();
	        window.URL.revokeObjectURL(url);
		}
	}

}