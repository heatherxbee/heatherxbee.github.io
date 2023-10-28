
//get focus buttons
let focusButton = document.getElementById("focus");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
//get pause/play/reset buttons
let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");
//get theme setting buttons
let root = document.documentElement;
let latteButton = document.getElementById("latte");
let matchaButton = document.getElementById("matcha");
let blushButton = document.getElementById("blush");
let chaiButton = document.getElementById("chai");
let mochaButton = document.getElementById("mocha");
let focusSetting = document.getElementById("change-focus-button");
let openDyslexicButton = document.getElementById("open-dyslexic");
let hyperlegibleButton = document.getElementById("hyperlegible")
let buttons = document.getElementsByClassName("button-74");

//declare initial variables
let interval = null;
let active = "focus";
let openDyslexic = "inactive";
let hyperlegible = "inactive";
let highContrast = "inactive";
let focusSeconds=1500;
let shortSeconds=300;
let longSeconds=900;
let remainingSeconds = focusSeconds


window.onload=function(){ //make sure everything is loaded before looking 

changeMode();
changeFont();


//----event listeners----

//timer controls  
startButton?.addEventListener("click", ()=>{ //if start button is clicked
        if(interval===null){
            start();
        }else{
            stop();
        }
});
resetButton?.addEventListener("click", ()=>{//when rest button is clicked
    stop();
    resetTimer();
});
focusButton?.addEventListener("click", ()=>{//when focus button clicked
    if (active==="short"||active==="long"){
        if (interval===null){
            focusMode();
        }else{
            let answer = confirm("a timer is already active! \n are you sure you want to start a new one?")
            if(answer=true){
                focusMode();
                stop();
            }
        }
    }
    }    
);
shortBreakButton?.addEventListener("click", ()=>{//when short break button is clicked
    if (active==="focus"||active==="long"){
        if (interval===null){
            shortBreakMode();
        }else{
            let answer = confirm("a timer is already active! \n are you sure you want to start a new one?")
            if(answer=true){
                shortBreakMode();
                stop()
            }
        }
    }
    }    
);
longBreakButton?.addEventListener("click", ()=>{//when long break button is clicked
    if (active==="focus"||active==="short"){
        if (interval===null){
            longBreakMode();
        }else{
            let answer = confirm("a timer is already active! \n are you sure you want to start a new one?")
            if(answer=true){
                longBreakMode();
                stop();
            }
        }
    }
    }    
);

//theme controls
latteButton?.addEventListener("click", ()=>{ //when click latte button
    sessionStorage.setItem("mode", "latte");
    changeMode();
});
matchaButton?.addEventListener("click", ()=>{//when click matcha button
    sessionStorage.setItem("mode", "matcha");
    changeMode();
});
blushButton?.addEventListener("click", ()=>{//when click blush button
    sessionStorage.setItem("mode", "blush");
    changeMode();
});
chaiButton?.addEventListener("click", ()=>{//when click chai button
    sessionStorage.setItem("mode", "chai");
    changeMode();
});
openDyslexicButton?.addEventListener("click", ()=>{//when click open dyslexic button
    if(openDyslexic === "inactive"){
        openDyslexic = "active";
        hyperlegible = "inactive";
        sessionStorage.setItem("openDyslexic","active");
        sessionStorage.setItem("hyperlegible","inactive");
        setHyperlegible(); 
        setOpenDyslexic(); 
    }else{
        openDyslexic = "inactive";
        sessionStorage.setItem("openDyslexic","inactive");
        setHyperlegible(); 
        setOpenDyslexic();
    }
});
hyperlegibleButton?.addEventListener("click", ()=>{//when click hyperlegible button
    if(hyperlegible === "inactive"){
        hyperlegible = "active";
        openDyslexic = "inactive";
        sessionStorage.setItem("hyperlegible","active");
        sessionStorage.setItem("openDyslexic","inactive");
        setOpenDyslexic(); 
        setHyperlegible(); 
    }else{
        hyperlegible = "inactive";
        sessionStorage.setItem("hyperlegible","inactive");
        setOpenDyslexic(); 
        setHyperlegible();
    }
});
}

