

var turno = true;
var tab = [true,true,true,true,true,true,true,true,true];
var win = [0,0,0,0,0,0,0,0,0];
var gameOver = false;
var jogadores = [
	{
		img: "image-x.png",
		turno: false,
		win: 1,
		ganhou: function(){
		alert("X ganhou");
	}
},

	{
		img: "image-ball.png",
		turno: true,
		win: -1,
		ganhou: function(){
		console.log("O ganhou");
		}

	}
];

function verificaGanhador(posicao) {
	var x = posicao[0];
	var y = posicao[1];
	var z = posicao[2];
	var soma = this.win[x]+this.win[y]+this.win[z];

	if (soma== 3 || soma== -3){
		return true;
	}
	return false;
	}
		
function userChoice (user){	
	if(gameOver){
		return false;
	}		
	var i=(user - 1);
	var elName = "pos" + user;
	var jogador = 0;
	if (tab[i]){
				
		if (!turno){
			jogador = 1;				
		}
		document.getElementById(elName).src = jogadores[jogador].img;
		this.turno = jogadores[jogador].turno;
		this.win [i] = jogadores[jogador].win;

		this.tab[i]=false;
	}	
			
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
			
	for (var i = winPos.length - 1; i >= 0; i--) {
		//console.log("verificando", i);
		var ganhou = verificaGanhador(winPos[i]);
		if(ganhou){
			//console.log("ganhooooooo");
			gameOver = true;
			jogadores[jogador].ganhou();
			break;
		}
	}	
}

