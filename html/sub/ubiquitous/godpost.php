<?php

$filename = $_REQUEST['file'];
$handle = fopen($filename,"w");
$towrite = "dat=" . $_REQUEST["dat"];
$sux = fwrite($handle,$towrite);
fclose($handle);

//$testhandle = fopen("testfile.txt","w");
//fwrite($testhandle,"testtesttest");
//fclose($testhandle);


$filenr = substr($filename,10);


//
//echo $filename.'<br />';
//echo $filenr.'<br />';
//$admin = fopen('lgp.txt','w');
//fwrite($admin,'&lastentry='.$filenr);
//fclose($admin);


if($sux==FALSE){
echo "&resp=fault";
}else{
echo "&resp=ok";
}
?>
