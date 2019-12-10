let CSV_FILE = "data.csv";
let UPDATE_INTERVAL = 500;
let NATURAL_REFRESH_INTERVAL = 5000;
let LENGTH = 11;


let prevTable=[];
for(i=0;i<LENGTH;i++){
	d={'teamname':'', 'points':0};
	prevTable.push(d);
}

let updateTableVar = updateTable();
updateTableVar = setInterval(updateTable, UPDATE_INTERVAL);
let naturalRefresh = setInterval(refreshAnim, NATURAL_REFRESH_INTERVAL);


function getRank(points, data){
	for(let i=0; i<LENGTH; i++){
		if(data[i].points==points) return (i+1);
	}
}

function updateTable(){
	console.log('prevTable', prevTable);
	d3.csv(CSV_FILE,function(data) {
		
		//required data conversions
		data.forEach(function(d) {
			d.points=+d.points;
			d.teamname=d.teamname.toString();
		});
		
		//sorting in points oredr
		data.sort(function(x, y){
			return d3.descending(x.points, y.points);
		});

		//construction html string
		tablestr = "";
		changed = false;
		for(let i=0; i<LENGTH; i++){
			if(data[i].points!=prevTable[i].points){
				console.log(data[i].points, prevTable[i].points);
				console.log('table changed');
				changed = true;
				break
			}
		}
		if(true){
			for(let i=0; i<LENGTH; i++){
				tablestr=tablestr+'<tr id=row'+(i+1).toString()+' class="list__row" data-image="https://www.formula1.com/content/fom-website/en/drivers/lewis-hamilton/_jcr_content/image.img.1920.medium.jpg/1533294345447.jpg" data-nationality="British" data-dob="1985-01-07" data-country="gb">  <td class="list__cell"><span class="list__value">'+(getRank(data[i].points,data)).toString()+'</span></td><td class="list__cell"><span class="list__value">'+data[i].teamname+'</span></td><td class="list__cell"><span class="list__value">'+data[i].points+'</span></td></tr>'
				//<td class="list__cell"><span class="list__value">'+data[i].points+'</span></td>
			}
		}
		document.getElementById("leaderboard").innerHTML = tablestr;

		for(let i=0; i<LENGTH; i++){
			if(changed) refreshAnim();
			prevTable[i].points=data[i].points;
			prevTable[i].teamname=data[i].teamname;
		}

		
	});
}

function refreshAnim(){
	for(let i=0; i<LENGTH; i++){
		setTimeout(function(){
			document.getElementById('row'+(i+1).toString()).classList.add("animate");
			//document.getElementById('row'+(i).toString()).classList.add("fade");
		},100*i);
	}
}

function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms) {
	  end = new Date().getTime();
   }
 }

function csvKeyPressed(event){
	switch (event.charCode+0){
		case 116:
		$(document).ready(function(){$("#myCarousel").carousel("pause");});
		$(document).ready(function(){$("#myCarousel").carousel("next");});
		break;
	}
	
	 
}

