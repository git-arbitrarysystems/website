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

$data = "SERVER,,,,,,,reboot.php\r";

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



echo "resp=ok&end=end";


?>
