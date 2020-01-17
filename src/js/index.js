(function init(){
    if( document.querySelector('#startGame') !== null){
        document.querySelector('#startGame').addEventListener('mouseover', e => document.querySelector('#startGame img').src = '../img/icons/startRed.png');
        document.querySelector('#startGame').addEventListener('mouseout', e => document.querySelector('#startGame img').src = '../img/icons/start.png');
    }
})();