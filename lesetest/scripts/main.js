var $XML;
var validTime = 180000;
var finalAnswerArray = new Array();
var selectedAnswerArray = new Array();
var finalTimeUse = 0;

$(document).ready(function() {
  $("#frontpage-soundtest").css({ opacity: "0.3", cursor: "auto" });

  var submitString =
    "http://vox-wp2.vox.no/dataoppsamling/lesetest/submituser.php?nocache=" +
    Math.random();

  $.ajax({
    type: "GET",
    url: submitString,
    dataType: "text",
    success: function(responseString) {
      var $XML = $(jQuery.parseXML(responseString));
      uid = $XML
        .find("user")
        .eq(0)
        .attr("id");

      //console.log("uid "+uid);

      if (responseString == "invalid") {
        //location.href="404.html";
      } else {
        getTestXML();
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      //console.log(xhr.status);
      //console.log(thrownError);
      //location.href="404.html";
    }
  });
});

function getTestXML() {
  var submitString = "kn.xml?nocache=" + Math.random();

  $.ajax({
    type: "GET",
    url: submitString,
    dataType: "text",
    success: function(responseString) {
      $XML = $(jQuery.parseXML(responseString));

      xmlVersion = $XML
        .find("startest")
        .eq(0)
        .attr("version");
      testTimeAvailable = parseInt(
        $XML
          .find("startest")
          .eq(0)
          .attr("timer")
      );

      if (responseString == "invalid") {
        //location.href="404.html";
      } else {
        var soundPath = "sounds/";
        var sounds = [
          { id: "test", src: "Lesetest_intro.ogg" },
          { id: "intro1", src: "lesetest_01.ogg" },
          { id: "intro2", src: "lesetest_02.ogg" }
        ];
        createjs.Sound.alternateExtensions = ["mp3"];

        createjs.Sound.addEventListener("fileload", soundLoadHandler);
        createjs.Sound.registerSounds(sounds, soundPath);
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      //console.log(xhr.status);
      //console.log(thrownError);
      //location.href="404.html";
    }
  });
}

var currentSoundInstance;
var currentSoundLoadIndex = 0;
var testOver = false;

function changeLanguage(e, lang) {
  e.preventDefault();
  var r = true;
  if (currentTaskIndex > 0) {
    r = confirm(
      "Du har allerede startet testen. Hvis du velger å bytte språk må du begynne testen på nytt. Vil du dette?"
    );
  }

  if (r) {
    location.href =
      location.protocol +
      "//" +
      location.host +
      "/lesetesten" +
      (lang === "nn" ? "_nn" : "");
  }
}

function soundLoadHandler(event) {
  // This is fired for each sound that is registered.
  // console.log("sound loaded");

  currentSoundLoadIndex++;
  if (currentSoundLoadIndex >= 3) {
    $("#frontpage-soundtest").prop("disabled", false);
    $("#frontpage-soundtest").css({ opacity: "1", cursor: "pointer" });

    $("#frontpage-startbtn").prop("disabled", false);
    $("#frontpage-startbtn").css({ opacity: "1", cursor: "pointer" });

    hideThrobber();
  }
}

function hideThrobber() {
  $("#throbber").hide();
}

function showThrobber() {
  var testDivHeight = $("#test").css("height");
  $("#throbber").css("height", testDivHeight);
  $("#throbber").css("margin-bottom", "80px");
  $("#throbber").show();
}

function frontpageSoundTest() {
  if (currentSoundInstance) {
    currentSoundInstance.stop();
  }
  currentSoundInstance = createjs.Sound.play("test"); // play using id.  Could also use full sourcepath or event.src.
  currentSoundInstance.on("complete", frontpageSoundComplete, this);
  //instance.volume = 0.5;
}

function frontpageSoundComplete(event) {
  // console.log("played");
}

var currentIntro = 2;
function startTestIntro() {
  $("#intro-proceed-next").hide();

  $("#intro-content").html(
    "<span class='intro-sign'><p>Ønsker du denne teksten opplest, trykk på lydikonet.</p></span><span 	class='intro-text'><p>I denne testen skal du lese noen korte tekster uten bruk av hjelpemidler. Klikk på det ordet du mener passer best i teksten. Du kan endre på valget ved å trykke på ett av de andre ordene. Ett alternativ er riktig.</p></span><div class='task intro'><h2>Kneskade</h2><p>Anders har skadet kneet i en skiulykke. Om en uke skal han opereres. Etter operasjonen skal<span class='options'><span>underarmen</span><span class='selected'>kneet</span><span>hjernen</span><span>føttene</span></span>&nbsp;trenes opp. Fysioterapeuten hans mener han må bruke<span class='options'><span>stylter</span><span class='selected'>krykker</span><span>skøyter</span><span>rulleski</span></span>&nbsp;i ca. 3 måneder.</p></div><span class='intro-text'><p>Her er det fire alternativer i hver setning, og ordene <i>kneet</i> og <i>krykker</i> er valgt fordi de passer best.</p></span><span class='intro-sign'><p>Ønsker du denne teksten opplest, trykk på lydikonet.</p></span>"
  );

  $(".examination .task.intro p .options span").css("cursor", "auto");

  $(".examination .task.intro p .options span").hover(
    function() {
      if (!$(this).hasClass("selected")) {
        $(this).css({ border: "2px solid #d6e3f0" });
      }
    },
    function() {
      if (!$(this).hasClass("selected")) {
        $(this).css({ border: "2px solid #d6e3f0" });
      }
    }
  );

  $("#frontpage").fadeOut(300);
  $("#testintro")
    .delay(300)
    .fadeIn(300);
}

function introSoundPlay() {
  if (currentSoundInstance) {
    currentSoundInstance.stop();
  }
  if (currentIntro == 1) {
    currentSoundInstance = createjs.Sound.play("intro1");
  } else {
    currentSoundInstance = createjs.Sound.play("intro2");
  }
  currentSoundInstance.on("complete", introSoundComplete, this);
  //instance.volume = 0.5;
}
function introSoundComplete(event) {
  // console.log("played");
}

function introNext() {
  if (currentSoundInstance) {
    currentSoundInstance.stop();
  }

  $("#intro-content").fadeOut(300, introNextComplete);

  currentIntro = 2;
}

function introNextComplete() {
  $("#testintro button.proceed").html("Neste");

  $("#intro-proceed-next").hide();
  $("#intro-content").html(
    "<div class='task intro'><h2>Sofies hofte</h2><p>Sofie har gikt i den høyre hofta. Om en uke skal<span class='options'><span>de</span><span class='selected'>hun</span><span>han</span><span>enkelte</span></span>&nbsp;opereres. Etter operasjonen skal<span class='options'><span>underarmen</span><span class='selected'>hofta</span><span>hjernen</span><span>føttene</span></span>&nbsp;trenes opp.</p></div><span class='intro-text'><p>Det står fire ord i rammen i første setning, og ordet hun, er markert. I den siste setningen er det hofta som er merket. Disse ordene er valgt fordi de passer best.</p><p>Da står det:</p><p>Sofie har gikt i den høyre hofta. Om en uke skal hun opereres. Etter operasjonen skal funksjonen i hofta trenes opp.</p><p>Klikk på lydikonet dersom du vil høre instruksjonen en gang til. Klikk på pilen i høyre hjørne merket neste hvis du vil gå videre. Når du nå trykker på pilen neste, kommer du til oppgavene du skal lese selv.</p></span>"
  );

  $(".examination .task.intro p .options span").css("cursor", "auto");

  $(".examination .task.intro p .options span").hover(
    function() {
      if (!$(this).hasClass("selected")) {
        $(this).css({ border: "2px solid #d6e3f0" });
      }
    },
    function() {
      if (!$(this).hasClass("selected")) {
        $(this).css({ border: "2px solid #d6e3f0" });
      }
    }
  );
  $("#intro-content").fadeIn(300);
}

function introToTest() {
  if (currentSoundInstance) {
    currentSoundInstance.stop();
  }
  startTest();
}

function startTest() {
  $("#testintro").fadeOut(300, drawTask);
  $("#test")
    .delay(300)
    .fadeIn(300);
}

var startTime;
var currentTaskIndex = 0;
var testStartTime;
var testTimeout;

var taskTime;
var answerArray;

function drawTask() {
  startTime = new Date().getTime();

  if (currentTaskIndex == 0) {
    $("#intro-content").html("");
    testStartTime = new Date().getTime();
    testTimeout = setTimeout(testTimeoutFunc, 600000);
  }

  var textString = "";
  var titleString;
  var pCount = 0;
  var pArray = $XML
    .find("startest")
    .find("opgave")
    .eq(currentTaskIndex)
    .children();
  var noTitle = true;

  for (var i = 0; i < pArray.length; i++) {
    if (pArray[i].nodeName.toLowerCase() == "overskrift") {
      titleString = "<h2>" + $(pArray[i]).text() + "</h2>";
      noTitle = false;
    } else if (pArray[i].nodeName.toLowerCase() == "p") {
      //textString+="<p>";

      //p content
      var itemArray = $XML
        .find("startest")
        .find("opgave")
        .eq(currentTaskIndex)
        .children()
        .eq(i)
        .children();
      //console.log(itemArray.length)

      var lastTextWasItem = false;

      for (var j = 0; j < itemArray.length; j++) {
        if (itemArray[j].nodeName.toLowerCase() == "tekst") {
          var nodeText = $(itemArray[j]).text();

          if (lastTextWasItem) {
            if (nodeText.slice(0, 1) == "." || nodeText.slice(0, 1) == ",") {
              textString += nodeText;
            } else {
              textString += "&nbsp" + nodeText;
            }
          } else {
            textString += nodeText;
          }
          lastTextWasItem = false;
        } else if (itemArray[j].nodeName.toLowerCase() == "item") {
          var currentItemArray = $(itemArray[j])
            .text()
            .split(",");
          var currentItemID = $(itemArray[j]).attr("id");
          var currentItemCorrectIndex = $(itemArray[j]).attr("svar");

          textString +=
            "<span correctIndex='" +
            currentItemCorrectIndex +
            "' id='" +
            currentItemID +
            "' class='options'>";

          for (var k = 0; k < currentItemArray.length; k++) {
            textString +=
              "<span correct='" +
              (currentItemCorrectIndex == k + 1) +
              "'>" +
              currentItemArray[k] +
              "</span>";
          }
          textString += "</span>";

          lastTextWasItem = true;
        }
      }

      textString += "</p>";
      pCount++;
    }
  }

  if (noTitle) {
    textString = "<p>" + textString;
  } else {
    textString = titleString + "<p>" + textString;
  }

  $(".examination .task").html(textString);

  $(".examination .options span").click(function() {
    $(this)
      .siblings()
      .removeClass("selected");
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      $(this)
        .siblings()
        .show();
      $(this).css("opacity", "1");
      $(this)
        .siblings()
        .css("opacity", "1");
    } else {
      $(this).addClass("selected");
      //$(this).siblings().hide();
      $(this)
        .siblings()
        .show();
      $(this).css("opacity", "1");
      $(this)
        .siblings()
        .css("opacity", "0.6");
    }
  });
}

function nextTask() {
  taskTime = new Date().getTime() - startTime;

  $(".examination .proceed").prop("disabled", true);
  $("#test").fadeOut(300, checkAnswers);
  //$("#test").fadeOut(300);
}

function checkAnswers() {
  showThrobber();

  answerArray = new Array();
  for (var i = 0; i < $(".examination .options").length; i++) {
    var itemOpen = true;
    var itemID = $(".examination .options")
      .eq(i)
      .attr("id");
    var itemCorrectIndex = $(".examination .options")
      .eq(i)
      .attr("correctIndex");

    for (
      var j = 0;
      j <
      $(".examination .options")
        .eq(i)
        .find("span").length;
      j++
    ) {
      if (
        $(".examination .options")
          .eq(i)
          .find("span")
          .eq(j)
          .hasClass("selected")
      ) {
        itemOpen = false;
        if (
          $(".examination .options")
            .eq(i)
            .find("span")
            .eq(j)
            .attr("correct") == "true"
        ) {
          answerArray.push([itemID, j + 1, itemCorrectIndex, true]);
        } else {
          answerArray.push([itemID, j + 1, itemCorrectIndex, false]);
        }
        break;
      }
    }
    if (itemOpen) {
      answerArray.push([itemID, -1, itemCorrectIndex, false]);
    }
  }

  submitIndex = 0;
  submitItem();
}

function submitItem() {
  var submitArray = answerArray[submitIndex];

  var submitString =
    "http://vox-wp2.vox.no/dataoppsamling/lesetest/submititem.php?uid=" +
    uid +
    "&itemid=" +
    submitArray[0] +
    "&answer=" +
    submitArray[1] +
    "&correctanswer=" +
    submitArray[2] +
    "&correct=" +
    submitArray[3] +
    "&time=" +
    taskTime +
    "&totaltime=" +
    (new Date().getTime() - testStartTime) +
    "&ver=" +
    xmlVersion +
    "&timeout=" +
    testOver +
    "&nocache=" +
    Math.random();
  finalAnswerArray.push(submitArray[3]);
  selectedAnswerArray.push(submitArray[1]);

  $.ajax({
    type: "GET",
    url: submitString,
    dataType: "text",
    success: function(responseString) {
      submitIndex++;
      if (submitIndex < answerArray.length) {
        submitItem();
      } else {
        finalTimeUse += taskTime;

        currentTaskIndex++;
        if (currentTaskIndex >= $XML.find("startest").find("opgave").length) {
          showResult();
        } else {
          drawTask();
          $(".examination .proceed").prop("disabled", false);

          setTimeout(showNextTask, 300);
        }
      }
    }
  });
}

function showNextTask() {
  $("#test").fadeIn(300);
  hideThrobber();
}

function testTimeoutFunc() {
  $("#test").fadeOut(300, showResult);
}

var rapportScore;

function showResult() {
  if (!testOver) {
    testOver = true;

    clearTimeout(testTimeout);

    if (finalTimeUse < validTime) {
      //3 minutter

      $("#resulttoosoon")
        .delay(300)
        .fadeIn(300);
      $("#throbber")
        .delay(300)
        .hide();
    } else {
      var correctCount = 0;
      for (var i = 0; i < finalAnswerArray.length; i++) {
        if (finalAnswerArray[i] == true) {
          correctCount++;
        }
      }

      var wrongCount = finalAnswerArray.length - correctCount;
      var correctedCorrects = correctCount - wrongCount / 3;
      var minutesSpent = finalTimeUse / 60000;

      finalScore = correctedCorrects / minutesSpent;
      if (finalScore < 0) {
        finalScore = 0;
      } else if (finalScore > 7) {
        finalScore = 7;
      }
    }
  }
  setupResult();
}

function SeeAnswers() {
  $("#result").fadeOut(300, drawAnswers);
  return false;
}

function drawAnswers() {
  $("#answers .result .question-wrapper").remove();
  var questionIndex = 0;
  for (var i = 0; i < $XML.find("startest").find("opgave").length; i++) {
    var questionWrapper =
      '<div class="question-wrapper examination"><div class="question task">';

    var pArray = $XML
      .find("startest")
      .find("opgave")
      .eq(i)
      .children();
    var wrongAnswer = false;

    for (var j = 0; j < pArray.length; j++) {
      if (pArray[j].nodeName.toLowerCase() == "overskrift") {
        questionWrapper += "<h2>" + $(pArray[j]).text() + "</h2>";
      } else if (pArray[j].nodeName.toLowerCase() == "p") {
        questionWrapper += "<p>";
        var itemArray = $XML
          .find("startest")
          .find("opgave")
          .eq(i)
          .children()
          .eq(j)
          .children();
        var lastTextWasItem = false;

        for (var k = 0; k < itemArray.length; k++) {
          if (itemArray[k].nodeName.toLowerCase() == "tekst") {
            var nodeText = $(itemArray[k]).text();

            if (lastTextWasItem) {
              if (nodeText.slice(0, 1) == "." || nodeText.slice(0, 1) == ",") {
                questionWrapper += nodeText;
              } else {
                questionWrapper += "&nbsp" + nodeText;
              }
            } else {
              questionWrapper += nodeText;
            }
            lastTextWasItem = false;
          } else if (itemArray[k].nodeName.toLowerCase() == "item") {
            var currentItemArray = $(itemArray[k])
              .text()
              .split(",");
            var currentItemID = $(itemArray[k]).attr("id");
            var currentItemCorrectIndex = $(itemArray[k]).attr("svar");

            questionWrapper += "<span class='options'>";

            for (var l = 0; l < currentItemArray.length; l++) {
              var optionClass = "";
              var checkmark = "";

              if (currentItemCorrectIndex == l + 1) {
                optionClass = "correct ";
                checkmark = "✔ ";
              }

              if (selectedAnswerArray[questionIndex] == l + 1) {
                optionClass += "chosen ";

                if (
                  selectedAnswerArray[questionIndex] != currentItemCorrectIndex
                ) {
                  optionClass += "incorrect ";
                  checkmark = "✖ ";
                  wrongAnswer = true;
                }
              }

              questionWrapper +=
                "<span class='" +
                optionClass +
                "'>" +
                checkmark +
                currentItemArray[l] +
                "</span>";
            }
            questionIndex++;
            questionWrapper += "</span>";

            lastTextWasItem = true;
          }
        }
        questionWrapper += "</p>";
      }
    }

    var correctClass = "correct-answer";
    var correctMark = "✔";

    questionWrapper += "</div>";

    if (wrongAnswer) {
      correctClass = "wrong-answer";
      correctMark = "✖";
    }

    questionWrapper +=
      "<div class='mark " + correctClass + "'>" + correctMark + "</div>";

    questionWrapper += "</div>";
    $("#answers .result").append(questionWrapper);
  }

  //     $("#answers .result").append('<div class="question-wrapper">'+
  //     '<div class="question">'+
  //     $XML.find("kntest").find('opgave').eq(i).find("overskrift").eq(0).text() +
  //       '<span class="qnr">' + parseInt(i+1,10) + '/' + finalAnswerArray.length +'</span>'+
  //     '</div>'+
  //   '</div>');

  $("#answers")
    .delay(300)
    .fadeIn(300);
}

function closeAnswers() {
  $("#answers").fadeOut(300, showResult);
  return false;
}

function setupResult() {
  var resultScore = Math.round(finalScore * 10) / 10;

  questback.popup.create("https://response.questback.com/vox/inhgrsufwt", { //inhgrsufwt
    title: "Vinn et gavekort",
    text:
      "Din tilbakemelding er viktig for at produktene våre skal bli så gode som mulig. Vil du hjelpe oss med å forbedre denne testen? Du kan være med i trekningen av tre gavekort på 500 kroner. Det er mulig å gå fram og tilbake i undersøkelsen, og det tar cirka to minutter å svare på den.",
    delay: 2,
    buttons: [
      {
        type: "participate",
        text: "Ja, jeg vil vinne"
      },
      {
        type: "decline",
        text: "Nei takk"
      }
    ]
  });

  if (resultScore >= 10) {
    if (resultScore.toString().length > 2) {
      rapportScore = resultScore.toString().replace(".", ",");
    } else {
      rapportScore = resultScore.toString() + ",0";
    }
  } else {
    if (resultScore.toString().length > 1) {
      rapportScore = resultScore.toString().replace(".", ",");
    } else {
      rapportScore = resultScore.toString() + ",0";
    }
  }

  $("#result .score").html("DITT RESULTAT:<span>" + rapportScore + "</span>");

  var rapportScoreBTOA = window.btoa(rapportScore);

  if (finalScore >= 4) {
    //grøn
    $(".feedback.reading h2").html("Ditt resultat er over 4");
    $(".feedback.reading p").html(
      "Resultater over 4 viser at du er en god leser. Du leser vanlige tekster både raskt og nøyaktig."
    );

    if (finalScore >= 6) {
      $("#printbtn").attr("href", "rapport.php?cat=33&id=" + rapportScoreBTOA);
    } else if (finalScore >= 5) {
      $("#printbtn").attr("href", "rapport.php?cat=32&id=" + rapportScoreBTOA);
    } else {
      $("#printbtn").attr("href", "rapport.php?cat=31&id=" + rapportScoreBTOA);
    }
  } else if (finalScore >= 3) {
    //GUL
    $(".feedback.reading h2").html("Ditt resultat er mellom 3 og 4");
    $(".feedback.reading p").html(
      "Resultatet tyder på at leseferdighetene dine er ganske gode, men noen tekster kan være vanskelige og ta tid å lese for deg."
    );

    if (finalScore >= 3.66) {
      $("#printbtn").attr("href", "rapport.php?cat=23&id=" + rapportScoreBTOA);
    } else if (finalScore >= 3.33) {
      $("#printbtn").attr("href", "rapport.php?cat=22&id=" + rapportScoreBTOA);
    } else {
      $("#printbtn").attr("href", "rapport.php?cat=21&id=" + rapportScoreBTOA);
    }
  } else {
    //RØD
    $(".feedback.reading h2").html("Ditt resultat er 0 – 3");
    $(".feedback.reading p").html(
      "Resultatet ditt tyder på at mange tekster kan være vanskelige og ta lang tid å lese for deg. Du kan ha nytte av å øve mer på lesing."
    );

    if (finalScore >= 2) {
      $("#printbtn").attr("href", "rapport.php?cat=13&id=" + rapportScoreBTOA);
    } else if (finalScore >= 1) {
      $("#printbtn").attr("href", "rapport.php?cat=12&id=" + rapportScoreBTOA);
    } else {
      $("#printbtn").attr("href", "rapport.php?cat=11&id=" + rapportScoreBTOA);
    }
  }

  // 0-0.32 = rød | 0.33 - 0.46 = gul  |  0.47 - 0.785 = grøn
  $("#circle-progress").circleProgress({
    value: scaleScore(),
    size: 264,
    startAngle: 2.25,
    emptyFill: "rgba(0, 0, 0, 0)",
    lineCap: "round",
    thickness: 20,
    fill: {
      gradient: getColor(),
      gradientAngle: 0.3
    }
  });

  $("#result")
    .delay(300)
    .fadeIn(300);
  $("#throbber")
    .delay(300)
    .hide();
}

function scaleScore() {
  if (finalScore < 3) {
    return 0.32 * (finalScore / 3);
  } else if (finalScore < 4) {
    return 0.33 + 0.13 * ((-3 + finalScore) / 1);
  } else {
    return Math.min(0.785, 0.47 + 0.315 * ((-4 + finalScore) / 3));
  }
}

function getColor(score) {
  if (finalScore >= 4) {
    return ["#429321", "#B4ED50"];
  } else if (finalScore >= 3) {
    return ["#149DC4", "#62CEED"];
  } else {
    return ["#DD9415", "#F5AD2F"];
  }
}

function checkCompletion() {
  if (
    $(".examination .options span.selected").length ==
    $(".examination .options").length
  ) {
    $(".examination .proceed").prop("disabled", false);
  } else {
    $(".examination .proceed").prop("disabled", true);
  }
}
