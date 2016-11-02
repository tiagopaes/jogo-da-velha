//Jogo da velha

var players = [
	{
		value: 1,
		turn: false,
		write: "X",
		won: function(){alert("X Ganhou!");}
	},

	{
		value: -1,
		turn: true,
		write: "O",
		won: function(){alert("O Ganhou!");}
	}
];

function Game(players) {
	var turn = true;
	var gameOver = false;
	var board = [true,true,true,true,true,true,true,true,true];
	var valuePositions = [0,0,0,0,0,0,0,0,0];
	var winPos = [
		[0,1,2],
		[0,4,8],
		[0,3,6],
		[3,4,5],
		[6,7,8],
		[6,4,2],
		[1,4,7],
		[2,5,8]
	];	

	this.move = function(number){
		if(gameOver){
			return false;
		}
		var player = 0;
		var id = "position" + number;
		var position = document.getElementById(id);

		if(board[number]){

			if (!turn){
				player = 1;				
			}

			position.innerHTML = players[player].write;
			turn = players[player].turn;
			board[number] = false;
			valuePositions[number] = players[player].value;
		}

		for (var i = 0; i <= 7; i++) {
			if(this.checkWinner(winPos[i])){
				gameOver = true;
				players[player].won();
				break;
			}
		}
	}

	this.checkWinner = function(positions){
		var x = positions[0];
		var y = positions[1];
		var z = positions[2];
		var sum = valuePositions[x]+ valuePositions[y]+ valuePositions[z];

		if (sum== 3 || sum== -3){
			return true;
		}
		return false;
	}

	this.boardEvent = function(number){
		var id = "position" + number;
		var position = document.getElementById(id);
		position.addEventListener('click', function(){
		jogoDaVelha.move(number);
		});
	} 
}

//events

var jogoDaVelha = new Game(players);

for (var i = 0; i<=8; i++) {
	jogoDaVelha.boardEvent(i);	
}
