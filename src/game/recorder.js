


export default class Recorder{

	constructor(props){
		this.width = props.width;
		this.height = props.height;
		this.steps = [];
	}

	record(lines){
		this.steps.push(lines.slice());
	}

	export(){
		var data = JSON.stringify(this);
	    var a = document.createElement("a");
	    document.body.appendChild(a);
	    a.style = "display: none";

        var blob = new Blob([data], {type: "octet/stream"});
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'kurve.json';
        a.click();
        window.URL.revokeObjectURL(url);
	}
}