//----functions----
function updateTime() { //formats the seconds into time
    const mins = Math.floor(remainingSeconds/60); // turn seconds to minutes
    const secs = remainingSeconds % 60 ; // seconds
    if(document.getElementById("timer-minutes")){
        document.getElementById("timer-minutes").innerHTML = mins.toString().padStart(2,"0");// if number has less than two digits
        candle = getCandle(mins);
        if(document.getElementById("candleimg")){
        document.getElementById("candleimg").src=candle}
    }
    if(document.getElementById("timer-seconds")){
        document.getElementById("timer-seconds").innerHTML = secs.toString().padStart(2,"0");// then add 0 to the front
    }
};

function updateControls(){ //togggles play/pause buttons
    if (interval=== null){ //timer is not running
        document.getElementById("startimg").src = "play.png" // display play 
        }else{
            document.getElementById("startimg").src = "pause.png"; //display pause
        }     
};
function start() { //start the timer
    
    if(remainingSeconds===0) return;
    getQuote();
    interval = setInterval(() => {
        remainingSeconds--;
        getTitle();
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
    updateControls();
    document.title="pomodoro"
};
function focusMode(){ // go to focus mode
    active="focus";
    remainingSeconds = 1500;
    updateTime();

};
function shortBreakMode(){ //go to short break mode
    remainingSeconds = 300;
    active="short";
    updateTime()
};
function longBreakMode(){ // go to long break mode
    active="long";
    remainingSeconds = 900;
    updateTime();

};
function getTitle(){ //change website title
    if(active==="short"|| active ==="long"){
        const mins = (Math.floor(remainingSeconds/60)).toString().padStart(2,"0");
        const secs = (remainingSeconds % 60).toString().padStart(2,"0");
        document.title =` ${mins}:${secs} break time!`}
    else{
        const mins = (Math.floor(remainingSeconds/60)).toString().padStart(2,"0");
        const secs = (remainingSeconds % 60).toString().padStart(2,"0");
        document.title =` ${mins}:${secs} focus time!`}
};
function changeMode(){//change theme
    if(sessionStorage.getItem("mode")==="matcha"){
        document.documentElement.style.setProperty("--main-color", "#B3C2A3") 
        document.documentElement.style.setProperty("--second-color", "#302F23")
        document.documentElement.style.setProperty("--third-color", "#D1E1BF")
    }
    if(sessionStorage.getItem("mode")==="latte"){
        document.documentElement.style.setProperty("--main-color", "#E8D3B3") 
        document.documentElement.style.setProperty("--second-color", "#443726")
        document.documentElement.style.setProperty("--third-color", "#FBEEE0")
    }
    if(sessionStorage.getItem("mode")==="blush"){
        document.documentElement.style.setProperty("--main-color","#D0AD90");
        document.documentElement.style.setProperty("--second-color","#271717");
        document.documentElement.style.setProperty("--third-color","#E8C3A5");
    }
    if(sessionStorage.getItem("mode")==="chai"){
        document.documentElement.style.setProperty("--main-color","#C8AB7C");
        document.documentElement.style.setProperty("--second-color","#3D1F14");
        document.documentElement.style.setProperty("--third-color","#DDC092");
    }

}
function setOpenDyslexic(){//check for open dyslexic font
    if(sessionStorage.getItem("openDyslexic")==="active"){
        console.log("open dyslexic is active")
        document.body.style.fontFamily="Open-Dyslexic , sans-serif";
        if (openDyslexicButton) {
            openDyslexicButton.innerHTML="on";}
    }else{
        document.body.style.fontFamily="IBM Plex Mono, monospace";
        if (openDyslexicButton) {
            openDyslexicButton.innerHTML="off";}
    }
}
function setHyperlegible(){//checks for hyperlegible font
    if(sessionStorage.getItem("hyperlegible")==="active"){
        console.log("hyperlegible is active")
        document.body.style.fontFamily="Atkinson Hyperlegible, sans-serif";
        document.body.style.fontSize="20px";

        if (hyperlegibleButton) {
            hyperlegibleButton.innerHTML="on";}
    }else{
        document.body.style.fontFamily="IBM Plex Mono, monospace";
        document.body.style.fontSize="16px";
        if (hyperlegibleButton) {
            hyperlegibleButton.innerHTML="off";}
}}
function getQuote(){ //random quote generator
    if(active==="focus"){
        var quotes =["let's get focused!" , "you got this!", "you're doing amazing!",
        "the best way out is through!", "success is a journey \n not a destination",
        "it always seems impossible \n until it's done", "be enough for yourself first,\n the rest of the world can wait <3",
        "keep watering yourself,\n you're growing <3","a problem is a chance for you \n to do your best!",
        "one day, all your \n hard work will pay off", "you don't have to be great to start, \nbut you have to start to be great!",
        "success doesn't come to you,\n you go to it <3", "don't let yesterday take up \n too much of today",
        "setting goals is the first step in \n turning the invisible into the visible <3",
        "opportunities don't happen,\n you create them", "do the best you can, \n no one can do more than that <3",
        "if you can dream it, you can do it!", "do what you can, with what you have,\n where you are", "trust the process",
        "90% of what you stress about right now \n won't even matter a year from now"]

        document.getElementById("quote").textContent= quotes[Math.floor(Math.random()*quotes.length)];
    }
    if(active==="short"){
        var quotes = ["don't forget to grab a snack!", "take a moment to stretch!", "remember to stay hydrated", 
                        "relax, refresh and refocus", "sometimes the most important thing \n in a whole day is the rest we take \n  between two deep breaths",
                        "relax, enjoy the moment, be yourself", "did you need to take medication today?", "life isn't as serious as the \n mind makes it out to be",
                        "success is often a matter of \n knowing when to relax", "you have enough. you do enough. \n you are enough", 
                        "make peace with your mind, \n its your best ally", "have a moment to take some deep breaths <3", "Do something nice for yourself today",
                        "as important as it is to do work, \n it is more important to rest, relax,\n self-care, and sleep <3",
                      "time to take a well deserved break <3", "your body is precious, \n as it houses your mind and spirit",
                      "when was the last time you ate \n something today?", "relax, recharge, and reflect", "try to pause each day view nature!",
                      "taking a break can lead to breakthroughs", "disconnect to reconnect", "this is your reminder to drink water!"];
        document.getElementById("quote").textContent=quotes[Math.floor(Math.random()*quotes.length)];
    }
    if(active==="long"){
        var quotes = ["don't forget to grab a snack!", "take a moment to stretch!", "remember to stay hydrated", 
        "relax, refresh and refocus", "sometimes the most important thing \n in a whole day is the rest we take \n  between two deep breaths",
        "relax, enjoy the moment, be yourself", "did you need to take medication today?", "life isn't as serious as the \n mind makes it out to be",
        "success is often a matter of \n knowing when to relax", "you have enough. you do enough. \n you are enough", 
        "make peace with your mind, \n its your best ally", "have a moment to take some deep breaths <3", "Do something nice for yourself today",
        "as important as it is to do work, \n it is more important to rest, relax,\n self-care, and sleep <3",
      "time to take a well deserved break <3", "your body is precious, \n as it houses your mind and spirit",
      "when was the last time you ate \n something today?", "relax, recharge, and reflect", "try to pause each day and view nature!",
      "taking a break can lead to breakthroughs", "disconnect to reconnect", "this is your reminder to drink water!"];

        document.getElementById("quote").textContent=quotes[Math.floor(Math.random()*quotes.length)];
    }
}
function changeFont(){ //checks for font settings
    if(sessionStorage.getItem("openDyslexic")==="active"){
        setOpenDyslexic()}
    if(sessionStorage.getItem("hyperlegible")==="active"){
        setHyperlegible()}
}
function getCandle(minutes){ //change the candle img
    if(minutes===25){
        display="candle1.gif"
    }else{
        minutes = 25-minutes
        let number = minutes.toString();
        display = "candle"+number+".gif"
    }
    return display
}

function resetTimer(){ // reset the timer
    if(active==="focus"){
        focusMode();
    }
    if(active==="short"){
        shortBreakMode();
    }
    if(active==="long"){ 
        longBreakMode();
    }
}
