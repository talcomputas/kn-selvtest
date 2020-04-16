var $XML;
var validTime = 180000;
var finalAnswerArray = new Array();
var finalTimeUse=0;

$(document).ready(function() {	
	$("#frontpage-soundtest").css( {"opacity":"0.3", "cursor":"auto"});
	
	var submitString = 'submituser.php?nocache='+Math.random();
	
    $.ajax({
        type: "GET",
        url: submitString,
        dataType: "text",
        success: function(responseString) {
            var $XML = $(jQuery.parseXML(responseString));
            uid = $XML.find('user').eq(0).attr('id');
			
			console.log("uid "+uid);
			
            if(responseString == 'invalid'){
                location.href="404.html";
            }else{
				getTestXML();	
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            //console.log(xhr.status);
            //console.log(thrownError);
            location.href="404.html";
        }
    });	
});

function getTestXML(){
	var submitString = 'kn.xml?nocache='+Math.random();
	
    $.ajax({
        type: "GET",
        url: submitString,
        dataType: "text",
        success: function(responseString) {
            $XML = $(jQuery.parseXML(responseString));
			
			xmlVersion = $XML.find('startest').eq(0).attr('version');
            testTimeAvailable = parseInt($XML.find('startest').eq(0).attr('timer'));
            
            if(responseString == 'invalid'){
                location.href="404.html";
            }else{				
	            var soundPath = "sounds/";
				var sounds = [
					{id:"test", src:"Lesetest_intro.ogg"},
					{id:"intro1", src:"lesetest_01.ogg"},
					{id:"intro2", src:"lesetest_02.ogg"}
				];
				createjs.Sound.alternateExtensions = ["mp3"];

				createjs.Sound.addEventListener("fileload", soundLoadHandler);
				createjs.Sound.registerSounds(sounds, soundPath);
	
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            //console.log(xhr.status);
            //console.log(thrownError);
            location.href="404.html";
        }
    });	
}

var currentSoundInstance;
var currentSoundLoadIndex=0;
var testOver=false;

function soundLoadHandler(event) {
	// This is fired for each sound that is registered.
	console.log("sound loaded");
	
	currentSoundLoadIndex++;
	if(currentSoundLoadIndex >= 3){
		$("#frontpage-soundtest").prop('disabled', false);
		$("#frontpage-soundtest").css( {"opacity":"1", "cursor":"pointer"});
		
		$("#frontpage-startbtn").prop('disabled', false);
		$("#frontpage-startbtn").css( {"opacity":"1", "cursor":"pointer"});
		
		hideThrobber();
	}
}

function hideThrobber(){
	$("#throbber").hide();
}

function showThrobber(){
	var testDivHeight = $("#test").css("height");
	$("#throbber").css("height", testDivHeight );
	$("#throbber").css("margin-bottom", "80px" );
	$("#throbber").show();
}

function frontpageSoundTest(){
	if(currentSoundInstance){
		currentSoundInstance.stop();
	}
	currentSoundInstance = createjs.Sound.play("test");  // play using id.  Could also use full sourcepath or event.src.
	currentSoundInstance.on("complete", frontpageSoundComplete, this);
	//instance.volume = 0.5;
}

function frontpageSoundComplete(event){
	console.log("played");
}

var currentIntro=1;
function startTestIntro(){
	
	$("#intro-content").html("<span class='intro-sign'><p>Ønsker du denne teksten opplest, trykk på lydikonet.</p></span><span 	class='intro-text'><p>I denne testen skal du lese noen korte tekster uten bruk av hjelpemidler. I tekstene er det setninger der fire ord står i hver sin ramme. Ett av disse ordene er riktig.</p><p>Når du leser teksten, skal du klikke på det ordet du mener passer best i sammenhengen for at setningen skal bli korrekt.</p></span><div class='task intro'><h2>Peter</h2><p>Peter bor på landet.<span class='options'><span>Det</span><span>De</span><span class='selected'>Han</span><span>Hun</span></span>&nbsp;tar bussen til jobben.</p></div><span class='intro-text'><p>Her står det fire ord i rammen og ordet Han, er markert. Det ordet er valgt fordi det er det ordet som passer best i sammenhengen. Da står det: Peter bor på landet. Han tar bussen til jobben.</p><p>Klikk på pilen i høyre hjørnet om du vil går rett til testen.</p><p>Dersom du ønsker å se et eksempel til, klikker du på knappen neste eksempel.</p></span><span class='intro-sign'><p>Ønsker du denne teksten opplest, trykk på lydikonet.</p></span>");
	
	//$('.task.intro').html("<h2>Peter</h2><p>Peter bor på landet. <span class='options'> <span>Det</span> <span>De</span> <span class='selected'>Han</span> <span>Hun</span></span> tager bussen på arbejde.</p>");
	
	$('.examination .task.intro p .options span').css("cursor","auto");
	
	$('.examination .task.intro p .options span').hover(
		
		function(){
			if(!$(this).hasClass("selected")){
				$(this).css({ border:"2px solid #d6e3f0" });
			}
		}, 
		function(){
			if(!$(this).hasClass("selected")){
				$(this).css({ border:"2px solid #d6e3f0" });
			}
		}
	);

	
	
	$("#frontpage").fadeOut(300);
	$("#testintro").delay(300).fadeIn(300);

} 

function introSoundPlay(){
	if(currentSoundInstance){
		currentSoundInstance.stop();
	}
	if(currentIntro == 1){
		currentSoundInstance = createjs.Sound.play("intro1");
	}else{
		currentSoundInstance = createjs.Sound.play("intro2");
	}
	currentSoundInstance.on("complete", introSoundComplete, this);
	//instance.volume = 0.5;
}
function introSoundComplete(event){
	console.log("played");
}

function introNext(){
	if(currentSoundInstance){
		currentSoundInstance.stop();
	}
	
	console.log("intro-next");
	$("#intro-content").fadeOut(300, introNextComplete);
	
	currentIntro = 2;
}

function introNextComplete(){
	$("#testintro button.proceed").html("Neste");

	$("#intro-proceed-next").hide();
	$("#intro-content").html("<div class='task intro'><h2>Sofies hofte</h2><p>Sofie har gikt i den høyre hofta. Om en uke skal<span class='options'><span>de</span><span class='selected'>hun</span><span>han</span><span>enkelte</span></span>&nbsp;opereres. Etter operasjonen skal<span class='options'><span>underarmen</span><span class='selected'>hofta</span><span>hjernen</span><span>føttene</span></span>&nbsp;trenes opp.</p></div><span class='intro-text'><p>Det står fire ord i rammen i første setning, og ordet hun, er markert. I den siste setningen er det hofta som er merket. Disse ordene er valgt fordi de passer best.</p><p>Da står det:</p><p>Sofie har gikt i den høyre hofta. Om en uke skal hun opereres. Etter operasjonen skal funksjonen i hofta trenes opp.</p><p>Klikk på lydikonet dersom du vil høre instruksjonen en gang til. Klikk på pilen i høyre hjørne merket neste hvis du vil gå videre. Når du nå trykker på pilen neste, kommer du til oppgavene du skal lese selv.</p></span>");
	
	
	$('.examination .task.intro p .options span').css("cursor","auto");
	
	$('.examination .task.intro p .options span').hover(
		
		function(){
			if(!$(this).hasClass("selected")){
				$(this).css({ border:"2px solid #d6e3f0" });
			}
		}, 
		function(){
			if(!$(this).hasClass("selected")){
				$(this).css({ border:"2px solid #d6e3f0" });
			}
		}
	);

	
	
	$("#intro-content").fadeIn(300);
}


function introToTest(){
	if(currentSoundInstance){
		currentSoundInstance.stop();
	}
	
	startTest();
	
}


function startTest(){
	$("#testintro").fadeOut(300, drawTask);
	
	
	
	$("#test").delay(300).fadeIn(300);

	
	
}


var startTime;
var currentTaskIndex = 0;
var testStartTime;
var testTimeout;
var testTimeAvailable = 60000000; //600000; //10 min

var taskTime;
var answerArray;

function drawTask(){
    startTime= new Date().getTime();
    
    if(currentTaskIndex==0){
		$("#intro-content").html("");
		
        testStartTime = new Date().getTime();
        testTimeout = setTimeout(testTimeoutFunc, testTimeAvailable);
    }
    
    var textString = "";
	var titleString;
    var pCount = 0;
    var pArray = $XML.find("startest").find('opgave').eq(currentTaskIndex).children();
    var noTitle = true;
	
    for(var i=0; i<pArray.length; i++){
        if(pArray[i].nodeName.toLowerCase()=="overskrift"){
            titleString = "<h2>"+$(pArray[i]).text()+"</h2>";
            noTitle=false;
        }else if(pArray[i].nodeName.toLowerCase()=="p"){
        	//textString+="<p>";
            
			//p content
            var itemArray = $XML.find("startest").find('opgave').eq(currentTaskIndex).children().eq(i).children();
            //console.log(itemArray.length)
            
			var lastTextWasItem=false;
			
            for(var j=0; j<itemArray.length; j++){
                if(itemArray[j].nodeName.toLowerCase() == "tekst"){
					var nodeText = $(itemArray[j]).text();
					
					if(lastTextWasItem){
						if(nodeText.slice(0,1) == "." || nodeText.slice(0,1) == ","){
							textString += nodeText;
						}else{
							textString += "&nbsp"+nodeText;	
						}
					}else{
						textString += nodeText;
					}
					lastTextWasItem = false;
                }else if(itemArray[j].nodeName.toLowerCase() == "item"){
					
					var currentItemArray = $(itemArray[j]).text().split(',');
                    var currentItemID = $(itemArray[j]).attr('id');
                    var currentItemCorrectIndex = $(itemArray[j]).attr('svar');
                    
					textString += "<span correctIndex='"+ currentItemCorrectIndex +"' id='"+ currentItemID +"' class='options'>";
					
                    for(var k=0; k < currentItemArray.length; k++){
                        textString += "<span correct='"+ (currentItemCorrectIndex == (k+1)) +"'>"+currentItemArray[k]+"</span>";
                    }
                    textString += "</span>";
					
					lastTextWasItem = true;
                }
            }
            
            textString += "</p>";
            pCount++;   
        }  
    }
	
	if(noTitle){
		textString = "<p>"+textString;
	}else{
		textString = titleString + "<p>" + textString;
	}
	
	$('.examination .task').html(textString);
	
	$('.examination .options span').click(function() {
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
			$(this).siblings().show();

			return;
		}

		$(this).addClass('selected');
		$(this).siblings().hide();
	});

}

function nextTask(){
	taskTime = new Date().getTime()-startTime;

	$('.examination .proceed').prop('disabled', true);
	$("#test").fadeOut(300, checkAnswers);
	//$("#test").fadeOut(300);
	
}

function checkAnswers(){
	showThrobber();
	
	answerArray = new Array();
	for(var i=0; i < $('.examination .options').length; i++){
		var itemOpen = true;
		var itemID = $('.examination .options').eq(i).attr("id");
		var itemCorrectIndex = $('.examination .options').eq(i).attr("correctIndex");
		
		for(var j=0; j < $('.examination .options').eq(i).find("span").length; j++){
			if($('.examination .options').eq(i).find("span").eq(j).hasClass("selected")){
				itemOpen = false;
				if($('.examination .options').eq(i).find("span").eq(j).attr("correct") == "true"){
					answerArray.push([itemID,(j+1),itemCorrectIndex,true]);
				}else{
					answerArray.push([itemID,(j+1),itemCorrectIndex,false]);
				}
				break;
			}
		}
		if(itemOpen){
			answerArray.push([itemID,-1,itemCorrectIndex,false]);
		}
		
	}

	submitIndex=0;
	submitItem();

}

function submitItem(){	
	var submitArray=answerArray[submitIndex];
    
    var submitString = 'submititem.php?uid=' + uid + '&itemid=' + submitArray[0] +'&answer='+ submitArray[1] +'&correctanswer=' + submitArray[2] +'&correct='+ submitArray[3] +'&time='+ taskTime +'&totaltime='+ (new Date().getTime()-testStartTime) +'&ver='+ xmlVersion + '&timeout=' + testOver + '&nocache=' + Math.random();
    
	//console.log(submitString);
	
	finalAnswerArray.push(submitArray[3]);
	
    $.ajax({
        type: "GET",
        url: submitString,
        dataType: "text",
        success: function(responseString) {
			submitIndex++;
			if(submitIndex < answerArray.length ){
				submitItem();
			}else{
				
				
				finalTimeUse += taskTime;
				
				currentTaskIndex++;
				if(currentTaskIndex >= $XML.find("startest").find('opgave').length){
					showResult();
				}else{
					drawTask();
					$('.examination .proceed').prop('disabled', false);
					
					setTimeout(showNextTask, 300);
				}
			}           
        }
    });
}

function showNextTask(){
	$("#test").fadeIn(300);
	hideThrobber();
}



function testTimeoutFunc(){
	console.log("test timeout");
	testOver = true;
	
	//showResult();
}

var rapportScore;

function showResult(){
	testOver = true;
	clearTimeout(testTimeout);
	


    $("#tempendpage").delay(300).fadeIn(300);
	$("#throbber").delay(300).hide();
	


    return;


	if(finalTimeUse < validTime){ //3 minutter
		
		$("#resulttoosoon").delay(300).fadeIn(300);
		$("#throbber").delay(300).hide();
		
		
	}else{
		
		var correctCount=0;
		for(var i=0; i<finalAnswerArray.length; i++){
			if(finalAnswerArray[i]==true){
				correctCount++;
			}
		}
		
		var wrongCount = finalAnswerArray.length-correctCount;
		var correctedCorrects = correctCount - (wrongCount/3); 
		var minutesSpent = finalTimeUse / 60000;		
		
		finalScore = correctedCorrects / minutesSpent;
		if(finalScore < 0){
			finalScore = 0;
		}
		
		setupResult();
	}
}


function setupResult(){
	var resultScore = Math.round(finalScore * 10)/10;

	if(resultScore >= 10){
		if(resultScore.toString().length > 2){
			rapportScore = resultScore.toString().replace(".",",");
		}else{
			rapportScore = resultScore.toString()+",0";
		}
	}else {
		if(resultScore.toString().length > 1){
			rapportScore = resultScore.toString().replace(".",",");
		}else{
			rapportScore = resultScore.toString()+",0";
		}
	}

	$("#result .score").html("DITT RESULTAT:<span>"+rapportScore+"</span>");

	var rapportScoreBTOA = window.btoa(rapportScore);


	if(finalScore >= 4){//grøn
		$(".feedback.reading h2").html("Ditt resultat er over 4");
		$(".feedback.reading p").html("Resultater over 4 viser at du er en god leser. Du leser de fleste vanlige tekster både raskt og nøyaktig.");

		$("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=4&id='+rapportScoreBTOA);

	}else if(finalScore >= 3.5){//GUL
		$(".feedback.reading h2").html("Ditt resultat er mellom 3,5 og 4");
		$(".feedback.reading p").html("Resultatet tyder på at leseferdighetene dine er ganske gode, men at en del tekster kan være vanskelige og ta tid å lese.");

		$("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=2&id='+rapportScoreBTOA);
	}else{//RØD
		$(".feedback.reading h2").html("Ditt resultat er 0,0 – 3,5");
		$(".feedback.reading p").html("Resultatet ditt tyder på at mange tekster kan være vanskelige og ta lang tid å lese. Du kan ha nytte av å øve mer på lesing.");
		
		$("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=1&id='+rapportScoreBTOA);
	}

	// 0-0.32 = rød | 0.33 - 0.46 = gul  |  0.47 - 0.785 = grøn
	$('#circle-progress').circleProgress({
		value: scaleScore(),
		size: 264,
		startAngle: 2.25,
		emptyFill: "rgba(0, 0, 0, 0)",
		lineCap: "round",
		thickness: 20,
		fill: {
		  gradient: getColor(), gradientAngle: 0.3
		}
	});

	$("#result").delay(300).fadeIn(300);
	$("#throbber").delay(300).hide();
}




function scaleScore() {
	if(finalScore < 3.5){
		return 0.32*(finalScore/3.5);
	}else if(finalScore < 4){
		return 0.33 + (0.13 * ((-3.5+finalScore)/0.5));
	}else{
		return Math.min(.785, 0.47+(0.315*((-4+finalScore)/3)));
	}
}

function getColor(score) {
	if (finalScore >= 4) {
	  return ["#429321", "#B4ED50"];
	} else if (finalScore >= 3.5) {
	  return ["#149DC4", "#62CEED"];
	} else {
	  return ["#DD9415", "#F5AD2F"];
	}
}





function checkCompletion() {
	if ($('.examination .options span.selected').length == $('.examination .options').length) {
	  $('.examination .proceed').prop('disabled', false);
	} else {
	  $('.examination .proceed').prop('disabled', true);
	}
}

