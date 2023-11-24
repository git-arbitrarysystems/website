<?php

$file = fopen("ispaused.txt","r");
$line = fgets($file);
echo "$line<br />";
$char = substr($line,5,1);
echo "char:$char<br />";
$newentry = "&psd=0&forcereboot=0&endthisfile=now";
if($char=="0"){
  $newentry = "&psd=1&forcereboot=0&endthisfile=now";
}
echo "new:$newentry<br />";
fclose($file);
//
$data = "SERVER,,,,,,,pflip.php,admin pause";
$slog = fopen("log.txt",'a');
fwrite($slog,"$data\r");
fclose($slog);
//
$nfile = fopen("ispaused.txt","w+");
fwrite($nfile,$newentry);
fclose($nfile);
echo "<script type='text/javascript'>window.location='ubiquitous_admin.php?message=pause flipped'</script>";
?>
