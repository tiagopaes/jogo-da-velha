'use strict';

function Game(table) {

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

    function init(table) {
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
    }

    function move(index) {
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

        if (checkWinner()) {
            gameOver = true;
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

    init(table);
}

let board = document.querySelector('#board');

let game = new Game(board);