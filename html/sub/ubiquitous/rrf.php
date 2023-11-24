<?php


$newentry = "&psd=0&forcereboot=0&endthisfile=now";

$nfile = fopen("ispaused.txt","w+");
fwrite($nfile,$newentry);
fclose($nfile);

?>
