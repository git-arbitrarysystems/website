<?php
$filename = "ispaused.txt";
//echo "$filename<br />";
if ( file_exists($filename)==1){
    $file = fopen($filename,'r');
    $data =  fgets($file);
    echo $data;
    fclose($file);
    
}else{
    $response = "no response from $file";
    echo $response;
}



?>
