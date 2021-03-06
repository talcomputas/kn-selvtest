var $XML;
var validTime = 180000;
var finalAnswerArray = new Array();
var finalTimeUse=0;

var urlParams = new URLSearchParams(window.location.search);
var testName = null;
var language = null;
var lang = urlParams.get('lang');
var check = urlParams.get('check');
var type = "check";
var calcOpened = false;
var firstLimit = 28;
var secondLimit = 56;
var topLimit = 70;

// Config of type of tests;
switch(check) {
    case "leseskrivesjekk":
        testName = check;
        
        firstLimit = 32;
        secondLimit = 64;
        topLimit = 80;
        break;
    case "regnesjekk":
        testName = check;
        break;
    case "regnetest":
        testName = check;
        type = "test";
        break;
    default:
        testName = "datasjekk";
}
switch(lang) {
    case "en":
        language = lang;
        break; 
    default:
        language = "no";
}



$(document).ready(function() {
    $("#frontpage-soundtest").css( {"opacity":"0.3", "cursor":"auto"});
    
    if(language == "en") {
        $(".sound-controls").hide();
    }
	
	var submitString = 'http://tekstur.dk/kn/datasjek/submituser.php?nocache='+Math.random();
	
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
    var submitString ="texts/"+ testName +"/content_"+ language +".xml?nocache="+Math.random();

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
var level = 0;

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

function openCalculator() {
    if(!calcOpened) {
        calc().init();
        calcOpened = true;
    }
    
    $(".calculator").dialog({width: 376,resizable: false, title: getString("Calculator")});
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

function drawQuestion(){
    startTime = new Date().getTime();
    var questionXML = $XML.find("kntest").find('opgave').eq(currentQuestionIndex);
    
    if(finalAnswerArray[currentQuestionIndex]){
        startTime -= finalAnswerArray[currentQuestionIndex][1];
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
    
    var image = questionXML.find("image").eq(0);
    var imageFile = image.text();
    $(".questionnaire .task .illustration-image").remove();
    
    if(imageFile) {
        var source = image.attr("source");
        $(".questionnaire .task").prepend("<div class='illustration-image'><img src='static/images/test-images/"+imageFile+"'></img><div class='image-source'>"+ source +"</div></div>");
    }

    $(".questionnaire .task .question").html("<em>"+ $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("overskrift").eq(0).text() + "</em>");

    var calc = questionXML.find("calculator").eq(0);

    if(calc.length>0) {
        $(".questionnaire .task .question").append("<a class='btn inverted' href='#' onClick='openCalculator()'>Åpne kalkulator</a>")
    }

    $(".questionnaire .task .answers").html("");


    var slider = questionXML.find("slider").eq(0);

    if(slider.length) {
        $(".questionnaire .task .answers").append('<div>Dra for å avgi ditt svar:</div>');
        $(".questionnaire .task .answers").append('<div class="slider"><div class="handle ui-slider-handle"><span></span></div></div>');
    
        var handle = $(".slider .handle span").eq(0);
        $(".slider").eq(0).slider({
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
            $('.questionnaire .proceed').prop('disabled', false);
        },
        min: parseInt(slider.attr("from")),
        max: parseInt(slider.attr("to"))
        });
    }

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
            $( ".slider" ).slider( "option", "value", answerIndex);
            $(".slider .handle span").eq(0).text(answerIndex);
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
    
    if(testOver) {
        $(".question-navigation").hide();
        $(".question-navigation-result").show();
    }else {
        $(".question-navigation-result").hide();
        $(".question-navigation").show();
    }
}

function changeAnswer(questionIndex) {
    currentQuestionIndex = questionIndex;
    drawQuestion();
    $("#answers").fadeOut(300);
    setTimeout(showNextQuestion, 300);
}

function drawAnswers() {

    $("#answers .result .question-wrapper").remove();
    for(var i=0; i < finalAnswerArray.length; i++) {

        var questionXML = $XML.find("kntest").find('opgave').eq(i);
        var slider = questionXML.find("slider").eq(0);
        var answer = "";
        var changeButton = "";
        var correctAnswer = "";
        var answeredCorrectly = false;
        var mark = "";
        var questionClass = "";
        var options = questionXML.find("option");
        
        if(slider.length) {
            answer = finalAnswerArray[i][0];
            correctAnswer = slider.attr("correctAnswer");
        } else {
            if(type == "test") {
                for(var j=0; j < options.length ; j++){
                    if(options.eq(j).attr("score") > 0) {
                        correctAnswer = options.eq(j).text();
                        break;
                    }
                }
            }
            
            answer = options.eq(finalAnswerArray[i][0]).text();
        }
        
        if(type == "test") {
            if(correctAnswer != answer) {
                answer = "<div class='wrong-answer'>"+getString("YouAnswered")+": "+answer+"</div><div>"+getString("RightAnswer")+": "+correctAnswer+"</div>";
                mark = "<div class='mark wrong-answer'>✖</div>";
                questionClass = "mark"
            }
            else {
                answer = "<div class='correct-answer'>"+answer+"</div>";
                mark = "<div class='mark correct-answer'>✔</div>";
                questionClass = "mark"
            }
        } else {
            changeButton = '<button onClick="changeAnswer('+ i +')" class="change">'+getString("Change")+'</button>';
        }

        $("#answers .result").append('<div class="question-wrapper">'+ mark +
        '<div class="question '+ questionClass +'">'+
        questionXML.find("overskrift").eq(0).text() +
          '<span class="qnr">' + parseInt(i+1,10) + '/' + finalAnswerArray.length +'</span>'+
        '</div>'+
        '<div class="answer-wrapper '+ questionClass +'">'+
          '<div class="answer"><div>'+ answer + '</div>'+ changeButton +'</div>'+
        '</div>'+
      '</div>');
    }

    $("#answers").delay(300).fadeIn(300);
}

function prevQuestion(){
	questionTime = new Date().getTime()-startTime;
    var slider = $(".slider .handle span").eq(0);
    var selectedAnswer = -1;

    if(slider.length) {
        selectedAnswer = slider.text();
    }
    else {
        for(var i=0; i< $(".questionnaire .task .answers li").length ; i++){
            if($(".questionnaire .task .answers li").eq(i).hasClass('selected')){
                selectedAnswer = i;
                break;
            }
        }
        
    }

    finalAnswerArray[currentQuestionIndex] = [selectedAnswer, questionTime];

    currentQuestionIndex --;

    var xmlSlider = $XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("slider");

    if(xmlSlider.length) {

        if(xmlSlider.attr("correctAnswer") == finalAnswerArray[currentQuestionIndex][0])
        totalScore -= parseInt(xmlSlider.attr("score"));
    }
    else {
        totalScore -= parseInt($XML.find("kntest").find('opgave').eq(currentQuestionIndex).find("option").eq(finalAnswerArray[currentQuestionIndex][0]).attr("score"));
    }

    $("#questions").fadeOut(300, drawQuestion);
    setTimeout(showNextQuestion, 300);
}

function nextQuestion(){
	questionTime = new Date().getTime()-startTime;

	$('.examination .proceed').prop('disabled', true);
    $("#questions").fadeOut(300, checkAnswers);
}

function SeeAnswers() {
    $("#result").fadeOut(300, drawAnswers);
    return false;
}

function SeeAnswersFromQuestion() {
    $("#questions").fadeOut(300, checkAnswers);
}

function DownloadPDF() {
    if(type == "test") {
        printGeneratedPDF_test();
    }
    else {
        printGeneratedPDF();
    }
}

function checkAnswers(){
	showThrobber();

    var selectedAnswer = -1;
    var answerScore = -1;
    var question  = $XML.find("kntest").find('opgave').eq(currentQuestionIndex);
    var slider = $(".slider .handle span").eq(0);

    if(testOver) {
        totalScore -= parseInt(question.find("option").eq(finalAnswerArray[currentQuestionIndex][0]).attr("score"));
    }

    if(slider.length) {
        selectedAnswer = slider.text();
        answerScore = 0;
        if(selectedAnswer == question.find("slider").eq(0).attr("correctAnswer")) {
            answerScore = question.find("slider").eq(0).attr("score");
        }
        
    }
    else {
        for(var i=0; i< $(".questionnaire .task .answers li").length ; i++){
            if($(".questionnaire .task .answers li").eq(i).hasClass('selected')){
                selectedAnswer = i;
                break;
            }
        }
        answerScore = question.find("option").eq(selectedAnswer).attr("score");
    }

    finalAnswerArray[currentQuestionIndex] = [selectedAnswer, questionTime];
    totalScore += parseInt(answerScore);

    var submitString = 'http://tekstur.dk/kn/datasjek/submititem.php?uid=' + uid + '&itemid=' + question.attr("id") +'&answer='+ selectedAnswer +'&correct='+ answerScore +'&time='+ questionTime +'&totaltime='+ (new Date().getTime()-questionsStartTime) +'&nocache=' + Math.random();
	
    $.ajax({
        type: "GET",
        url: submitString,
        dataType: "text",
        success: function(responseString) {
			if(responseString != "true"){
				alert("Could not communicate with the server");
            } 
        }
    });

    currentQuestionIndex++;

    if(testOver) {
        $("#throbber").delay(300).hide();
        drawAnswers();
    }
    else if (currentQuestionIndex >= $XML.find("kntest").find('opgave').length){
        showResult();
    }else{
        drawQuestion();
        setTimeout(showNextQuestion, 300);
    }     
}

function closeAnswers() {
    $("#answers").fadeOut(300, showResult);
    return false;
}

function showNextQuestion(){
	$("#questions").fadeIn(300);
	hideThrobber();
}

function showResult(){
	testOver = true;
    var rapportScoreBTOA = window.btoa(totalScore);
    
    if(language == "en") {
        $(".be-better").attr("href", "https://www.kompetansenorge.no/test-yourself/advice-and-tips-on-how-to-become-better/")
    }

	if(totalScore > secondLimit){//grøn (57 for regnesjekken)
        $("#result .score").html(getString("Level") + ":<span>3</span>");
		$(".feedback.data h2").html(getString("Level31"));
		$(".feedback.data p").html(getString("Level32"));
        level = 3;
		// $("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=3&id='+rapportScoreBTOA);

	}else if(totalScore > firstLimit){//GUL (29 for regnesjekken)
        $("#result .score").html(getString("Level") + ":<span>2</span>");
		$(".feedback.data h2").html(getString("Level21"));
		$(".feedback.data p").html(getString("Level22"));
        level = 2;
		// $("#printbtn").attr("href",'http://tekstur.dk/selvtest16/rapport.php?cat=2&id='+rapportScoreBTOA);
	}else{//RØD
        $("#result .score").html(getString("Level") + ":<span>1</span>");
		$(".feedback.data h2").html(getString("Level11"));
		$(".feedback.data p").html(getString("Level12"));
        level = 1;
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

function checkCompletion() {
	if ($('.examination .options span.selected').length == $('.examination .options').length) {
	  $('.examination .proceed').prop('disabled', false);
	} else {
	  $('.examination .proceed').prop('disabled', true);
	}
}