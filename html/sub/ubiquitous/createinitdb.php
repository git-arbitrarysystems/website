<?php

foreach ($_POST as $var => $value) {
echo "$var = $value<br/>";
} 

$handle = fopen('initial.txt','w');
chmod('initial.txt',0777);
$towrite = 'altitudes=' . $_POST['altitudes'] . '&done=done';
fwrite($handle,$towrite);
fclose($handle);

$data = "SERVER,,,,,,,CINIT_DB";
$slog = fopen("log.txt",'a');
fwrite($slog,"$data\r");
fclose($slog);

?>
