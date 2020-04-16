<?php include("init.php") ?><?php

//export.php?auth=A2F852AEE599&start=2018-06-06&end=2018-06-08

/*
CREATE  INDEX uidindex ON itemdata(uid);
*/
header('Content-Type: application/csv; charset=UTF-8');
header('Content-Disposition: attachment;filename="dataexport_lesetest.csv";');

$key = "A2F852AEE599";
set_time_limit(1200);

function validDB($in){
	$out = stripslashes(htmlspecialchars($in, ENT_QUOTES, "UTF-8"));
	return $out;
}
$auth="";
if (isset($_REQUEST["auth"])){    
	$auth = validDB($_REQUEST["auth"]);
}
$start="";
if (isset($_REQUEST["start"])){    
	$start = validDB($_REQUEST["start"]);
}
$end="";
if (isset($_REQUEST["end"])){    
	$end = validDB($_REQUEST["end"]);
}
if($auth != $key || $start=="" || $end==""){
	echo("request error");
	return;
}


$mysqli = getdbConnection();
	
$itemArray = array();
// find aktive itemids fra xml
$xml=simplexml_load_file("datasjek_content.xml");

$result = $xml->xpath("//opgave");

//foreach ($xml->opgave->p->item as $item) {
foreach ($result as $item) {
	array_push($itemArray,$item["id"]);
}
$headerString = "Id|Testdate|Testtime|TotalTestAnswers|TotalTestTime|TotalTestCorrect|";

$userAnswer = "";
$correctAnswer = "";
$isCorrect = "";
$itemTime = "";
$totalTime = "";
$itemSubmitDate = "";
$itemSubmitTime = "";
		
$userIter = 0;
$totalItemTime = 0;

foreach ($itemArray as $row) {
	$userAnswer = $userAnswer . $row ."_UserAnswer|";
	$correctAnswer=  $correctAnswer . $row ."_CorrectAnswer|";
	$isCorrect=  $isCorrect . $row ."_IsCorrect|";
	$itemTime = $itemTime . $row ."_ItemTime|";
	$totalTime=  $totalTime . $row ."_TotalTime|";
	$itemSubmitDate =  $itemSubmitDate . $row ."_ItemSubmitDate|";
	$itemSubmitTime = $itemSubmitTime . $row ."_ItemSubmitTime|";
}

$headerString = $headerString . $userAnswer;
$headerString = $headerString . $correctAnswer;
$headerString = $headerString . $isCorrect;
$headerString = $headerString . $itemTime;
$headerString = $headerString . $totalTime;
$headerString = $headerString . $itemSubmitDate;
$headerString = $headerString . $itemSubmitTime;

//Headerstring ok
echo($headerString."\n");
//ITER user


$sql = "SELECT * from testuser WHERE date(datecreated) >= ? AND date(datecreated) <=? ORDER by datecreated DESC";
error_log($sql . " " . $start . " ".$end);
if($stmt = $mysqli->prepare($sql)) {
	$stmt->bind_param("ss",$start,$end);
	$stmt->execute();
	$result = $stmt->get_result();
	while($row = $result->fetch_assoc()){
		
		
		$totalItemTime =0;
		$syncDate = date("Y-m-d", strtotime($row["datecreated"]));
		$syncTime = date("H:i:s", strtotime($row["datecreated"]));

		$dataline = $row["id"] . "|";
		$dataline = $dataline . $syncDate . "|";
		$dataline = $dataline . $syncTime . "|";

		$currentTotalTestAnswers = "";
		$currentTotalTestTime = "";
		$currentTotalTestCorrect = "";
		$currentTotalTestAnswersCount = 0;
		$currentTotalTestCorrectCount = 0;

		$userAnswer = "";
		$correctAnswer = "";
		$isCorrect = "";
		$itemTime = "";
		$totalTime = "";
		$itemSubmitDate = "";
		$itemSubmitTime = "";
		
		$currentUserItems = array();
		
		$sql2 = "SELECT * from itemdata WHERE uid=? order by datecreated desc;";
		if($stmt2 = $mysqli->prepare($sql2)) {
			$stmt2->bind_param("s",$row["id"]);
			$stmt2->execute();
			$result2 = $stmt2->get_result();
			while($row2 = $result2->fetch_assoc()){
				//error_log("found item on: ".$row["id"]);
				$currentItem = array("id"=>$row2["id"],"uid"=>$row2["uid"],"itemid"=>$row2["itemid"],"answer"=>$row2["answer"],"correct"=>$row2["correct"],"time"=>$row2["time"],"datecreated"=>$row2["datecreated"],"correctanswer"=>$row2["correctanswer"],"totaltime"=>$row2["totaltime"]);
				
				array_push($currentUserItems,$currentItem);	
				
			}
		}
		foreach ($itemArray as $row) {
			$gotItem = false;
			foreach ($currentUserItems as $currentItem){
				if($currentItem["itemid"] == $row){
					
					$currentTotalTestAnswersCount = $currentTotalTestAnswersCount +1;
					
					$syncDateItem = date("Y-m-d", strtotime($currentItem["datecreated"]));
					$syncTimeItem = date("H:i:s", strtotime($currentItem["datecreated"]));
					
					$userAnswer = $userAnswer .$currentItem["answer"] . "|";
					$correctAnswer =  $correctAnswer . $currentItem["correctanswer"] . "|";
			
					if($currentItem["correct"] == "true"){
						$isCorrect =  $isCorrect . "1|";
						$currentTotalTestCorrectCount = $currentTotalTestCorrectCount +1;
					}
					else{
						$isCorrect =  $isCorrect . "0|";
					}
					$totalItemTime = $totalItemTime + (int)$currentItem["time"];
					
					$itemTime = $itemTime + $currentItem["time"] . "|";
					$totalTime=  $totalTime + $currentItem["totaltime"] . "|";
					$currentTotalTestTime = $currentItem["totaltime"];
					$$itemSubmitDate =  $itemSubmitDate + $syncDateItem . "|";
					$itemSubmitTime = $itemSubmitTime + $syncTimeItem . "|";
					
					
					$gotItem = true;
					break;
				}
			}
			if($gotItem==false){
				$userAnswer = $userAnswer . "|";
				$correctAnswer =  $correctAnswer . "|";
				$isCorrect =  $isCorrect . "|";
				$itemTime = $itemTime . "|";
				$totalTime =  $totalTime . "|";
				$itemSubmitDate = $itemSubmitDate . "|";
				$itemSubmitTime = $itemSubmitTime . "|";
			}
				
		}
		
		
		
		
		$dataline = $dataline . $currentTotalTestAnswersCount . "|";
		$dataline = $dataline . $currentTotalTestTime . "|";
		//$dataline = $dataline + $totalItemTime . "|";	//
		$dataline = $dataline . $currentTotalTestCorrectCount ."|";


		$dataline = $dataline . $userAnswer;
		$dataline = $dataline . $correctAnswer;
		$dataline = $dataline . $isCorrect;
		$dataline = $dataline . $itemTime;
		$dataline = $dataline . $totalTime;
		$dataline = $dataline . $itemSubmitDate;
		$dataline = $dataline . $itemSubmitTime;

		
		echo($dataline . "\n");
		
		
		

	}
}


?>