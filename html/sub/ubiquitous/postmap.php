<?php

foreach ($_POST as $var => $value) {
//echo "$var = $value<br/>";
} 

$handle = fopen('altitudes.txt','w');
chmod('altitudes.txt',0777);
$towrite = 'altitudes=' . $_POST['map'];
$sux = fwrite($handle,$towrite);
fclose($handle);
//
if($sux){
echo '&resp=ok';
}else{
echo '&resp=a problem occured while writing to the map.';
    $data = "SERVER,,,,,,,postmap ERROR";
    $slog = fopen("log.txt",'a');
    fwrite($slog,"$data\r");
    fclose($slog);
}

?>
