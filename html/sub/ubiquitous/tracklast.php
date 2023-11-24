<?php

$file = $_POST['file'];
$handle = fopen($file,'r');
$ret = fgets($handle);
fclose($handle);
//
echo $ret;




?>
