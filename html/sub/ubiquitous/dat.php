<?php

//
$data = "SERVER,,,,,,,dat.php\r";


$message = "all textfiles deleted:<br />";
if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle))) {
            if(!is_dir($file)){
                $ext =  substr($file,-4);
                if($ext=='.txt' && $file!="log.txt" && $file!="ispaused.txt"){
                $message = "$message $file<br />";
                   unlink($file);
                   $data .= "SERVER,,,,,,,del. $file\r";
                }
            }
        }
    closedir($handle);
}
    
$slog = fopen("log.txt",'a');
fwrite($slog,"$data\r");
fclose($slog);

echo "<script type='text/javascript'>window.location='ubiquitous_admin.php?message=$message'</script>";
    //

?>
