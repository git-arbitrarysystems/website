<?php
  
  if(file_exists("initial.txt")){
unlink("initial.txt");
}

if(file_exists("udtrack.txt")){
unlink("udtrack.txt");
}

if(file_exists("altitudes.txt")){
unlink("altitudes.txt");
}


if ($handle = opendir('.')) {
  while (false !== ($file = readdir($handle))) {
    if(!is_dir($file)){
      $name =  substr($file,0,7);
      $ext =  substr($file,-3);
      if($name=='godpost' or $name=='agentpo'){
        if($ext=='txt'){
        $data .= "SERVER,,,,,,,DEL $file\r";
        unlink($file);
        }
      }
    }
  }
}
closedir($handle);



$slog = fopen("log.txt",'a');
fwrite($slog,"$data");
fclose($slog);

$file = fopen("ispaused.txt","r");
$line = fgets($file);
//echo "$line<br />";
//$char = substr($line,19,1);
//echo "char:$char<br />";
$newentry = "&psd=0&forcereboot=0&endthisfile=now";
if($char=="0"){
  $newentry = "&psd=0&forcereboot=2&endthisfile=now";
}
//echo "new:$newentry<br />";
fclose($file);
//
$nfile = fopen("ispaused.txt","w+");
fwrite($nfile,$newentry);
fclose($nfile);


  $message = "SUPERKILL";
  
  
  
  echo "<script type=text/javascript src='makeframe.js'></script>";
  echo "<script type='text/javascript'>
    g_openPopupTesterPopups();
    g_openPopupTesterPopups();
  </script>";
  
   echo "<a href='viewlog.php?message=$message'>back</a>";
  
  $data .= "SERVER,,,,,,,SUPERKILL\r";
  $slog = fopen("log.txt",'a');
  fwrite($slog,"$data\r");
  fclose($slog);

?>
