$(function(){
    var letters = ['B', 'I', 'L', 'O', 'X'];
	
	var gridIncrement = $( ".lock-dial ul" ).css('line-height').replace('px', '')/2;
	var numNums = $( ".lock-dial:eq(0) ul li" ).length;
	var halfHeight = gridIncrement*numNums;
	var initTop = -(halfHeight-gridIncrement);
	
	$( ".lock-dial ul" ).css('top', initTop);
	
	$( ".lock-dial ul" ).draggable({
		grid: [ 0, gridIncrement ],
		axis: 'y',
		drag: function(){
			var dragDir = $(this).css('top').replace('px', '') < initTop ? "up" : "down";
			
			if(dragDir == "up"){
                var curLetter = $(this).find('li:last-child').text();
                var letterIndex = letters.indexOf(curLetter);
                var nextLetter;
                if(letterIndex < 4){
                    nextLetter = letters[letterIndex + 1]
                }else{
					nextLetter = letters[0];
					// $(this).first().remove();
                }
				$(this).append('<li>'+nextLetter+'</li>');
				// while($(".lock-dial ul li").length > 5){
				// 	$(this).first().remove();
				// }
				
				// $(".lock-dial ul:eq(5)" ).remove();
			}else{
                var curLetter = $(this).find('li:first-child').text();
                var letterIndex = letters.indexOf(curLetter);
				var thisTop = parseInt($(this).css('margin-top').replace('px', ''));
				
				$(this).css({
					marginTop: thisTop-(gridIncrement*2)
				});
                
                var nextLetter;
                if(letterIndex > 0){
                    nextLetter = letters[letterIndex - 1]
                }else{
                    nextLetter = letters[4]
                }
				$(this).prepend('<li>'+nextLetter+'</li>');
				console.log($(".lock-dial ul").length);
			};
		},
		stop: function(){
			//MATHS		
			var negOrPos = $(this).css('margin-top').replace('px', '') > 0 ? 1 : -1;
			var thisTopTotal = parseInt($(this).css('top').replace('px', '')) + Math.abs(initTop);
			var marginMinified = parseInt(Math.abs($(this).css('margin-top').replace('px', ''))) - thisTopTotal;
			var numIncs = Math.floor(marginMinified/(halfHeight*2));
			var totalDif = numIncs*(halfHeight*2);
			var topTen = (marginMinified - totalDif)*negOrPos;
			var activeIndex = Math.abs(topTen/(gridIncrement*2)) + (halfHeight/(gridIncrement*2));
			var facingLetter  = $(this).find('li').eq(activeIndex).text() //grab the current letter
				document.getElementById("activate").addEventListener("click", () => {
					if(facingLetter){
						$('.lock-dial ul').draggable('disable');
						$('#lock-wrapper').addClass("unlocked");
						$('.lock-dial').each(function(){
							var $this = $(this);
							$this.find('ul').delay(400).css('color', '#0f0').fadeOut(function(){
								$this.animate({
									marginTop: 150
								}, function(){
									$this.fadeOut(function(){
										var linkToPiece; 
										var pieceName;
										switch(facingLetter){
											case "B":
												linkToPiece = "piece/b_construction.html";
												pieceName = "B_Construction";
												break;
											case "I":
												linkToPiece = "piece/i_attitudes_compound.html";
												pieceName = "I_Attitudes_Compound";
												break;
											case "L":
												linkToPiece = "piece/l_typing_her.html";
												pieceName = "L_Typing_Her";
												break;
											case "O":
												linkToPiece = "piece/o_right_around.html";
												pieceName = "O_Right_Around";
												break;
											case "X":
												linkToPiece = "piece/x_the_spot.html";
												pieceName = "X_The_Spot";
												break;
											default:
												break;
										}
										$('.welcome-message').html(pieceName); //set fade in message to title of piece
										setTimeout( () => {
											$('.welcome-message').fadeIn(function(){ 
												setTimeout(() => {
													location.reload(); //Refresh page in background, allowing new selection upon return
												}, 1000);
												//open the corresponding page
												window.open(linkToPiece).focus();
											});
										}, 1000);
										
									});
								});
							});
						});
					}
				});
		}
	});

})
