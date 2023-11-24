<?php

$filename = $_GET['file'];
unlink($filename);
$message = "$filename deleted";
echo "<script type='text/javascript'>window.location='ubiquitous_admin.php?message=$message'</script>";

$data = "SERVER,,,,,,,DEL $filename\r";
$slog = fopen("log.txt",'a');
fwrite($slog,"$data\r");
fclose($slog);

?>
