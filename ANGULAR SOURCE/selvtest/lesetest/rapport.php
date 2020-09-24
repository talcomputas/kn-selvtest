<?php 
include('fpdf181/fpdf.php'); 
include('FPDI-1/fpdi.php'); 

$cat = $_REQUEST["cat"];
$score = base64_decode($_REQUEST["id"]);
$dScore = floatval(str_replace(",",".",$score));



$xpos= "95";
$ypos="132";


$fontSize = 36;
$template = "lesetest_".$cat.".pdf";



if($dScore>=10){
	$fontSize = 48;
	$xpos= "15";
	$ypos="70";

}

/*
if($cat =="1"){
	$template = "red.pdf";
	$xpos= "15";
	$ypos="62";
}
if($cat =="2"){
	$template = "yellow.pdf";
	$xpos= "15";
	$ypos="69";
}

if($cat =="3"){
	$template = "greenyellow.pdf";
	$xpos= "15";
	$ypos="69";
}

if($cat =="4"){
	$template = "green.pdf";
	$xpos= "15";
	$ypos="69";
	if($dScore>=10){
		$fontSize = 48;
		$xpos= "15";
		$ypos="70";
	
	}
}
*/





// initiate FPDI 
$pdf =& new FPDI(); 
// add a page 
$pdf->AddPage(); 
// set the sourcefile 
$pdf->setSourceFile($template); 
// import page 1 
$tplIdx = $pdf->importPage(1); 
// use the imported page as the template 
$pdf->useTemplate($tplIdx, 0, 0); 

// now write some text above the imported page 



$pdf->SetFont('Arial','B',$fontSize);
$pdf->SetTextColor(0,0,0); 
$pdf->SetXY($xpos, $ypos); 
$pdf->Write(0, $score); 



$pdf->Output('lesetest_resultat.pdf', 'D'); 
?>