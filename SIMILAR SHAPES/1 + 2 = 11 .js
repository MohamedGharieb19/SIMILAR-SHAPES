document.querySelector('.controls-button span.main').onclick = function () {
    let yourName = prompt('Hello..! \n Please enter you name... ');

    if (yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = "GUEST";
    }else {
        document.querySelector('.name span').innerHTML = " " + yourName;
    }
    document.querySelector('.controls-button').remove();

};

let duration = 1000;
let blockscontainer = document.querySelector('.memory-game');
let blocks = Array.from(blockscontainer.children);
let orderrange = [...Array(blocks.length).keys()];
var gameover = document.getElementById('game-over'),
    gamefinish = document.getElementById('game-finish');
shuffle(orderrange);

blocks.forEach((block ,index) => {
    block.style.order = orderrange[index];

    block.addEventListener('click', function () {
        flippedblock(block);
    });
});

succsseful ();
maxnumb ();    

function maxnumb() {
    if (wcounter === 15){
        blockscontainer.classList.add('noclick');
    blockscontainer.classList.add('hidden');
    gameover.classList.remove('hide');
    document.getElementById('finish').play();
    clearInterval(countdown);
    }
};

function flippedblock(selectedblock){
    selectedblock.classList.add('was-flipped');

    let allflipped = blocks.filter(flippedblock => flippedblock.classList.contains('was-flipped'));
    if (allflipped.length === 2){
        stopclicking();
        matchedblock (allflipped[0], allflipped[1]);
    }
};

function failed () {
    blockscontainer.classList.add('noclick');
    blockscontainer.classList.add('hidden');
    gameover.classList.remove('hide');
};

function stopclicking () {
    blockscontainer.classList.add('noclick');
    setTimeout( () => {
        blockscontainer.classList.remove('noclick');
    },duration);
};



var counter = 0,
    wcounter = 0;

function matchedblock (firstblock, secondblock){
    let wrongtrials = document.querySelector('.trials span');
    let righttrials = document.querySelector('.right-trials span');
    let left = document.querySelector('.left span');
    if (firstblock.dataset.carlogo === secondblock.dataset.carlogo){
        firstblock.classList.remove('was-flipped');
        secondblock.classList.remove('was-flipped');

        firstblock.classList.add('is-matching');
        secondblock.classList.add('is-matching');

        setTimeout ( () => {
        firstblock.classList.add('hidden');
        secondblock.classList.add('hidden');
        },500);
        
        counter++;
        left.innerHTML = parseInt(left.innerHTML) - 1;
        righttrials.innerHTML = parseInt(righttrials.innerHTML) + 1;
        document.getElementById('sucess').play();
        
        
    }else {
        setTimeout ( () => {
            firstblock.classList.remove('was-flipped');
            secondblock.classList.remove('was-flipped');
        },duration);
        document.getElementById('fail').play();
        wrongtrials.innerHTML = parseInt(wrongtrials.innerHTML) + 1;
        wcounter++;
    }

};
    function succsseful () {
        if (counter === 10){
            gamefinish.classList.remove('hide');
           document.getElementById('sucesssed').play();
           clearInterval(countdown);
        }
    };


function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
};


var seconds = 180,
countdown = document.getElementById('count-down'),
secondpass;

countdown = setInterval(function (){
    'use strict';
    secondpass();
}, 1000);

function secondpass() {
    'use strict';

  var min = Math.floor(seconds / 60),
      reminderSec = seconds % 60;
        
    if (reminderSec < 10 ) {
        reminderSec = "0" + reminderSec;
        
    }if (min < 10) {
        min = "0" + min;
    }
    document.querySelector('.count-down span').innerHTML = min + ":" + reminderSec;

      if (seconds > 0) {
        seconds = seconds - 1;
        succsseful ();
        maxnumb();
    }else {
        clearInterval(countdown);
        failed ();
        document.getElementById('finish').play();
    }    
}