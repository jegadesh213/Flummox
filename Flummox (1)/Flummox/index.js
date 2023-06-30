// dice and dice roll
var teams=["gray","yellow","green","white","purple","black","darkblue","pink","cyan","litegreen"];
var team_points=[0,0,0,0,0,0,0,0,0,0];
var turn_count=0;
var last_move = [0,0];



var randomNumber1=0;
var randomImage="";

var r = Math.floor((Math.random() * 6) + 1);
var rI = "./images" + "/dice" + r + ".png";

document.querySelectorAll("img")[0].setAttribute("src", rI);


function roll_it() {
	reset();
	timer_running = false;
	var rolling = window.setInterval( ()=>{
		randomNumber1 = Math.floor((Math.random() * 6) + 1);
		randomImage = "./images" + "/dice" + randomNumber1 + ".png";
		document.querySelectorAll("img")[0].setAttribute("src", randomImage);
	}, 50)

	window.setTimeout(function () {
		window.clearInterval(rolling);
		//Get coax
		let co = getPoint(String(randomNumber1));
		// Team turns		
		if(!(team_points[turn_count]+randomNumber1>100)){
			
			team_points[turn_count]+=randomNumber1;
			
			let jam="";
			for(let i=0;i<team_points.length;i++){
				if((team_points[turn_count] == team_points[i]) && turn_count!=i){
					jam+=i.toString();
				}

			}
			console.log(jam);
			
		}
		
		last_move[0]=turn_count;
		last_move[1]=randomNumber1;
		turn_count = ((turn_count>=0 && turn_count<9) || turn_count==undefined)?turn_count+1:0;
		document.getElementById("turntxt").innerHTML=teams[turn_count]+"'s Turn";
		start(); 	
		timer_running = true;
		
		// console.log(turn_count);
	}, 1500);



}

// timer
// Global variables
const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById("stop");
const reset_btn = document.getElementById("reset");
let timer_running = false;

let seconds = 0;
let interval = null;

// Event listeners
start_btn.addEventListener('click', start);
stop_btn.addEventListener("click", stop);
reset_btn.addEventListener("click", reset);
window.onkeypress = function(event) {          //space for start and stop
	if (event.which == 32) {
		if(timer_running == true){
			stop();
		}
		else{
			start();
		}
	}
}

// Update the timer
function timer() {
	seconds++;
	// Format our time
	if(seconds>30){
		reset();
	}
	let secs = seconds % 60;
	if (secs < 10) secs = '0' + secs;
	time_el.innerText = `${secs}`;
}

function start() {
	timer_running = true;
	if (interval) {
		return
	}

	interval = setInterval(timer, 1000);
}

function stop() {
	timer_running = false;
	clearInterval(interval);
	interval = null;
}

function reset() {
	stop();
	seconds = 0;
	time_el.innerText = '00';
}


// board

boxnumbers()

function boxnumbers() {
	let boxes = document.querySelectorAll('.box')
	boxes.forEach((box, i) => {
		if (String(i).length == 1 || (String(i).length == 2 && Number(String(i)[0])) % 2 == 0) {
			box.innerHTML = 100 - i
			box.setAttribute("id",100 - i);
		} else {
			box.innerHTML = String(Number(`${9-Number(String(i)[0])}${String(i)[1]}`) + 1)
			box.setAttribute("id",String(Number(`${9-Number(String(i)[0])}${String(i)[1]}`) + 1));
		}
	})
}



// Customs



// example use

// Buttons react
function nextie(){
	turn_count = ((turn_count>=0 && turn_count<9))?turn_count+1:0;
	document.getElementById("turntxt").innerHTML=teams[turn_count]+"'s Turn";
}
function backie(){
	turn_count = ((turn_count>=0 && turn_count<9))?turn_count-1:9;
	document.getElementById("turntxt").innerHTML=teams[turn_count]+"'s Turn";
	console.log("after" + turn_count);
}
function undoie(){
	reset();
	console.log("Last Move : Team : "+last_move[0]+" Point : "+last_move[1]);
	team_points[last_move[0]]  = team_points[last_move[0]] - last_move[1] ;
}



// Ladder START
function ladder_bonus(){
	for(let i=0;i<10;i++){
		team_points[i] = (team_points[i]==3)?24:team_points[i];
		team_points[i] = (team_points[i]==27)?35:team_points[i];
		team_points[i] = (team_points[i]==39)?63:team_points[i];
		team_points[i] = (team_points[i]==32)?51:team_points[i];
		team_points[i] = (team_points[i]==53)?72:team_points[i];
		team_points[i] = (team_points[i]==74)?95:team_points[i];
		team_points[i] = (team_points[i]==80)?99:team_points[i];
	}
}
// Ladder END
//clash 
function clash_check(){

}

// Co-ordinates START
function getPoint(idea) {
	//console.log("Left : "+ target.getBoundingClientRect().left+" Top : "+target.getBoundingClientRect().top);
	//console.log(rect.top, rect.right, rect.bottom, rect.left);
	const div = document.getElementById(idea);
	const rect = div.getBoundingClientRect();
	return [
		rect.top, rect.right, rect.bottom, rect.left
	]
	console.log(`top: ${rect.top},right ${rect.right},bottom: ${rect.bottom},left: ${rect.left}`);

}
// Co-ordinates END

// Re-cordinate
function re_co(team){
	let team_dest = getPoint(team_points[team]);
	//top right bottom left
	console.log("Tracking "+teams[team]+" "+team+" "+team_points[team] );
	document.getElementById(teams[team]).style.top=team_dest[0]-10+"px";
	document.getElementById(teams[team]).style.left=team_dest[3]-630+"px";
	console.log(team_dest);
}

// Re-cordinate


function looper(){
setInterval(
	()=>{
		for(let i=0;i<10;i++){
			re_co(i);
			ladder_bonus();
		}		
	},
	500
)
}

// looper();
looper();
