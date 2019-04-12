$(function(){

	var comboArray = ['O', 'O', 'O', 'O', 'O'];
    var combination = ['B', 'I', 'L', 'O', 'X'];
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
                    nextLetter = letters[0]
                }
                $(this).append('<li>'+nextLetter+'</li>');
				// var curNum = parseInt($(this).find('li:last-child').text()) + 1;
				// if(curNum < 10){
				// 	$(this).append('<li>'+curNum+'</li>');
				// }else{
				// 	$(this).append('<li>0</li>');
				// };
			}else{
                var curLetter = $(this).find('li:first-child').text();
                var letterIndex = letters.indexOf(curLetter);
                // var curNum = parseInt($(this).find('li:first-child').text()) - 1;
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
                
				// if(curNum > -1){
				// 	$(this).prepend('<li>'+curNum+'</li>');
				// }else{
				// 	$(this).prepend('<li>9</li>');
				// };
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
			
			$(this).attr("data-combo-num", $(this).find('li').eq(activeIndex).text()).css({
				top: -315,
				marginTop: topTen
			}).find('li').slice(20).remove();
			
			for(var i=0; i<$( ".lock-dial ul" ).length; i++){
				comboArray[i] = $( ".lock-dial ul:eq("+i+")" ).attr("data-combo-num");
			}
			
			
		//	if(comboArray == ""+combination){
				document.getElementById("activate").addEventListener("click", () => {
					$('.lock-dial ul').draggable('disable');
					$('#lock-wrapper').addClass("unlocked");
					$('.lock-dial').each(function(){
						var $this = $(this);
						$this.find('ul').delay(400).css('color', '#0f0').fadeOut(function(){
							$this.animate({
								marginTop: 150
							}, function(){
								$this.fadeOut(function(){
									$('.welcome-message').fadeIn(function(){ //callback to this function, not presently working
										//grab the current letter, open the corresponding page
										let selectedLetter = $(this).find('li:nth-last-child(2)').text();
										console.log(selectedLetter);
										switch(selectedLetter){
											case "b":
												console.log(selectedLetter);
												window.open("../piece/b_construction.html").focus();
												break;
										}
									});
								});
							});
						});
					})
				});
		}
	});

})
