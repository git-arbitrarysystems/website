<?php
$filename = $_POST['thefile'];
//echo "$filename<br />";
if ( file_exists($filename)==1){
    $file = fopen($filename,'r');
    $data =  fgets($file);
    echo $data;
    fclose($file);
    unlink($filename);
}else{
    $response = "no";
    echo "file=" . $response;
}



?>
