const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgame = document.querySelector(".btn");
const poppers = document.querySelector(".poppers");
let currPlayer;
let gameGrid;

let clickSound = document.querySelector("#clickSound");
let drawSound = document.querySelector("#drawSound");
let winSound = document.querySelector("#winSound");
let clapping = document.querySelector("#clapping");

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

init();

// Lets create a function to initialise the game
function init(){
    
    currPlayer = 'X';
    winSound.pause();
    clapping.pause();
    drawSound.pause();
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newgame.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currPlayer}`;
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    })
}


boxes.forEach((box, index)=>{
    box.addEventListener('click', ()=>{
        handleClick(index);
    })
})

function swapTurn(){
    if(currPlayer === 'X') currPlayer = 'O';
    else currPlayer = 'X';

    gameinfo.innerText = `Current Player - ${currPlayer}`;

}
function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        clickSound.play();
        //swap turn
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();
    }
}

function checkGameOver(){
    let ans = "";
    winningPositions.forEach((position) =>{
        if((gameGrid[position[0]] !== "") && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]){
            if(gameGrid[position[0]] === 'X'){
                ans = 'X';
            }
            else{
                ans = 'O';
            }
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans !== ""){
        newgame.classList.add("active");
        gameinfo.innerText = `Winner Player - ${ans}`;
        boxes.forEach((box, index)=>{
            boxes[index].style.pointerEvents = "none";

        })
        winSound.play();
        clapping.play();
    }
    let fillCount = 0;

    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        drawSound.play();
        gameinfo.innerText = "Game Tied!"
        newgame.classList.add("active");
        
    }
}

newgame.addEventListener('click', init);