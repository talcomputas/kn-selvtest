<?php include("init.php") ?><?php

$uid = ($_REQUEST["uid"]);
$itemid = ($_REQUEST["itemid"]);
$answer = ($_REQUEST["answer"]);
$correct = ($_REQUEST["correct"]);
$correctanswer = ($_REQUEST["correctanswer"]);
$time = ($_REQUEST["time"]);
$totaltime = ($_REQUEST["totaltime"]);
$ver = ($_REQUEST["ver"]);
$timeout = ($_REQUEST["timeout"]);



$mysqli = getdbConnection();
$sql = $sql = "INSERT INTO itemdata (id,uid,itemid,answer,correct,time,totaltime,ver,datecreated,correctanswer,timeout) VALUES(?,?,?,?,?,?,?,?,NOW(),?,?);";
$cid = uuid();
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ssssssssss",$cid,$uid,$itemid,$answer,$correct,$time,$totaltime,$ver,$correctanswer,$timeout);
$stmt->execute();
$stmt->close();
$mysqli->close();




header('Access-Control-Allow-Origin: *');
?>true