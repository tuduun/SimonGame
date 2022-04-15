var gamebuttons = document.querySelectorAll(".buttonClass");
var userChoices = [];
var gamePattern = [];
var level = 0;
var points = 0;
// set delay for user response

const delay = 4000;

// functions

// random button ID generator.
const chooseRandomBtn = () => {
    let choice = Math.floor(Math.random() * elements.length);
    // debug codes
    // console.log(choice);
    // console.log(elements[choice]);
    return elements[choice]
};

const validatePattern = () => {
    if(userChoices.length !== gamePattern.length){
        return false
    }
    for (var i = 0; i < userChoices.length; i++){
        if(userChoices[i] !== gamePattern[i]) return false
    }
    return true
}

function playTurn(){
    let level = 0
    userChoices = [];
    gamePattern.push(chooseRandomBtn());
    const turn = setInterval(() =>{
        let id = gamePattern[level];
        activateButton(id);
        level++;
        if(level >= gamePattern.length){
            clearInterval(turn);
        }
    },1000);
    setTimeout(() =>{
        if(validatePattern()){
            playTurn();
            points++;
            document.getElementById("points").innerText = `Points: ${points}`;
        }else{
            console.log("You lose")
        }
    }, gamePattern.length * delay);
}

function activateButton(id){
    const elem = document.getElementById(id);
    const origBg = elem.style.backgroundColor;
    setTimeout(()=>{
        elem.style.backgroundColor = "#FFF";
    }, 500);
    setTimeout(()=>{
        elem.style.backgroundColor = origBg;
    }, 750);
}

// Put all the IDs in an array
const elements = Array.from(gamebuttons).map(button => {
    return button.id;
});

//for every game button
gamebuttons.forEach(elem => {
    elem.addEventListener("click", (evt) => {
        let source = evt.target.id;
        userChoices.push(source);
        activateButton(source)
        const data = elem.getAttribute("data-button");
        const sound = document.querySelector(`[data-sound = '${data}']`);
        sound.play();
    });
});

var startButton = document.getElementById("points")
startButton.addEventListener("click", () => {
    document.getElementById("points").innerText = `Points: ${points}`;
    startButton.style.backgroundColor = "#FF3898";
    userChoices = [];
    gamePattern = [];
    playTurn();
});


// function calls

gamePattern.push(chooseRandomBtn());
console.log(gamePattern)
