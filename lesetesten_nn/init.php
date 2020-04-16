<?php

function getdbConnection(){
	$dbhost = 'production.c66dxnsojwk3.eu-west-1.rds.amazonaws.com:3306';
	$dbuser = 'tekstur_db';
	$dbpass = '53tnmTNbxp';
	$dbname = 'kompetanse_norge';
	$mysqli = mysqli_init();
	mysqli_real_connect($mysqli,$dbhost, $dbuser, $dbpass, $dbname,"3306") or die ('Unable to connect');
	return $mysqli;
}

function uuid(){
   return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
       mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ),
       mt_rand( 0, 0x0fff ) | 0x4000,
       mt_rand( 0, 0x3fff ) | 0x8000,
       mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ) );
}

?>