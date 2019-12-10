var DURATION = 900000;
var CLOCK_FACE = "15:00:00";


const clockFace = document.querySelector("#timer");
clockFace.innerHTML = CLOCK_FACE;

this.session = true; //set true if timer has not started


var seconds; //used var to make seconds available to all functions
let endTime;
let pausedTime;
let resTime;
let started = false;
let shouldInit = true;

const pad = val => (val > 9 ? val : "0" + val); //the padding function to add zeros to single digits

//init function - should be called before a new start
let init = () =>{
    endTime = Date.now()+DURATION;
    pausedTime = Date.now();
    resTime = pausedTime;
    seconds = DURATION;
};

//starter function
let start = () => {
  if (this.session === true) {
    resTime = Date.now();
    endTime += resTime-pausedTime;
    this.set_time = setInterval(() => {
      seconds = endTime -Date.now();
      if(seconds<1){
          pause();
          clockFace.classList.add("blink_me");
          seconds = 0;
      }
      if(seconds<5001){
          clockFace.style.color = "red";
      }

      clockFace.innerHTML = `${pad(Math.trunc(seconds / 60000))}:${pad(
        Math.trunc(seconds / 1000) % 60
      )}:${pad(
        Math.trunc(seconds) % 100
      )}`;
    }, 10);

    this.session = false; //timer has started
  }
};

//pause function
let pause = () => {
  clearInterval(this.set_time);
  pausedTime = Date.now();
  this.session = true; //true because timer has been paused
};

//the resume function
let cont = () => {
  start();
  this.session = false; //timer resumed
};

//the stop function
let stop = () => {
  clearInterval(this.set_time);
  seconds = DURATION; //restart timer
  clockFace.style.color = "black";
  clockFace.classList.remove("blink_me");
  clockFace.innerHTML = CLOCK_FACE;
  shouldInit = true;
  this.session = true;
};

function timerKeyPressed(event){
    console.log(event);
    switch(event.charCode+0){
         case 32:
            
            if(shouldInit) {init(); shouldInit = false;}
            if(started){
                pause();
                started = false;
                console.log("paused");
            }else{
                start();
                started = true;
                console.log("started");
            }
            break;
        case 62:
            stop();
            if(started) started = false;
            console.log("restart");
            break;
    }
}

/*
let start = () => {
  if (this.session === true) {
    this.set_time = setInterval(() => {
      seconds++;
      clockFace.innerHTML = `${pad(Math.trunc(seconds / 3600))}:${pad(
        Math.trunc(seconds / 60) % 60
      )}:${pad(seconds % 60)}`;
    }, 1000);

    this.session = false; //timer has started
  }
};

*/
