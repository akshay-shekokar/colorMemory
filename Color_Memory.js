var game = (function(params){
	var colors=[["colour1","colour2","colour3","colour4"],
				["colour1","colour2","colour3","colour4"],
				["colour5","colour6","colour7","colour8"],
				["colour5","colour6","colour7","colour8"]];
	var score = 0,counter = 0;
	var selectedCardList = [];
	var keyPressedEvent = function(evt){
		//console.log(evt);
		var selectedCard = document.querySelector(".activeCard");
		var xpos = parseInt(selectedCard.getAttribute("data-xpos"));
		var ypos = parseInt(selectedCard.getAttribute("data-ypos"));
		
		if(evt.keyCode == 37){
			//key Left
			xpos = xpos - 1;
			if(xpos < 0){
				xpos = 0;
			}
		}
		if(evt.keyCode == 38){
			//key up
			ypos = ypos - 1;
			if(ypos < 0){
				ypos = 0;
			}
		}
		if(evt.keyCode == 39){
			//key right
			xpos = xpos + 1;
			if(xpos > 3){
				xpos = 3;
			}
		}
		if(evt.keyCode == 40){
			//key down
			ypos = ypos + 1;
			if(ypos > 3){
				ypos = 3;
			}
		}
		changeActiveCard(xpos,ypos,selectedCard);
		if(evt.keyCode == 13){
			cardSelectionEvent(xpos,ypos);
		}
	};
	var cardSelectionEvent = function(xpos,ypos){
		var card = document.querySelector(".activeCard");
			if(card.getAttribute("data-card-passed") == "false")
			{
				var obj = {
					x : ypos,
					y : xpos
				};
				if(selectedCardList.length < 2){
					card.className = card.className + " " + colors[ypos][xpos];
					selectedCardList.push(obj);
					console.log(card,selectedCardList);
				}
				if(selectedCardList.length == 2){
					var firstCard = selectedCardList[0];
					var secondCard = selectedCardList[1];
					
					if(colors[firstCard.x][firstCard.y] == colors[secondCard.x][secondCard.y]){
						score++;
						var colorClass = colors[firstCard.x][firstCard.y];
						var matchedCard = document.querySelectorAll("."+colorClass);
						for(var ind =0; ind< matchedCard.length; ind++){
							matchedCard[ind].className = matchedCard[ind].className.replace(colorClass,"removedCard");
							matchedCard[ind].setAttribute("data-card-passed","true");
						}
					}
					else{
						score--;
						alert("Wrong Selection. Try Again");
						var colorClass = colors[firstCard.x][firstCard.y];
						var matchedCard = document.querySelector("."+colorClass);
						matchedCard.className = matchedCard.className.replace(colorClass,"");
						
						colorClass = colors[secondCard.x][secondCard.y];
						matchedCard = document.querySelector("."+colorClass);
						matchedCard.className = matchedCard.className.replace(colorClass,"");
					}
					selectedCardList.splice(0);
					var scoreDiv = document.querySelector(".score");
					scoreDiv.innerHTML = score;
				}
			}
	};
	var changeActiveCard = function(xpos,ypos,selectedCard){
		selectedCard.className = selectedCard.className.replace("activeCard","");
		var newSelectedCard = document.querySelector("#card_"+xpos+"_"+ypos);
		newSelectedCard.className = newSelectedCard.className + " activeCard";
	};
	
	var counterInterval = setInterval(function(){
		var outCards = document.querySelectorAll("div[data-card-passed='true']");
		console.log(outCards.length);
		counter++;
		var counterDiv = document.querySelector(".time");
		counterDiv.innerHTML = counter;
		if(outCards.length == 16){
			clearInterval(counterInterval);
			alert("Congrats! You Win!!!");
			var userDetailsDiv = document.querySelector(".userDetails");
			userDetailsDiv.className = "userDetails";
			var gameAreaDiv = document.querySelector(".gameArea");
			gameAreaDiv.className = "gameArea hideDiv";
			
		}
		
	},1000);
	
	var restartGame = function(){
		score = 0;
		counter = 0;
		var scoreDiv = document.querySelector(".score");
		scoreDiv.innerHTML = score;
		var counterDiv = document.querySelector(".time");
		counterDiv.innerHTML = counter;
		var allCards = document.querySelectorAll(".card");
		for(var ind = 0; ind < allCards.length; ind++){
			allCards[ind].setAttribute("data-card-passed","false");
			allCards[ind].className = "card";
			if(ind == 0){
				allCards[ind].className = "card activeCard";
			}
				
		}
	};
	
	var submitUserDetails = function(){
		var username = document.querySelector("#username").value;
		var email = document.querySelector("#email").value;
		
		if(username.trim() != "" && email.trim() != ""){
			var obj = {
				"user":username,
				"emailAddress":email,
				"userScore": score,
				"requiredTime": counter
			};
			//code for sending data to server
			
			//code for receiving high score from server and displaying on client side.
		}
	}
	
	return{
		keyPressed : keyPressedEvent,
		restart : restartGame,
		submitData : submitUserDetails
	}
})();