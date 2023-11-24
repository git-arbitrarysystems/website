<?php
$data = $_REQUEST['entry'];





//agentpost agentcollect godpost godcollect
if (file_exists("udtrack.txt")){
$udtrack = fopen("udtrack.txt", 'r');
$list = fgets($udtrack);
fclose($udtrack);
}else{
$list = "0,0,0,0";
}
$cut = explode("," , $data );
$cutlist = explode(",",$list);

$dontshow = 0;
if($cut[0]=="AGENT"){
  $cutlist[0] = $cut[2];
  $cutlist[2] = $cut[4];
}else if($cut[0]=="GOD"){
  $cutlist[1] = $cut[2];
  $cutlist[3] = $cut[4];
}else{
$dontshow = 1;
}


$ip = ",".$_SERVER['REMOTE_ADDR'];
function Dot2LongIP ($IPaddr)
{
if ($IPaddr == "") {
return 0;
} else {
$ips = split ("\.", "$IPaddr");
return ($ips[3] + $ips[2] * 256 + $ips[1] * 65536 + $ips[0]
*16777216); }
}

$port = $_SERVER['REMOTE_PORT'];
$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);


$data .= $ip.":".$port."<br />";


if($dontshow!==1){
$wstr = $cutlist[0].",".$cutlist[1].",".$cutlist[2].",".$cutlist[3];


if(file_exists("udtrack.txt")){
chmod("udtrack.txt", 0777);
}
$udt = fopen("udtrack.txt","w+");

fwrite($udt,$wstr);
fclose($udt);








$asyncap = $cutlist[0]-$cutlist[1];
$asyncgp = $cutlist[2]-$cutlist[3];
$range = 20;
$data .= ",ASAP,".$asyncap.",ASGP,".$asyncgp.",TOL,".$range;


$rb = 0;
if($cutlist[0]-$cutlist[1]>$range or $cutlist[0]-$cutlist[1]<-$range){
$data .=",ASYNC:FORCE_REBOOT";
$rb=1;
}
if($cutlist[2]-$cutlist[3]>$range or $cutlist[2]-$cutlist[3]<-$range){
$data .=",ASYNC:FORCE_REBOOT";
$rb=1;
}
if($rb==1){
$newentry = "&psd=0&forcereboot=1&endthisfile=now";
$nfile = fopen("ispaused.txt","w+");
fwrite($nfile,$newentry);
fclose($nfile);
}
}

//  logbackup

if(file_exists("log.txt")){
  if(filesize("log.txt")>50*1024){
  $time = date("Y\-m\-d\-H\-i\-s");
  $newfile = "logs/log_".$time.".txt";
  
    $data = "SERVER,,,,,,,log.php,NEWLOG";
    $slog = fopen("log.txt",'a');
    fwrite($slog,"$data\r");
    fclose($slog);
  
    if(copy("log.txt",$newfile)){
      // coppying was a succes
      unlink("log.txt");
    }
  }
}




if(file_exists("log.txt")){
chmod("log.txt", 0777);
}

$handle = fopen("log.txt",'a');
$resp = fwrite($handle,"$data\r");
fclose($handle);
echo "&resp=$resp";



?>
