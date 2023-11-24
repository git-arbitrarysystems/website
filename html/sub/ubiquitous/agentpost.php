<?php

//foreach ($_POST as $var => $value) {
//echo "$var = $value<br/>";
//} 
$filename = $_REQUEST["file"];
$handle = fopen($filename,"w");
$towrite = "xpos=" . $_REQUEST["xpos"] .  "&ypos=" . $_REQUEST["ypos"] . "&id=" . $_REQUEST["id"] . "&quant=" . $_REQUEST["quant"] . "&dir=" . $_REQUEST["dir"] . "&done=done";
$sux = fwrite($handle,$towrite);
fclose($handle);

//$testhandle = fopen("testfile.txt","w");
//fwrite($testhandle,"testtesttest");
//fclose($testhandle);
$filenr = substr($filename,12);

//
//echo $filename;
//echo $filenr;
//$admin = fopen('lap.txt','w');
//fwrite($admin,'&lastentry='.$filenr);
//fclose($admin);
//
if($sux==FALSE){
echo "&resp=unsuccesfully";
}else{
echo "&resp=succesfully";
}
?>
