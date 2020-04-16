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
			
			// console.log("uid "+uid);
			
            if(responseString == 'invalid'){
                location.href="404.html";
            }else{
				getTestXML();	
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            location.href="404.html";
        }
    });	
});

function getTestXML(){
	var submitString = 'datasjek_content.xml?nocache='+Math.random();
	
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
					{id:"test", src:"test.ogg"},
					{id:"intro1", src:"lesetest_01.ogg"},
					{id:"intro2", src:"lesetest_02.ogg"}
				];
				createjs.Sound.alternateExtensions = ["mp3"];

				createjs.Sound.addEventListener("fileload", soundLoadHandler);
				createjs.Sound.registerSounds(sounds, soundPath);
	
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            location.href="404.html";
        }
    });	
}

var currentSoundInstance;
var currentSoundLoadIndex=0;
var testOver=false;

function soundLoadHandler(event) {
	// This is fired for each sound that is registered.
	// console.log("sound loaded");
	
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
	/*if(currentSoundInstance){
		currentSoundInstance.stop();
	}*/
    vfact_SetCustomParams(3,"M",1);
    vFact_doplay();
	
}

function frontpageSoundStop(){
    console.log("stop");
   vFact_dostop();	
}

function frontpageSoundHelp(){
    console.log("help");
   vFact_dohelp();	
}

function frontpageSoundSettings(){
    console.log("settings");
   vFact_showconfigbox();	
}

function frontpageSoundComplete(event){
	//console.log("played");
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
	//console.log("played");
}



function startQuestions(){
    if(currentSoundInstance){
		currentSoundInstance.stop();
	}
    $("#frontpage").fadeOut(300);
	$("#questions").delay(300).fadeIn(300);

	drawQuestion();

	
	
}


var startTime;
var questionTime;
var currentQuestionIndex = 0;
var questionsStartTime;
var questionTime;
var totalScore=0;

var firstLimit = 28;
var secondLimit = 56;
var topLimit = 70;

function drawQuestion(){
    startTime = new Date().getTime();

    //console.log("final");
    //console.log(finalAnswerArray[currentQuestionIndex]);
    
    

    if(finalAnswerArray[currentQuestionIndex]){
        startTime -= finalAnswerArray[currentQuestionIndex][1];
        //console.log("q has been answered")
        // console.log(finalAnswerArray[currentQuestionIndex][1]);
    }
    
    if(currentQuestionIndex == 0){		
        questionsStartTime = new Date().getTime();

        $('.questionnaire .return').hide();
    }else{
        $('.questionnaire .return').prop('disabled', false);
        $('.questionnaire .return').show();
    }

    $(".questionnaire .progression .steps").html((currentQuestionIndex+1) +"/"+$XML.find("kntest").find('opgave').length);
    var ratio = ((currentQuestionIndex+1)/$XML.find("kntest").find('opgave').length) * 100;
    $(".questionnaire .progression .bar .inner").css("left", ratio+"%");
	
    $(".questionnaire .task .question").html("<em>"+ $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("overskrift").eq(0).text() + "</em>");

    $(".questionnaire .task .answers").html("");

    for(var i=0; i < $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("option").length ; i++){
            
            $(".questionnaire .task .answers").append("<li>"+ $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("option").eq(i).text() +"</li>");
    }
	
     if(finalAnswerArray[currentQuestionIndex]){
        var answerIndex = parseInt(finalAnswerArray[currentQuestionIndex][0]);

        if(answerIndex < 0){
            $('.questionnaire .proceed').prop('disabled', true);
        }else{
            $(".questionnaire .task .answers li").eq(answerIndex).addClass("selected");
            $('.questionnaire .proceed').prop('disabled', false);
        }
     }else{
         $('.questionnaire .proceed').prop('disabled', true);
     }

	
	$('.questionnaire .answers li').click(function() {
		$('.questionnaire .answers li').removeClass('selected');

		$(this).addClass('selected');

        $('.questionnaire .proceed').prop('disabled', false);

        /*        
        for(var i=0; i< $(".questionnaire .task .answers li").length ; i++){
            console.log(i);
            if($(".questionnaire .task .answers li").eq(i).hasClass('selected')){
                $('.questionnaire .proceed').prop('disabled', false);
                break;
            }
        }
        */


	});

    



}


function prevQuestion(){
	questionTime = new Date().getTime()-startTime;
    
    var selectedAnswer = -1;

    for(var i=0; i< $(".questionnaire .task .answers li").length ; i++){
        if($(".questionnaire .task .answers li").eq(i).hasClass('selected')){
            selectedAnswer = i;
            break;
        }
    }

    finalAnswerArray[currentQuestionIndex] = [selectedAnswer, questionTime];

	//$('.examination .proceed').prop('disabled', true);
	currentQuestionIndex --;
    
    $("#questions").fadeOut(300, drawQuestion);
    setTimeout(showNextQuestion, 300);
}



function nextQuestion(){
	questionTime = new Date().getTime()-startTime;

	$('.examination .proceed').prop('disabled', true);
	$("#questions").fadeOut(300, checkAnswers);
	
}

