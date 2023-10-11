
let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");

let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");

let remainingSeconds = 1499;
let interval = null;
let active = "focus"


//----event listeners----
startButton.addEventListener("click", ()=>{ //if start button is clicked
    if(interval===null){
        start();
    }else{
        stop();
    }
});

resetButton.addEventListener("click", ()=>{
    remainingSeconds=active
});

focusButton.addEventListener("click", ()=>{
    if (active==="short"||active==="long"){
        if (interval===null){
            focusMode();
        }else{
            let answer = confirm("a timer is already active! /n are you sure you want to start a new one?")
            if(answer=true){
                focusMode();
                stop();
            }
        }
    }
    }    
)

shortBreakButton.addEventListener("click", ()=>{
    if (active==="focus"||active==="long"){
        if (interval===null){
            shortBreakMode();
        }else{
            let answer = confirm("a timer is already active! /n are you sure you want to start a new one?")
            if(answer=true){
                shortBreakMode();
                stop()
            }
        }
    }
    }    
)

longBreakButton.addEventListener("click", ()=>{
    if (active==="focus"||active==="short"){
        if (interval===null){
            longBreakMode();
        }else{
            let answer = confirm("a timer is already active! /n are you sure you want to start a new one?")
            if(answer=true){
                longBreakMode();
                stop();
            }
        }
    }
    }    
)



//----functions----

function updateTime() { //formats the seconds into time
    const mins = Math.floor(remainingSeconds/60); // turn seconds to minutes
    const secs = remainingSeconds % 60 ; // seconds 
    document.getElementById("timer-minutes").innerHTML = mins.toString().padStart(2,"0"); // if number has less than two digits
    document.getElementById("timer-seconds").innerHTML = secs.toString().padStart(2,"0");// then add 0 to the front
};

function updateControls(){ //togggles play/pause buttons
    if (interval=== null){ //timer is not running
        document.getElementById("startimg").src = "play.png" // display play 
        }else{
            document.getElementById("startimg").src = "pause.png"; //display pause
        }     
    }

function start() { //start the timer
    if(remainingSeconds===0) return;

    interval = setInterval(() => {
        remainingSeconds--;
        updateTime();

        if(remainingSeconds===0) {
            stop()
        };
    }, 1000) //every 1 second

    updateControls()
};

function stop(){ //stop the timer
    clearInterval(interval);
    interval=null;
}

function focusMode(){
    remainingSeconds = 1500;
            updateTime()
            active="focus";
}

function shortBreakMode(){
    remainingSeconds = 300;
            updateTime()
            active="short";
}

function longBreakMode(){
    remainingSeconds = 900;
            updateTime()
            active="long";
}
