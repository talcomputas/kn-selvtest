<?php include("init.php") ?><?php
$testflow = "";

$uid = uuid();
$mysqli = getdbConnection();
$sql = "INSERT INTO testuser (id,datecreated) VALUES(?,NOW());";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s",$uid);
$stmt->execute();
$stmt->close();
$mysqli->close();


header('Access-Control-Allow-Origin: *');
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";

?>
<startest>
	<user id="<?php echo($uid) ?>"/>
</startest>