function checkAnswers(){
	showThrobber();

    var selectedAnswer = -1;

	for(var i=0; i< $(".questionnaire .task .answers li").length ; i++){
        if($(".questionnaire .task .answers li").eq(i).hasClass('selected')){
            selectedAnswer = i;
            break;
        }
    }

    finalAnswerArray[currentQuestionIndex] = [selectedAnswer, questionTime];
    // console.log("check answer and save")
    // console.log(finalAnswerArray);
    var answerScore = $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("option").eq(selectedAnswer).attr("score");
    totalScore += parseInt(answerScore);

    var submitString = 'submititem.php?uid=' + uid + '&itemid=' + $XML.find("kntest").find('opgave').eq(currentQuestionIndex).attr("id") +'&answer='+ selectedAnswer +'&correct='+ answerScore +'&time='+ questionTime +'&totaltime='+ (new Date().getTime()-questionsStartTime) +'&nocache=' + Math.random();
	
    $.ajax({
        type: "GET",
        url: submitString,
        dataType: "text",
        success: function(responseString) {
			if(responseString == "true"){
				
            }else{
                alert("Could not communicate with the server");
            }

            currentQuestionIndex++;
            if(currentQuestionIndex >= $XML.find("kntest").find('opgave').length){
                showResult();
            }else{
                drawQuestion();
                setTimeout(showNextQuestion, 300);
            }        
        }
    });
}

function showNextQuestion(){
	$("#questions").fadeIn(300);
	hideThrobber();
}

function showResult(){
	testOver = true;

	

	var rapportScoreBTOA = window.btoa(totalScore);


	if(totalScore > secondLimit){//grøn (57 for regnesjekken)
        $("#result .score").html("NIVÅ:<span>3</span>");
		$(".feedback.data h2").html("Du har vurdert deg selv til nivå 3 av 3 i denne sjekken.");
		$(".feedback.data p").html("Digitale ferdigheter på nivå 3 innebærer å være en reflektert bruker av sammensatte digitale verktøy og tjenester. Fordi utviklingen innen digitale ferdigheter går fort, er det allikevel slik at vi må regne med å lære nye verktøy og tjenester.");

        totalScore = 70;

		// $("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=3&id='+rapportScoreBTOA);

	}else if(totalScore > firstLimit){//GUL (29 for regnesjekken)
        $("#result .score").html("NIVÅ:<span>2</span>");
		$(".feedback.data h2").html("Du har vurdert deg selv til nivå 2 av 3 i denne sjekken.");
		$(".feedback.data p").html("Digitale ferdigheter på nivå 2 innebærer å forholde seg aktivt til digital informasjon og å  bruke informasjonen i nye sammenhenger og situasjoner. Digitale verktøy og tjenester er kjent og blir benyttet.");

        totalScore = 56;
		// $("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=2&id='+rapportScoreBTOA);
	}else{//RØD
        $("#result .score").html("NIVÅ:<span>1</span>");
		$(".feedback.data h2").html("Du har vurdert deg selv til nivå 1 av 3 i denne sjekken.");
		$(".feedback.data p").html("Digitale ferdigheter på nivå 1 innebærer å bruke enkle digitale verktøy og å kunne forholde seg til digital informasjon når det er nødvendig.");

        totalScore = 28;
		// $("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=1&id='+rapportScoreBTOA);
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
	if(totalScore <= firstLimit){
		return 0.31;
	}else if(totalScore <= secondLimit){
		return 0.45;
	}else{
		return 0.785;
	}
}

function getColor(score) {
	if (totalScore > secondLimit) {
	  return ["#429321", "#B4ED50"];
	} else if (totalScore > firstLimit) {
	  return ["#149DC4", "#62CEED"];
	} else {
	  return ["#DD9415", "#F5AD2F"];
	}
}



function getPDF(){
    var top33 = secondLimit + ((topLimit-secondLimit)*0.66);
    var top32 = secondLimit + ((topLimit-secondLimit)*0.33);
    var top31 = secondLimit;
    var top23 = firstLimit + ((secondLimit-firstLimit)*0.66);
    var top22 = firstLimit + ((secondLimit-firstLimit)*0.33);
    var top21 = firstLimit;
    var top13 = (firstLimit*0.66);
    var top12 = (firstLimit*0.33);

    if(totalScore > top33){
        window.open('static/pdf/datasjek_3.pdf','_blank');
    }else if(totalScore > top32){
        window.open('static/pdf/datasjek_3.pdf','_blank');
    }else if(totalScore > top31){
        window.open('static/pdf/datasjek_3.pdf','_blank');
    }else if(totalScore > top23){
        window.open('static/pdf/datasjek_2.pdf','_blank');
    }else if(totalScore > top22){
        window.open('static/pdf/datasjek_2.pdf','_blank');
    }else if(totalScore > top21){
        window.open('static/pdf/datasjek_2.pdf','_blank');
    }else if(totalScore > top13){
        window.open('static/pdf/datasjek_1.pdf','_blank');
    }else if(totalScore > top12){
        window.open('static/pdf/datasjek_1.pdf','_blank');
    }else{
        window.open('static/pdf/datasjek_1.pdf','_blank');
    }
}



function checkCompletion() {
	if ($('.examination .options span.selected').length == $('.examination .options').length) {
	  $('.examination .proceed').prop('disabled', false);
	} else {
	  $('.examination .proceed').prop('disabled', true);
	}
}

