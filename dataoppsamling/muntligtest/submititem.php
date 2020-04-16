<?php include("init.php") ?><?php

$uid = ($_REQUEST["uid"]);
$itemid = ($_REQUEST["itemid"]);
$answer = ($_REQUEST["answer"]);
$correct = ($_REQUEST["correct"]);
$correctanswer = ($_REQUEST["correctanswer"]);
$time = ($_REQUEST["time"]);
$totaltime = ($_REQUEST["totaltime"]);

$mysqli = getdbConnection();

$sql ="SELECT * FROM itemdata WHERE uid=? AND itemid=?;";
$oldTimer = 0;

if($stmt = $mysqli->prepare($sql)) {
	$stmt->bind_param("ss", $uid,$itemid);
	$stmt->execute();
	$result = $stmt->get_result();
	if($result->num_rows >0 && ($data = $result->fetch_assoc())){
		$oldTimer = $data["time"];
		$time = $time + $oldTimer;
		
		$sql1 ="DELETE FROM itemdata WHERE uid=? AND itemid=?;";
		$stmt1 = $mysqli->prepare($sql1);
		$stmt1->bind_param("ss",$uid,$itemid);
		$stmt1->execute();
		$stmt1->close();	
		
		
		$sql2 = "INSERT INTO itemdata (id,uid,itemid,answer,correctanswer,correct,time,totaltime,datecreated) VALUES(?,?,?,?,?,?,?,?,NOW());";
		$cid = uuid();
		$stmt2 = $mysqli->prepare($sql2);
		$stmt2->bind_param("ssssssss",$cid,$uid,$itemid,$answer,$correctanswer,$correct,$time,$totaltime);
		$stmt2->execute();
		$stmt2->close();
		
		
	
	}
	else{
		$sql2 = "INSERT INTO itemdata (id,uid,itemid,answer,correctanswer,correct,time,totaltime,datecreated) VALUES(?,?,?,?,?,?,?,?,NOW());";
		$cid = uuid();
		$stmt2 = $mysqli->prepare($sql2);
		$stmt2->bind_param("ssssssss",$cid,$uid,$itemid,$answer,$correctanswer,$correct,$time,$totaltime);
		$stmt2->execute();
		$stmt2->close();
	
	}
}



$mysqli->close();


header('Access-Control-Allow-Origin: *');
?>true