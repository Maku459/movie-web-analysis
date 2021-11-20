function getCsvData(dataPath) {
	const request = new XMLHttpRequest();
	request.addEventListener('load', (event) => {
		const response = event.target.responseText;
		convertArray(response);
	});
	request.open('GET', dataPath, true);
	request.send();
}

getCsvData('./data.csv');
let recordlist = [];

function convertArray(data) {
	//const dataArray = [];
	const dataString = data.split('\n');
	for (let i = 0; i < dataString.length - 5; i++) {
		console.log(i);
		//dataArray[i] = dataString[i].split(',');
		if(i%6 == 0){
			var device = "web";
			var scene = dataString[i].split(',')[0];
			var date = dataString[i+4];
			var array_x = dataString[i+1].split(',');
			var array_y = dataString[i+2].split(',');
			var array_z = dataString[i+3].split(',');
	
			var record = {
				date: date,
				device: device,
				scene: scene,
				rotation: []
			};
	
			for(var m = 0; m < array_x.length; m++){
				var rotate_x = array_x[m];
				var rotate_y = array_y[m];
				var rotate_z = array_z[m];
				var rotation = {x: rotate_x, y: rotate_y, z: rotate_z}
				record.rotation.push(rotation);
			}
			recordlist.push(record);
		}
	}
	const blob = new Blob([JSON.stringify(recordlist, null, '  ')], {type: 'application\/json'});
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
    link.download = 'data.json';
    link.click();
	URL.revokeObjectURL(url);
}
