'use strict';

function Game() {

    const _this = this;

    let board = [];
    let turn = true;
    let gameOver = false;

    let winPos = [
		[0,1,2],
		[0,4,8],
		[0,3,6],
		[3,4,5],
		[6,7,8],
		[6,4,2],
		[1,4,7],
		[2,5,8]
	];

    let players = [
        {	
            score: 0,
            value: 1,
            turn: false,
            text: 'x'
        },
        {
            scoreBoard: 0,
            value: -1,
            turn: true,
            text: 'O'
        }
    ];

    let AI = {
        playing: false,
        move: function() {
            let boardLength = board.length;
            let boardPosition = Math.floor(Math.random() * boardLength);
    
            if (board[boardPosition].status) {
                _this.move(boardPosition, true);
                return;
            }
            _this.AI.move();
        }
    };

    _this.AI = AI;

    function init() {
        let table = document.querySelector('#board');
        let cells = table.querySelectorAll('td');

        for (var i = 0; i < cells.length; i ++) {
            board[i] = {
                status: true,
                value: 0,
                element: cells[i]
            };
        }

        (function eventBoard() {
            board.forEach((value, index) => {
                value.element.addEventListener('click', () => move(index));
            });
        })();

        let checkbox = document.querySelector('#onePlayer');
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                AI.playing = true;
            }
        });

        let aiStart = document.querySelector('#start');
        aiStart.addEventListener('click', () => {
            if (aiStart.checked) {
                if (AI.playing) {
                    AI.move();
                } else {
                    aiStart.checked = false;
                }
            }
        });
    }

    _this.move = move;

    function move(index, iaMove) {
        if (gameOver) return false;

        let player = 0;

        if (board[index].status) {
            if (!turn) player = 1;
            
            let currentPlayer = players[player];

            board[index].element.innerHTML = currentPlayer.text;
            board[index].value = currentPlayer.value;
            board[index].status = false;
            turn = currentPlayer.turn;
        }

        if (checkWinner()) gameOver = true;

        if (!iaMove && AI.playing) {
            setTimeout(AI.move, 1000);
        }
    }

    function checkWinner() {
        let result = false;

        winPos.forEach((value, index) => {
            let x = board[value[0]].value;
            let y = board[value[1]].value;
            let z = board[value[2]].value;

            let sum = x + y + z;

            if (Math.abs(sum) == 3) {
                result = true;
                return;
            } 
        });

        return result;
    }

    init();
}

let game = new Game();
