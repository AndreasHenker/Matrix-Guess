const guesses = document.getElementById("earlierGuesses");
const yourGuess = document.getElementById("yourGuess");
const btn_playagain = document.getElementById("btn_playagain");
const matrix = document.getElementById("guessmatrix");
const gamemessage = document.getElementById("gamemessage");
const guess = document.getElementById("guesstracker");

let targetnumber = Math.round(Math.random()*100);

//console.log(targetnumber);

let allMyGuesses = [];


function checkGuess(number = parseInt(yourGuess.value)){

    if (number > 0 && number <= 100 ) {
        gamemessage.innerText = "";
    }
    
    else{
        gamemessage.innerText = "Invalid data entered!";
        return
    }

    if (number < 1){
        number = 1;
    }
    
    else{
        if (number> 100){
            number = 100;}
        else{
            number = parseInt(number);}
    }

    console.log(targetnumber == number);
    
    if(allMyGuesses.includes(number)){
        console.log("Number has been guessed before!")
        gamemessage.innerText = "This number has been selected before!";
        return //window.alert("Number has been guessed before!");
    }
    else{
        //allMyGuesses.push(number);
        allMyGuesses.unshift(number);
    }
    console.log(allMyGuesses);

    if (targetnumber == number){
        console.log("You guessed right!");
        guess.innerText = `${number} is the correct number!!!`;
        gamemessage.innerHTML = `<h4>${number}</h4>is the correct number!!!<br> It took you (only) ${allMyGuesses.length} tries.`;
        
    }
    else{
        if (targetnumber < number){
            console.log("Too high :-D")
            gamemessage.innerHTML = `${number} --> too high`;
        }
        
        else {
            console.log("Too low >:-(")
            gamemessage.innerHTML = `${number} --> too low`;
        }
    }

    let tries = "";
    console.log(tries);
    
    allMyGuesses.forEach(item => {
        tries += `<li>${item}`
        if (item > targetnumber){
            tries += ` is too high.</li>`;
            document.getElementById(`mtrx${item}`).style.backgroundColor = "black";
        }
        else {
            if (item < targetnumber) {
                tries += ` is too low.</li>`;
                document.getElementById(`mtrx${item}`).style.backgroundColor = "orange";
            }
            else {
                tries += ` is spot on!!!</li>`
                guess.innerText = `It took you ${allMyGuesses.length} tries to guess the right number!`;
                document.getElementById(`mtrx${item}`).style.backgroundColor = "green";
                document.getElementById("playagain").style.display = "block";
                document.getElementById("entryform").style.display = "none";
                //document.getElementById("recentguesses").style.display = "none";
                document.getElementById("guessmatrix").style.display = "none";
                
                
            }
        }
    });
    guesses.innerHTML = tries;
    console.log(tries);
    yourGuess.value = "";
    guess.innerText="";
};

function enterMatrix(){
    for (let i = 1; i <= 100; i++){
        matrix.innerHTML += `<div id="mtrx${i}" onclick="console.log(this.textContent); checkGuess(${i});" class="matrixelement">${i}</div>`;
        console.log(i);
    }
}

function restart(){
    targetnumber = Math.round(Math.random()*100);
    console.log(allMyGuesses)
    matrix.innerHTML = "";
    enterMatrix();
    guess.innerHTML = "";
    guesses.innerHTML = "";
    gamemessage.innerHTML = "Let's go!";
    document.getElementById("entryform").style.display = "block";
    document.getElementById("playagain").style.display = "none";
    document.getElementById("recentguesses").style.display = "block";
    document.getElementById("guessmatrix").style.display = "flex";
    while (allMyGuesses.length > 0) {allMyGuesses.pop();}
}

guess.addEventListener("click", checkGuess);
document.getElementById("entryform").addEventListener("submit", function(event){
    event.preventDefault()
  });
btn_playagain.addEventListener("click", restart);

//enterMatrix();
restart();