"homepage": "http://gitname.github.io"

function sayHello() {
    const name = prompt("what is your name?");
    alert(`hello ${name}! welcome to my website :>`);

}

//sayHello();


//function rollDice(){
  //  let dice = Math.floor(Math.random() * 6 + 1);
    //let months += dice;
    //alert("it will take you" + months + "to get a job")



//rollDice();

function comfortLevel(){
    const h = prompt("what is ur level of html?");
    const c = prompt("what is ur level of css?");
    const j = prompt("what is ur level of js?");
    const average = (h + c + j)/3 ;
    if (average >= 7 ){
        alert("your average is" + average);
    }else if(average >= 5){
        alert("you are okay");       
    } else{
        alert("oh dear :< ");
    }
}

comfortLevel();
