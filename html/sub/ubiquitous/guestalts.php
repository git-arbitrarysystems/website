<?php


$handle = fopen('altitudes.txt','r');
$data = fgets($handle);
fclose($handle);
//
echo "&altitudes=$data";


?>
