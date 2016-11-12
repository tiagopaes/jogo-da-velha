//Jogo da velha

var players = [
	{	
		scoreBoard: 0,
		value: 1,
		turn: false,
		write: "X",
		won: function(){
				document.getElementById('textWon').innerHTML = "Venceu!";
				document.getElementById('iconWon').innerHTML = "X";
				document.getElementById('iconWon').style.display = "block";
				document.getElementById('won').style.display = 'block';
			}
	},

	{
		scoreBoard: 0,
		value: -1,
		turn: true,
		write: "O",
		won: function(){
				document.getElementById('textWon').innerHTML = "Venceu!";
				document.getElementById('iconWon').innerHTML = "O";
				document.getElementById('iconWon').style.display = "block";
				document.getElementById('won').style.display = 'block';
			}
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
				players[player].scoreBoard ++;
				document.getElementById(players[player].write).innerHTML = "" + players[player].scoreBoard;
				break;
			}
		}
		this.draw();
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

	this.restart = function(){
		gameOver = false;
		board = [true,true,true,true,true,true,true,true,true];
		valuePositions = [0,0,0,0,0,0,0,0,0];
		for(var i = 0; i <= 8; i++){
			var id = "position" + i;
			var position = document.getElementById(id);
			position.innerHTML = "";
		}
	}

	this.draw = function(){
		for(var i=0;i<=8;i++){
			if(board[i]){
				console.log('true');
				return true;
			}
		}
		if(!gameOver){
			console.log('chamou');
			document.getElementById('textWon').innerHTML = "Empatou!";
			document.getElementById('iconWon').style.display = 'none';
			document.getElementById('won').style.display = 'block';
		}
	}
}

//events

var jogoDaVelha = new Game(players);
var restartButon = document.getElementById('restart');

for (var i = 0; i<=8; i++) {
	jogoDaVelha.boardEvent(i);	
}

restartButon.addEventListener('click', function(){
	document.getElementById('won').style.display = 'none';
	jogoDaVelha.restart();
});
