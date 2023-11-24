<?php

$file = fopen("ispaused.txt","r");
$line = fgets($file);
echo "$line<br />";
$char = substr($line,19,1);
echo "char:$char<br />";
$newentry = "&psd=0&forcereboot=0&endthisfile=now";
if($char=="0"){
  $newentry = "&psd=0&forcereboot=1&endthisfile=now";
}
echo "new:$newentry<br />";
fclose($file);
//
$nfile = fopen("ispaused.txt","w+");
fwrite($nfile,$newentry);
fclose($nfile);

$data = "SERVER,,,,,,,frb.php (flip)";
$slog = fopen("log.txt",'a');
fwrite($slog,"$data\r");
fclose($slog);


echo "<script type='text/javascript'>window.location='ubiquitous_admin.php?message=pause flipped'</script>";
?>
